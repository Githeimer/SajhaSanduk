import { Metadata } from "next";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}


export const metadata: Metadata = {
    title: "Marketplace | Sajha Sanduk",
    description: "Rent or Sell Tools, Marketplace designed for students,special focus for Kathmandu University",
  }
  
export default function Layout({children}:LayoutProps)
{
    return(
        <>
          {children}
          </>
      
    )
}