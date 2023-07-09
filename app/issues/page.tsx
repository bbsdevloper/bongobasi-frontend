'use client';
import { IIssueData } from '@/Interface/ReportIinterface';
import Navbar from '@/components/Navbar'
import ReportIssueCard from '@/components/Problem/ReportIssueCard';
import { fetchAllIssue } from '@/functions/issueReport.tsx/fetchAllIssue';
import React, { useEffect } from 'react'



const Issues = () => {

  const [issues, setIssues] = React.useState<IIssueData[]>([])


  useEffect(() => {
    handleGetAllIssues()
  }, [])

  const handleGetAllIssues = async () => {
    try {
      const res = await fetchAllIssue()
      setIssues(res)
      console.log(res)
    } catch (err: any) {
      console.log(err)
    }


  }

  return (
    <div className='bg-blueBackground pb-6 min-h-screen'>
      <Navbar />

      <div className='bg-white mx-8 my-8 rounded-lg p-8 shadow-xl min-h-[90vh]'>
        <h1 className='text-2xl font-semibold text-blueDeep mb-6'>Issues In Your Area</h1>
        <div className='space-y-4'>
          {issues.map((issue, id) => {
            return (
              <ReportIssueCard
                key={id}
                title={issue.issuetitle}
                date={issue.issuedate}
                level={issue.issuelevel}
                description={issue.issuedescription}
                location={issue.issuelocation}
                progress={issue.issueprogress}
                type={issue.issuetype}
                id={issue?._id}
              />
            )
          })}
        </div>


      </div>

    </div>
  )
}

export default Issues