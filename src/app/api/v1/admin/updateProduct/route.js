import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import path from "path";
import { saveFileToPath } from "@/utils/saveFileToPath";

export async function POST(req) {
    const user = await getServerSession(authOptions);
    const formData = await req.formData();

    const productId = formData.get("productId");
    const file = formData.get("file"); // optional
    const name = formData.get("name");
    const categoryId = formData.get("categoryId");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const pointsDescription = formData.get("pointsDescription");
    const status = formData.get("status");

  

    try {
        const existingProduct = await db.product.findUnique({
            where: { id: productId },
        });

        if (!existingProduct) {
            return NextResponse.json({
                success: false,
                message: "Product not found"
            }, { status: 404 });
        }

        let thumbNail = existingProduct.thumbNail;

        // If new file uploaded, overwrite thumbnail and save
        if (file && typeof file.name === 'string') {
            const filename = `${Date.now()}-${file.name.replace(/\s+/g, '')}`;
            const absolutePath = path.join(process.cwd(), 'asset', 'uploads', 'products', slug, filename);
            await saveFileToPath(absolutePath, file);
            thumbNail = `/asset/uploads/products/${slug}/${filename}`;
        }

        const updatedProduct = await db.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                slug,
                thumbNail,
                status: +status === 1,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                pointsDescription: pointsDescription.split(','),
                updatedAt: new Date(),
            }
        });

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: error.meta?.cause || "Internal Server Error"
        }, { status: 500 });
    }
}
