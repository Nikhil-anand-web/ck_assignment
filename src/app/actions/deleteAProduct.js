"use server"

import fs from 'fs';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import db from '@/utils/db';
import path from "path";

async function deleteAProduct(ids) {

    const user = (await getServerSession(authOptions)).user
    if (user) {
        if (true) {
            try {
                if (true) {

                    const delProduct = await db.product.delete({
                        where: {
                            id: ids
                        }
                    })
                    const uploadDirectory = path.join(process.cwd(), 'asset', 'uploads','products', delProduct.slug);
                    fs.rm(uploadDirectory, { recursive: true, force: true }, (err) => {
                        if (err) {
                            throw err
        
                        }
        
                    })
            
                  







                    return {
                        success: true,
                        message: "product deleted",
                     

                    }








                }

            } catch (error) {
                console.log(error)

                return {
                    success: false,
                    message: error.meta?.cause || "internal server error",

                }

            }

        }

    }


}
export default deleteAProduct