import React from 'react';
import Image from 'next/image';

const SuccessPage = () => {

    
    return (
        <section>
            <div className="container mx-auto p-4 md:p-12 lg:p-24 mt-1 ">
                <div className="flex flex-col items-center mt-10 h-125">
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-30">
                        Return to Home
                    </button>
                </div>
            </div>
        </section>
    );
}
export default SuccessPage;
