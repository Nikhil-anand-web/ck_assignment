"use client"
import decreaseVarientInCart from '@/app/actions/decreaseVarientInCart'
import getNoOfVarient from '@/app/actions/getNoOfVarient'
import increateVarientInCart from '@/app/actions/increateVarientInCart'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'

const AddToCart = ({ varientId, initialQty = 0, refresher = null }) => {
    const [quantity, setQuantity] = useState(initialQty)
    const { mutate } = useSWRConfig()


    useEffect(() => {
        const fetch = async () => {
            const res = await getNoOfVarient(varientId);
            console.log(res, "gjuiof")
            setQuantity(() => res.qty)

        }
        fetch()
    }, [])

    const handleIncrement = async () => {
        try {
            const res = await increateVarientInCart({ varientId })
            if (refresher) {
                refresher()


            }
            if (!res.success) throw res
            setQuantity(prev => prev + 1)
            mutate('/action/getCartCount')
            
        } catch (error) {
            toast.warning(error.message || "Failed to increase quantity")
        }
    }

    const handleDecrement = async () => {
        try {


            const res = await decreaseVarientInCart({ varientId })
            if (refresher) {
                refresher()


            }
            if (!res.success) throw res
            setQuantity(prev => prev - 1)
            mutate('/action/getCartCount')
        } catch (error) {
            toast.warning(error.message || "Failed to decrease quantity")
        }
    }

    if (quantity === 0) {
        return <button
            onClick={handleIncrement}
            className="bg-[#c4e413] text-white px-6 py-2 rounded hover:opacity-90 transition"
        >
            Add to Cart
        </button>

    }

    return (
        <div className="flex items-center space-x-3">
            <button
                onClick={handleDecrement}

                className="bg-gray-200 px-3 py-1 rounded text-xl hover:bg-gray-300 disabled:opacity-50"
            >
                −
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
                onClick={handleIncrement}
                className="bg-gray-200 px-3 py-1 rounded text-xl hover:bg-gray-300"
            >
                +
            </button>
        </div>
    )
}

export default AddToCart
