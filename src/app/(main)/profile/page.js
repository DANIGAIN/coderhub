"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { pricingCards } from '@/utils/Constants';
import { CiCamera } from "react-icons/ci";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
export default function Profile() {
    const [user, setUser] = useState('');
    const [plan, setPaln] = useState(null)
    const [image ,setImage] = useState(null);
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === 'authenticated') {
            ; (async () => {
                try {
                    const res = await axios.get(`/api/auth/users/${session.user.id}`)
                    if (res.data.success) {
                        setUser(res.data.data)
                        if (res.data.plan) {
                            const planName = pricingCards.find((data) => data.id === parseInt(res.data.plan))
                            setPaln(planName.title)
                        }
                    }
                } catch (error) {
                    console.log(error)
                }

            })()
        }
    
    }, [session,image])

    const handleImage = async(e) => {
        const image  = e.target.files[0]
        const formData = new FormData();
        formData.append('image',image)
        try{
        if(status === 'authenticated'){
            const res = await axios.put(`/api/auth/users/${session.user.id}`,formData); 
            if(res.data.success){
                setImage(image)
            }
        }
        }catch(error){
            console.log(error)
        }
    
        
    }


    return (
        <div className="mx-auto max-w-242.5 flex-1 overflow-y-auto p-4">
            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
                <div className="relative h-35 md:h-65">
                    <Image
                        src={"/images/cover/cover-01.png"}
                        alt="profile cover"
                        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                        width={970}
                        height={260}
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                    />

                </div>
                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-34 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                        <div className="relative drop-shadow-2">
                            <Image
                                src={user.image}
                                className='rounded-full'
                                width={160}
                                height={160}
                                alt="profile"
                            />
                            {user?.image && (
                                <label htmlFor="profile" className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
                                    <span onClick={() => document.getElementById('image').click()}>
                                        <CiCamera />
                                    </span>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="hidden"
                                        onChange={(e) => handleImage(e)}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                            {status === 'authenticated' ? session.user.name : null}
                        </h3>
                        <p className="font-medium">{user?.about?.specialist?.name}</p>
                        <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                                {user.isVerified ?
                                    <span className="font-semibold text-black dark:text-white ">Verified</span> :
                                    <span className="font-semibold text-black dark:text-white ">Unverified</span>
                                }
                                <span className="text-sm">
                                    Account
                                </span>

                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                                {user && <span className="font-semibold text-black dark:text-white">
                                    {user.role.name}
                                </span>}
                                <span className="text-sm"> Role</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                                <span className="font-semibold text-black dark:text-white">
                                    2S
                                </span>
                                <span className="text-sm">review</span>
                            </div>
                        </div>

                        <div className="mx-auto max-w-180">
                            <h4 className="font-semibold text-black dark:text-white">
                                About Me
                            </h4>
                            <p className="mt-4.5">
                                {user?.about?.bio}
                            </p>
                        </div>

                        <div className="mt-6.5">
                            <h4 className="mb-3.5 font-medium text-black dark:text-white">
                                Member on
                            </h4>
                            <div className="flex items-center justify-center ">
                                {plan ? <h1
                                    className="bg-sky-600 shadow-2 ring-2  rounded-lg px-5 py-2"
                                    aria-label="social-icon"
                                >
                                    {plan}
                                </h1>
                                    :
                                    <Link
                                        href={'/'}
                                        className="hover:text-primary bg-sky-600 shadow-2 ring-2  rounded-lg px-5 py-2"
                                        aria-label="social-icon"
                                    >
                                        Subscription
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
