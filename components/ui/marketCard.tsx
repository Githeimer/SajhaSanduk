import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MarketplaceCardProps {
  name: string
  price: number
  rating: number
  image: string
  category: string
  description: string
  listedBy: {
    name: string
    avatar: string
  }
  listingType: string
}

export default function MarketCard({ 
  name, 
  price, 
  rating, 
  image, 
  category, 
  description, 
  listedBy, 
  listingType 
}: MarketplaceCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          layout="fill"
          style={{ objectFit: 'cover' }} 
        />
        <Badge className="absolute top-2 left-2 bg-primary/80 text-primary-foreground">
          {category}
        </Badge>
        <Badge className={`absolute top-2 right-2 ${
          listingType === 'sale' 
            ? 'bg-emerald-500 text-white' 
            : 'bg-sky-500 text-white'
        }`}>
          {listingType === 'sale' ? 'Sale' : 'Rent'}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">
            {listingType === 'sale' 
              ? `Rs.${price.toFixed(2)}` 
              : `Rs.${price.toFixed(2)}/day`
            }
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={listedBy.avatar} alt={listedBy.name} />
              <AvatarFallback>{listedBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm text-gray-600 truncate max-w-[150px]">{listedBy.name}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Listed by {listedBy.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

