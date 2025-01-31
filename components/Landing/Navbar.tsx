"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "@/hooks/userHook";
import Logout from "../Auth/Logout";

const Navbar = () => {
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = React.useState(false);

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

          {/* Navbar Links (Desktop) */}
          <div className="hidden md:flex flex-row mx-auto items-center justify-center gap-3 font-bold cursor-pointer">
            <ul className="flex flex-row items-center gap-4">
              <Link href={"/marketplace"} className="hover:text-[#2d20c0] transition-colors">
                Market
              </Link>
              <Link href={"/#about"} className="hover:text-[#2d20c0] transition-colors">
                About
              </Link>
              <Link href={"/"} className="hover:text-[#2d20c0] transition-colors">
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

          {/* Sign Up and Login Buttons (Desktop) */}
          <div className="hidden md:flex flex-row items-center gap-1 text-lg">
            {user ? (
             <Logout/>
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
                </li></Link>
               <Link href={"/#about"}>
               <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300/50 w-full text-center py-2">
                  About
                </li></Link>
                <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300/50 w-full text-center py-2">
                  Team
                </li>
              <Link href={"https://github.com/githeimer/sajhasanduk"}>
              <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300/50 w-full text-center py-2">
                  Github
                </li></Link>
              </ul>

              {/* Mobile Sign Up and Login Buttons */}
              <div className="flex flex-col items-center gap-4 p-4">
                {user ? (
                  <Button
                    variant={"destructive"}
                    onClick={logout}
                    className=" w-32  transition-all"
                  >
                    Logout
                  </Button>
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