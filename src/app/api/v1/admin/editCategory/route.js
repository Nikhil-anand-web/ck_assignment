import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import { saveFileToPath } from "@/utils/saveFileToPath";
import path from "path";

export async function POST(req) {
    const user = await getServerSession(authOptions);
    if (!user) {
        return NextResponse.json({
            success: false,
            message: "User not authenticated"
        }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const slug = formData.get("slug");
        const categoryName = formData.get("categoryName");
        const status = formData.get("status");
        const id = formData.get("ids");

        const dataToUpdate = {
            ...(categoryName && categoryName !== "" && { categoryName }),
            ...(slug && { slug }),
            ...(status && { status: +status }),
            createdBy: {
                connect: {
                    id: user.user._id,
                },
            },
        };

        if (file && file.name) {
            const filename = `${Date.now()}-${file.name.replace(/\s+/g, '')}`;
            const absolutePath = path.join(process.cwd(), 'asset', 'uploads', 'categoris', slug, filename);
            await saveFileToPath(absolutePath, file);
            dataToUpdate.image = `/asset/uploads/categoris/${slug}/${filename}`;
        }

        const updatedCategory = await db.category.update({
            where: { id },
            data: dataToUpdate,
        });

        return NextResponse.json({
            success: true,
            message: "Category updated successfully!",
            data: updatedCategory
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: error?.meta?.cause || error.message || "Internal Server Error"
        }, { status: 500 });
    }
}
