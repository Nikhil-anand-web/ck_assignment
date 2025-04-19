"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import db from "@/utils/db"


export default async function getQueryResult(searchTerm) {
    const user = await getServerSession(authOptions)


    if (true) {

        
        
        try {
            if (searchTerm==='') {
                return {
                    success: true,
                    message: `result`,
                    products:[]
    
    
                }
                
            }
            
            const products = await db.product.findMany({
                where: {
                  AND: [
                    {
                      OR: [
                        { name: { contains: searchTerm } },
                        { description: { contains: searchTerm } },
                        { slug: { contains: searchTerm } },
                        { category: { categoryName: { contains: searchTerm } } },
                      ]
                    },
                    { status: true }
                  ]
                },
                select: {
                  name: true,
                  slug: true,
                  id: true,
                  thumbNail: true
                }
              });
              
          



            
          

           

            

            




         
            return {
                success: true,
                message: `result`,
                products


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