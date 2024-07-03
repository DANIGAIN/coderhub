'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function ForgetPassowrd() {
    const search = useSearchParams()
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className=" p-8 rounded-lg shadow-lg max-w-lg text-center">
            <h1 className="text-6xl font-bold text-red-500">{search.get("status") || 404}</h1>
            <p className="text-2xl mt-4">some thing wrong</p>
            <p className="text-gray-600 mt-2">
              {search.get("message")|| 'sorry there was an unkown error'}
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
}
