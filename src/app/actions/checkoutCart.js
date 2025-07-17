"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import totalCartValue from "@/utils/totalCartValue"
import generateOrderId from "@/utils/generateOrderId"
import db from "@/utils/db"


export default async function checkOutCart() {
  const user = await getServerSession(authOptions)

  if (!user) {
    return { success: false, message: "Unauthorized" }
  }

 console.log(user.user._id)

  try {
  
    const userCart = await db.cart.findFirst({
      where: { userId: user.user._id },
      select: {
        cartItem: {
          select: {
            qty: true,
            varient: {
              select: {
                id: true,
                productId: true,
                slug: true,
                product: {
                  select: {
                    name: true,
                    slug: true,
                    category: {
                      select: { categoryName: true }
                    }
                  }
                },
                mrp: true,
                discount: true,
               
              }
            }
          }
        },
        refralDiscountAbsolute: true,
        referalCoins: true
      }
    })
    console.log(userCart,"user cart",user.user._id)

    if (!userCart || userCart.cartItem.length === 0) {
      return { success: false, message: "Cart is empty" }
    }

    const tax = {
        value :0
    }

    const varientIds = new Set()
    const varientMeta = []
   

    userCart.cartItem.forEach(item => {
      varientIds.add(item.varient.id)
      varientMeta.push(item)
    
    })

    const subTotal = totalCartValue(userCart)
    const taxValue = tax?.value || 0

    const order = await db.orders.create({
      data: {
        orderId: generateOrderId().toString(),
        customerId: user.user._id,
        varientIds: Array.from(varientIds),
        varientMeta: varientMeta,
        finalPrice: subTotal + (subTotal * taxValue / 100),
      },
      select: {
        orderId: true,
        finalPrice: true
      }
    })



    return {
      success: true,
      message: "Order initiated",
      order
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: error?.meta?.cause || "Internal server error"
    }
  }
}
