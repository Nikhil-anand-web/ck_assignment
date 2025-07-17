

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import { getServerSession } from "next-auth";

const updateDb = async (id, value, updatedBy) => {
  const updatedCategory = await db.category.update({
    where: {
      id: id,


    },

    data: {
      status: value,
      createdBy: { connect: { id: updatedBy } }
    },
  });



}


export async function POST(req) {

  const user = (await getServerSession(authOptions))?.user
  const reqObj = await req.json()


console.log(user)

  if (user) {
    if (true) {

      try {

        if (true) {
          const category = await db.category.findUnique({
            where: { id: reqObj.id },
          });

          if (!category) {
            throw new Error('category not found');
          }


          if (category.status === 1) {


            await updateDb(reqObj.id, 0, user._id)

            const products = await db.product.findMany({
              where: {
                categoryId: reqObj.id,
              },
            });

            for (const product of products) {
              await db.product.update({
                where: {
                  id: product.id,
                },
                data: {
                  status: false,
                  createdBy: { connect: { id: user._id } },
                },
              });
            }

            const varients = await db.varient.findMany({
              where: {
                product: {
                  categoryId: reqObj.id,
                },
              },
            });

            for (const varient of varients) {
              await db.varient.update({
                where: {
                  id: varient.id,
                },
                data: {
                  status: false,
                  // createdBy: { connect: { id: user._id } },
                },
              });
            }






            return Response.json({
              success: true,
              message: "success",
              categoryStatus: 0
            }, { status: 200 })

          } else if (category.status === 0) {
            const category = await db.category.findUnique({
              where: { id: reqObj.id },
             
            });

            

            await updateDb(reqObj.id, 1, user._id)

            return Response.json({
              success: true,
              message: "success",
              categoryStatus: 1
            }, { status: 200 })

          }




        } else {
          return Response.json({
            success: false,
            message: "unAuthorised Request"
          }, { status: 400 })

        }

      } catch (error) {
        console.log(error)

        return Response.json({
          success: false,
          message: error.meta?.cause || "internal server error"
        }, { status: 500 })






      }

    }


    return Response.json({
      success: false,
      message: "Bad Request"
    }, { status: 400 })
  }
}