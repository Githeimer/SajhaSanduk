"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function ProductsList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Arduino Set",
      price: 150,
      status: "Available",
      image: "https://qqtrading.com.my/image/cache/catalog/Products/Arduino/KIT/KIT-STARTER-UNO-700x700.jpg",
    },
    {
      id: 2,
      name: "Soldering Iron Set",
      price: 200,
      status: "Rented",
      image: "https://a1autozone.co.uk/wp-content/uploads/2022/06/WWS-GLK9-Y02S-Soldering-Gun-Picture.png",
    },
  ])

  const [openDialogId, setOpenDialogId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
    setOpenDialogId(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Products</CardTitle>
        <CardDescription>
          Manage your listed products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={54}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Rs. {product.price}
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {product.status}
                  </span>
                </div>
              </div>
              <AlertDialog open={openDialogId === product.id} onOpenChange={(isOpen) => setOpenDialogId(isOpen ? product.id : null)}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please enter your password to confirm deletion.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="py-4">
                    <Input type="password" placeholder="Enter your password" />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpenDialogId(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <Button variant="default">List Product</Button>
        </div>
      </CardContent>
    </Card>
  )
}

