import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";

export async function POST(req) {
    const user = await getServerSession(authOptions);
    const reqObj = await req.json();
    console.log(reqObj)


    if (user) {

        try {

            const res = await db.varient.findFirst({
                where: {
                    productId: reqObj.productId,
                    isDefault: true
                }
            })


            const newvarient = await db.varient.create({
                data: {
                    slug: reqObj.slug,
                    discount: reqObj.discount,
                    mrp: reqObj.mrp,
                    isDefault: !res ? true : reqObj.isDefault,
                    status: reqObj.status === true ? true : false,
                    product: {
                        connect: {
                            id: reqObj.productId
                        }

                    },
                    validity: reqObj.validity,
                    name: reqObj.name


                }
            })
            if (reqObj.isDefault === true && res) {
                console.log(await db.varient.update({
                    where:{
                        id:res.id

                    },
                    data: {
                        isDefault: false
                    }
                }))

            }
            return NextResponse.json({
                success: true,
                message: "success !!",
                data: "res"
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
