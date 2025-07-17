
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import db from '@/utils/db';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytmchecksum';

export async function POST(req) {
  const reqObj = await req.json();
  const user = await getServerSession(authOptions);
  console.log(reqObj)

  try {
    const updatedOrder = await db.orders.update({
      where: {
        orderId: reqObj.orderId,
        AND: [{ customerId: user.user._id }],
      },
      data:{
        CustomerMeta:reqObj.CustomerMeta
      }
    });

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const paytmParams = {
      MID: process.env.NEXT_PUBLIC_PAYTM_MID,
      ORDER_ID: updatedOrder.orderId,
      CUST_ID: updatedOrder.customerId,
      INDUSTRY_TYPE_ID: process.env.NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE_ID,
      CHANNEL_ID: process.env.NEXT_PUBLIC_PAYTM_CHANNEL_ID,
      TXN_AMOUNT:process.env.APP_ENV !== 'TEST' ? '1' : Math.round(updatedOrder.finalPrice).toString(),
      WEBSITE: process.env.NEXT_PUBLIC_PAYTM_WEBSITE,
      CALLBACK_URL: process.env.NEXT_PUBLIC_PAYTM_CALLBACK_URL,
      MOBILE_NO: reqObj.CustomerMeta.phone,
      EMAIL: updatedOrder.CustomerMeta.email || 'no email present',
    };

    console.log(paytmParams);

    const paytmChecksum = await PaytmChecksum.generateSignature(
      paytmParams,
      process.env.PAYTM_MERCHANT_KEY
    );

    paytmParams['CHECKSUMHASH'] = paytmChecksum;

    return NextResponse.json(
      {
        success: true,
        url: `https://${process.env.PAYTM_ENVIRONMENT === 'TEST' ? 'securegw-stage' : 'securegw'
          }.paytm.in/order/process`,
        params: paytmParams,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
      },
      { status: 400 }
    );
  }
}
