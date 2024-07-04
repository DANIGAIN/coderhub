import React from 'react';

const SuccessPage = () => {
    return (
        <section>
            <div className="container mx-auto p-4 md:p-12 lg:p-24">
                <div className="flex flex-col items-center">
                    <img
                        src="https://via.placeholder.com/150x150"
                        alt="Success Icon"
                        className="w-24 h-24 mb-4"
                    />
                    <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Your payment has been successfully processed. Thank you for your business!
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Return to Home
                    </button>
                </div>
            </div>
        </section>
    );
}
export default SuccessPage;
