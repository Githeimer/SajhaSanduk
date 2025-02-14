import Link from 'next/link';
import React from 'react';
import { FaTools } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoHardwareChip } from "react-icons/io5";
import { PiPencilRulerFill } from "react-icons/pi";
import { MdMiscellaneousServices } from "react-icons/md";
import { Music4Icon as Music } from 'lucide-react';

const Tools = () => {
  return (
    <div className="w-full" >
      <div className="landing_container">
        <div className="flex flex-row w-full p-4 text-3xl gap-4 md:gap-20 items-center">
          <Link href="/marketplace?category=Mechanical">
            <div className="relative text-center group">
              <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full opacity-60 blur-lg -z-10 group-hover:opacity-80 group-hover:blur-md transition-all duration-300"></div>
              <FaTools className="mx-auto text-gray-700 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm mt-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Tools</p>
            </div>
          </Link>
          <Link href="/marketplace?category=Books">
            <div className="relative text-center group">
              <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full opacity-60 blur-lg -z-10 group-hover:opacity-80 group-hover:blur-md transition-all duration-300"></div>
              <MdOutlineMenuBook className="mx-auto text-gray-700 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm mt-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Books</p>
            </div>
          </Link>
          <Link href="/marketplace?category=Electronics">
            <div className="relative text-center group">
              <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full  opacity-60 blur-lg -z-10 group-hover:opacity-80 group-hover:blur-md transition-all duration-300"></div>
              <IoHardwareChip className="mx-auto text-gray-700 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm mt-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Electronics</p>
            </div>
          </Link>
          <Link href="/marketplace?category=Tools%20and%20DIY">
            <div className="relative text-center group">
              <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full  opacity-60 blur-lg -z-10 group-hover:opacity-80 group-hover:blur-md transition-all duration-300"></div>
              <PiPencilRulerFill className="mx-auto text-gray-700 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm mt-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Design</p>
            </div>
          </Link>
          <Link href="/marketplace?category=Music">
            <div className="relative text-center group">
              <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full opacity-60 blur-lg -z-10 group-hover:opacity-80 group-hover:blur-md transition-all duration-300"></div>
              <Music className="mx-auto text-gray-700 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm mt-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Music</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tools;
