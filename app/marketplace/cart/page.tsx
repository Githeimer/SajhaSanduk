"use client"
import Navbar from '@/components/Landing/Navbar'
import { useUser } from '@/hooks/userHook'
import React from 'react'

const Cart = () => {
  const {user}=useUser();
  // console.log(user);
  return (
    <div className='flex flex-col'>
    <Navbar/>
    <div className='landing_container'>
      <div className='mt-16'>
        <h1>Cart paage</h1>
        <div>
          {user? <div>Hello </div>:<div>Login to See your cart</div>}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart