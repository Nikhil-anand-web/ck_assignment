"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import db from "@/utils/db" // Assuming this is missing
import { redirect } from "next/navigation"

export default async function decreaseVarientInCart({ varientId }) {
    const user = await getServerSession(authOptions);

    if (!user) {
       return redirect('/sign-in');
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


        if (!cartItem) {
            return {
                success: false,
                message: "Item not found"
            };
        }

        if (cartItem.qty === 1) {
          
            await db.cartItem.delete({
                where: { id: cartItem.id }
            });
        } else {
            
            await db.cartItem.update({
                where: { id: cartItem.id },
                data: {
                    qty: { decrement: 1 }
                }
            });
        }

        return {
            success: true,
            message: "Cart updated"
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to update cart"
        };
    }
}
