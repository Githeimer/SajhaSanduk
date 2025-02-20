"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, ShoppingCart, CreditCard, PhoneCallIcon, PhoneCall, Phone } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useUser } from "@/hooks/userHook"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import ContactModal from "@/components/marketplace/productpage/ContactModal"

const StaticLocationMap = dynamic(() => import("@/components/marketplace/productpage/StaticMap"), { ssr: false });
interface Product {
  id: string
  name: string
  description: string
  amount: number
  is_rentable: boolean
  max_allowable_days?: number
  Category: string
  photos: string[]
  listed_by: string
  is_rented: boolean
}

interface Lister {
  name: string
  email: string
  Image: string
  phonenumber: string
  location:Number[]
}

interface ApiResponse {
  success: boolean
  data: {
    productDetail: [Product]
    listerDetail: [Lister]
  }
}

interface CartRequestBody {
  productId: string
  rentalDays: number | null
}

const ProductDetail = ({ params }: { params: Promise<{ product_slug: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [lister, setLister] = useState<Lister | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rentalDays, setRentalDays] = useState<number>(0)
  const [userRating, setUserRating] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { user, loading: userLoading } = useUser()

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        setError(null)
        const resolvedParams = await params
        
        const response = await axios.get<ApiResponse>(
          `/api/marketplace/product?product_slug=${resolvedParams.product_slug}`
        )

       

        if (response.status === 200 && response.data.success) {
          const { productDetail, listerDetail } = response.data.data
          if (!productDetail?.[0] || !listerDetail?.[0]) {
            throw new Error("Product or lister data not found")
          }
        
          setProduct(productDetail[0])
          setLister(listerDetail[0])
          
        } else {
          throw new Error(`Failed to fetch data for product: ${resolvedParams.product_slug}`)
        }
      } catch (err) {
        const errorMessage = err instanceof AxiosError 
          ? err.response?.data?.message || err.message
          : 'An unexpected error occurred'
        setError(errorMessage)
        toast.error("Error")
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [params])

  const handleContactLister = (email: string, phone: string) => {
    const contactOptions = `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <p><strong>How would you like to contact?</strong></p>
        <button id="emailBtn" style="margin: 5px; padding: 8px 16px; cursor: pointer;">📧 Email</button>
        <button id="callBtn" style="margin: 5px; padding: 8px 16px; cursor: pointer;">📞 Call</button>
      </div>
    `;
  
    const newWindow = window.open("", "_blank", "width=300,height=200");
    if (!newWindow) return alert("Popup blocked! Allow popups and try again.");
  
    newWindow.document.body.innerHTML = contactOptions;
  
    newWindow.document.getElementById("emailBtn")?.addEventListener("click", () => {
      window.location.href = `mailto:${email}`;
      newWindow.close();
    });
  
    newWindow.document.getElementById("callBtn")?.addEventListener("click", () => {
      window.location.href = `tel:${phone}`;
      newWindow.close();
    });
  };

  const handleRentalDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value)
    
    if (isNaN(days)) {
      setRentalDays(0)
      return
    }

    if (!product?.is_rentable) {
      setRentalDays(0)
      return
    }

    if (product.max_allowable_days) {
      if (days <= product.max_allowable_days && days >= 0) {
        setRentalDays(days)
      }
    }
  }

  const calculateTotalAmount = (): number => {
    if (!product?.is_rentable) {
      return product?.amount || 0
    }
    return product?.amount ? product.amount * (rentalDays || 0) : 0
  }

  const handleAddToCart = async () => {
    if (!product) return false

    try {
      if (product.is_rentable) {
        if (rentalDays <= 0) {
          toast.error("Please select rental days greater than 0")
          return false
        }
        if (product.max_allowable_days && rentalDays > product.max_allowable_days) {
          toast.error("Rental Days Greater than Max")
          return false
        }
      }

      const queryParams = {
        pid: product.id,
        uid: user.id,
        rentalDays: product.is_rentable ? rentalDays : 0
      }
      
      const params = new URLSearchParams(queryParams as any).toString()
      const response = await axios.patch(`/api/marketplace/cart?${params}`)

      console.log(response);

      if (!response.data.success) {
        toast.error("Product already in your cart, cant add twice")
        return false
      }

      toast.success("Product added to Cart")
      window.location.reload();
      return true

    } catch (error:any) {
      if(error.response?.data?.message)
     {
      toast.error(error.response.data.message)
      return false;
     }

     toast.error("Error, Check if you're logged in")
        
      return false
    }
  }

  const handleBuyNow = async () => {
    if (!product) return
    
    const resultofCart = await handleAddToCart()
    
    if (resultofCart) {
      router.push("/marketplace/cart")
      window.location.reload();
    }    
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-center mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (!product || !lister) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">Product not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!product.is_rented ? (
        <div className="grid md:grid-cols-2 gap-8 mt-11">
          <div>
            <Carousel>
              <CarouselContent>
                {product.photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`${product.name} - Photo ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-10" />
              <CarouselNext className="mr-10" />
            </Carousel>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="font-bold mr-2">Category:</span>
              <span>{product.Category}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="font-bold mr-2">Price:</span>
              <span>
                Rs.{product.amount} {product.is_rentable ? "/ day" : ""}
              </span>
            </div>
            {product.is_rentable ? (
              <div className="mb-4">
                <Label htmlFor="rental-days">Rental Days (Max {product.max_allowable_days})</Label>
                <Input
                  id="rental-days"
                  type="number"
                  min={1}
                  max={product.max_allowable_days}
                  value={rentalDays}
                  onChange={handleRentalDaysChange}
                  className="mt-1"
                  required
                />
                <p className="mt-2">Total Amount: Rs.{calculateTotalAmount()}</p>
              </div>
            ) : (
              <p className="mt-2">Total Amount: Rs.{calculateTotalAmount()}</p>
            )}
            <div className="flex items-center mb-4">
              <span className="font-bold mr-2">Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 cursor-pointer ${
                      star <= userRating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                    onClick={() => setUserRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className="flex space-x-4 mb-8">
              <Button 
                onClick={handleAddToCart} 
                disabled={isSubmitting}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> 
                {isSubmitting ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleBuyNow}
                disabled={isSubmitting}
              >
                <CreditCard className="mr-2 h-4 w-4" /> 
                {isSubmitting ? 'Processing...' : 'Buy Now'}
              </Button>
            
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={lister.Image} alt={lister.name} />
                    <AvatarFallback>{lister.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="font-semibold">{lister.name}</h3>
                    <p className="text-sm text-gray-500">{lister.email}</p>
                    <div className="flex flex-row">
                      <Phone fill="gray" className="h-4" />
                      <p className="text-sm text-gray-500">{lister.phonenumber}</p>
                    </div>
                    
                  </div>
                  <ContactModal email={lister.email} phone={lister.phonenumber} />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <StaticLocationMap latitude={lister.location[0]} longitude={lister.location[1]}></StaticLocationMap>
               
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="mt-11 h-max flex flex-col items-center justify-center">
          Product is already bought / rented
        </div>
      )}
    </div>
  )
}

export default ProductDetail