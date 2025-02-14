// components/PaymentForm.tsx

import { useState, useRef, useEffect } from 'react';
import { EsewaPaymentRequest, CartItem } from '@/app/types/payment';
import { Button } from '@/components/ui/button';
import { CreditCard, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios, { AxiosError } from 'axios';

// Define proper types for the component props
interface PaymentFormProps {
  items: CartItem[];  // Using the CartItem type instead of any[]
  total: number;
  onPaymentStart?: () => void;
  onPaymentError?: (error: Error) => void;
  onPaymentSuccess?: () => void;
}

// Define possible payment errors for better error handling
type PaymentError = {
  message: string;
  code?: string;
  details?: string;
};

export default function PaymentForm({ 
  items, 
  total, 
  onPaymentStart, 
  onPaymentError,
  onPaymentSuccess 
}: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<PaymentError | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset error when total changes
  useEffect(() => {
    setError(null);
  }, [total]);

  // Validate payment amount before processing
  const validatePayment = (): boolean => {
    if (total < 10) {
      setError({
        message: 'Minimum payment amount is Rs. 10',
        code: 'INVALID_AMOUNT'
      });
      return false;
    }
    if (total > 100000) {
      setError({
        message: 'Maximum payment amount is Rs. 100,000',
        code: 'INVALID_AMOUNT'
      });
      return false;
    }
    return true;
  };

  const handleEsewaPayment = async () => {
    try {
      // Validate payment before proceeding
      if (!validatePayment()) {
        return;
      }

      setIsProcessing(true);
      setError(null);
      onPaymentStart?.();

      // Initialize payment with backend
      const response = await axios.post('/api/payment/initialize-esewa', {
        items,
        total
      });

      if (!response.data.success || !response.data.payment_data) {
        throw new Error('Payment initialization failed');
      }

      // Get form reference and validate
      const form = formRef.current;
      if (!form) {
        throw new Error('Form element not found');
      }

      // Configure form with proper attributes for eSewa
      form.action = response.data.payment_url;
      form.method = 'POST';
      form.enctype = 'application/x-www-form-urlencoded';
      form.acceptCharset = 'UTF-8';

      // Set headers for the form
      const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      });

      // Set all required form fields with proper validation
      Object.entries(response.data.payment_data).forEach(([key, value]) => {
        const input = form.querySelector(`input[name="${key}"]`) as HTMLInputElement;
        if (input) {
          input.value = String(value);
        } else {
          console.warn(`Form field ${key} not found`);
        }
      });

      // Store transaction data in sessionStorage for verification
      sessionStorage.setItem('esewa_transaction', response.data.payment_data.transaction_uuid);

      // Submit the form
      form.submit();
      onPaymentSuccess?.();

    } catch (error) {
      console.error('Payment Error:', error);
      setIsProcessing(false);

      // Handle different types of errors
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        setError({
          message: 'Payment processing failed',
          details: axiosError.response?.data?.message || axiosError.message,
          code: axiosError.response?.status?.toString()
        });
      } else {
        setError({
          message: 'An unexpected error occurred',
          details: (error as Error).message
        });
      }

      onPaymentError?.(error as Error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Error display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message}
            {error.details && (
              <span className="block text-sm mt-1">{error.details}</span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Hidden form for eSewa submission */}
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

      {/* Payment Button */}
      <Button
        className="w-full"
        onClick={handleEsewaPayment}
        disabled={isProcessing || total <= 0}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {isProcessing ? 'Processing Payment...' : 'Pay with eSewa'}
      </Button>

      {/* Transaction limits notice */}
      <p className="text-sm text-gray-500 text-center mt-2">
        Transaction limits: Rs. 10 - Rs. 100,000
      </p>
    </div>
  );
}