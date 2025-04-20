"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import db from "@/utils/db"


export default async function getCartCount() {
    const user = await getServerSession(authOptions)


    if (user) {

        
        
        try {
            
            const cartitm = await db.cartItem.findMany({
                where:{
                    cart:{
                        userId:user.user._id
                    }
                    
                },select:{
                    qty:true

                }
            })
           
          



            
          

           

            

            




         
            return {
                success: true,
                message: `removed`,
                data:[...cartitm]


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