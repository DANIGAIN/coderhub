"use client"
import React, { useContext, useEffect } from 'react';
import { pricingCards } from "@/utils/Constants";
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { GlobalContext } from '@/context';
import axios from 'axios';
import Link from 'next/link';

const SuccessPage = () => {
    const { data: section, status } = useSession();
    const { setDiscount } = useContext(GlobalContext);
    const search = useSearchParams()
    const checkout_id = search.get('session_id');
    const mode = search.get('mode')
    useEffect(() => {
        if(checkout_id && status === 'authenticated') {
            ; (async () => {
                try {
                    if(mode != 'payment'){
                        const res = await axios.post(`/api/payments/subscription/${checkout_id}`, { uid: section.user.id })
                        const price = pricingCards.find((data) => data.id === parseInt(res.data.data.planId));
                        if (res.data.success && res.data.data.payment_status == "paid") {
                            setDiscount({
                                priceId: price.id,
                                amount: price.discount
                            })
                        }
                    }else{
                        const res = await axios.post(`/api/payments/${checkout_id}`, { uid: section.user.id })
                        console.log(res.data.message)
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
                    <Link href={'/'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-30 mb-45">
                        Return to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}
export default SuccessPage;
