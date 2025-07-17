import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import { saveFileToPath } from "@/utils/saveFileToPath";
import path from "path";

export async function POST(req) {
    const user = await getServerSession(authOptions);

    const formData = await req.formData();
console.log(formData,user)


    if (user) {


        try {
            const file = formData.get("file");
            const slug = formData.get("slug")
            const filename = `${Date.now()}-${file.name}`;

            const absolutePath = path.join(process.cwd(), 'asset', 'uploads','categoris', slug, filename);
            await saveFileToPath(absolutePath, file);

            const res = await db.category.create({
                data: {
                    categoryName: formData.get("categoryName"),
                    slug: slug,
                    status: +formData.get("status"),
                    image: `/asset/uploads/categoris/${slug}/${filename}`,
                    createdBy: {
                        connect: {
                            id: user.user._id,
                        },
                    }

                }
            })
            return NextResponse.json({
                success: true,
                message: "success !!",
                data: res
            })


        } catch (error) {
            console.error(error);
            return NextResponse.json({
                success: false,
                message: error.meta?.cause || "Internal Server Error"
            }, { status: 500 });
        }
    }



    return NextResponse.json({
        success: false,
        message: "User not authenticated"
    }, { status: 401 }); // Handle unauthenticated user
}
