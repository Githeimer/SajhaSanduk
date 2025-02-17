// lib/esewa.ts

import crypto from 'crypto';
import axios from 'axios';
import { EsewaPaymentRequest } from '@/app/types/payment';

// Configuration interface defines the required settings for eSewa integration
export interface EsewaConfig {
  gatewayUrl: string;      // Base URL for eSewa API
  productCode: string;     // Merchant's product code from eSewa
  secretKey: string;       // Secret key for generating signatures
  successUrl: string;      // URL for successful payments
  failureUrl: string;      // URL for failed payments
}

// Create and export configuration with fallback values for development
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

// Define all possible payment status values from eSewa
export type EsewaPaymentStatus = 'COMPLETE' | 'PENDING' | 'FAILURE' | 'CANCELED' | 'NOT_FOUND';

// Interface defining the structure of eSewa's status check response
export interface StatusCheckResponse {
  product_code: string;
  transaction_uuid: string;
  total_amount: number;
  status: EsewaPaymentStatus;
  ref_id?: string;        // Optional reference ID for successful payments
}

// Parameters required for checking payment status
export interface StatusCheckParams {
  productCode: string;
  transactionUuid: string;
  totalAmount: number;
}

// Helper function to ensure consistent amount formatting
// All amounts must have exactly 2 decimal places
function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

// Validates payment amounts according to eSewa's requirements
// Throws descriptive errors if validation fails
function validatePaymentAmount(amount: number): void {
  if (isNaN(amount) || !isFinite(amount)) {
    throw new Error('Invalid amount format');
  }
  // eSewa requires minimum amount of 10 NPR
  if (amount < 10) {
    throw new Error('Amount must be at least 10 NPR');
  }
  // eSewa's maximum transaction limit
  if (amount > 100000) {
    throw new Error('Amount cannot exceed 100,000 NPR');
  }
}

// Generates HMAC signature for payment verification
// Uses SHA256 algorithm as required by eSewa
function generatePaymentSignature(
  totalAmount: string,
  transactionUuid: string,
  productCode: string
): string {
  // Create signature string in exact format required by eSewa
  const signatureString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  console.log('Generating signature for:', signatureString);
  
  // Generate HMAC SHA256 signature with base64 encoding
  const signature = crypto
    .createHmac('sha256', esewaConfig.secretKey)
    .update(signatureString)
    .digest('base64');

  console.log('Generated signature:', signature);
  return signature;
}

// Main function to prepare payment request data for eSewa
export function prepareEsewaPayment(
  amount: number,
  transactionId: string,
  shippingCharge: number = 0,
  serviceCharge: number = 0,
  taxAmount: number = 0
): EsewaPaymentRequest {
  try {
    // Validate all input amounts
    validatePaymentAmount(amount);
    if (shippingCharge) validatePaymentAmount(shippingCharge);
    if (serviceCharge) validatePaymentAmount(serviceCharge);
    if (taxAmount) validatePaymentAmount(taxAmount);

    // Calculate and validate total amount
    const totalAmount = amount + shippingCharge + serviceCharge + taxAmount;
    validatePaymentAmount(totalAmount);

    // Format all amounts to ensure consistency
    const formattedAmount = formatAmount(amount);
    const formattedTotal = formatAmount(totalAmount);
    const formattedTax = formatAmount(taxAmount);
    const formattedService = formatAmount(serviceCharge);
    const formattedShipping = formatAmount(shippingCharge);

    // Generate signature for payment verification
    const signature = generatePaymentSignature(
      formattedTotal,
      transactionId,
      esewaConfig.productCode
    );

    // Return properly formatted payment request object
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
  } catch (error) {
    console.error('Error preparing eSewa payment:', error);
    throw error;
  }
}

// Function to check payment status with eSewa's status API
export async function checkEsewaPaymentStatus({
  productCode,
  transactionUuid,
  totalAmount
}: StatusCheckParams): Promise<StatusCheckResponse> {
  try {
    // Use appropriate URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://epay.esewa.com.np'
      : 'https://rc.esewa.com.np';

    // Construct status check URL with required parameters
    const url = `${baseUrl}/api/epay/transaction/status/?product_code=${productCode}&total_amount=${totalAmount}&transaction_uuid=${transactionUuid}`;
    console.log('Checking payment status at:', url);

    // Make the API request and return response
    const response = await axios.get(url);
    console.log('Status check response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Payment status check failed:', error);
    throw error;
  }
}

// Function to repeatedly check payment status with exponential backoff
export async function pollPaymentStatus({
  productCode,
  transactionUuid,
  totalAmount,
  maxAttempts = 5,         // Default to 5 attempts
  initialDelay = 2000      // Start with 2 second delay
}: StatusCheckParams & { 
  maxAttempts?: number; 
  initialDelay?: number 
}): Promise<StatusCheckResponse> {
  let attempts = 0;
  let delay = initialDelay;

  while (attempts < maxAttempts) {
    try {
      console.log(`Attempt ${attempts + 1} of ${maxAttempts} to check payment status`);
      
      const status = await checkEsewaPaymentStatus({
        productCode,
        transactionUuid,
        totalAmount
      });

      // Return immediately for final statuses
      if (['COMPLETE', 'FAILURE', 'CANCELED'].includes(status.status)) {
        return status;
      }

      // Wait before next attempt if payment is still pending
      console.log(`Payment still pending. Waiting ${delay}ms before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Double the delay for next attempt (exponential backoff)
      delay *= 2;
      attempts++;
    } catch (error) {
      console.error(`Status check attempt ${attempts + 1} failed:`, error);
      
      // Throw error on final attempt
      if (attempts === maxAttempts - 1) throw error;
      
      // Otherwise, wait and retry
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
      attempts++;
    }
  }

  throw new Error('Maximum status check attempts reached without a final status');
}