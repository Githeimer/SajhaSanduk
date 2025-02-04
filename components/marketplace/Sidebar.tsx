"use client";
import { useState, useEffect, Suspense } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";

const categories = ["Electronics", "Mechanical", "Books", "Tools and DIY", "Music", "Others"];

 function SidebarComponent() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [recommended, setRecommended] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams.toString()]); 

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push(`/marketplace?category=${category}`);
  };

  return (
    <aside className="fixed lg:static w-64 bg-white p-6 border-r transition-transform duration-300 z-10">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <Slider 
          min={0} 
          max={1000} 
          step={10} 
          value={priceRange} 
          onValueChange={setPriceRange} 
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Rs{priceRange[0]}</span>
          <span>Rs{priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <RadioGroup 
          value={selectedCategory} 
          onValueChange={(value) => handleCategoryChange(value)} // ✅ Fixed
          className="space-y-2"
        >
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={category} />
              <label htmlFor={category} className="text-sm font-medium leading-none cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Recommended Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Recommendation</h3>
        <RadioGroup
          value={recommended ? "recommended" : "all"}
          onValueChange={(value) => setRecommended(value === "recommended")}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <label htmlFor="all" className="text-sm font-medium leading-none cursor-pointer">
              Show All
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="recommended" id="recommended" />
            <label htmlFor="recommended" className="text-sm font-medium leading-none cursor-pointer">
              Recommended Only
            </label>
          </div>
        </RadioGroup>
      </div>
    </aside>
  );
}

export default function Sidebar()
{
  return(
    <Suspense fallback={<>Loading...</>}>
      <SidebarComponent></SidebarComponent>
    </Suspense>
  )
}