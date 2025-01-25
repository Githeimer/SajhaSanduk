"use client"

import React, { useState } from 'react'


import { Slider } from '../ui/slider'
import { Checkbox } from '../ui/checkbox';
import Logout from '../Auth/Logout';

const categories = ["Electronics", "Mechanical", "Books", "Tools and diy", "Music"];


const Sidebar = () => {
    const [isSidebarVisible,setSidebarVisible]=useState(true);
    const [priceRange,setPriceRange]=useState([0,1000]);

    const handleCategoryChange=(category: string)=>{

    }
  return (
    <aside
   
   
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



    <Logout></Logout>
  </aside>

  )
}

export default Sidebar