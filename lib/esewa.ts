// lib/esewa.ts

import crypto from 'crypto';
import { EsewaPaymentRequest } from '@/app/types/payment';



export interface EsewaConfig {
    gatewayUrl: string;
    productCode: string;
    secretKey: string;
    successUrl: string;
    failureUrl: string;
  }
  
  // Create and export the configuration object
  export const esewaConfig: EsewaConfig = {
    gatewayUrl: process.env.NEXT_PUBLIC_ESEWA_GATEWAY_URL || 'https://rc-epay.esewa.com.np',
    productCode: process.env.NEXT_PUBLIC_ESEWA_PRODUCT_CODE || 'EPAYTEST',
    secretKey: process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q',
    successUrl: process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/payment/success` 
      : 'http://localhost:3000/payment/success',
    failureUrl: process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure` 
      : 'http://localhost:3000/payment/failure',
  };

// Validation helper function
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

function validateAmount(amount: number): ValidationResult {
  // Check if amount is a valid number
  if (isNaN(amount) || !isFinite(amount)) {
    return { isValid: false, error: 'Invalid amount format' };
  }

  // Check minimum amount (10 NPR)
  if (amount < 10) {
    return { isValid: false, error: 'Amount must be at least 10 NPR' };
  }

  // Check maximum amount (100,000 NPR)
  if (amount > 100000) {
    return { isValid: false, error: 'Amount cannot exceed 100,000 NPR' };
  }

  return { isValid: true };
}

// Amount formatting helper
function formatEsewaAmount(amount: number): string {
  return Number(amount).toFixed(2);
}

// Enhanced payment preparation function
export function prepareEsewaPayment(
  amount: number,
  transactionId: string,
  shippingCharge: number = 0,
  serviceCharge: number = 0,
  taxAmount: number = 0
): EsewaPaymentRequest {
  // Calculate total amount
  const totalAmount = amount + shippingCharge + serviceCharge + taxAmount;
  
  // Validate total amount
  const validation = validateAmount(totalAmount);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Format amounts properly
  const formattedAmount = formatEsewaAmount(amount);
  const formattedTotal = formatEsewaAmount(totalAmount);
  const formattedTax = formatEsewaAmount(taxAmount);
  const formattedService = formatEsewaAmount(serviceCharge);
  const formattedShipping = formatEsewaAmount(shippingCharge);

  // Generate signature data
  const signatureData = `total_amount=${formattedTotal},transaction_uuid=${transactionId},product_code=${esewaConfig.productCode}`;
  const signature = crypto
    .createHmac('sha256', esewaConfig.secretKey)
    .update(signatureData)
    .digest('base64');

  // Log the payment details for debugging
  console.log('Payment Details:', {
    amount: formattedAmount,
    totalAmount: formattedTotal,
    signatureData,
    signature
  });

  return {
    amount: formattedAmount,
    tax_amount: formattedTax,
    total_amount: formattedTotal,
    transaction_uuid: transactionId,
    product_code: esewaConfig.productCode,
    product_service_charge: formattedService,
    product_delivery_charge: formattedShipping,
    success_url: esewaConfig.successUrl,
    failure_url: esewaConfig.failureUrl,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: signature
  };
}

// Verify eSewa payment response
export function verifyEsewaSignature(encodedData: string): boolean {
    try {
      // Decode base64 response
      const decodedString = Buffer.from(encodedData, 'base64').toString('utf-8');
      console.log('Decoded eSewa Response:', decodedString);
      
      const responseData = JSON.parse(decodedString) as {
        [key: string]: string;  // Index signature for dynamic field access
        signed_field_names: string;
        signature: string;
      };
      console.log('Parsed Response Data:', responseData);
      
      // Get signed fields in correct order
      const signedFields = responseData.signed_field_names.split(',');
      
      // Create verification string with proper typing
      const verificationString = signedFields
        .map((field: string) => {
          // Ensure the field exists in responseData
          if (!(field in responseData)) {
            throw new Error(`Missing required field: ${field}`);
          }
          return `${field}=${responseData[field]}`;
        })
        .join(',');
        
      console.log('Verification String:', verificationString);
      
      // Generate verification signature
      const calculatedSignature = crypto
        .createHmac('sha256', esewaConfig.secretKey)
        .update(verificationString)
        .digest('base64');
        
      console.log('Calculated Signature:', calculatedSignature);
      console.log('Received Signature:', responseData.signature);
      
      return calculatedSignature === responseData.signature;
    } catch (error) {
      console.error('Verification Error:', error);
      return false;
    }
  }