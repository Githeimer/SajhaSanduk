"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/marketplace/pagination";
import MarketCard from "@/components/ui/marketCard";
import Navbar from "@/components/Landing/Navbar";
import Logout from "@/components/Auth/Logout";

const categories = ["Electronics", "Mechanical", "Books", "Tools and diy", "Music"];

// Mock products for demonstration
const products = [
  // Electronics
  {
    id:0,
    name: "Arduino Set",
    price: 150,
    rating: 4,
    image: "https://qqtrading.com.my/image/cache/catalog/Products/Arduino/KIT/KIT-STARTER-UNO-700x700.jpg",
    category: "Electronics",
    listedBy: {
      name: "Larry ",
      avatar: "https://ui.shadcn.com/avatars/04.png",
    },
    description: "Random product too plain dont buy jk rent rent rent",
    listingType: "rent",
  },

  {
    id:220,
    name: "3rd Sem Notes (CS)",
    price: 500,
    rating: 4,
    image: "https://www.theopennotebook.com/wp-content/uploads/2012/05/pile-of-notes.jpg",
    category: "Books",
    listedBy: {
      name: "CR Kta",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW4nZ4G82StJYNgPRfYDBKbXdo1q1jHZj-TA&s",
    },
    description: "Yet another rentable product with a good daily rate.",
    listingType: "sale",
  },
  
  {
    'id': 1,
    'name': 'Fujifilm Instax Mini 12',
    'price': 800,
    'rating': 4.8,
    'image': '/placeholder.svg?height=200&width=200&text=Fujifilm+Instax+Mini',
    'category': 'Electronics',
    'description': 'Instant camera with built-in printer for quick, fun photo prints.',
    'listedBy': {
      'name': 'Komal',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Komal'
    },
    'listingType': 'sale'
  },
  {
    'id': 2,
    'name': 'Arduino Uno',
    'price': 350,
    'rating': 4.5,
    'image': '/placeholder.svg?height=200&width=200&text=Arduino+Uno',
    'category': 'Electronics',
    'description': 'Microcontroller board based on ATmega328P for DIY projects.',
    'listedBy': {
      'name': 'Vivek',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Vivek'
    },
    'listingType': 'sale'
  },
  {
    'id': 3,
    'name': 'Raspberry Pi 4 Model B',
    'price': 700,
    'rating': 4.7,
    'image': '/placeholder.svg?height=200&width=200&text=Raspberry+Pi+4',
    'category': 'Electronics',
    'description': 'Powerful single-board computer for a variety of DIY projects.',
    'listedBy': {
      'name': 'Nisha',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Nisha'
    },
    'listingType': 'sale'
  },
  {
    'id': 4,
    'name': 'HP Wireless Mouse',
    'price': 150,
    'rating': 4.2,
    'image': '/placeholder.svg?height=200&width=200&text=Wireless+Mouse',
    'category': 'Electronics',
    'description': 'Wireless mouse with ergonomic design for comfort.',
    'listedBy': {
      'name': 'Sneha',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Sneha'
    },
    'listingType': 'sale'
  },
  {
    'id': 5,
    'name': 'Sony Wireless Headphones',
    'price': 650,
    'rating': 4.9,
    'image': '/placeholder.svg?height=200&width=200&text=Sony+Headphones',
    'category': 'Electronics',
    'description': 'High-quality sound and noise-cancelling headphones.',
    'listedBy': {
      'name': 'Rohit',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Rohit'
    },
    'listingType': 'sale'
  },

  // Mechanical
  {
    'id': 6,
    'name': 'Adjustable Wrench 8”',
    'price': 250,
    'rating': 4.3,
    'image': '/placeholder.svg?height=200&width=200&text=Wrench',
    'category': 'Mechanical',
    'description': 'Adjustable wrench with a non-slip grip for mechanical tasks.',
    'listedBy': {
      'name': 'Anil',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Anil'
    },
    'listingType': 'sale'
  },
  {
    id:100,
    name: "Soldering Iron Set",
    price: 200,
    rating: 4,
    image: "https://a1autozone.co.uk/wp-content/uploads/2022/06/WWS-GLK9-Y02S-Soldering-Gun-Picture.png",
    category: "Electronics",
    listedBy: {
      name: "Goated Ram",
      avatar: "https://github.com/shadcn.png",
    },
    description: "Another random product, better suited for renting.",
    listingType: "rent",
  },
  {
    'id': 7,
    'name': 'Hammer 0.5kg',
    'price': 200,
    'rating': 4.5,
    'image': '/placeholder.svg?height=200&width=200&text=Hammer+0.5kg',
    'category': 'Mechanical',
    'description': 'Lightweight hammer for light mechanical tasks.',
    'listedBy': {
      'name': 'Harsh',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Harsh'
    },
    'listingType': 'sale'
  },
  {
    'id': 8,
    'name': 'Cordless Drill 18V',
    'price': 400,
    'rating': 4.7,
    'image': '/placeholder.svg?height=200&width=200&text=Cordless+Drill',
    'category': 'Mechanical',
    'description': 'Cordless drill with 18V power and multiple speed settings.',
    'listedBy': {
      'name': 'Pooja',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Pooja'
    },
    'listingType': 'sale'
  },
  {
    id:320,
    name: "EDRG Set",
    price: 120,
    rating: 4,
    image: "https://m.media-amazon.com/images/I/61ug5qrIp6S._AC_UF1000,1000_QL80_.jpg",
    category: "Books",
    listedBy: {
      name: "Pasale Didi",
      avatar: "https://ui.shadcn.com/avatars/03.png",
    },
    description: "A buyable product that is worth your money.",
    listingType: "sale",
  },
  {
    'id': 9,
    'name': 'Screwdriver Set 28 pcs',
    'price': 350,
    'rating': 4.6,
    'image': '/placeholder.svg?height=200&width=200&text=Screwdriver+Set',
    'category': 'Mechanical',
    'description': '28-piece set of screwdrivers for various mechanical uses.',
    'listedBy': {
      'name': 'Komal',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Komal'
    },
    'listingType': 'sale'
  },
  {
    'id': 10,
    'name': 'Precision Measuring Tools Set',
    'price': 500,
    'rating': 4.8,
    'image': '/placeholder.svg?height=200&width=200&text=Measuring+Tools',
    'category': 'Mechanical',
    'description': 'Precision measuring tools for fine mechanical work.',
    'listedBy': {
      'name': 'Vivek',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Vivek'
    },
    'listingType': 'rent'
  },

  // Books
  {
    'id': 11,
    'name': 'Introduction to Algorithms',
    'price': 800,
    'rating': 4.7,
    'image': '/placeholder.svg?height=200&width=200&text=Algorithms',
    'category': 'Books',
    'description': 'Comprehensive guide to algorithms and data structures.',
    'listedBy': {
      'name': 'Sahil',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Sahil'
    },
    'listingType': 'sale'
  },
  {
    'id': 12,
    'name': 'Clean Code by Robert C. Martin',
    'price': 500,
    'rating': 4.9,
    'image': '/placeholder.svg?height=200&width=200&text=Clean+Code',
    'category': 'Books',
    'description': 'A practical guide to writing clean, maintainable code.',
    'listedBy': {
      'name': 'Anil',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Anil'
    },
    'listingType': 'rent'
  },
  {
    'id': 13,
    'name': 'The Pragmatic Programmer',
    'price': 600,
    'rating': 4.8,
    'image': '/placeholder.svg?height=200&width=200&text=Pragmatic+Programmer',
    'category': 'Books',
    'description': 'Essential reading for every software developer.',
    'listedBy': {
      'name': 'Rohit',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Rohit'
    },
    'listingType': 'sale'
  },
  {
    'id': 14,
    'name': 'Effective Java by Joshua Bloch',
    'price': 650,
    'rating': 4.9,
    'image': '/placeholder.svg?height=200&width=200&text=Effective+Java',
    'category': 'Books',
    'description': 'Must-read book for Java developers to write better code.',
    'listedBy': {
      'name': 'Nisha',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Nisha'
    },
    'listingType': 'sale'
  },

  // Tools and diy
  {
    'id': 15,
    'name': 'Laser Distance Meter',
    'price': 450,
    'rating': 4.6,
    'image': '/placeholder.svg?height=200&width=200&text=Laser+Meter',
    'category': 'Tools and diy',
    'description': 'High-precision laser distance meter.',
    'listedBy': {
      'name': 'Vivek',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Vivek'
    },
    'listingType': 'sale'
  },
  {
    'id': 16,
    'name': 'Electric Power Drill',
    'price': 550,
    'rating': 4.7,
    'image': '/placeholder.svg?height=200&width=200&text=Electric+Drill',
    'category': 'Tools and diy',
    'description': 'Electric drill with powerful motor for DIY projects.',
    'listedBy': {
      'name': 'Sahil',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Sahil'
    },
    'listingType': 'sale'
  },
  {
    'id': 17,
    'name': 'Cordless Soldering Iron',
    'price': 320,
    'rating': 4.4,
    'image': '/placeholder.svg?height=200&width=200&text=Soldering+Iron',
    'category': 'Tools and diy',
    'description': 'Cordless soldering iron for convenient use.',
    'listedBy': {
      'name': 'Komal',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Komal'
    },
    'listingType': 'sale'
  },
  {
    'id': 18,
    'name': 'Hand Tool Set',
    'price': 450,
    'rating': 4.5,
    'image': '/placeholder.svg?height=200&width=200&text=Hand+Tool+Set',
    'category': 'Tools and diy',
    'description': 'Complete hand tool set for various DIY tasks.',
    'listedBy': {
      'name': 'Pooja',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Pooja'
    },
    'listingType': 'rent'
  },
  {
    'id': 19,
    'name': 'LED Work Light',
    'price': 350,
    'rating': 4.6,
    'image': '/placeholder.svg?height=200&width=200&text=LED+Light',
    'category': 'Tools and diy',
    'description': 'Energy-efficient LED work light for DIY projects.',
    'listedBy': {
      'name': 'Sneha',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Sneha'
    },
    'listingType': 'sale'
  },

  // Music
  {
    'id': 20,
    'name': 'Yamaha P-125 Digital Piano',
    'price': 1000,
    'rating': 4.9,
    'image': '/placeholder.svg?height=200&width=200&text=Piano',
    'category': 'Music',
    'description': 'Compact digital piano with full-size keys.',
    'listedBy': {
      'name': 'Nisha',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Nisha'
    },
    'listingType': 'sale'
  },
  {
    'id': 21,
    'name': 'Fender Acoustic Guitar',
    'price': 950,
    'rating': 4.8,
    'image': '/placeholder.svg?height=200&width=200&text=Acoustic+Guitar',
    'category': 'Music',
    'description': 'High-quality acoustic guitar with rich sound.',
    'listedBy': {
      'name': 'Komal',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Komal'
    },
    'listingType': 'sale'
  },
  {
    'id': 22,
    'name': 'Sony Noise Cancelling Headphones',
    'price': 800,
    'rating': 4.7,
    'image': '/placeholder.svg?height=200&width=200&text=Noise+Cancelling',
    'category': 'Music',
    'description': 'Noise-cancelling headphones for immersive listening.',
    'listedBy': {
      'name': 'Vivek',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Vivek'
    },
    'listingType': 'sale'
  },
  {
    'id': 23,
    'name': 'Korg Volca Drum Synthesizer',
    'price': 500,
    'rating': 4.5,
    'image': '/placeholder.svg?height=200&width=200&text=Drum+Synthesizer',
    'category': 'Music',
    'description': 'Analog drum synthesizer for creating unique sounds.',
    'listedBy': {
      'name': 'Sahil',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Sahil'
    },
    'listingType': 'sale'
  },
  {
    'id': 24,
    'name': 'Roland TR-8S Drum Machine',
    'price': 950,
    'rating': 4.8,
    'image': '/placeholder.svg?height=200&width=200&text=Drum+Machine',
    'category': 'Music',
    'description': 'Versatile drum machine for electronic music producers.',
    'listedBy': {
      'name': 'Rohit',
      'avatar': 'https://avatar.iran.liara.run/public/boy?username=Rohit'
    },
    'listingType': 'sale'
  }
];




export default function Marketplace() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [recommended, setRecommended] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-64 bg-white p-6 border-r transition-transform duration-300 z-10 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Price filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Price Range</h3>
          <Slider min={0} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Rs{priceRange[0]}</span>
            <span>Rs{priceRange[1]}</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Categories</h3>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="text-sm font-medium">
                {category}
              </label>
            </div>
          ))}
        </div>

        {/* Recommended filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
          <Checkbox 
  id="recommended" 
  checked={recommended} 
  onCheckedChange={(value) => setRecommended(value === 'indeterminate' ? false : value)} 
/>

            <label htmlFor="recommended" className="text-sm font-medium">
              Recommended
            </label>
          </div>
        </div>

        <Logout></Logout>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="outline"
          className="lg:hidden mb-4"
          onClick={() => setSidebarVisible((prev) => !prev)}
        >
          {isSidebarVisible ? "Hide Filters" : "Show Filters"}
        </Button>

        {/* Banner */}
        <div className="w-full h-40 bg-muted mb-6 rounded-lg overflow-hidden">
          <img
            src="https://img.freepik.com/free-vector/bank-customer-getting-loan-online-man-wheeling-cart-with-cash-from-gadget-screen-woman-flat-vector-illustration_74855-10543.jpg"
            alt="Marketplace banner"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Search bar */}
        <div className="mb-6 flex">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mr-2"
          />
          <Button>Search</Button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {filteredProducts.map((product) => (
            <MarketCard key={product.id} {...product} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination />
      </main>

      {/* Sidebar Overlay */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={() => setSidebarVisible(false)}
        />
      )}
    </div>
    </>
  );
}
