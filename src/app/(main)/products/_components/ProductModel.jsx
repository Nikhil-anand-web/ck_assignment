"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { name, description, thumbNail, varient, slug } = product;

  const discountedPrice =
    varient[0].mrp - (varient[0].mrp * varient[0].discount) / 100;

  const handleClick = () => {
    router.push(`/product-details/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm cursor-pointer"
    >
      <Image
        width={100}
        height={100}
        layout="responsive"
        src={thumbNail}
        alt={name}
        className="h-48 w-full"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <ul className="list-disc ml-6">
          {product.pointsDescription.map((obj, idx) => (
            <li key={idx}>{obj}</li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-green-600">
              ₹{discountedPrice}
            </p>
            <p className="text-sm text-gray-500 line-through">
              ₹{varient[0].mrp}
            </p>
          </div>
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
            {varient[0].discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
