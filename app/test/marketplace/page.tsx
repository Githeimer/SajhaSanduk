"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MarketCard from "@/components/ui/marketCard"; // Import the MarketCard component

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
  slug:string,
}

const ProductPage = () => {
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const category = searchParams.get("category") || "default";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/marketplace?category=${category}`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.data || []);
        } else {
          setError(data.message || "Failed to fetch products");
        }
      } catch (err: any) {
        setError("Unexpected error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>

      {/* Loading Indicator */}
      {loading && <p>Loading products...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
         
          <MarketCard
            key={product.id}
            name={product.name}
            slug={product.product_slug}
            price={product.amount}
            rating={product.rating}
            image={product.photos[0]}
            category={product.Category}
            description={product.description}
            listedBy={{
              name: product.user_details ? product.user_details[0]?.name : "N/A",
              avatar: product.user_details ? product.user_details[0]?.avatar : "",
            }}
            listingType={product.is_rentable ? "rent" : "sale"}
          />
       
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
