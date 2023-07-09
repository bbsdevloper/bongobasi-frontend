import { IIssueData } from '@/Interface/ReportIinterface'
import { format, intervalToDuration } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsGraphUp } from 'react-icons/bs'
import { LuMapPin } from 'react-icons/lu'

const ReportIssueCard = ({ title, date, description, location, progress, level, type, id }: any) => {
    const daysPassed = intervalToDuration({ start: parseInt(date), end: Date.now() })
    const router = useRouter()

    return (
        <div className={`px-6 py-4 border-l-8 ${level === 'low' && 'border-blue-600'} ${level === 'moderate' && 'border-yellow-500'} ${level === 'severe' && 'border-red-600'}  rounded-lg w-full shadow-custom`}>
            <div className='flex justify-between items-center'>
                <section className='flex justify-start items-center mb-1 gap-2 '>
                    <h2 className='text-lg'>{title}</h2>
                    <span className='font-medium text-lightTextColor'>( {format(parseInt(date), "PP")} )</span>
                </section>
                <button className='btn-primary' onClick={()=> router.push(`/issues/${id}`)}>
                    View Details
                </button>
            </div>
            <h4 className='text-base font-light text-[#00184485] mb-3'>{daysPassed.days} days Ago</h4>
            <section className='flex justify-start items-center gap-8 mb-3'>
                <section className='flex justify-start gap-2 items-center cursor-pointer anchor-custom'>
                    <LuMapPin color='#1A75FF' size={'25'} />
                    {/* <span>{location}</span> */}
                </section>
                <section className='flex justify-start items-center'>
                    <BsGraphUp color='#1A75FF' size={'25'} />
                    <span className='ml-2 mr-2 font-semibold'>Progress:</span>
                    <span className={`${progress === 'started' && 'text-yellow-600'} ${progress === 'not started' && 'text-red-600'} ${progress === 'finished' && 'text-green-600'}`}>{progress}</span>
                </section>
                <section className='flex justify-start items-center'>
                    <BsGraphUp color='#1A75FF' size={'25'} />
                    <span className='ml-2 mr-2 font-semibold'>Type:</span>
                    <span>{type}</span>
                </section>
            </section>

            <p className=' text-lightTextColor text-base'>{description}</p>
        </div>
    )
}

export default ReportIssueCard