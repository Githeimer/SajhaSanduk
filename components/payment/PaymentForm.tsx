// components/PaymentForm.tsx

import { useState, useRef, useEffect } from 'react';
import { EsewaPaymentRequest } from '@/app/types/payment';
import { Button } from '@/components/ui/button';
import { CreditCard, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';

interface PaymentFormProps {
  items: any[];
  total: number;
  onPaymentStart?: () => void;
  onPaymentError?: (error: Error) => void;
}

export default function PaymentForm({ 
  items, 
  total, 
  onPaymentStart, 
  onPaymentError 
}: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Format and validate the amount
  const formatAmount = (amount: number): number => {
    return Number(amount.toFixed(2));
  };

  const validateAmount = (amount: number): boolean => {
    if (isNaN(amount) || !isFinite(amount)) {
      setError('Invalid amount format');
      return false;
    }
    
    if (amount < 10) {
      setError('Minimum amount is Rs. 10');
      return false;
    }
    
    if (amount > 100000) {
      setError('Maximum amount is Rs. 100,000');
      return false;
    }
    
    return true;
  };

  const handleEsewaPayment = async () => {
    try {
      setError(null);
      setIsProcessing(true);
      onPaymentStart?.();

      // Format and validate the amount
      const formattedTotal = formatAmount(total);
      if (!validateAmount(formattedTotal)) {
        throw new Error('Invalid amount');
      }

      // Initialize payment
      const response = await axios.post('/api/payment/initialize-esewa', {
        items,
        total: formattedTotal
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Payment initialization failed');
      }

      // Get form reference
      const form = formRef.current;
      if (!form) {
        throw new Error('Form element not found');
      }

      // Configure form
      form.action = response.data.payment_url;
      form.method = 'POST';
      form.enctype = 'application/x-www-form-urlencoded';
      form.acceptCharset = 'UTF-8';

      // Set form fields
      Object.entries(response.data.payment_data).forEach(([key, value]) => {
        const input = form.querySelector(`input[name="${key}"]`) as HTMLInputElement;
        if (input) {
          input.value = String(value);
        }
      });

      // Store transaction data
      sessionStorage.setItem('esewa_transaction', response.data.payment_data.transaction_uuid);

      // Submit form
      form.submit();

    } catch (error) {
      console.error('Payment Error:', error);
      setIsProcessing(false);
      setError(error instanceof Error ? error.message : 'Payment processing failed');
      onPaymentError?.(error as Error);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form
        ref={formRef}
        method="POST"
        target="_blank"
        className="hidden"
        encType="application/x-www-form-urlencoded"
        acceptCharset="UTF-8"
      >
        <input type="text" name="amount" />
        <input type="text" name="tax_amount" />
        <input type="text" name="total_amount" />
        <input type="text" name="transaction_uuid" />
        <input type="text" name="product_code" />
        <input type="text" name="product_service_charge" />
        <input type="text" name="product_delivery_charge" />
        <input type="text" name="success_url" />
        <input type="text" name="failure_url" />
        <input type="text" name="signed_field_names" />
        <input type="text" name="signature" />
      </form>

      <Button
        className="w-full"
        onClick={handleEsewaPayment}
        disabled={isProcessing || total <= 0}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {isProcessing ? 'Processing...' : 'Pay with eSewa'}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        Transaction limits: Rs. 10 - Rs. 100,000
      </p>
    </div>
  );
}