'use client';

import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import {Button} from '@/components/ui/button'

interface EsewaCheckoutProps {
  itemId: string;
  totalPrice: number;
}

export default function EsewaCheckout({ itemId, totalPrice }: EsewaCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/initialize-esewa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, totalPrice }),
      });

      const { esewaUrl, paymentParams } = await response.json();

      // Dynamically submit form to eSewa
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = esewaUrl;
      form.target = '_blank';

      Object.entries(paymentParams).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      
    } catch (error) {
      console.error('Payment initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={isLoading}
    >
      <CreditCard className="mr-2 h-4 w-4 inline" />
      {isLoading ? 'Processing...' : 'Pay with eSewa'}
    </Button>
  );
}