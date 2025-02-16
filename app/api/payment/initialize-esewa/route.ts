// app/api/payment/initialize-esewa/route.ts

import { NextResponse } from 'next/server';
import { prepareEsewaPayment } from '@/lib/esewa';
import { PaymentInitialization } from '@/app/types/payment';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Received payment request:', body);

    // Validate the request body
    if (!body.total || typeof body.total !== 'number') {
      console.error('Invalid total amount:', body.total);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid amount format',
          details: 'Total amount must be a number'
        },
        { status: 400 }
      );
    }

    // Round the amount to 2 decimal places
    const amount = Number(body.total.toFixed(2));

    // Validate amount range
    if (amount < 10 || amount > 100000) {
      console.error('Amount out of range:', amount);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid amount',
          details: 'Amount must be between 10 and 100,000 NPR'
        },
        { status: 400 }
      );
    }

    // Generate a unique transaction ID
    const transactionId = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    try {
      // Prepare eSewa payment data
      const paymentData = prepareEsewaPayment(
        amount,
        transactionId,
        0,  // shipping
        0,  // service charge
        0   // tax
      );

      console.log('Generated payment data:', paymentData);

      return NextResponse.json({
        success: true,
        payment_url: `${process.env.NEXT_PUBLIC_ESEWA_GATEWAY_URL}/api/epay/main/v2/form`,
        payment_data: paymentData
      });

    } catch (error) {
      console.error('Payment preparation error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: error instanceof Error ? error.message : 'Payment preparation failed'
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}