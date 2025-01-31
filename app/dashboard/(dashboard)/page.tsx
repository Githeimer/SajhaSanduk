"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, User, Package, Settings, Menu } from "lucide-react"
import  AddProductForm  from "@/components/dashboard/add-product-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useUser } from "@/hooks/userHook"
import Logout from "@/components/Auth/Logout"
import Link from "next/link"

// Mock data for recent sales
const recentSales = {
  rented: [
    { id: 1, product: "Product A", amount: 100, date: "2023-05-01", image: "/placeholder.svg" },
    { id: 2, product: "Product B", amount: 200, date: "2023-05-02", image: "/placeholder.svg" },
  ],
  sold: [
    { id: 3, product: "Product C", amount: 150, date: "2023-05-03", image: "/placeholder.svg" },
    { id: 4, product: "Product D", amount: 300, date: "2023-05-04", image: "/placeholder.svg" },
  ],
}

// Mock data for products
const products = [
  { id: 1, name: "Product A", price: 100, stock: 50, image: "/placeholder.svg" },
  { id: 2, name: "Product B", price: 200, stock: 30, image: "/placeholder.svg" },
  { id: 3, name: "Product C", price: 150, stock: 40, image: "/placeholder.svg" },
]

export default function Dashboard() {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const {user,loading}=useUser();
  const [userDetails,setUserDetails]=useState({
    name:"User",
    image:"https://avatar.iran.liara.run/public",
    email:"example@gmail.com",
    id:0
  })

  
  useEffect(() => {
    if (!loading && user?.data?.length > 0) {
      const userData = user.data[0];
      setUserDetails({
        name: userData.name ,
        email: userData.email ,
        image: userData.Image || "https://avatar.iran.liara.run/public",
        id: userData.id ,
      });
    }
  }, [user, loading]);

  const Sidebar = () => (
    <div className="flex flex-col justify-between h-full">
    <div className="flex flex-col h-full">
      <div className="mb-8 flex flex-col items-center">
        <Avatar className="h-12 w-12 mb-2">
          <AvatarImage src={userDetails.image} alt={userDetails.name} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">Welcome, {userDetails.name} </h2>
      </div>
      <hr className="p" />
      <nav className="space-y-4">
        <Button variant="ghost" className="w-full justify-start" onClick={() => setShowAddProduct(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
     
      </nav>
       
    </div>
   <div className="py-10 flex  justify-center items-center w-full">
     <Logout/>
   </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-100">
    
      <div className="hidden md:block w-64 bg-gray-950 text-white p-6">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for mobile */}
        <header className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-gray-900 text-white p-6">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </header>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-3xl font-bold mb-8 md:hidden">Dashboard</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Recent Rented Items */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Rented Items</CardTitle>
                <CardDescription>Overview of your recent rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.rented.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="flex items-center">
                          <img
                            src={sale.image || "/placeholder.svg"}
                            alt={sale.product}
                            className="w-8 h-8 mr-2 rounded"
                          />
                          <span className="hidden sm:inline">{sale.product}</span>
                        </TableCell>
                        <TableCell>${sale.amount}</TableCell>
                        <TableCell className="hidden sm:table-cell">{sale.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Sold Items */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sold Items</CardTitle>
                <CardDescription>Overview of your recent sales</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.sold.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="flex items-center">
                          <img
                            src={sale.image || "/placeholder.svg"}
                            alt={sale.product}
                            className="w-8 h-8 mr-2 rounded"
                          />
                          <span className="hidden sm:inline">{sale.product}</span>
                        </TableCell>
                        <TableCell>${sale.amount}</TableCell>
                        <TableCell className="hidden sm:table-cell">{sale.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Your Products */}
          <Card>
            <CardHeader>
              <CardTitle>Your Products</CardTitle>
              <CardDescription>Manage and edit your product listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden sm:table-cell">Price</TableHead>
                    <TableHead className="hidden sm:table-cell">Stock</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="flex items-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-8 h-8 mr-2 rounded"
                        />
                        <span className="hidden sm:inline">{product.name}</span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">${product.price}</TableCell>
                      <TableCell className="hidden sm:table-cell">{product.stock}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Edit</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {showAddProduct && <AddProductForm onClose={() => setShowAddProduct(false)} />}
    </div>
  )
}