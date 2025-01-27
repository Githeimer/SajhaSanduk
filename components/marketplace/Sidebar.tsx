"use client"
import { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import  Logout  from "@/components/Auth/Logout";

const categories = ["Electronics", "Mechanical", "Books", "Tools and diy", "Music"];

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [recommended, setRecommended] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    router.push(`/marketplace?category=${category}`);
  };

  return (
    <aside className="fixed lg:static w-64 bg-white p-6 border-r transition-transform duration-300 z-10">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <Slider min={0} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Rs{priceRange[0]}</span>
          <span>Rs{priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category} className="text-sm font-medium">
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="recommended"
            checked={recommended}
            onCheckedChange={(value) => setRecommended(value === "indeterminate" ? false : value)}
          />
          <label htmlFor="recommended" className="text-sm font-medium">
            Recommended
          </label>
        </div>
      </div>

      <Logout />
    </aside>
  );
}
