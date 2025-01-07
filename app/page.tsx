import Hero from '@/components/Landing/Hero'
import Navbar from '@/components/Landing/Navbar'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div className='landing_container'>
      <Navbar></Navbar>
      <Hero></Hero>
    </div>
  )
}

export default Home