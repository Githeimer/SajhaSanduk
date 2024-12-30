import React from "react";

export function SajhaSandukFooter() {
  return (
    <footer className="w-full relative bg-gray-900 text-white ">
      {/* Wavy Border */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden -translate-y-full">
        <svg
          className="relative block w-full h-12 text-gray-900 bg-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V60c200,40 400,-40 600,0c200,40 400,-40 600,0V0Z"
            fill="white"
          />
        </svg>
      </div>
      

      {/* Footer Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Title */}
        <div className="text-center">
          <h5 className="text-xl font-bold mb-4">Sajha Sanduk</h5>
          <p className="text-gray-400">
            Building a sustainable future through community-driven tool sharing and collaboration.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="/" className="text-gray-400 hover:text-white">Home</a>
          <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
          <a href="/features" className="text-gray-400 hover:text-white">Features</a>
          <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
        </div>

        {/* Copyright Section */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Sajha Sanduk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
