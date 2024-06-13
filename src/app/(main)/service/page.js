'use client'
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function servicePage() {
    const router = useRouter();
    const [services, setServices] = useState([]);
    const getAllServices = async () => {
        try {
            const res = await axios.get('/api/services');
            if (res.data.success) {
                setServices(res.data.data);
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllServices();
    }, [])
    console.log(services);
    return (
        <>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
            <div className="container mx-auto p-4 ">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
                <div className="flex flex-wrap -mx-4 mb-25">
                    {services.map((service, index) => (
                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                            <div className="shadow-md rounded p-6 bg-graydark">
                                <Image
                                    src={`/category/${service.category?.image}`}
                                    alt="Service image"
                                    className="w-full h-48 object-cover mb-4 rounded-t"
                                    width={50}
                                    height={50}
                                />
                                {service.category.logo ?
                                    <Image
                                        src={`/category/${service.category?.logo}`}
                                        alt="Service 1 Logo"
                                        className="w-10 h-10 mx-auto mb-4 rounded-full"
                                        width={500}
                                        height={500}
                                    /> :
                                    <div className='h-14 rounded-full flex items-center justify-center' >
                                        <svg class="w-8 h-8 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg>
                                    </div>

                                }
                                <div className='space-y-2'>
                                    <h3 className="text-xl font-bold mb-2 text-indigo-300">{service.category.name}</h3>
                                    <p className="text-gray-600 mb-4">
                                        {service.category?.slug}
                                    </p>
                                    <button
                                        onClick={()=> router.push(`/service/${service._id}`)}

                                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
                                    >
                                        See More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>


    )
}