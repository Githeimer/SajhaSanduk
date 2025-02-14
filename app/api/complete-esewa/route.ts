import { NextResponse, NextRequest } from 'next/server';

import PurchasedItem from '@/models/PurchasedItem';
import Payment from '@/models/Payment';
import crypto from 'crypto';
import { EsewaSuccessResponse } from '@/types/esewa';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const data = request.nextUrl.searchParams.get('data');
    if (!data) throw new Error('No payment data received');

    // Verify payment
    const decodedData = JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    ) as EsewaSuccessResponse;

    // Validate signature
    const secret = process.env.ESEWA_SECRET!;
    const signature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(decodedData.signed_order))
      .digest('base64');

    if (signature !== decodedData.signature) {
      throw new Error('Invalid payment signature');
    }

    // Update purchase record
    const purchasedItem = await PurchasedItem.findByIdAndUpdate(
      decodedData.signed_order.transaction_uuid,
      { status: 'completed' },
      { new: true }
    );

    if (!purchasedItem) {
      throw new Error('Transaction not found');
    }

    // Create payment record
    await Payment.create({
      pidx: decodedData.signed_order.transaction_uuid,
      transactionId: decodedData.signed_order.transaction_uuid,
      productId: purchasedItem._id,
      amount: purchasedItem.totalPrice,
      paymentGateway: 'esewa',
      status: 'success',
      rawData: decodedData,
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-success`);
    
  } catch (error) {
    console.error('Esewa completion error:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment-error`);
  }
}