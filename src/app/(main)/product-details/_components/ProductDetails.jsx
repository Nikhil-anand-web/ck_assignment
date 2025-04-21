
"use client"
import AddToCart from "@/components/client/AddToCart";
import Image from "next/image";
import React, { useState } from "react";
const ProductDetails = ({ product }) => {
  product = JSON.parse(product)
  console.log(product)
    const [selectedVarient, setSelectedVarient] = useState(product.varient[0]);
  
    const finalPrice = (mrp, discount) =>
      (mrp - (mrp * discount) / 100).toFixed(2);
  
    return (
      <div className="flex flex-col md:flex-row gap-8 p-6">

        <div className="w-full md:w-1/2 h-80 relative">
  <Image
    src={product.thumbNail}
    alt={product.name}
    fill
    className="object-contain rounded-lg border shadow-sm"
  />
</div>
  
   
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
  
      
          <div className="space-y-2">
            <h2 className="font-semibold">Choose a size:</h2>
            <div className="flex gap-3">
              {product.varient.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVarient(v)}
                  className={`px-4 py-2 rounded border transition ${
                    selectedVarient.id === v.id
                      ? "bg-[#0da487] text-white border-[#0da487]"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>
  
        
          <div className="space-y-1">
            <div className="text-xl font-semibold text-[#0da487]">
              ₹{finalPrice(selectedVarient.mrp, selectedVarient.discount)}
            </div>
            {selectedVarient.discount > 0 && (
              <div className="text-sm text-gray-500 line-through">
                ₹{selectedVarient.mrp}
              </div>
            )}
            {selectedVarient.discount > 0 && (
              <div className="text-sm text-green-600">
                {selectedVarient.discount}% off
              </div>
            )}
          </div>
  
          <div className="flex gap-4 mt-4">
            <AddToCart varientId={selectedVarient.id}/>
           
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductDetails;