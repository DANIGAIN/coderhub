'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ProposalModal from '@/components/modal/ProposalModal';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ServiceSkeletion from '@/components/loading/ServiceSkeletion';
import { useSession } from 'next-auth/react';

export default function Section1({ service, loading, proposals, setProposals }) {
    const [isopenProposal, setIsOpenProposal] = useState(false);
    const [time, setTime] = useState(null);
    const search = useSearchParams();
    const discount = search.get('d')
    const {status} = useSession();
    const router = useRouter();
    const [price, setPrice] = useState(null);
    const fieldPermission = ['type', 'day', 'description', 'title']
    useEffect(() => {
        service?.price && setPrice(service.price)
    }, [loading])

    const handlePrice = (value) => {
        if (value.time) {
            setPrice(parseInt(service.price / value.time * service.time))
        }
        if (value.time) setTime(value.time)
    }

    if (loading)
        return <ServiceSkeletion />
    else
        return (
            <>
                {isopenProposal && <ProposalModal
                    req={'create'}
                    service={service}
                    fieldPermission={fieldPermission}
                    isopenProposal={isopenProposal}
                    setIsOpenProposal={setIsOpenProposal}
                    setProposals={setProposals}
                    proposals={proposals}
                />}
                <section className="relative space-y-6 px-20 sm:px-0 py-30 sm:py-0 sm:ml-10 ">
                    <div className="w-full mx-auto sm:px-4 md:px-6 lg:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
                            <div className="img sm:mt-25">
                                <div className="img-box h-full max-lg:mx-auto ">
                                    <Image
                                        src={'/category/' + service?.category?.image}
                                        alt="service image"
                                        width={600}
                                        height={600}
                                        className="max-lg:mx-auto lg:ml-auto h-full"
                                    />
                                </div>
                            </div>
                            <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0 ">
                                <div className="data w-full max-w-xl mt-20 space-y-4">
                                    <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 capitalize">
                                        {service?.category?.name}
                                    </h2>
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <h6 className={`leading-9 text-gray-900 pr-5 ${service?.reviews?.length ? 'sm:border-r' : null} border-gray-200 mr-5`}>
                                            <span className='font-manrope font-semibold text-2xl'>${price ? (parseInt(price - (price * discount / 100)) + '-' + parseInt((price + 50) - (price * discount / 100))) : 0}</span>
                                            <span className='px-3 line-through'>{price ? ((price) + '-' + (price + 50)) : 0} </span>
                                        </h6>

                                        {service?.reviews?.length ? <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {
                                                    Array.from(
                                                        {
                                                            length: parseInt((service?.reviews.reduce((acc, current) => acc + current.rating, 0) /
                                                                service.reviews.length
                                                            ).toFixed(1))
                                                        }, (_, i) => (
                                                            <svg
                                                                width={20}
                                                                key={i}
                                                                height={20}
                                                                viewBox="0 0 20 20"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g clipPath="url(#clip0_12029_1640)">
                                                                    <path
                                                                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                        fill="#FBBF24"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_12029_1640">
                                                                        <rect width={20} height={20} fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        ))
                                                }

                                            </div>
                                            <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">
                                                {Math.max(service?.reviews?.length, 0) + '  review'}
                                            </span>
                                        </div> : null}
                                    </div>
                                    <div className='flex items-center '>
                                            <p className="text-gray-500 text-base font-normal truncate">
                                                {
                                                    service.category?.description
                                                }
                                            </p>
                                        <button
                                            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                                            className="text-indigo-600 "
                                        >
                                            more
                                        </button>

                                    </div>

                                    <ul className="grid gap-y-4">
                                        <li className="flex items-center gap-3">
                                            <svg
                                                width={26}
                                                height={26}
                                                viewBox="0 0 26 26"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect width={26} height={26} rx={13} fill="#4F46E5" />
                                                <path
                                                    d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                    stroke="white"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="font-normal text-base text-gray-900 ">
                                                small scale project
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <svg
                                                width={26}
                                                height={26}
                                                viewBox="0 0 26 26"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect width={26} height={26} rx={13} fill="#4F46E5" />
                                                <path
                                                    d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                    stroke="white"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="font-normal text-base text-gray-900 ">
                                                medium scale project
                                            </span>
                                        </li>

                                        <li className="flex items-center gap-3">
                                            <svg
                                                width={26}
                                                height={26}
                                                viewBox="0 0 26 26"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect width={26} height={26} rx={13} fill="#4F46E5" />
                                                <path
                                                    d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                    stroke="white"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="font-normal text-base text-gray-900 ">
                                                large scale project
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <svg
                                                width={26}
                                                height={26}
                                                viewBox="0 0 26 26"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect width={26} height={26} rx={13} fill="#4F46E5" />
                                                <path
                                                    d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                    stroke="white"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="font-normal text-base text-gray-900 ">
                                                work par day 8 hours
                                            </span>
                                        </li>
                                    </ul>
                                    <p className="text-gray-900 text-lg leading-8 font-medium">
                                        Days
                                    </p>
                                    <div className="w-full flex-wrap">
                                        <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">

                                            <button
                                                onClick={() => handlePrice({ time: 5 })}
                                                className={`${time === 5 ? 'bg-sky-500 ' : 'bg-stone-100 dark:bg-slate-500 '}  text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50`}>
                                                5
                                            </button>
                                            <button
                                                onClick={() => handlePrice({ time: 7 })}
                                                className={`${time === 7 ? 'bg-sky-500 ' : 'bg-stone-100 dark:bg-slate-500 '}text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50`}>
                                                7
                                            </button>
                                            <button
                                                onClick={() => handlePrice({ time: 14 })}
                                                className={`${time === 14 ? 'bg-sky-500 ' : 'bg-stone-100 dark:bg-slate-500 '}text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50`}>
                                                14
                                            </button>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <button className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={26}
                                                height={26}
                                                viewBox="0 0 26 26"
                                                fill="none"
                                            >
                                                <path
                                                    d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                                                    stroke="#4F46E5"
                                                    strokeWidth="1.6"
                                                    strokeMiterlimit={10}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        {
                                            !proposals.data[0] ?
                                                <button
                                                    onClick={() => 
                                                        (status === 'authenticated')? setIsOpenProposal(true):router.push('/agency/login')
                                                    }
                                                    className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                                    Proposal
                                                </button> : <Link
                                                    href={'/service/my-proposal'}
                                                    className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                                    My-Proposal
                                                </Link>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>


        )
}
