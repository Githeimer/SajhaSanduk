"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Product = ({ params }: { params: Promise<{ product_slug: string }> }) => {
  const [productId, setProductId] = useState<string>("");
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const resolvedParams = await params;
        setProductId(resolvedParams.product_slug);

        const response = await axios.get(
          `/api/marketplace/product?product_slug=${resolvedParams.product_slug}`
        );

        console.log(response);

        if (response.status === 200 && response.data.success) {
          setProductInfo(response.data.data.productDetail[0]);
          setUserInfo(response.data.data.listerDetail[0]);
        } else {
          setError(`Failed to fetch data for product: ${resolvedParams.product_slug}`);
        }
      } catch (error: any) {
        
        if (error.response?.status === 404) {
          setError("Product not found (404).");
        } else {
          setError(
            `Error: ${error.message || "Failed to fetch product data"}`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h1 className="text-red-500">{error}</h1>
        <p>
          It seems we couldn't find the product you were looking for. Please try
          searching again in the marketplace.
        </p>
      </div>
    );
  }

  return (
    <div className="landing_container">
      <h1>Product: {productId}</h1>
      {productInfo ? (
        <div>
          <h2>{productInfo.name}</h2>
          <p>{productInfo.description}</p>
          <p>
            <strong>Price: </strong>Rs. {productInfo.amount}
          </p>
          <p>
            <strong>Category: </strong>
            {productInfo.Category}
          </p>
          <p>
            <strong>Rating: </strong>
            {productInfo.rating}
          </p>
          <p>
            <strong>Is Rentable: </strong>
            {productInfo.is_rentable ? "Yes" : "No"}
          </p>
          <Image
            src={productInfo.photos[0]}
            height={100}
            width={100}
            alt={productInfo.name}
          ></Image>
          {productInfo.is_rentable && productInfo.max_allowable_days && (
            <p>
              <strong>Max Rentable Days: </strong>
              {productInfo.max_allowable_days}
            </p>
          )}
          <p>Listed By: {userInfo?.name || "N/A"}</p>
        </div>
      ) : (
        <div>No products found. Try searching in the marketplace.</div>
      )}
    </div>
  );
};

export default Product;
