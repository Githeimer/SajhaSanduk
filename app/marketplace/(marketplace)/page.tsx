"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MarketCard from "@/components/ui/marketCard";
import axios from "axios";
import { Loader2 } from "lucide-react";

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

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      setProducts([]);

      try {
        const response = await axios.get(`/api/marketplace?category=${category}`);
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
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>

      {/* Loader */}
      {loading && (
        <div className="flex w-full h-full justify-center items-center">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {products.map((product) => {
          const user = product.user_details?.[0]; // Ensure user exists

          return (
            <MarketCard
              key={product.id}
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
