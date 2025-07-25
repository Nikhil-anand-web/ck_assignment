"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function OrderList({ orders }) {
    const rtr = useRouter()
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4"> Orders</h2>

      <Accordion type="single" collapsible className="w-full">
        {orders.map((order) => (
          <AccordionItem key={order.id} value={order.id}>
            <AccordionTrigger>
              <div className="flex flex-col text-left">
                <span className="font-semibold">Order ID: {order.orderId}</span>
                <span className="font-semibold">Customer Name: {order.CustomerMeta.fullName}</span>
                <span className="text-sm text-muted-foreground">
                  Total: ₹{order.finalPrice} | TXN: {order.paymentToken.TXNID}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4 mt-4">
                {order.varientMeta.map((item, idx) => (
                  <li
                    key={idx}
                    className="border p-3 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.varient.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.varient.size} | Qty: {item.qty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">MRP: ₹{item.varient.mrp}</p>
                      <p className="text-sm">Discount: {item.varient.discount}%</p>
                      <Button onClick={()=> rtr.push(`orders/details/${order.orderId}`)}>Details</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
