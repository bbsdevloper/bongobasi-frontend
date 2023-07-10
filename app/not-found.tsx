"use client"
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React from 'react'
import {CgDanger} from 'react-icons/cg'

const page = () => {
  const router = useRouter()
  return (
    <div className='bg-blueBackground pb-6 min-h-screen'>
      <Navbar />
      <div className='bg-white mx-8 my-8 rounded-lg p-8 shadow-xl min-h-[80vh] flex flex-col justify-center items-center'>
        <CgDanger color='#880808' size={70}/>
        <h1 className='text-4xl font-bold'>404 Data Not Found!!</h1>
        <button className='btn-primary' onClick={()=>router.back()}>Go Back</button>
      </div>
    </div>
  )
}

export default page