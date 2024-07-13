import Image from 'next/image'
import React from 'react'

export default function aboutPage() {
    return (
        <div  className='mt-1'>
            <div className="bg-slate-900 w-auto min-h-fit sm:flex items-center">
                <div className="sm:w-1/2 p-10 hidden sm:block mt-10">
                    <div className="image object-center text-center">
                        <Image alt='no image ' width={500} height={500} src="https://i.imgur.com/WbQnbas.png" />
                    </div>
                </div>
                <div className="sm:w-1/2 p-5  mt-15">
                    <div className="text lg:mt-30">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
                            About us
                        </span>
                        <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
                            About <span className="text-indigo-600">Our Company</span>
                        </h2>
                        <p className="text-gray-700 mt-5 my-40 mr-50 ">
                            we specialize in delivering cutting-edge IT solutions in web development, data science,
                            machine learning, and mobile application development. Our team of experts leverages the
                            latest technology to help businesses succeed &  stay ahead in today  fast-paced digital
                            landscape. With a focus on innovation and excellence, we are dedicated to turning data
                            into insights, and insights into action and predictability.Our mission is to harness
                            the power of technology to create a more efficient, transparent, and responsive
                            government that serves the needs of all .We measure our success by the positive
                            impact we have on citizens, and we continually strive to improve and expand our
                            services to meet their evolving needs.
                            Our mission is to empower businesses to reach their full potential through strategic branding, innovative design, and effective marketing solutions. We believe that every brand has a unique story to tell, and we're dedicated to helping our clients tell theirs in a way that resonates with their audience
                        </p>
                    </div>
                </div>
            </div>
        </div>




    )
}
