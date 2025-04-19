import React from 'react'
import CartComp from './_components/CartComp'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
export const dynamic = 'force-dynamic';
const page = async () => {
    const user = await getServerSession(authOptions)
    if (!user) {
        redirect('/sign-in')

    }
    const cartItems = await db.cartItem.findMany({
        where: {
            AND: [{
                cart: {
                    userId: user.user._id
                }
            }]
        }, select: {
            qty: true,
            id: true,
            varient: {
                select: {
                    mrp: true,
                    id: true,
                    discount: true,
                    size: true,
                    product: {

                        select: {
                            name: true,

                        }

                    }

                }
            }
        }
    })


    return (
        <div>
            <CartComp cartItems={cartItems} />

        </div>
    )
}

export default page
