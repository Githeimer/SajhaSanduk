"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import AddProductForm from "@/components/dashboard/add-product-form";
import { useUser } from "@/hooks/userHook";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import VendorTransactions from "@/components/dashboard/vendorTranscation";

interface Product {
  id: number;
  product_slug: string;
  name: string;
  photos: string[];
  listed_by: number;
  description: string;
  rating: number;
  amount: number;
  is_rentable: boolean;
  max_allowable_days: number | null;
  is_rented: boolean;
  Category: string;
  user_details?: any;
}

type FilterType = 'all' | 'rentable' | 'sellable';

export default function Dashboard() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { user, loading } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      const fetchProducts = async () => {
        try {
          setIsLoadingProducts(true);
          const response = await axios.get(`/api/vendor/fetchProduct?id=${user.id}`);
          const availableProducts = response.data.data.filter((product: Product) => !product.is_rented);
          setProducts(availableProducts);
          setFilteredProducts(availableProducts);
        } catch (error: any) {
          console.error("Error fetching products:", error);
          setError(error.message);
        } finally {
          setIsLoadingProducts(false);
        }
      };
      fetchProducts();
    }
  }, [user, loading]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 md:hidden">Dashboard</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>Manage and edit your product listings</CardDescription>
          </div>
          <Select value={filterType} onValueChange={(value: FilterType) => setFilterType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="rentable">Rentable Only</SelectItem>
              <SelectItem value="sellable">Sellable Only</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {isLoadingProducts ? (
            <div className="text-center py-4">Loading products...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-4 flex flex-col items-center gap-4">
              <span>No products found</span>
              <Link href="/dashboard/addproduct">
                <Button className="w-auto p-4">List your Product</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="flex items-center">
                      <img
                        src={product.photos[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-8 h-8 mr-2 rounded"
                      />
                      <span className="hidden sm:inline">{product.name}</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.is_rentable ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.is_rentable ? "Rentable" : "Sellable"}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Rs.{product.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell">{product.Category}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/product/${product.product_slug}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Edit</span>
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {showAddProduct && <AddProductForm onClose={() => setShowAddProduct(false)} />}
        <VendorTransactions></VendorTransactions>
    </div>
  );
}
