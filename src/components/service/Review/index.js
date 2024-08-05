"use client"
import ReviewModal from '@/components/modal/ReviewModal';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'


export default function Review({ service, proposals ,setService}) {
    const [isopenReview, setIsOpenReview] = useState(false);
    const { data: section, status } = useSession();
    const [exists, setexists] = useState(false);
    const [reviews, setReviews] = useState({ data: [], error: null, loading: true });

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/reviews');
                if (res.data.success) {
                    setReviews((prev) => ({ ...prev, data: res.data.data, loading: true }));
                }
            } catch (error) {
                setReviews((prev) => ({ ...prev, error, loading: true }));
            }
        })();
    }, [])
    useEffect(() => {
        (async () => {
            if (status === 'authenticated' && !service.loading && !proposals.loading) {
                const findReview = service.data.reviews.find((data) => data.uid === section.user.id);
                if (!findReview && proposals.data[0].status === 'paid') {
                    setexists(true)
                }
            }
        })();       
    }, [status, proposals.loading ,service.loading])
    console.log(exists)
    return (
        <>
            {isopenReview && <ReviewModal
                service={service}
                reviews={reviews}
                setexists={setexists}
                setIsOpenReview={setIsOpenReview}
                isopenReview={isopenReview}
                setReviews={setReviews}
            />}

            <section className="p-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold text-gray-900 ">
                            Reviews
                        </h2>
                        {reviews.data.length ? <div className="mt-2 flex items-center gap-2 sm:mt-0">
                            <div className="flex items-center gap-0.5">
                                {
                                    Array.from({
                                        length: parseInt((
                                            reviews.data.reduce((acc, current) => acc + current.rating, 0) /
                                            reviews.data.length
                                        ).toFixed(1))
                                    }, (_, i) => (
                                        <svg
                                            key={i}
                                            className="h-4 w-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                        </svg>
                                    ))
                                }
                            </div>
                            <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                                {(
                                    reviews.data.reduce((acc, current) => acc + current.rating, 0) /
                                    reviews.data.length
                                ).toFixed(1)}
                            </p>
                            <a
                                href="#"
                                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                            >
                                {reviews.data.length} Reviews
                            </a>
                        </div> : null}
                    </div>
                    <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
                        <div className="shrink-0 space-y-4">
                            {
                                reviews.data.length ?
                                    <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                                        {(
                                            reviews.data.reduce((acc, current) => acc + current.rating, 0) /
                                            reviews.data.length
                                        ).toFixed(1)} out of 5
                                    </p> : null
                            }

                            {status == 'authenticated' && exists?
                                <button
                                    type="button"
                                    onClick={() => setIsOpenReview(true)}
                                    className="mb-2 me-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Write a review
                                </button> : null
                            }

                        </div>
                        <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
                            <div className="flex items-center gap-2">
                                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                                    5
                                </p>
                                <svg
                                    className="h-4 w-4 shrink-0 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-1.5 rounded-full bg-yellow-300"
                                        style={{ width: "20%" }}
                                    />
                                </div>
                                <a
                                    href="#"
                                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                                >
                                    {reviews.data.filter((data) => data.rating === 5).length} <span className="hidden sm:inline">reviews</span>
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                                    4
                                </p>
                                <svg
                                    className="h-4 w-4 shrink-0 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-1.5 rounded-full bg-yellow-300"
                                        style={{ width: "60%" }}
                                    />
                                </div>
                                <a
                                    href="#"
                                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                                >
                                    {reviews.data.filter((data) => data.rating === 4).length} <span className="hidden sm:inline">reviews</span>
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                                    3
                                </p>
                                <svg
                                    className="h-4 w-4 shrink-0 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-1.5 rounded-full bg-yellow-300"
                                        style={{ width: "15%" }}
                                    />
                                </div>
                                <a
                                    href="#"
                                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                                >
                                    {reviews.data.filter((data) => data.rating === 3).length} <span className="hidden sm:inline">reviews</span>
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                                    2
                                </p>
                                <svg
                                    className="h-4 w-4 shrink-0 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-1.5 rounded-full bg-yellow-300"
                                        style={{ width: "5%" }}
                                    />
                                </div>
                                <a
                                    href="#"
                                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                                >
                                    {reviews.data.filter((data) => data.rating === 2).length}  <span className="hidden sm:inline">reviews</span>
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                                    1
                                </p>
                                <svg
                                    className="h-4 w-4 shrink-0 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-1.5 rounded-full bg-yellow-300"
                                        style={{ width: "0%" }}
                                    />
                                </div>
                                <a
                                    href="#"
                                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                                >
                                    {reviews.data.filter((data) => data.rating === 1).length}  <span className="hidden sm:inline">reviews</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            reviews.data.map((data, index) => (
                                <div key={index} className="gap-3 py-6 bg-stone-200 dark:bg-slate-800 rounded-lg p-2 sm:flex sm:items-start">
                                    <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                                        <div className="flex items-center gap-0.5">
                                            {
                                                Array.from({ length: data.rating }, (_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="h-4 w-4 text-yellow-300"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                    </svg>
                                                ))
                                            }
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                                                {data.uid.name}
                                            </p>
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                {new Date(data.createdAt).toLocaleDateString() + ' - ' + new Date(data.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center gap-1">
                                            <svg
                                                className="h-5 w-5 text-primary-700 dark:text-primary-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {data.uid.isVerified ? 'Verified' : 'UnVerified'} purchase
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            {data.comment}
                                        </p>

                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </section>
        </>

    )
}
