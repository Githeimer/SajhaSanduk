import { NextResponse } from 'next/server';
import PurchasedItem from '@/models/PurchasedItem';
import crypto from 'crypto';
import { EsewaInitRequest, EsewaPaymentParams } from '@/types/esewa';

export async function POST(request: Request) {
  await connectDB();

  try {
    const { itemId, totalPrice } = (await request.json()) as EsewaInitRequest;

    // Validate item
    const itemExists = await Item.exists({ _id: itemId, price: totalPrice });
    if (!itemExists) {
      return NextResponse.json(
        { success: false, message: 'Item not found or price mismatch' },
        { status: 400 }
      );
    }

    // Create purchase record
    const purchasedItem = await PurchasedItem.create({
      item: itemId,
      paymentMethod: 'esewa',
      totalPrice,
      status: 'pending',
    });

    // Generate payment parameters
    const paymentParams: EsewaPaymentParams = {
      amount: totalPrice.toString(),
      tax_amount: '0',
      total_amount: totalPrice.toString(),
      transaction_uuid: purchasedItem._id.toString(),
      product_code: 'EPAYTEST',
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      success_url: `${process.env.NEXTAUTH_URL}/api/complete-esewa`,
      failure_url: `${process.env.NEXTAUTH_URL}/payment-failed`,
    };

    // Generate signature
    const signatureData = paymentParams.signed_field_names
      .split(',')
      .map(field => `${field}=${paymentParams[field as keyof EsewaPaymentParams]}`)
      .join(',');

    const secret = process.env.ESEWA_SECRET!;
    paymentParams.signature = crypto
      .createHmac('sha256', secret)
      .update(signatureData)
      .digest('base64');

    return NextResponse.json({
      success: true,
      esewaUrl: process.env.ESEWA_API_URL,
      paymentParams,
      purchasedItem,
    });

  } catch (error) {
    console.error('Esewa initialization error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}