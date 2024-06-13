import Image from "next/image";

const HomeC2 = () => {

    return (
        <>
            <div
                id="home"
                className="relative   pt-[120px] pb-[110px] lg:pt-[150px]"
            >
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center -mx-4">
                        <div className="w-full px-4 lg:w-5/12">
                            <div className="hero-content">
                                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-dark  sm:text-[42px] lg:text-[40px] xl:text-5xl">
                                    API Solutions
                                    <br />
                                    for your application.
                                </h1>
                                <p className="mb-8 max-w-[480px] text-base text-body-color ">
                                    Transforming data into actionable insights, our agency delivers bespoke 
                                    API solutions that drive business success and agility.our agency crafts
                                    tailored API solutions to fuel business growth and innovation
                                </p>
                                <ul className="flex flex-wrap items-center">
                                    <li>
                                        <a
                                            href="https://spacema-dev.com/effortless-free-tailwind-css-website-template/"
                                            className="inline-flex items-center border justify-center px-6 py-3 text-base font-medium text-center text-white hover:text-primary rounded-md bg-primary hover:bg-transparent hover:border-primary lg:px-7"
                                        >
                                            Get Started Now
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://spacema-dev.com/effortless-free-tailwind-css-website-template/"
                                            className="inline-flex items-center justify-center py-3 px-5 text-center text-base font-medium text-[#464646]  hover:text-primary"
                                        >
                                            <span className="mr-2">
                                                <svg
                                                    width={24}
                                                    height={25}
                                                    viewBox="0 0 24 25"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle cx={12} cy="12.6152" r={12} fill="#3758F9" />
                                                    <rect
                                                        x="7.99893"
                                                        y="14.979"
                                                        width="8.18182"
                                                        height="1.63636"
                                                        fill="white"
                                                    />
                                                    <rect
                                                        x="11.2717"
                                                        y="7.61523"
                                                        width="1.63636"
                                                        height="4.09091"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M12.0898 14.1606L14.9241 11.0925H9.25557L12.0898 14.1606Z"
                                                        fill="white"
                                                    ></path>
                                                </svg>
                                            </span>
                                            Download App
                                        </a>
                                    </li>
                                </ul>
                                <div className="clients pt-16">
                                    <h6 className="flex items-center mb-6 text-md font-normal text-body-color ">
                                        Some Of Our Clients
                                        <span className="inline-block w-8 h-px ml-3 bg-body-color" />
                                    </h6>
                                    <div className="flex items-center">
                                        <div className="block py-3 mr-4">
                                            <Image src={"/images/client1.webp"} height={150} width={150} alt="oracle" />
                                        </div>
                                        <div className="block py-3 mr-4">
                                            <Image src={"/images/client2.webp"} height={150} width={150} alt="intel" />
                                        </div>
                                        <div className="block py-3">
                                            <img src={"/images/client3.webp"} height={150} width={150} alt="logitech" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-1/12" />
                        <div className="w-full px-4 lg:w-6/12">
                            <div className="lg:ml-auto lg:text-right">
                                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                                    <Image
                                        src={"/images/hero-image-01.png"}
                                        height={400} 
                                        width={400} 
                                        alt="hero"
                                        className="max-w-full lg:ml-auto rounded-[10px] rounded-tl-[150px]"
                                    />
                                    <span className="absolute -left-8 -bottom-8 z-[-1]">
                                        <svg
                                            width={93}
                                            height={93}
                                            viewBox="0 0 93 93"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                                            <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                                            <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                                            <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                                            <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                                            <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                                            <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                                            <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                                            <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                                            <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                                            <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                                            <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                                            <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                                            <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                                            <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                                            <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                                            <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                                            <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                                            <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                                            <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                                            <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                                            <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                                            <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                                            <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                                            <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ====== Hero Section End */}
        </>

    )

}
export default HomeC2;