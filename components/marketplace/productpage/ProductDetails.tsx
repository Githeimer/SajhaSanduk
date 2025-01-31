"use client"

import { useEffect, useState } from "react"
import { Star, ShoppingCart, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Image from "next/image"


interface ProductDetailsProps {
  product: {
    name: string
    description: string
    isRentable: boolean
    maxRentalDays: number
    rentalPricePerDay: number
    purchasePrice: number
    rating: number
    listedBy: string
    phone?: string
    email?: string
  }
}

const Product = ({ params }: { params: { product_slug: string } }) => {
    const [productId, setProductId] = useState<string>(params.product_slug || '');
    const [error, setError] = useState<string | boolean>(false);
    const [loading, setLoading] = useState(false);
    const [productInfo, setProductInfo] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/marketplace/product?product_slug=${productId}`);
                console.log(response);

                if (response.data.success) {
                    setProductInfo(response.data.data.productDetail[0]);
                    setUserInfo(response.data.data.userDetail[0]);
                } else {
                    setError(`Failed to fetch data for product: ${productId}`);
                }
            } catch (error: any) {
                console.error('Error fetching product data:', error);
                setError(`Error: ${error.message || 'Failed to fetch product data'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [productId]);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div className="landing_container">
            <h1>Product: {productId}</h1>
            {productInfo ? (
                <div>
                    <h2>{productInfo.name}</h2>
                    <p>{productInfo.description}</p>
                    <p><strong>Price: </strong>Rs. {productInfo.amount}</p>
                    <p><strong>Category: </strong>{productInfo.category}</p>
                    <p><strong>Rating: </strong>{productInfo.rating}</p>
                    <p><strong>Is Rentable: </strong>{productInfo.is_rentable ? 'Yes' : 'No'}</p>
                    <Image src={productInfo.photos[0]} height={100} width={100} alt={productInfo.name}></Image>
                    {productInfo.is_rentable && productInfo.max_allowable_days && (
                        <p><strong>Max Rentable Days: </strong>{productInfo.max_allowable_days}</p>
                    )}
                    <p>Listed By: {userInfo?.name}</p>
                </div>
            ) : (
                <div>No products found. Try searching in the marketplace.</div>
            )}
        </div>
    );
};

