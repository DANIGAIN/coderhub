"use client"
import { GlobalContext } from '@/context'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
export default function teamPage() {
    const { users } = useContext(GlobalContext);
    return (
        <section className='mt-1' >
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">
                        Our Team
                    </h2>
                    <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                        These surgency members are involved in the development and
                        you can take their services if you want
                    </p>
                </div>
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">

                    {users.map((data, index) => (
                        (data.role.name === 'Admin' || data.role.name === 'Developer') ?<div key={index} className=" bg-slate-900 items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <Image
                                className=" rounded-lg sm:rounded-none sm:rounded-l-lg w-50 h-50 "
                                src={data.image}
                                width={200}
                                height={200}
                                alt="Developer image"
                            />

                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <p >{data.name}</p>
                                </h3>
                                <span className="text-gray-500 dark:text-gray-400">
                                    {data.role.name} {data?.about?.specialist?.name ? '&' : null } {(data?.about?.specialist?.name)}
                                </span>
                                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                                    {(data?.about?.bio)}
                                </p>
                                <ul className="flex space-x-5 sm:mt-0">
                                    {
                                        data?.about?.specialist?.skill?.map((data, index) => {
                                            <li>
                                                {data}
                                            </li>
                                        })
                                    }

                                </ul>
                            </div>
                        </div>:null 
                    ))}
                </div>
            </div>
        </section>

    )
}
