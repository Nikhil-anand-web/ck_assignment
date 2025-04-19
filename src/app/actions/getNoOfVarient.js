"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"



export default async function getNoOfVarient(varid) {
    const user = await getServerSession(authOptions)
    if (!user) {
        return {
            qty:0
        }
        
    }
    
   
    try {
        const cartItem = await db.cartItem.findFirst({
            where: {
                AND: [{
                    cart: {
                        userId: user.user._id
                    }
                }, { varientId: varid }]
            }, select: {
                qty: true,
                id: true,
                varient: {
                    select: {
                        mrp: true
                    }
                }
            }
        })
        console.log(cartItem)
        if (!cartItem) {
            return {
                qty:0
            }
            
        }

        return {
            qty:cartItem.qty
        }
        
    } catch (error) {
        console.log(error)
    }



}