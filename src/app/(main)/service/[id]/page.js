'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import Section1 from '@/components/service/Section1';
import Review from '@/components/service/Review';
function servicePage(props) {
  const [service, setService] = useState('');
  const { id } = props.params;

  useEffect(() => {
    ; (async () => {
      const res = await axios.get(`/api/services/${id}`)
      if (res.data.success) {
        setService(res.data.data)
      }
    })()
  }, [])

  return (
    <div className='bg-slate-900 '>
      <Section1 service={service} />
      <div className="mt-20 max-w-4xl ">
        <ul className="flex border-b">
          <li className="text-gray-800 font-semibold text-sm bg-gray-100 py-3 px-8 border-b-2 border-gray-800 cursor-pointer transition-all">
            Description
          </li>
          <li className="text-gray-500 font-semibold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">
            Reviews
          </li>
        </ul>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">Product Description</h3>
          <p className="text-sm text-gray-500 mt-4">
            Elevate your casual style with our premium men's t-shirt. Crafted for
            comfort and designed with a modern fit, this versatile shirt is an
            essential addition to your wardrobe. The soft and breathable fabric
            ensures all-day comfort, making it perfect for everyday wear. Its classic
            crew neck and short sleeves offer a timeless look.
          </p>
        </div>
        <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-500">
          <li>A gray t-shirt is a wardrobe essential because it is so versatile.</li>
          <li>
            Available in a wide range of sizes, from extra small to extra large, and
            even in tall and petite sizes.
          </li>
          <li>
            This is easy to care for. They can usually be machine-washed and dried on
            low heat.
          </li>
          <li>
            You can add your own designs, paintings, or embroidery to make it your
            own.
          </li>
        </ul>
      </div>

      <Review />
    </div>
  )
}

export default servicePage;