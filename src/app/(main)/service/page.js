'use client'
import { GlobalContext } from '@/context';
import Image from 'next/image'
import { pricingCards } from "@/utils/Constants";
import { useRouter, useServerInsertedHTML } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

export default function servicePage() {
    const router = useRouter();
    const [disount ,setDiscount] = useState(null)
    const { data: section, status } = useSession();
    useEffect(() => {
      if (status === 'authenticated') {
          ;(async () => {
              const res = await axios.get(`/api/payments/subscription?uid=${section.user.id}`)
              if (res.data.success && res.data.data) {
                  const planName = pricingCards.find((data) => data.id === parseInt(res.data.data.planId))
                  setDiscount(planName.discount)
              }
          })()
      }
  }, [section])
  const { services } = useContext(GlobalContext)
  console.log(services)
    return (
        <div className='bg-slate-900 '>
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                {/* Heading & Filters */}
                <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                    <div>
                        {/* <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a
                                        href="#"
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        <svg
                                            className="me-2.5 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            className="h-5 w-5 text-gray-400 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m9 5 7 7-7 7"
                                            />
                                        </svg>
                                        <a
                                            href="#"
                                            className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                                        >
                                            Products
                                        </a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg
                                            className="h-5 w-5 text-gray-400 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m9 5 7 7-7 7"
                                            />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                                            Electronics
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav> */}
                        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            All Searvice 
                        </h2>
                    </div>
                    {/* <div className="flex items-center space-x-4">
                        <button
                            data-modal-toggle="filterModal"
                            data-modal-target="filterModal"
                            type="button"
                            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
                        >
                            <svg
                                className="-ms-0.5 me-2 h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                                />
                            </svg>
                            Filters
                            <svg
                                className="-me-0.5 ms-2 h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 9-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <button
                            id="sortDropdownButton1"
                            data-dropdown-toggle="dropdownSort1"
                            type="button"
                            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
                        >
                            <svg
                                className="-ms-0.5 me-2 h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
                                />
                            </svg>
                            Sort
                            <svg
                                className="-me-0.5 ms-2 h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 9-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <div
                            id="dropdownSort1"
                            className="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                            data-popper-placement="bottom"
                        >
                            <ul
                                className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                                aria-labelledby="sortDropdownButton"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {" "}
                                        The most popular{" "}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {" "}
                                        Newest{" "}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {" "}
                                        Increasing price{" "}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {" "}
                                        Decreasing price{" "}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {" "}
                                        No. reviews{" "}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {" "}
                                        Discount %{" "}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {services.map((data)=>(
                    <div className="rounded-lg border border-gray-200 bg-slate-600 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="h-56 w-full">
                        <a href="#">                        
                            <Image
                                className="mx-auto hidden h-full dark:block"
                                src={"/category/"+data.category?.image}
                                alt=""
                                height={220}
                                width={220}
                            /> 
                        </a>
                    </div>
                    <div className="pt-6">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                You get {disount ? disount : 0}% off{" "}
                            </span>
                            <div className="flex items-center justify-end gap-1">
                                <button
                                    type="button"
                                    data-tooltip-target="tooltip-quick-look"
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only"> Quick look </span>
                                    <svg
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                        />
                                        <path
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </button>
                                <div
                                    id="tooltip-quick-look"
                                    role="tooltip"
                                    className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                    data-popper-placement="top"
                                >
                                    Quick look
                                    <div className="tooltip-arrow" data-popper-arrow="" />
                                </div>
                                <button
                                    type="button"
                                    data-tooltip-target="tooltip-add-to-favorites"
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only"> Add to Favorites </span>
                                    <svg
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                        />
                                    </svg>
                                </button>
                                <div
                                    id="tooltip-add-to-favorites"
                                    role="tooltip"
                                    className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                    data-popper-placement="top"
                                >
                                    Add to favorites
                                    <div className="tooltip-arrow" data-popper-arrow="" />
                                </div>
                            </div>
                        </div>
                        <a
                            href="#"
                            className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                        >
                            {data?.category?.name}
                        </a>
                        <p>
                            {data?.category?.description.slice(100)+'...'}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex items-center">
                                <svg
                                    className="h-4 w-4 text-yellow-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                                <svg
                                    className="h-4 w-4 text-yellow-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                                <svg
                                    className="h-4 w-4 text-yellow-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                                <svg
                                    className="h-4 w-4 text-yellow-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                                <svg
                                    className="h-4 w-4 text-yellow-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                5.0
                            </p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                (455)
                            </p>
                        </div>
                        <ul className="mt-2 flex items-center gap-4">
                            <li className="flex items-center gap-2">
                                <svg
                                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                    />
                                </svg>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {data?.type}
                                </p>
                            </li>
                            {/* <li className="flex items-center gap-2">
                                <svg
                                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth={2}
                                        d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                    />
                                </svg>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Best Price
                                </p>
                            </li> */}
                        </ul>
                        <div className="mt-4 flex items-center justify-between gap-4">
                            <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                                ${parseInt(data.price) +"-"+ (data.price + 50) }
                            </p>
                            <Link
                                href={`/service/${data._id}`}
                                className=" bg-slate-500 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                read more
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
                    
               
                </div>
    
            </div>
        </section>

        </div>
        
    )
}