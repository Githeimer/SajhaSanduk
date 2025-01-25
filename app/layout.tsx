import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";
import Footer from "@/components/Landing/Footer";
import {UserProvider} from "@/store/userContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sajha Sanduk Dev",
  description: "Sajha Sanduk is a tool share platform dedicated for area around Kathmandu University ( KU )",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <UserProvider> {children}</UserProvider>
        <Toaster/>
        <Footer></Footer>
      </body>
    </html>
  );
}
