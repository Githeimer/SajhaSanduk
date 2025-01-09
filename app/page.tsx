import Hero from '@/components/Landing/Hero'
import Navbar from '@/components/Landing/Navbar'
import Products from '@/components/Landing/Products'
import Tools from '@/components/Landing/Tools'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div className='bg-[#fdfaff]'>
      <Navbar></Navbar>
      <Hero></Hero>
      <Products></Products>
     
    </div>
  )
}

export default Home