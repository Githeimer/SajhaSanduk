"use client";
import { useState, useEffect, Suspense } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/userHook";

const categories = ["Electronics", "Mechanical", "Books", "Tools and DIY", "Music", "Others", "All"];

function SidebarComponent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"all" | "recommended">("all");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const recommendedFromUrl = searchParams.get("recommended");
    
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
    
    if (recommendedFromUrl === "true") {
      setViewMode("recommended");
    }
  }, [searchParams,user]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    
    // Keep the recommendation parameter if it exists
    if (viewMode === "recommended") {
      params.set("recommended", "true");
      if (user?.id) {
        params.set("userId", user.id);
      }
    }
    
    router.push(`/marketplace?${params.toString()}`);
  };

  const handleViewModeChange = (mode: "all" | "recommended") => {
    setViewMode(mode);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (mode === "recommended") {
      params.set("recommended", "true");
      if (user?.id) {
        params.set("userId", user.id);
      }
    } else {
      params.delete("recommended");
      params.delete("userId");
    }
    
    // Keep the category parameter if it exists
    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    
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

      {user && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">View Mode</h3>
          <RadioGroup
            value={viewMode}
            onValueChange={handleViewModeChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <label htmlFor="all" className="text-sm font-medium leading-none cursor-pointer">
                All Products
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recommended" id="recommended" />
              <label htmlFor="recommended" className="text-sm font-medium leading-none cursor-pointer">
                Near Me (1km radius)
              </label>
            </div>
          </RadioGroup>
          <p className="text-gray-400 text-sm mt-2">Shows products within 1km of your location</p>
        </div>
      )}
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