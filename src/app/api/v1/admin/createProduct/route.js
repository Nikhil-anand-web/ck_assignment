import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";

export async function POST(req) {
    const user = await getServerSession(authOptions);
    const reqObj = await req.json();
    console.log(user, reqObj)


    if (user) {

        try {

            const res = await db.product.create({
                data: {
                    name: reqObj.name,
                    description: reqObj.description,
                    slug: reqObj.slug,
                    thumbNail: reqObj.thumbNail.url,
                    status: +reqObj.status===1?true:false,
                    category: {
                        connect: {
                            id: reqObj.categoryId
                        }
                    },
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
