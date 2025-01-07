import Hero from '@/components/Landing/Hero'
import Navbar from '@/components/Landing/Navbar'
import Tools from '@/components/Landing/Tools'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div className='bg-[#f4f6ff]'>
      <Navbar></Navbar>
      <Hero></Hero>
     
    </div>
  )
}

export default Home