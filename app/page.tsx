import Hero from '@/components/Landing/Hero'
import Navbar from '@/components/Landing/Navbar'
import Products from '@/components/Landing/Products'
import React from 'react'
import { BentoGrid } from '@/components/ui/bento-grid'
import { ProjectOverview } from '@/components/Landing/Overview'


const Home = () => {
  return (
    <div className='bg-[#fdfaff]'>
      <Navbar></Navbar>
      <Hero></Hero>
      <Products></Products>
      <main className="container landing_container mx-auto py-12 ">
      <h1 className="text-3xl font-bold text-left mb-8">Our Features</h1>
      <BentoGrid />
    </main>
    <ProjectOverview></ProjectOverview>
     
    </div>
  )
}

export default Home