"use client";
import { useState, useEffect, Key } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import axios from "axios";
import React from "react";

interface ProductData {
    id: number;
    name: string;
    description: string;
    amount: number;
    category: string;
    max_allowable_days?: number;
    listed_by: number;
    photos: string[];
}

export default function Profile({ params }: { params: Promise<{ product_slug: string }> }) {
    const [product, setProduct] = useState<ProductData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editedProduct, setEditedProduct] = useState<any>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { product_slug } = await params;
                const response = await axios.get(`/api/marketplace/product?product_slug=${product_slug}`);
                const data = response.data;

                if (data.success) {
                    setProduct(data.data.productDetail[0]);
                    setEditedProduct(data.data.productDetail[0]);
                } else {
                    console.error("Failed to fetch product:", data.message);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [params]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prev: any) => prev ? { ...prev, [name]: value } : null);
    };

    const handleRemovePhoto = (index: number) => {
        setEditedProduct((prev: { photos: any[] }) => prev ? {
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
        } : null);
    };

    const handleSave = async () => {
        console.log("Saving updated product:", editedProduct);
        setProduct(editedProduct);
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Product: {product?.name}</CardTitle>
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
                            {/* Product Image */}
                            {editedProduct?.photos && editedProduct.photos.length > 0 && (
                                <div className="flex flex-wrap gap-4">
                                    {editedProduct.photos.map((photo: string | undefined, index: Key | null | any | undefined) => (
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
                                <Button variant="outline" className="flex items-center gap-2">
                                    <UploadCloud className="w-4 h-4" />
                                    Upload Photo
                                </Button>
                            )}

                            {/* Editable Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Object.entries(product)
                                    .filter(([key]) => !["id", "listed_by", "photos"].includes(key))
                                    .map(([key, value]) => (
                                        <div key={key}>
                                            <label className="text-sm font-medium capitalize">{key.replace(/_/g, " ")}</label>
                                            {isEditing ? (
                                                <Input
                                                    name={key}
                                                    value={editedProduct?.[key] ?? ""}
                                                    onChange={handleInputChange}
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-2 border rounded-md">{value}</div>
                                            )}
                                        </div>
                                    ))}
                            </div>

                            {/* Save Button */}
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
