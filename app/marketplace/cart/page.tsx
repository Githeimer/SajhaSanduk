"use client"
import Navbar from '@/components/Landing/Navbar'
import { useUser } from '@/hooks/userHook'
import React from 'react'

const Cart = () => {
  const {user,loading}=useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }
  return (

    <div className='flex flex-col'>
    <Navbar/>
    <div className='landing_container'>
      <div className='mt-16'>
        <h1>Cart paage</h1>
        <div>
          {user? <div>Hello {user?.name}, We'll Add this page soon, Currently being developed </div>:<div>Login to See your cart</div>}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart