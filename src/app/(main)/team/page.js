"use client"
import { GlobalContext } from '@/context'
import Image from 'next/image';
import React, { useContext } from 'react'
export default function teamPage() {
    const { users } = useContext(GlobalContext);
    return (
        <section className='pt-10  md:pt-5 lg:pt-2 dark:bg-slate-900'>
            <div className="py-8  px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 mt-5 text-boxdark dark:text-gray-3 text-4xl tracking-tight font-extrabold ">
                        Our Team
                    </h2>
                    <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                        These surgency members are involved in the development and
                        you can take their services if you want
                    </p>
                </div>
                {!users.loading ? <div className="grid  gap-8 mb-6 lg:mb-16 md:grid-cols-2">

                    {users.data.map((data, index) => (
                        (data.role.name === 'Admin' || data.role.name === 'Developer') ? <div key={index} className="items-center rounded-lg shadow sm:flex bg-slate-200 dark:bg-slate-500 dark:border-gray-2">
                            <Image
                                className=" rounded-lg  sm:rounded-lg w-30 h-30  m-2"
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
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="items-center rounded-lg shadow sm:flex dark:bg-slate-500 dark:border-gray-2">
                                <div className="flex p-12 m-2 bg-stone-400 items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                    <svg className="w-full h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                                <div className="p-5">

                                    <div className="h-2.5 bg-stone-400 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                                    <div className="h-2 bg-stone-400 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                                    <div className="h-2 bg-stone-400 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                                    <div className="h-2 bg-stone-400 bg-gray-200 rounded-full dark:bg-gray-700" />
                                </div>
                            </div>))}
                    </div>
                }
            </div>

        </section>

    )
}
