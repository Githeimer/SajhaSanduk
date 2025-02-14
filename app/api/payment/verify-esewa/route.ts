// app/api/payment/verify-esewa/route.ts

import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET_KEY = process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q';

interface EsewaResponse {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
  [key: string]: string;
}

interface VerificationResult {
  isValid: boolean;
  details: {
    signatureString: string;
    calculatedSignature: string;
    receivedSignature: string;
  };
}

function generateVerificationSignature(responseData: EsewaResponse): VerificationResult {
  try {
    // Get the signed fields, but exclude 'signed_field_names' from signature calculation
    const signedFields: string[] = responseData.signed_field_names
      .split(',')
      .filter((field: string) => field !== 'signed_field_names');
    
    // Create signature string without the signed_field_names field
    const signatureString: string = signedFields
      .map((field: string): string => `${field}=${responseData[field]}`)
      .join(',');

    console.log('Fields used for signature:', signedFields);
    console.log('Signature string:', signatureString);

    const calculatedSignature: string = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(signatureString)
      .digest('base64');

    return {
      isValid: calculatedSignature === responseData.signature,
      details: {
        signatureString,
        calculatedSignature,
        receivedSignature: responseData.signature
      }
    };
  } catch (error) {
    console.error('Signature generation error:', error);
    return {
      isValid: false,
      details: {
        signatureString: '',
        calculatedSignature: '',
        receivedSignature: responseData.signature || ''
      }
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.data) {
      console.error('Missing payment data in request');
      return NextResponse.json(
        { success: false, message: 'Payment data is required' },
        { status: 400 }
      );
    }

    // Decode and parse the response data
    const decodedString: string = Buffer.from(body.data, 'base64').toString('utf-8');
    console.log('Decoded eSewa response:', decodedString);

    const responseData: EsewaResponse = JSON.parse(decodedString);
    console.log('Parsed response data:', responseData);

    // Verify the signature
    const verificationResult: VerificationResult = generateVerificationSignature(responseData);
    
    console.log('Verification details:', {
      fieldsUsed: responseData.signed_field_names.split(','),
      signatureString: verificationResult.details.signatureString,
      calculatedSignature: verificationResult.details.calculatedSignature,
      receivedSignature: verificationResult.details.receivedSignature,
      isValid: verificationResult.isValid
    });

    if (!verificationResult.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid payment signature',
          details: verificationResult.details
        },
        { status: 400 }
      );
    }

    // Additional verification checks
    if (responseData.status !== 'COMPLETE') {
      return NextResponse.json(
        { 
          success: false, 
          message: `Payment status is ${responseData.status}`,
          details: { status: responseData.status }
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        transactionCode: responseData.transaction_code,
        amount: responseData.total_amount,
        status: responseData.status,
        transactionId: responseData.transaction_uuid
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment verification failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}