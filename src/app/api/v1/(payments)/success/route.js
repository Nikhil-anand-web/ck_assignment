// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  const body = await req.json();

  console.log(body)

  return NextResponse.redirect(`/`, 303);
}
