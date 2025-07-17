import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import path from "path";
import { saveFileToPath } from "@/utils/saveFileToPath";

export async function POST(req) {
    const user = await getServerSession(authOptions);
    const formData = await req.formData();

    const file = formData.get("file"); // This is a File object
    const name = formData.get("name");
    const categoryId = formData.get("categoryId");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const pointsDescription = formData.get("pointsDescription");
    const status = formData.get("status");



    const filename = `${Date.now()}-${file.name}`;
    const absolutePath = path.join(process.cwd(), 'asset', 'uploads','products', slug, filename);
    await saveFileToPath(absolutePath, file);

   

    if (user) {

        try {

            const res = await db.product.create({
                data: {
                    name: name,
                    description: description,
                    slug: slug,
                    thumbNail: `/asset/uploads/products/${slug}/${filename}`,
                    status: +status === 1 ? true : false,
                    category: {
                        connect: {
                            id: categoryId
                        }
                    },
                    pointsDescription:pointsDescription.split(','),
                    createdBy: {
                        connect: {
                            id: user.user._id, // Must match the user's ID in your database
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
