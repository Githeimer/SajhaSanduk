"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import Tools from "./Tools";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center justify-center flex-col h-96 md:h-[29rem] px-4 bg-hero-pattern bg-center mt-16">
      {/* Overlay to reduce the opacity of the background image */}
      <div className="absolute inset-0 bg-[#f4f6ff] opacity-70"></div>

      {/* Content */}
      <div className="z-10 flex flex-col mt-10 items-center justify-center text-center gap-5">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-950 font-[inter] mb-4">
          Share Your Tools
          <br />
          Earn with Ease
        </h1>

        <div className="w-full max-w-[300px] md:max-w-[600px]">
          <div className="flex items-center justify-center">
            <Input
              placeholder="Something you want to Rent...Eg: Arduino, Drafter."
              className="rounded-none text-sm focus-visible:ring-0 h-8 md:h-[50px] p-1 md:p-3 bg-white border-blue-500 w-full glow-effect"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Search
              className="text-white bg-blue-500 p-3 h-8 md:h-[50px] rounded-r-lg cursor-pointer"
              size={40}
              onClick={handleSearch}
            />
          </div>
        </div>

        <div className="pt-5 md:pt-10">
          <Tools></Tools>
        </div>
      </div>
    </div>
  );
};

export default Hero;