'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'
import { useUser } from "@/hooks/userHook"
import { toast } from "sonner"
import PaymentForm from '@/components/payment/PaymentForm'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  isRentable: boolean
  rentalDays: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    if (user?.id) {
      fetchCartItems()
    }
  }, [user])

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/api/marketplace/cart?uid=${user.id}`)
      if (response.data.success) {
        setCartItems(response.data.data)
      }
    } catch (error) {
      toast.error("Failed to fetch cart items")
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (id: number) => {
    try {
      const response = await axios.delete(`/api/marketplace/cart?uid=${user.id}&pid=${id}`)
      if (response.data.success) {
        setCartItems(items => items.filter(item => item.id !== id))
        toast.success("Item removed from cart")
      }
    } catch (error) {
      toast.error("Failed to remove item from cart")
    }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.isRentable
        ? item.price * (item.rentalDays || 1)
        : item.price
      return total + itemTotal
    }, 0)
  }

  const handlePaymentStart = () => {
    toast.info("Processing Payment", {
      description: "Please complete your payment in the eSewa window."
    })
  }

  const handlePaymentError = (error: Error) => {
    toast.error("Payment Error", {
      description: "There was an error processing your payment. Please try again."
    })
  }

  const subtotal = calculateSubtotal()
  const total = subtotal // No shipping cost as per your version

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!loading && cartItems.length === 0) {
    return (
      <div className="landing_container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8 mt-11">Your Cart is Empty</h1>
        <Button variant="outline" asChild>
          <Link href="/marketplace">
            <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="landing_container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
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

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Charges</span>
                <span>Rs. 0</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 p-6">
            <PaymentForm
              items={cartItems}
              total={total}
              onPaymentStart={handlePaymentStart}
              onPaymentError={handlePaymentError}
            />
            
            <Button variant="outline" className="w-full" asChild>
              <Link href="/marketplace">
                <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}