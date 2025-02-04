"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2 } from "lucide-react";
import axios from "axios";
import React from "react";
import { useUser } from "@/hooks/userHook";
import { useRouter } from "next/navigation";
import MultiImageUpload from "@/components/cloudinary/MultipleImageUpload";
import {toast} from "sonner"

interface ProductData {
    id: number;
    name: string;
    description: string;
    amount: number;
    Category: string;
    max_allowable_days?: number;
    photos: string[];
    is_rentable?: boolean;
    listed_by: number;
}

const categories = ["Electronics", "Mechanical", "Books", "Tools and DIY", "Music", "Others"];

export default function Profile({ params }: { params: Promise<{ product_slug: string }> }) {
    const router = useRouter();
    const [product, setProduct] = useState<ProductData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editedProduct, setEditedProduct] = useState<ProductData | null>(null);
    const { user, loading } = useUser();
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const {product_slug}=await params;
                const response = await axios.get(`/api/marketplace/product?product_slug=${product_slug}`);
                const data = response.data;

                if (data.success) {
                    const productDetail = data.data.productDetail[0];
                    setProduct(productDetail);
                    setEditedProduct(productDetail);
                    
                    // Check if user has access to edit this product
                    if (!loading && user) {
                        setHasAccess(productDetail.listed_by === user.id);
                    } else {
                        setHasAccess(false);
                    }
                } else {
                    console.error("Failed to fetch product:", data.message);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!loading) {
            fetchProduct();
        }
    }, [params, user, loading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => 
            prev ? { 
                ...prev, 
                [name]: name === "amount" || name === "max_allowable_days" 
                    ? parseFloat(value) 
                    : value 
            } : null
        );
    };

    const handleRentableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const isRentable = e.target.value === "Rentable";
        setEditedProduct((prev) => 
            prev ? { 
                ...prev, 
                is_rentable: isRentable,
                max_allowable_days: isRentable ? (prev.max_allowable_days || 1) : undefined
            } : null
        );
    };

    const handleRemovePhoto = (index: number) => {
        setEditedProduct((prev) =>
            prev ? { ...prev, photos: prev.photos.filter((_, i) => i !== index) } : null
        );
    };

    const handlePhotosUpload = (urls: string[]) => {
        setEditedProduct((prev) => 
            prev ? { 
                ...prev, 
                photos: [...prev.photos, ...urls] 
            } : null
        );
    };

    const handleSave = async () => {
        try {
            const response = await axios.patch("/api/vendor/submitEditedProduct", editedProduct);
            if (response.data.success) {
                setProduct(editedProduct);
                setIsEditing(false);
                toast.success("Product Editing Success");
            } else {
                console.error("Failed to update product:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleProductDeletion = async () => {
        try {
            const {product_slug}=await params;
            if (!window.confirm("Are you sure you want to delete this product?")) {
                return;
            }
    
            setIsLoading(true); 
            const response = await axios.delete(`/api/marketplace/product?product_slug=${product_slug}`);
    
            if (response.data.success) {
               
                toast.success("Product deleted successfully");
                router.push('/dashboard'); 
            } else {
              
                toast.error(response.data.message || "Failed to delete product");
            }
        } catch (error: any) {
        
            console.error("Error deleting product:", error);
            toast.error(error.response?.data?.message || "Failed to delete product");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Add a delete button to your UI
    <Button 
        variant="destructive"
        onClick={handleProductDeletion}
        disabled={isLoading}
        className="mt-4"
    >
        {isLoading ? (
            <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
            </>
        ) : (
            "Delete Product"
        )}
    </Button>

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (hasAccess === false) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
                        <p className="text-gray-600 mb-4">You don't have access to this product.</p>
                        <Button onClick={() => router.push('/dashboard')}>
                            Return to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-3 items-center">
                    <CardTitle>Product: {product?.name}</CardTitle>
                    <Button variant={"destructive"} onClick={handleProductDeletion}>
                        Delete this product
                        </Button>
                    </div>
                  
                    <Button 
                        onClick={() => {
                            if (isEditing) setEditedProduct(product);
                            setIsEditing(!isEditing);
                        }}
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {product ? (
                        <>
                            {/* Product Images */}
                            {editedProduct?.photos && editedProduct.photos.length > 0 && (
                                <div className="flex flex-wrap gap-4">
                                    {editedProduct.photos.map((photo, index) => (
                                        <div key={index} className="relative w-32 h-32">
                                            <img src={photo} alt="Product" className="w-full h-full object-cover rounded-lg border" />
                                            {isEditing && (
                                                <Button 
                                                    variant="destructive" 
                                                    size="icon" 
                                                    className="absolute top-1 right-1"
                                                    onClick={() => handleRemovePhoto(index)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {isEditing && (
                                <MultiImageUpload onUploadComplete={handlePhotosUpload} />
                            )}

                            {/* Editable Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Product Name</label>
                                    {isEditing ? (
                                        <Input
                                            name="name"
                                            value={editedProduct?.name ?? ""}
                                            onChange={handleInputChange}
                                            className="w-full"
                                        />
                                    ) : (
                                        <div className="p-2 border rounded-md">{product.name}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Description</label>
                                    {isEditing ? (
                                        <Input
                                            name="description"
                                            value={editedProduct?.description ?? ""}
                                            onChange={handleInputChange}
                                            className="w-full"
                                        />
                                    ) : (
                                        <div className="p-2 border rounded-md">{product.description}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        {editedProduct?.is_rentable ? "Rent Amount per Day (Rs)" : "Amount for Selling (Rs)"}
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            name="amount"
                                            type="number"
                                            value={editedProduct?.amount ?? ""}
                                            onChange={handleInputChange}
                                            className="w-full"
                                        />
                                    ) : (
                                        <div className="p-2 border rounded-md">{product.amount}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Category</label>
                                    {isEditing ? (
                                        <select
                                            name="Category"
                                            value={editedProduct?.Category ?? ""}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md"
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="p-2 border rounded-md">{product.Category}</div>
                                    )}
                                </div>
                                {editedProduct?.is_rentable && (
                                    <div>
                                        <label className="text-sm font-medium">Max Rentable Days</label>
                                        {isEditing ? (
                                            <Input
                                                name="max_allowable_days"
                                                type="number"
                                                min="1"
                                                value={editedProduct?.max_allowable_days ?? ""}
                                                onChange={handleInputChange}
                                                className="w-full"
                                            />
                                        ) : (
                                            <div className="p-2 border rounded-md">{product.max_allowable_days}</div>
                                        )}
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium">Type</label>
                                    {isEditing ? (
                                        <select
                                            value={editedProduct?.is_rentable ? "Rentable" : "Sellable"}
                                            onChange={handleRentableChange}
                                            className="w-full p-2 border rounded-md"
                                        >
                                            <option value="Rentable">Rentable</option>
                                            <option value="Sellable">Sellable</option>
                                        </select>
                                    ) : (
                                        <div className="p-2 border rounded-md">
                                            {product.is_rentable ? "Rentable" : "Sellable"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <Button onClick={handleSave} className="w-full mt-4">
                                    Save Changes
                                </Button>
                            )}
                        </>
                    ) : (
                        <div>No product found</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}