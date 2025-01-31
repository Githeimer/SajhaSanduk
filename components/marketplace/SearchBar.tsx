"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/marketplace?search=${searchQuery}`);
  };

  return (
    <div className="mb-6 flex">
      <Input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mr-2"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
