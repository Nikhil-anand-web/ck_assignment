

import fs from 'fs';
import path from 'path';
import db from "@/utils/db";
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';


export async function DELETE(req) {

  const user = await getServerSession(authOptions)
  const reqObj = await req.json()





  if (user) {
    if (true) {

      try {

        if (true) {
          console.log(reqObj[0].id)

          const deletedCat = await db.category.delete({
            where: {
              id: reqObj[0].id,

            },
          });
          const uploadDirectory =path.join(process.cwd(), 'asset', 'uploads','categoris', deletedCat.slug);;
          fs.rm(uploadDirectory, { recursive: true, force: true }, (err) => {
            if (err) {
              throw err

            }

          })

          return Response.json({
            success: true,
            message: "success",
            deletedCat

          }, { status: 200 })

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