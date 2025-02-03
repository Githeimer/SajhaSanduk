"use client";

import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircle, User, Menu, Home } from "lucide-react";
import { useUser } from "@/hooks/userHook";
import Logout from "@/components/Auth/Logout";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const { user, loading } = useUser();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">User not found. Please login.</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block w-64 bg-gray-950 text-white p-6">
        <Sidebar user={user} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-gray-950 text-white p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-gray-950 text-white p-6">
              <Sidebar user={user} />
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ user }: { user: any }) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col h-full">
        <div className="mb-8 flex flex-col items-center">
          <Avatar className="h-12 w-12 mb-2">
            <AvatarImage src={user.image || "https://avatar.iran.liara.run/public"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
        </div>
        <hr className="p" />
        <nav className="space-y-3">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/addproduct">
            <Button variant="ghost" className="w-full justify-start">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </Link>
          <Link href={`/dashboard/${user.id}`}>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
          </Link>
        </nav>
      </div>
      <div className="py-10 flex justify-center items-center w-full">
        <Logout />
      </div>
    </div>
  );
}
