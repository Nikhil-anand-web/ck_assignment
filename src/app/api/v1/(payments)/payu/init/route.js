// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  const body = await req.json();

  const key = process.env.PAYU_KEY;
  const salt = process.env.PAYU_SALT; // 32-bit salt

  const txnid = `txn_${Date.now()}`;
  const surl = 'https://localhost:3000/v1/success';
  const furl = 'https://localhost:3000/failure';

  const productinfo = "services";
  const firstname = body.fullName;
  const email = body.email;

  // Correct 15-pipe format (udf1 to udf10 — 5 blanks for udf1-5 + 5 blanks)
  const hashString = `${key}|${txnid}|${body.amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;

  const hash = crypto.createHash('sha512').update(hashString).digest('hex');

  return NextResponse.json({
    payu_url: 'https://test.payu.in/_payment',
    params: {
      key,
      txnid,
      amount: body.amount,
      orderId: body.orderId,
      productinfo,
      firstname,
      email,
      phone: body.phone,
      surl,
      furl,
      hash,
      service_provider: 'payu_paisa',
    },
  });
}
