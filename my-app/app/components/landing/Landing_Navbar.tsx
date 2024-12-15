import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link } from '@remix-run/react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for the hamburger menu

type Props = {};

const Landing_Navbar = (props: Props) => {
  const [menuOpen, setMenuOpen] = useState(false); // For toggling the menu on mobile

  return (
    <div className='flex flex-row p-3 justify-between items-center relative'>
      {/* Logo and Title */}
      <div className='flex flex-row items-center gap-1'>
        <span className='font-bold text-3xl'>
          <span className='text-[#2d20c0]'>Sajha</span> Sanduk
        </span>
      </div>

      {/* Navbar Links (Desktop) */}
      <div className="hidden md:flex flex-row items-center gap-4 text-lg font-medium cursor-pointer">
        <ul className="flex flex-row items-center gap-4">
          <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105">Shop</li>
          <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105">About</li>
          <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105">Team</li>
          <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105">Contact</li>
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
        <Link to="/auth?mode=login">
          <Button className='bg-[#2d20c0] text-white hover:bg-[#493ee8] w-32'>
            Login
          </Button>
        </Link>
        <Link to="/auth?mode=signup">
          <Button variant={'outline'} className='border-2 outline-blue-800 border-blue-700 hover:bg-[#ededee] text-[#2d20c0] w-32'>
            Sign Up
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md z-20 md:hidden">
          <ul className="flex flex-col items-center gap-4 text-lg font-medium p-4">
            <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300 w-full text-center py-2">Shop</li>
            <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300 w-full text-center py-2">About</li>
            <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300 w-full text-center py-2">Team</li>
            <li className="transition-all duration-300 hover:text-[#2d20c0] hover:scale-105 border-b border-gray-300 w-full text-center py-2">Contact</li>
          </ul>

          {/* Mobile Sign Up and Login Buttons */}
          <div className="flex flex-col items-center gap-4 p-4">
            <Link to="/auth">
              <Button className='bg-[#2d20c0] text-white hover:bg-[#493ee8] w-32'>
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant={'outline'} className='border-2 outline-blue-800 border-blue-700 hover:bg-[#ededee] text-[#2d20c0] w-32'>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing_Navbar;
