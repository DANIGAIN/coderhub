"use client"
import React, { useContext, useEffect } from 'react';
import { pricingCards } from "@/utils/Constants";
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { GlobalContext } from '@/context';
import axios from 'axios';
import Link from 'next/link';

const SuccessPage = ({params , searchParams}) => {
    const { data: section, status } = useSession();
    const { setDiscount } = useContext(GlobalContext);
    const {mode ,session_id} = searchParams ;
    useEffect(() => {
        if(session_id && status === 'authenticated') {
            ;(async () => {
                try {
                    if(mode != 'payment'){
                        const res = await axios.post(`/api/payments/subscription/${session_id}`, { uid: section.user.id })
                        const price = pricingCards.find((data) => data.id === parseInt(res.data.data.planId));
                        console.log(res.data.data)
                        if (res.data.success && res.data.data.payment_status == "paid") {
                            setDiscount({
                                priceId: price.id,
                                amount: price.discount
                            })
                        }
                    }else{
                          await axios.post(`/api/payments/${session_id}`, { uid: section.user.id });
                    }
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [section])

    return (
        <section>
            <div className="container mx-auto p-4 md:p-12 lg:p-24 mt-1 ">
                <div className="flex flex-col items-center mt-10 ">
                    <Image
                        src={'/images/check.png'}
                        alt="Success Icon"
                        className="w-24 h-24 mb-4 "
                        height={300}
                        width={300}

                    />
                    <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 text-lg ">
                        Your payment has been successfully processed. Thank you for your business!
                    </p>
                    {mode === 'payment'? <Link href={'/service/my-proposal'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-30 mb-45">
                        Go to Proposal
                    </Link>:
                    <Link href={'/'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-30 mb-45">
                        Go to Home
                    </Link>}
                </div>
            </div>
        </section>
    );
}
export default SuccessPage;
