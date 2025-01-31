import Navbar from "@/components/Landing/Navbar"
import { Metadata } from "next";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
    title: "Dashboard | Sajha Sanduk",
    description: "Manage your products and view recent sales",
  }
  
export default function Layout({ children }: LayoutProps) {
    return(
        <div className="flex flex-col">
        {children}
        </div>
    )
}