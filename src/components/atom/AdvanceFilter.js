'use client'
import { useAppContext } from '@/context'
import React, { useEffect, useState } from 'react'

export default function () {
    const { services, setShowServices } = useAppContext();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [time, setTime] = useState(null);
    const [type, setType] = useState(null);
    useEffect(() => {
        if (!services.loading) {
            setCategories(Array.from(new Set(services.data.map(data => data.category.name))))
        }
    }, [services.loading])
    function handelSubmit(e) {
        e.preventDefault()
        if (category && time && type) {
            setShowServices(services.data.filter((data) => data.category.name === category && data.type === type && data.time > 0 && data.time <= 7));
        } else if (category && time) {
            setShowServices(services.data.filter((data) => data.category.name === category && data.time > 0 && data.time <= 7));
        }
        else if (category && type) {
            setShowServices(services.data.filter((data) => data.category.name === category && data.type === type));
        }
        else if (time && type) {
            setShowServices(services.data.filter((data) => data.type === type && data.time > 0 && data.time <= 7));
        }
        else if (time) {
            setShowServices(services.data.filter((data) => data.time > 0 && data.time <= 7));
        }
        else if (type) {
            setShowServices(services.data.filter((data) => data.type === type));
        }
        else if (category) {
            setShowServices(services.data.filter((data) => data.category.name === category));
        }
        window.scrollTo({ top: 700, behavior: 'smooth' });

    }
    if (services.loading) {
        return (
            <section className="flex justify-center items-center mx-auto -my-15">
                <div className=" bg-white dark:bg-slate-800 rounded-lg shadow-md pb-4 pt-7 lg:px-50 md:px-25 sm:px-10 px-5 ">
                    <div className="flex flex-wrap justify-center mb-4 space-x-2 md:space-x-5 lg:space-x-10">
                        <div className="col-lg-3 col-md-6 text-center mb-lg-0 mb-3 dark:bg-slate-200 animate-pulse h-8 w-50" />
                        <div className="col-lg-3 col-md-6 text-center mb-lg-0 mb-3 dark:bg-slate-200 animate-pulse h-8 w-50" />
                        <div className="col-lg-3 col-md-6 text-center mb-lg-0 mb-3 dark:bg-slate-200 animate-pulse h-8 w-50" />
                    </div>
                </div>
            </section>)
    } else {
        return (
            <section className="flex justify-center items-center mx-auto -my-30 md:-my-15">
                <div className=" bg-white dark:bg-slate-800 rounded-lg shadow-md py-7 lg:px-50 md:px-25 sm:px-10 px-5 ">
                    <form onSubmit={(e) => handelSubmit(e)}>
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-x-5 lg:space-x-10">
                                <li>
                                    <select
                                        className=" w-full py-2 px-5 text-medium text-slate-600 bg-white dark:bg-slate-400"
                                        name="category"
                                        id="category"
                                        onChange={(e) => (
                                            setCategory(e.target.value)
                                        )}
                                        defaultValue=""
                                    >
                                        <option value="" hidden >Category</option>
                                        {
                                            categories.map((data, index) => (
                                                <option key={index} value={data}>{data}</option>
                                            ))
                                        }
                                    </select>

                                </li>
                                <li>
                                    <select
                                        className=" w-full py-2 px-5  text-medium bg-white text-slate-600 dark:bg-slate-400"
                                        name="time"
                                        id="time"
                                        onChange={(e) => setTime(e.target.value)}
                                        defaultValue=""
                                    >
                                        <option value="" hidden >Time</option>
                                        <option value={7}>{'as soon as (0 - 7)'}</option>
                                    </select>
                                </li>
                                <li>
                                    <select
                                        className=" w-full py-2 px-5 text-medium text-slate-600 bg-white dark:bg-slate-400"
                                        name="type"
                                        id="type"
                                        onChange={(e) => setType(e.target.value)}
                                        defaultValue=""
                                    >
                                        <option value="" hidden >Type</option>
                                        <option value="small">{'small'}</option>
                                        <option value="medium">{'medium'}</option>
                                        <option value="large">{'large'}</option>
                                    </select>
                                </li>
                                <li className='flex justify-center'>
                                    <button type="submit" className="rounded-lg px-6 py-2 bg-sky-600 hover:bg-sky-800 hover:bottom-2 border-graydark">
                                        Find
                                    </button>
                                </li>
                            </ul>
                    
                    </form>
                </div>
            </section>

        )

    }

}
