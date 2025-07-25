import db from '@/utils/db'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const page = async ({ params }) => {
    const order = await db.orders.findUnique({
        where: {
            orderId: (await params).orderId
        }
    })
    console.log(order.varientMeta)
    return (
        <div className="min-h-screen flex justify-center pt-12 px-4 bg-gray-50">
            <Tabs defaultValue="Overview" className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-md">
                <TabsList className="flex gap-2 w-full overflow-x-auto mb-4">
                    <TabsTrigger value="Overview">Overview</TabsTrigger>
                    <TabsTrigger value="cd">Customer Details</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="items">Items</TabsTrigger>
                </TabsList>
                <TabsContent value="Overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Order ID</span>
                            <span className="font-medium text-lg text-gray-900">{order?.orderId}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Price</span>
                            <span className="font-medium text-lg text-gray-900">{order?.finalPrice || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Db Id</span>
                            <span className="font-medium text-lg text-gray-900">{order?.id || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Order Date</span>
                            <span className="font-medium text-lg text-gray-900">{order?.createdAt.toString() || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Payment Status</span>
                            <span className="font-medium text-lg text-gray-900">{order?.paymentStatus || "N/A"}</span>
                        </div>
                        {/* Add more key-value pairs here */}
                    </div>
                </TabsContent>

                <TabsContent value="cd">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Customer Name</span>
                            <span className="font-medium text-lg text-gray-900">{order?.CustomerMeta.fullName || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Phone</span>
                            <span className="font-medium text-lg text-gray-900">{order?.CustomerMeta.phone || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Address</span>
                            <span className="font-medium text-lg text-gray-900">{order?.CustomerMeta.address || "N/A"}</span>
                        </div>
                        {/* More fields */}
                    </div>
                </TabsContent>

                <TabsContent value="payments">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm"></span>
                            <span className="font-medium text-lg text-gray-900">{order?.paymentToken.TXNID || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Status</span>
                            <span className="font-medium text-lg text-gray-900">{order?.paymentToken.STATUS || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Currency</span>
                            <span className="font-medium text-lg text-gray-900">{order?.paymentToken.CURRENCY || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Bank Txn Id</span>
                            <span className="font-medium text-lg text-gray-900">{order?.paymentToken.BANKTXNID || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Txn Amount</span>
                            <span className="font-medium text-lg text-gray-900">{order?.paymentToken.TXNAMOUNT || "N/A"}</span>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="items">
                    {/* Items List */}
                    <div className="space-y-4 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Items</h2>
                        {order?.varientMeta?.length > 0 ? (
                            order.varientMeta.map((item, idx) => (
                                <div key={idx} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Item Name:</span>
                                        <span className="font-semibold">{item.varient.product.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Quantity:</span>
                                        <span>{item.qty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Price:</span>
                                        <span>₹{item.varient.mrp}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discount:</span>
                                        <span>₹{item.varient.discount}%</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No items found.</p>
                        )}
                    </div>

                    

                   
                </TabsContent>


            </Tabs>
        </div>
    )
}

export default page
