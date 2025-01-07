"use client"
import React from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast,Toaster } from 'sonner'
import { useRouter } from 'next/navigation'


const Logout = () => {
const router=useRouter();
    const handleLogout=async()=>{
        try {
            const response:any= await axios.get("api/users/logout");
            console.log(response);
            if(!response.data.success)
            {
              toast.error(response.data.error);
              return;
            }

            toast.success("Logout Successful");
            router.push("/login");
            
        } catch (error:any) {
            toast.error("Error"+error.message)
        }
    }

  return (
    <div className='landing_container'>
        <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
        <Toaster></Toaster>
    </div>
  )
}

export default Logout