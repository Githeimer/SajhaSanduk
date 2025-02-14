// app/api/payment/initialize-esewa/route.ts

import { NextResponse } from 'next/server';
import { prepareEsewaPayment } from '@/lib/esewa';
import { PaymentInitialization } from '@/app/types/payment';

export async function POST(request: Request) {
  try {
    const body: PaymentInitialization = await request.json();
    
    // Log the incoming request for debugging
    console.log('Payment initialization request:', body);

    if (!body.total || typeof body.total !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Invalid amount format' },
        { status: 400 }
      );
    }

    // Generate a unique transaction ID
    const transactionId = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    try {
      // Prepare eSewa payment data with validation
      const paymentData = prepareEsewaPayment(
        body.total,
        transactionId,
        0,  // shipping charge
        0,  // service charge
        0   // tax amount
      );

      // Return the payment URL and data
      return NextResponse.json({
        success: true,
        payment_url: `${process.env.NEXT_PUBLIC_ESEWA_GATEWAY_URL}/api/epay/main/v2/form`,
        payment_data: paymentData
      });

    } catch (error) {
      // Handle validation errors
      return NextResponse.json(
        { 
          success: false, 
          message: error instanceof Error ? error.message : 'Payment initialization failed',
          code: 'ES705'
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during payment initialization',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}