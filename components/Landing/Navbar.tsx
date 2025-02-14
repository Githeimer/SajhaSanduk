"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "@/hooks/userHook";
import Logout from "../Auth/Logout";
import { Button } from "../ui/button";
import { ShoppingCart, ChevronDown, Router } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout,loading } = useUser();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [cartLength,setCartLength]=React.useState(0);
  const router=useRouter();


  useEffect(() => {
    setCartLength(user?.CART?.length || 0);
  }, [user?.CART]);

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

 
  return (
    <div className="fixed top-0 w-full z-[200]">
      <div className="backdrop-blur-lg bg-[#ffffff]/60 border-b border-white/20 shadow-sm">
        <div className="flex flex-row p-3 justify-between items-center landing_container font-[inter]">
          {/* Logo and Title */}
          <div className="flex flex-row items-center">
            <Link href={"/"}>
              <span className="font-bold text-3xl">
                <span className="text-[#2d20c0]">Sajha</span> Sanduk
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-row mx-auto items-center justify-center gap-3 font-bold cursor-pointer">
            <ul className="flex flex-row items-center gap-4">
              <Link href={"/marketplace"} className="hover:text-[#2d20c0] transition-colors">
                Market
              </Link>
              <Link href={"/#about"} className="hover:text-[#2d20c0] transition-colors">
                About
              </Link>
              <Link href={"/#team"} className="hover:text-[#2d20c0] transition-colors">
                Team
              </Link>
            </ul>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>

          {/* Desktop Cart and User Section */}
          <div className="hidden md:flex flex-row items-center gap-4">
            {user ? (
              <>
                {/* Cart Button */}
                <Link href="/marketplace/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartLength}
                    </span>
                  </Button>
                </Link>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.Image} />
                        <AvatarFallback className="bg-[#2d20c0] text-white">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/dashboard/${user?.id}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 cursor-pointer">
                      <Logout/>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="backdrop-blur-sm transition-all">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-800/90 hover:bg-blue-800 text-white backdrop-blur-sm transition-all">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="absolute top-[60px] left-0 w-full backdrop-blur-3xl bg-white/90 shadow-lg border-t border-white/20 md:hidden">
              <ul className="flex flex-col items-center gap-4 text-lg font-medium p-4">
                <Link href={"/marketplace"}>
                  <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300/50 w-full text-center py-2">
                    Market
                  </li>
                </Link>
                <Link href={"/#about"}>
                  <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300/50 w-full text-center py-2">
                    About
                  </li>
                </Link>
                <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300/50 w-full text-center py-2">
                  Team
                </li>
              <div className="flex flex-col w-full items-center justify-around gap-2">
              <Button  variant={"link"} onClick={()=>{
                  router.push("/dashboard");
                }}>
                  <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300/50 w-full text-center py-2">
                    Dashboard
                  </li>
                </Button>
                <Button variant={"link"} onClick={()=>{
                  router.push(`/dashboard/${user.id}`);
                }}>
                  <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300/50 w-full text-center py-2">
                   
                  </li>
                </Button>
              </div>
                {user && (
                  <Link href="/marketplace/cart">
                  <Button variant="ghost" size="icon" className="relative">
                  CART
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                     {user.CART.length}
                    </span>
                  </Button>
                </Link>
                )}
              </ul>

              {/* Mobile Sign Up and Login Buttons */}
              <div className="flex flex-col items-center gap-4 p-4">
                {user ? (
                 
                    <Logout/>
                 
                ) : (
                  <>
                    <Link href="/login">
                      <Button className="bg-[#2d20c0]/90 text-white hover:bg-[#493ee8] w-32 backdrop-blur-sm transition-all">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button
                        variant={'outline'}
                        className="border-2 border-blue-700/70 hover:bg-[#ededee]/50 text-[#2d20c0] w-32 backdrop-blur-sm transition-all"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;