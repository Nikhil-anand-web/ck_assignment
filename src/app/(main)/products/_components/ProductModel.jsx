// components/ProductCard.jsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  const { name, description, thumbNail, varient,slug } = product;
  const discountedPrice = varient[0].mrp - (varient[0].mrp * varient[0].discount) / 100;


  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
      <Image
       width={100}
       height={100}
      layout="responsive"
        src={thumbNail}
        alt={name}
        className="h-48 w-full "
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

       <Link href={`/product-details/${slug}`}>
       <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-green-600">
              ₹{discountedPrice.toFixed(2).toString()}
            </p>
            <p className="text-sm text-gray-500 line-through">
              ₹{varient[0].mrp.toFixed(2).toString()}
            </p>
          </div>
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
            {varient[0].discount.toString()}% OFF
          </span>
        </div>
        </Link> 
      </div>
    </div>
  );
};

export default ProductCard;
