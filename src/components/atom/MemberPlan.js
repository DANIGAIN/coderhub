'use client'
import { GlobalContext } from "@/context";
import { pricingCards } from "@/utils/Constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter} from "next/navigation";
import {  useContext, useEffect,} from "react";

import toast from "react-hot-toast";
const MemberPlan = () => {
    const {data:section, status } = useSession();
    const {discount,setDiscount} = useContext(GlobalContext)
    const router = useRouter();
     useEffect(() => {
        if (status === 'authenticated') {
            ;(async () => {
                const res = await axios.get(`/api/payments/subscription?uid=${section.user.id}`)
                if (res.data.success && res.data.data) {
                    const price = pricingCards.find((data) => data.id === parseInt(res.data.data.planId));
                        setDiscount({
                            priceId: price.id,
                            amount: price.discount
                        })
                }
            })()
        }
     }, [section])
    const handleSubmit = async (id) => {
        if(discount.priceId){
            toast(
                "You have alrady agency member",{
                    duration:600
                }
            )
            return ;
        }
        const plan = pricingCards.find((data) => data.id == id);
        try {
            const res = await axios.post('/api/payments/subscription', { price: plan.price_id, quantity: 1, planId: id })
            if (res.data.success) {
                router.push(res.data.data.url)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className=" bg-slate-900 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                        Subscription plan
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        If you become a paid member on you side you will get some pervilages .
                    </p>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {pricingCards.map((data, index) => (
                        <div key={index} className={`${discount.priceId == parseInt(data.id) ? 'bg-blue-400': null} flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900  rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white`}>
                            <h3 className="mb-4 text-2xl font-semibold"> {data.title}</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                {data.description}
                            </p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">{data.price}</span>
                                <span className="text-gray-500 dark:text-gray-400">/month</span>
                            </div>
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    {/* Icon */}
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>{data.domain}</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    {/* Icon */}
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>{data.ex}</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    {/* Icon */}
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        Team size: <span className="font-semibold">{data.team_size}</span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    {/* Icon */}
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        Premium support: <span className="font-semibold">{data.premium_support}</span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    {/* Icon */}
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        Free updates: <span className="font-semibold">{data.free_updates}</span>
                                    </span>
                                </li>
                            </ul>
                            <button
                                onClick={() => status === 'authenticated' ? handleSubmit(data.id) : toast(
                                    "please login first then come to our agency member", { duration: 6000 }
                                )}
                                className=" bg-sky-800 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                            >
                                Get started
                            </button>
                        </div>


                    ))}


                </div>
            </div>
        </section>

    )

}
export default MemberPlan;