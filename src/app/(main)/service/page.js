import Image from 'next/image'
import React from 'react'

export default function servicePage() {
    return (
        <>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
            <div className="container mx-auto p-4 mb-20">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                        <div className="bg-white shadow-md rounded p-6">
                            <img
                                src="image1.jpg"
                                alt="Service 1 Image"
                                className="w-full h-48 object-cover mb-4 rounded-t"
                            />
                            <h3 className="text-xl font-bold mb-2">Service 1 Name</h3>
                            <p className="text-gray-600 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                                amet nulla auctor, vestibulum magna sed, convallis ex.
                            </p>
                            <a
                                href="#"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Learn More
                            </a>
                            <img
                                src="logo1.png"
                                alt="Service 1 Logo"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                        <div className="bg-white shadow-md rounded p-6">
                            <img
                                src="image4.jpg"
                                alt="Service 4 Image"
                                className="w-full h-48 object-cover mb-4 rounded-t"
                            />
                            <h3 className="text-xl font-bold mb-2">Service 4 Name</h3>
                            <p className="text-gray-600 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                                amet nulla auctor, vestibulum magna sed, convallis ex.
                            </p>
                            <a
                                href="#"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Learn More
                            </a>
                            <img
                                src="logo4.png"
                                alt="Service 4 Logo"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                        <div className="bg-white shadow-md rounded p-6">
                            <img
                                src="image5.jpg"
                                alt="Service 5 Image"
                                className="w-full h-48 object-cover mb-4 rounded-t"
                            />
                            <h3 className="text-xl font-bold mb-2">Service 5 Name</h3>
                            <p className="text-gray-600 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                                amet nulla auctor, vestibulum magna sed, convallis ex.
                            </p>
                            <a
                                href="#"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Learn More
                            </a>
                            <img
                                src="logo5.png"
                                alt="Service 5 Logo"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                        <div className="bg-white shadow-md rounded p-6">
                            <img
                                src="/assets/service/mobile_image.jpg"
                                alt="Service 6 Image"
                                className="w-full h-48 object-cover mb-4 rounded-t"
                            />
                            <h3 className="text-xl font-bold mb-2">Service 6 Name</h3>
                            <p className="text-gray-600 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                                amet nulla auctor, vestibulum magna sed, convallis ex.
                            </p>
                            <a
                                href="#"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Learn More
                            </a>
                            <img
                                src="/assets/service/mobile_logo.jpg"
                                alt="Service 6 Logo"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-20'>Agency </div>
        </>


    )
}
