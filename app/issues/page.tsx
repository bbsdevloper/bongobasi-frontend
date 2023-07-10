'use client'
import { IIssueData } from '@/Interface/ReportIinterface'
import Navbar from '@/components/Navbar'
import ReportIssueCard from '@/components/Problem/ReportIssueCard'
import { fetchAllIssue } from '@/functions/issueReport.tsx/fetchAllIssue'
import { CircularProgress, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { GrLocation } from 'react-icons/gr'

const Issues = () => {
    const [issues, setIssues] = useState<IIssueData[]>([])
    const [levelSort, setLevelSort] = useState<string>()
    const [typeSort, setTypeSort] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [showableIssue, setShowableIssue] = useState<IIssueData[]>([])
    useEffect(() => {
        handleGetAllIssues()
    }, [])

    const handleGetAllIssues = async () => {
        setLoading(true)
        try {
            const res = await fetchAllIssue()
            setIssues(res)
            setShowableIssue(res)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const handleLevelSort = (e: any) => {
        setLevelSort(e.target.value)
        if (e.target.value === '1') {
            const res = issues.filter((data) => data.issuelevel === 'low')
            setShowableIssue(res)
        } else if (e.target.value === '2') {
            const res = issues.filter((data) => data.issuelevel === 'moderate')
            setShowableIssue(res)
        } else if (e.target.value === '3') {
            const res = issues.filter((data) => data.issuelevel === 'severe')
            setShowableIssue(res)
        } else {
            setShowableIssue(issues)
        }
    }
    const handleTypeSort = (e: any) => {
        setTypeSort(e.target.value)
        if (e.target.value === '1') {
            console.log('here')
            const res = issues.filter((data) => data.issuetype === 'Infrastructure Problems')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '2') {
            const res = issues.filter((data) => data.issuetype === 'Sanitation and Waste Management')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '3') {
            const res = issues.filter((data) => data.issuetype === 'Public Safety Concerns')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '4') {
            const res = issues.filter((data) => data.issuetype === 'Environmental Issues')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '5') {
            const res = issues.filter((data) => data.issuetype === 'Utility Services')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '6') {
            const res = issues.filter((data) => data.issuetype === 'Transportation and Traffic')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '7') {
            const res = issues.filter((data) => data.issuetype === 'Health and Public Health')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '8') {
            const res = issues.filter((data) => data.issuetype === 'Noise or Nuisance Complaints')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '9') {
            const res = issues.filter((data) => data.issuetype === 'Animal Control')
            setShowableIssue(res)
            console.log(res)
        } else if (e.target.value === '10') {
            const res = issues.filter((data) => data.issuetype === 'General Complaints or Suggestions')
            setShowableIssue(res)
            console.log(res)
        } else {
            setShowableIssue(issues)
        }
    }

    return (
        <>
            {loading ? (
                <div className="h-screen w-screen flex flex-col justify-center items-center space-y-4">
                    <CircularProgress isIndeterminate color="blue.400" />
                    <h1>Loading please wait!</h1>
                </div>
            ) : (
                <div className="bg-blueBackground pb-6 min-h-screen">
                    <Navbar />
                    <div className="mx-12 ">
                        <div className="flex justify-between items-center py-4 px-8">
                            <h1 className="text-1.5xl font-semibold flex items-center gap-2">
                                <GrLocation /> Kolkata - <span className="text-xl mt-1">12</span> Issues
                            </h1>
                            <div className="flex gap-4">
                                <Select
                                    borderColor={'gray.500'}
                                    backgroundColor={'#FBFAFF'}
                                    focusBorderColor="purple.500"
                                    placeholder="Filter the issue level"
                                    width={'200px'}
                                    onChange={(e) => handleLevelSort(e)}
                                >
                                    <option value="1">Low</option>
                                    <option value="2">Moderate</option>
                                    <option value="3">Severe</option>
                                </Select>
                                <Select
                                    borderColor={'gray.500'}
                                    backgroundColor={'#FBFAFF'}
                                    focusBorderColor="purple.500"
                                    placeholder="Filter the issue type"
                                    width={'200px'}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        handleTypeSort(e)
                                    }}
                                >
                                    <option value={'1'}>Infrastructure Problems</option>
                                    <option value={'2'}>Sanitation and Waste Management</option>
                                    <option value={'3'}>Public Safety Concerns</option>
                                    <option value={'4'}>Environmental Issues</option>
                                    <option value={'5'}>Utility Services</option>
                                    <option value={'6'}>ransportation and Traffic</option>
                                    <option value={'7'}>Health and Public Health</option>
                                    <option value={'8'}>Noise or Nuisance Complaints</option>
                                    <option value={'9'}>Animal Control</option>
                                    <option value={'10'}>General Complaints or Suggestions</option>
                                </Select>
                            </div>
                        </div>
                        <div className="bg-white mx-8 mb-8 rounded-lg p-4 px-8 shadow-xl min-h-[90vh]">
                            {showableIssue?.map((data, id) => {
                                return (
                                    <div className="my-6" key={id}>
                                        <ReportIssueCard data={data} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Issues
