// app/api/payment/initialize-esewa/route.ts

import { NextResponse } from 'next/server';
import { prepareEsewaPayment } from '@/lib/esewa';
import { PaymentInitialization } from '@/app/types/payment';

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body: PaymentInitialization = await request.json();
    
    if (!body.items || !body.total) {
      return NextResponse.json(
        { success: false, message: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Validate the payment amount
    if (body.total < 10 || body.total > 100000) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    // Generate a unique transaction ID
    const transactionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare eSewa payment data
    const paymentData = prepareEsewaPayment(
      body.total,
      transactionId,
      0, // shipping charge
      0, // service charge
      0  // tax amount
    );

    // Return the payment URL and data
    return NextResponse.json({
      success: true,
      payment_url: `${process.env.NEXT_PUBLIC_ESEWA_GATEWAY_URL}/api/epay/main/v2/form`,
      payment_data: paymentData
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment initialization failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}