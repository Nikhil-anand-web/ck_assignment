

import db from "@/utils/db";
import updateStockAfterOrder from "@/utils/updateStockAfterOrder";

import { NextResponse } from "next/server";
import PaytmChecksum from 'paytmchecksum';



const parseUrlEncodedBody = async (req) => {
    const data = await req.text(); // Read raw body data
    const params = new URLSearchParams(data);
    return Object.fromEntries(params.entries());
};

export async function POST(req) {
    const reqObj = await parseUrlEncodedBody(req);
    console.log("Request Object:", reqObj); // Debugging the parsed request object

    try {
        const isValidChecksum = PaytmChecksum.verifySignature(
            reqObj,
            process.env.PAYTM_MERCHANT_KEY,
            reqObj.CHECKSUMHASH
        );
        console.log("Is valid checksum:", isValidChecksum);

        if (isValidChecksum) {
            const { CURRENCY, RESPMSG, STATUS, TXNAMOUNT, TXNID, CHECKSUMHASH } = reqObj;
            const tokenObj = {
                BANKTXNID: reqObj.BANKTXNID || null,
                CURRENCY,
                RESPMSG,
                STATUS,
                TXNAMOUNT,
                TXNID,
                CHECKSUMHASH
            };
            console.log("Token Object:", tokenObj);

            if (tokenObj.STATUS === 'TXN_SUCCESS') {
                const updatedOrder = await db.orders.update({
                    where: {
                        orderId: reqObj.ORDERID,
                    },
                    data: {
                        paymentToken: tokenObj,
                        paymentStatus: 1,
                    }
                });
                console.log("Updated Order:", updatedOrder);
 
                const cartId = await db.cart.findFirst({
                    where: { userId: updatedOrder.customerId },
                    select: { id: true }
                });
                console.log("Cart ID:", cartId);

                await db.cartItem.deleteMany({ where: { cartId: cartId.id } });
                


                updateStockAfterOrder(updatedOrder.orderId);
                console.log(tokenObj)
                
               
                return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/order-placed/${updatedOrder.orderId}`, 303);
            } 
            
            
        } else {
            console.log("Invalid checksum");
            return NextResponse.json({ success: false, message: "Payment is not valid" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`, 303);
    }
}
// sendOrderConf