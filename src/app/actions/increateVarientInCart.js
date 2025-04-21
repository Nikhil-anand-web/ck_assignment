"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"


export default async function increateVarientInCart({ varientId }) {
    const user = await getServerSession(authOptions)
    if (!user) {
       return redirect('/sign-in')

    }
    try {
        
        const cartItem = await db.cartItem.findFirst({
            where: {
                AND: [{
                    cart: {
                        userId: user.user._id
                    }
                }, { varientId: varientId }]
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
          
      
        if (cartItem) {

            await db.cartItem.update({
                where: { id: cartItem.id },
                data: {
                    qty: { increment: 1 }
                }
            })
        } else {
        
            const cart = await db.cart.findFirst({
                where: { userId: user.user._id },
                select: { id: true }
            })

            if (!cart) {
                throw new Error("Cart not found for user")
            }

          
            await db.cartItem.create({
                data: {
                    qty: 1,
                    varient: {
                        connect: { id: varientId }
                    },
                    cart: {
                        connect: { id: cart.id }
                    }
                }
            })
        }

        return{
            success:true,
            message:"success"
        }


    } catch (error) {
        console.log(error)
        return{
            success:false,
            message:"faild"
        }

    }

}