"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/userHook";
import MultiImageUpload from "@/components/cloudinary/MultipleImageUpload";

const categories = [
  "Electronics",
  "Mechanical",
  "Books",
  "Tools and DIY",
  "Music",
  "Others",
];

export default function AddProduct() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    Category: "Others",
    is_rentable: true,
    max_allowable_days: 0,
    listed_by: user?.id || 0,
    photos: [] as string[],
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const productData = {
      ...formData,
      amount: parseInt(formData.amount),
      max_allowable_days: formData.is_rentable
        ? parseInt(String(formData.max_allowable_days))
        : null,
    };

    console.log("Ready to submit:", productData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Product Photos</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <MultiImageUpload
                  onUploadComplete={(urls: string[]) =>
                    setFormData({ ...formData, photos: urls })
                  }
                />
                <p className="text-sm text-gray-500 mt-2">
                  Users can upload up to 5 photos. Note the first photo will be thumbnail in marketplace
                </p>
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your product"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.Category}
                onValueChange={(value) => handleInputChange("Category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product Type */}
            <div className="space-y-2">
              <Label>Product Type</Label>
              <Select
                value={formData.is_rentable ? "rentable" : "sellable"}
                onValueChange={(value) =>
                  handleInputChange("is_rentable", value === "rentable")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sellable">For Sale</SelectItem>
                  <SelectItem value="rentable">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">
                {formData.is_rentable ? "Rent Amount (per day)" : "Selling Amount"}
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="Enter amount in Rs."
                required
                min="0"
              />
            </div>

            {/* Max Allowable Days - Only show if rentable */}
            {formData.is_rentable && (
              <div className="space-y-2">
                <Label htmlFor="max_days">Maximum Rental Days</Label>
                <Input
                  id="max_days"
                  type="number"
                  value={formData.max_allowable_days}
                  onChange={(e) => handleInputChange("max_allowable_days", e.target.value)}
                  placeholder="Enter maximum rental days"
                  required
                  min="1"
                />
              </div>
            )}

            {/* Submit Button */}
            <Button onClick={handleSubmit} className="w-full">
              Add Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
