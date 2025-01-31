"use client";
import { ReactNode, useState } from "react";
import Navbar from "@/components/Landing/Navbar";
import Sidebar from "@/components/marketplace/Sidebar";
import SearchBar from "@/components/marketplace/SearchBar";
import Banner from "@/components/marketplace/Banner";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";


interface LayoutProps {
  children: ReactNode;
}



export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row pt-16"> {/* Add pt-16 to account for fixed navbar */}
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          className="lg:hidden fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-primary text-white shadow-lg"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <Menu />
        </Button>

        {/* Sidebar with responsive behavior */}
        <div
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static lg:flex-shrink-0 w-64 h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300 ease-in-out z-40 bg-background`}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 lg:pl-6">
          <Banner />
          <SearchBar />
          {children}
        </main>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}