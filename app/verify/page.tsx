"use client"
import Navbar from '@/components/Navbar'
import { useUser } from '@/context/userContext'
import { uploadImagetoAWS } from '@/functions/uploadImagetoAWS'
import { updateUser } from '@/functions/user/updateUserData'
import { useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'



const Verify = () => {
    const fileInputRef = useRef<any>()
    const [selectedFile, setSelectedFile] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const toast = useToast()
    const {user} = useUser()

    const handleVerify = async () => {
        const _uploadedImage = await uploadImagetoAWS(selectedFile)
        //update database
        let _userData = {...user}
        _userData.UserIdProof = _uploadedImage.img_url
        await updateUser(_userData)
        //redirect
        return toast({
            title: 'Uploaded Successfully',
            description: "Please hold your account is under review for.This might take 2-3 days",
            status:'loading',
            position:'top-right',
            duration: 5000,
            isClosable: true,
          })
    }

    const addImagetoPost = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent:any )=> {
            setFileUrl(readerEvent.target.result);
        };
    };

    return (
        <div className="min-h-screen bg-blueBackground">
            <Navbar />
            <div className='flex flex-col justify-center items-center min-h-[80vh] mt-8 mx-8 rounded-xl shadow-xl bg-white p-8'>
                <h1 className='text-2xl font-semibold text-blueDeep mb-6 text-center'>Verify your account</h1>
                <p className='text-lg text-center'>Your account is not verified yet. Please verify your account to continue using the application.</p>

                {/* Upload a govt photo identity proof */}
                {
                    selectedFile ? <div><img src={fileUrl} className='w-[20rem]'/></div>
                        : <div className='flex justify-center items-center mt-6' onClick={() => fileInputRef.current.click()}>
                            <button className='btn-primary'>Upload ID Proof</button>
                        </div>
                }
                <div className='flex justify-center items-center mt-6' >
                    <button className='btn-primary' onClick={handleVerify}>Verify Account</button>
                </div>
                <input hidden type='file' ref={fileInputRef} onChange={(e: any) => {
                    setSelectedFile(e.target.files[0])
                    addImagetoPost(e)
                }} />


            </div>



        </div>
    )
}

export default Verify