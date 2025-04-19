"use server"

import db from "@/utils/db"


export default async function getDashboardNumbers() {
    const numor = await db.orders.count({
        where: {
            paymentStatus: 1

        }
    })
    const varnum = await db.varient.count({
        
    })
    const pronum = await db.product.count({
        
    })
    const catnum = await db.category.count({
        
    })

    return {
        orders: numor,
        variants: varnum,
        products: pronum,
        categories: catnum,
    }

}