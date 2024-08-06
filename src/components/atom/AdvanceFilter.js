'use client'
import { useAppContext } from '@/context'
import React from 'react'

export default function () {
    const { setServices, services } = useAppContext();
    console.log(services)
    if (services.loading) {
        return <section>
        hi
        </section>
    } else {
        return (
            <section >
                <div className="container mx-auto p-5 lg:mx-30">
                    <div className=" bg-white rounded-lg shadow-md  p-7">
                        <form action="#" method="POST">
                            <div className="flex flex-wrap justify-center mb-4 lg:gap-5">
                                <div className="w-full lg:w-1/3 xl:w-1/4 mb-4 lg:mb-0">
                                    <select
                                        className=" w-full p-2 text-medium text-slate-600"
                                        name="category"
                                        id="category"
                                        onChange={(e) => setServices((perv) => ({...perv , data:services.data.filter((data)=> data.category._id != e.target.value)}))}
                                        defaultValue=""
                                    >
                                        <option value="" selected hidden >select your category</option>
                                        {
                                            services.data.map((data , index) => (
                                                <option key={index} value={data.category._id}>{data.category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="w-full lg:w-1/3 xl:w-1/4 mb-4 lg:mb-0">
                                    <select
                                        className=" w-full p-2 text-medium text-slate-600"
                                        name="category"
                                        id="category"
                                        defaultValue=""
                                    >
                                        <option value="" selected hidden >select your category</option>
                                        {
                                            services.data.map((data) => (
                                                <option value={data.category._id}>{data.category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="w-full lg:w-1/3 xl:w-1/4 mb-4 lg:mb-0">
                                    <select
                                        className=" w-full p-2 text-medium text-slate-600"
                                        name="category"
                                        id="category"
                                        defaultValue=""
                                    >
                                        <option value="" selected hidden >select your category</option>
                                        {
                                            services.data.map((data) => (
                                                <option value={data.category._id}>{data.category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="w-full lg:w-1/3 xl:w-1/4 text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full p-2 text-sm text-white bg-blue-500 hover:bg-blue-700"
                                        id="bookAppointment"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        )

    }

}
