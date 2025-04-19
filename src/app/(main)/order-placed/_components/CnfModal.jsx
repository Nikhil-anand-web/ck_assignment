'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function CnfModal({orderIdL}) {
  
  const router = useRouter();

  const [orderId, setOrderId] = useState(orderIdL);

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-xl w-full text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully.
        </p>
        {orderId && (
          <p className="text-gray-800 font-medium mb-4">
            <span className="font-semibold">Order ID:</span> #{orderId}
          </p>
        )}

        <div className="border-t pt-4 mt-4 text-sm text-gray-500">
          You will receive an email confirmation shortly.
        </div>

        <button
          className="mt-6 bg-[#0da487] text-white px-6 py-2 rounded-full hover:bg-[#0b9476] transition"
          onClick={() => router.push('/')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
