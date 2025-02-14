"use client"
import { useState, useEffect, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

 function SearchBarComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    if (!params.has("category")) {
      params.set("category", "All");
    }

    router.push(`/marketplace?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex">
      <Input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mr-2"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}

export default function SearchBar()
{
return(
  <Suspense fallback={<>Loading...</>}>
      <SearchBarComponent />
    </Suspense>
)
}


