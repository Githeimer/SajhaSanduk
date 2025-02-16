'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import axios from 'axios'
import { useUser } from '@/hooks/userHook'

interface PaymentState {
  isVerifying: boolean;
  status: 'pending' | 'success' | 'error';
  error: string | null;
  paymentData: any;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [state, setState] = useState<PaymentState>({
    isVerifying: true,
    status: 'pending',
    error: null,
    paymentData: null
  });
  const { user, loading } = useUser();

  // Effect for payment verification
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const data = searchParams.get('data')
        if (!data) {
          throw new Error('No payment data received')
        }

        try {
          const response = await fetch('/api/payment/verify-esewa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
          });

          const result = await response.json()

          if (result.success) {
            setState({
              isVerifying: false,
              status: 'success',
              error: null,
              paymentData: result.data
            });
            return;
          }
        } catch (error) {
          console.error('Initial verification failed:', error);
        }

        const decodedData = JSON.parse(atob(data));
        const statusResponse = await axios.post('/api/payment/check-status', {
          transactionUuid: decodedData.transaction_uuid,
          totalAmount: parseFloat(decodedData.total_amount.replace(/,/g, ''))
        });

        if (statusResponse.data.success && statusResponse.data.data.status === 'COMPLETE') {
          setState({
            isVerifying: false,
            status: 'success',
            error: null,
            paymentData: statusResponse.data.data
          });
        } else {
          throw new Error('Payment verification failed');
        }

      } catch (error) {
        console.error('Payment verification error:', error);
        setState({
          isVerifying: false,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          paymentData: null
        });
      }
    }

    verifyPayment()
  }, [searchParams])

  // Separate effect for post-payment processing
  useEffect(() => {
    const processPostPayment = async () => {
      if (!loading && user && state.status === 'success' && state.paymentData) {
        try {
          const cartDeleteionObject = {
            user_id: user.id,
            transaction_id: state.paymentData.transaction_uuid
          };

          await axios.post("/api/payment/post-payment", cartDeleteionObject);
        } catch (error) {
          console.error('Error processing post-payment:', error);
          // Optionally handle error - maybe show a warning that cart clearing failed
        }
      }
    };

    processPostPayment();
  }, [loading, user, state.status, state.paymentData]);

  if (loading || state.isVerifying) {
    return (
      <div className="container mx-auto p-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-center">
                {loading ? "Loading user data..." : "Verifying your payment..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="container mx-auto p-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-center">Verification Failed</CardTitle>
            <CardDescription className="text-center">
              We couldn't verify your payment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
            <div className="flex justify-center mt-6">
              <Button onClick={() => router.push('/marketplace/cart')}>
                Return to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-center">Payment Successful!</CardTitle>
          <CardDescription className="text-center">
            Your payment has been processed and verified successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {state.paymentData?.ref_id && (
              <p>Reference ID: {state.paymentData.ref_id}</p>
            )}
            <p>Transaction ID: {state.paymentData?.transaction_uuid}</p>
            <p>Amount: Rs. {state.paymentData?.total_amount}</p>
            <p>Status: {state.paymentData?.status}</p>
          </div>
          <div className="flex justify-center mt-6">
            <Button onClick={() => router.push('/dashboard')}>
              View Your Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}