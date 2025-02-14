// app/api/payment/check-status/route.ts

import { NextResponse } from 'next/server';
import { checkEsewaPaymentStatus, pollPaymentStatus } from '@/lib/esewa';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request parameters
    if (!body.transactionUuid || !body.totalAmount) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required parameters'
        },
        { status: 400 }
      );
    }

    // First try a single status check
    const status = await checkEsewaPaymentStatus({
      productCode: process.env.NEXT_PUBLIC_ESEWA_PRODUCT_CODE || 'EPAYTEST',
      transactionUuid: body.transactionUuid,
      totalAmount: body.totalAmount
    });

    // If the payment is still pending, start polling
    if (status.status === 'PENDING') {
      const finalStatus = await pollPaymentStatus({
        productCode: process.env.NEXT_PUBLIC_ESEWA_PRODUCT_CODE || 'EPAYTEST',
        transactionUuid: body.transactionUuid,
        totalAmount: body.totalAmount,
        maxAttempts: 5,
        initialDelay: 2000
      });

      return NextResponse.json({
        success: true,
        data: finalStatus
      });
    }

    // Return the initial status if it's not pending
    return NextResponse.json({
      success: true,
      data: status
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Status check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}