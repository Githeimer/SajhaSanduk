'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast} from "@/hooks/use-toast"
import PaymentForm from '@/components/payment/PaymentForm'

// Since we haven't created the types folder yet, we'll define the CartItem interface here temporarily
// Later, you can move this to app/types/payment.ts
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  isRentable: boolean
  rentalDays: number
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "New GST",
    price: 50,
    image: "https://res.cloudinary.com/dbehu3cbs/image/upload/v1738769380/profile_images/wajgdxq0qhbugqgvtf9w.jpg",
    isRentable: true,
    rentalDays: 3,
  },
  {
    id: 2,
    name: "Another Product",
    price: 750,
    image: "https://res.cloudinary.com/dbehu3cbs/image/upload/v1738769383/profile_images/kutlrouufghb3vwk87bm.jpg",
    isRentable: false,
    rentalDays: 0
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.isRentable ? item.price * item.rentalDays : item.price)
    }, 0)
  }

  const handlePaymentStart = () => {
    toast({
      title: "Processing Payment",
      description: "Please complete your payment in the eSewa window.",
    })
  }

  const handlePaymentError = (error: Error) => {
    toast({
      title: "Payment Error",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    })
  }

  const subtotal = calculateSubtotal()
  const shipping = 1000
  const total = subtotal + shipping

  if (!mounted) return null

  return (
    <div className="landing_container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <ScrollArea className="h-[400px] pr-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Rs. {item.price.toLocaleString()} {item.isRentable ? '/ day' : ''}
                    </p>
                    {item.isRentable && (
                      <p className="text-sm text-gray-500">
                        Rental: {item.rentalDays} days
                      </p>
                    )}
                    <p className="text-sm font-semibold mt-1">
                      Total: Rs. {(item.isRentable ? item.price * item.rentalDays : item.price).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Order Summary Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {shipping.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 p-6">
            {/* eSewa Payment Form */}
            <PaymentForm
              items={cartItems}
              total={total}
              onPaymentStart={handlePaymentStart}
              onPaymentError={handlePaymentError}
            />
            
            <Button variant="outline" className="w-full" asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}