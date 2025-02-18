'use client'

import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import Link from 'next/link'

export default function PaymentFailurePage() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-center">Payment Failed</CardTitle>
          <CardDescription className="text-center">
            We couldn't process your payment. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4 pt-6">
          <Button variant="outline" onClick={() => router.push('/marketplace/cart')}>
            Return to Cart
          </Button>
         <Link href="https://tally.so/r/3EN1el">Contact Support</Link>
        </CardContent>
      </Card>
    </div>
  )
}