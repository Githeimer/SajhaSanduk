import { ReactNode } from "react";
import Navbar from "@/components/Landing/Navbar";
import Sidebar from "@/components/marketplace/Sidebar";
import SearchBar from "@/components/marketplace/SearchBar";
import Banner from "@/components/marketplace/Banner";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-6">
          <Banner />
          <SearchBar />
          {children}
        </main>
      </div>
    </>
  );
}
