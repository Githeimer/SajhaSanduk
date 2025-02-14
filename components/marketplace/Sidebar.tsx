"use client";
import { useState, useEffect, Suspense } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";

const categories = ["Electronics", "Mechanical", "Books", "Tools and DIY", "Music", "Others", "All"];

function SidebarComponent() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [recommended, setRecommended] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    
    router.push(`/marketplace?${params.toString()}`);
  };

  return (
    <aside className="fixed lg:static w-64 bg-white p-6 border-r transition-transform duration-300 z-10">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <RadioGroup 
          value={selectedCategory} 
          onValueChange={handleCategoryChange}
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

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Recommendation</h3>
        <RadioGroup
          value={recommended ? "recommended" : "all"}
          onValueChange={(value) => setRecommended(value === "recommended")}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="recommended" id="recommended" />
            <label htmlFor="recommended" className="text-sm font-medium leading-none cursor-pointer">
              Recommended Only
            </label>
           
          </div>
          <p className="text-gray-400 text-sm">This Feature uses User's Location and show the nearest located product</p>
        </RadioGroup>
      </div>
    </aside>
  );
}

export default function Sidebar() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <SidebarComponent />
    </Suspense>
  );
}