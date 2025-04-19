"use client"
import checkOutCart from '@/app/actions/checkoutCart'
import AddToCart from '@/components/client/AddToCart'
import { useRouter } from 'next/navigation'
import React from 'react'

const CartComp = ({ cartItems = [] }) => {
  const rtr = useRouter()

  const refresher = () => {
    rtr.refresh()
  }

  const handleProceed = async () => {
      try {
        const res =  await checkOutCart();
        rtr.push(`/checkout/${res.order.orderId}`)
        console.log(res)
        
      } catch (error) {
        
      }
  }

  const calculatePrice = (item) => {
    const { mrp, discount } = item.varient
    const discountedPrice = mrp - (mrp * discount / 100)
    return {
      totalMRP: mrp * item.qty,
      discountedPrice: discountedPrice * item.qty,
      discountAmount: (mrp - discountedPrice) * item.qty
    }
  }

  const totalMRP = cartItems.reduce((acc, item) => acc + calculatePrice(item).totalMRP, 0)
  const totalDiscount = cartItems.reduce((acc, item) => acc + calculatePrice(item).discountAmount, 0)
  const finalPrice = totalMRP - totalDiscount

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item, index) => {
          const { product, mrp, discount, size, id: varientId } = item.varient
          const { totalMRP, discountedPrice, discountAmount } = calculatePrice(item)

          return (
            <div key={index} className="p-4 border rounded-lg shadow-sm flex justify-between items-start gap-4">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">Size: {size}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
              <div className="text-right">
                <p className="text-sm line-through text-gray-400">₹{totalMRP}</p>
                <p className="text-lg font-bold text-green-600">₹{discountedPrice.toFixed(2)}</p>
                <p className="text-xs text-red-500">You save ₹{discountAmount.toFixed(2)}</p>
                <div className="flex gap-2 mt-2 justify-end">
                  <AddToCart refresher={refresher} varientId={varientId} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 border-t">
        <h4 className="text-xl font-semibold mb-2">Price Summary</h4>
        <div className="flex justify-between text-sm mb-1">
          <span>Total MRP:</span>
          <span>₹{totalMRP.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-1 text-red-600">
          <span>Total Discount:</span>
          <span>-₹{totalDiscount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold mt-2">
          <span>Final Price:</span>
          <span>₹{finalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={handleProceed}
          className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default CartComp
