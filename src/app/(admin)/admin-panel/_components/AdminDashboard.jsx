"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaBox, FaListAlt, FaShoppingCart, FaTags } from "react-icons/fa";
import getDashboardNumbers from "@/app/actions/getDashboardNumbers";

export default function AdminDashboard() {
  const [data, setData] = useState({
    orders: 0,
    variants: 0,
    products: 0,
    categories: 0,
  });

  
  useEffect(() => {
  
    const fetchData = async () => {
     
       const res = await getDashboardNumbers()
       console.log(res)
      setData(res );
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Orders",
      count: data.orders,
      icon: <FaShoppingCart className="text-2xl text-blue-600" />,
    },
    {
      title: "Variants",
      count: data.variants,
      icon: <FaTags className="text-2xl text-green-600" />,
    },
    {
      title: "Products",
      count: data.products,
      icon: <FaBox className="text-2xl text-purple-600" />,
    },
    {
      title: "Categories",
      count: data.categories,
      icon: <FaListAlt className="text-2xl text-yellow-500" />,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="shadow-lg rounded-xl">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              {card.icon}
              <p className="text-lg font-medium">{card.title}</p>
              <p className="text-2xl font-bold">{card.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
