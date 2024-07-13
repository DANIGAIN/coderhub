"use client"
import { GlobalContext } from '@/context'
import Image from 'next/image';
import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
export default function teamPage() {
    const { users } = useContext(GlobalContext);
    return (
        <section className='mt-1 bg-slate-900 '>
            <div className="py-8  px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 mt-5 text-gray-3 text-4xl tracking-tight font-extrabold ">
                        Our Team
                    </h2>
                    <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                        These surgency members are involved in the development and
                        you can take their services if you want
                    </p>
                </div>
                { !users.loading ? <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">

                    {users.data.map((data, index) => (
                        (data.role.name === 'Admin' || data.role.name === 'Developer') ? <div key={index} className="items-center rounded-lg shadow sm:flex dark:bg-slate-500 dark:border-gray-2">
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
                                    {data.role.name} {data?.about?.specialist?.name ? '&' : null} {(data?.about?.specialist?.name)}
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
                        </div> : null
                    ))}
                </div> :
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    <div className='bg-slate-400'>  
                        <Skeleton  width={'100%'} height={150}/>
                        <Skeleton count={3}  width={'100%'} height={10} style={{marginTop:'10px'}}/>
                    </div>
                    <div className='bg-slate-400'>  
                        <Skeleton  width={'100%'} height={150}/>
                        <Skeleton count={3}  width={'100%'} height={10} style={{marginTop:'10px'}}/>
                    </div>
                    <div className='bg-slate-400'>  
                        <Skeleton  width={'100%'} height={150}/>
                        <Skeleton count={3}  width={'100%'} height={10} style={{marginTop:'10px'}}/>
                    </div>


                </div> }
            </div>
        </section>

    )
}
