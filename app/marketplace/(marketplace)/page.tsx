"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MarketCard from "@/components/ui/marketCard";
import axios from "axios";
import { Loader2, Tag, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
  user_details?: { name: string; Image: string }[];
}

const MarketplaceContent = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "default";
  const search = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [listingFilter, setListingFilter] = useState<"all" | "rent" | "sale">("all");
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  // Count for rent and sale items
  const rentCount = products.filter(p => p.is_rentable).length;
  const saleCount = products.filter(p => !p.is_rentable).length;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      setProducts([]);

      try {
        const response = await axios.get(`/api/marketplace?${searchParams.toString()}`);
        const data = await response.data;

        if (response.data.success) {
          setProducts(data.data || []);
        } else {
          setError(data.message || "Failed to fetch products");
        }
      } catch (err: any) {
        setError("Failed to Fetch Products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    window.scroll(0, 0);
    fetchProducts();
  }, [category, search]);

  useEffect(() => {
    let filtered = [...products];

    if (listingFilter !== "all") {
      filtered = filtered.filter((product) =>
        listingFilter === "rent" ? product.is_rentable : !product.is_rentable
      );
    }

    filtered.sort((a, b) => {
      return sortOrder === "asc" 
        ? a.amount - b.amount 
        : b.amount - a.amount;
    });

    setDisplayProducts(filtered);
  }, [products, sortOrder, listingFilter]);

  const toggleSortOrder = () => {
    setSortOrder(current => current === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold">Marketplace</h1>

          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <Select
              value={listingFilter}
              onValueChange={(value: "all" | "rent" | "sale") => setListingFilter(value)}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="rent" className="text-blue-600">
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    Rent Only
                  </div>
                </SelectItem>
                <SelectItem value="sale" className="text-green-600">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={16} />
                    Sale Only
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={toggleSortOrder}
              className="w-[180px] bg-white"
            >
              Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex gap-4 flex-wrap">
          <Badge variant="outline" className="bg-white px-4 py-2">
            Total Items: {products.length}
          </Badge>
          <Badge 
            variant="outline" 
            className="bg-blue-50 text-blue-600 border-blue-200 px-4 py-2"
          >
            For Rent: {rentCount}
          </Badge>
          <Badge 
            variant="outline" 
            className="bg-green-50 text-green-600 border-green-200 px-4 py-2"
          >
            For Sale: {saleCount}
          </Badge>
        </div>
      </div>

      {loading && (
        <div className="flex w-full h-40 justify-center items-center">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!loading && displayProducts.length === 0 && !error && (
        <div className="text-gray-500 text-center bg-gray-50 p-8 rounded-lg">
          No products found matching your criteria.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {displayProducts.map((product) => {
          const user = product.user_details?.[0];

          return (
            <div key={product.id} className="relative">

              <MarketCard
                name={product.name}
                price={product.amount}
                rating={product.rating}
                slug={product.product_slug}
                image={product.photos[0]}
                category={product.Category}
                description={product.description}
                listedBy={
                  user ? { name: user.name, avatar: user.Image } : { name: "Unknown", avatar: "" }
                }
                listingType={product.is_rentable}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Marketplace = () => {
  return (
    <Suspense fallback={<p>Loading marketplace...</p>}>
      <MarketplaceContent />
    </Suspense>
  );
};

export default Marketplace;