"use client"
import Navbar from '@/components/Navbar'
import { useUser } from '@/context/userContext'
import React from 'react'



const Verify = () => {

    const {user} = useUser()

  return (
    <div>
        <Navbar/>
        <div className='flex justify-center items-center min-h-[70vh]'>
            <div className='bg-white shadow-lg rounded-md w-full py-4 px-6'>
                <h1 className='text-2xl font-semibold text-blueDeep mb-6'>Verify your account</h1>
                <p className='text-lg'>Your account is not verified yet. Please verify your account to continue using the application.</p>
                <div className='flex justify-center items-center mt-6'>
                    <button className='btn-primary'>Verify Account</button>
                </div>
                {/* Upload a govt photo identity proof */}
                <div className='flex justify-center items-center mt-6'>
                    <button className='btn-primary'>Upload ID Proof</button>
                </div>


            </div>
            </div>


    </div>
  )
}

export default Verify