'use client'
import React, { useEffect, useState } from 'react'
import Section1 from '@/components/service/Section1';
import Review from '@/components/service/Review';
import axios from 'axios';
import { useSession } from 'next-auth/react';
function servicePage(props) {
  const { id } = props.params;
  const { data: section, status } = useSession();
  const [service, setService] = useState({ data: null, loading: true, error: null });
  const [proposals, setProposals] = useState({ data: [], error: null, loading: true });
  useEffect(() => {
    ; (async () => {
      try {
        const res = await axios.get(`/api/services/${id}`)
        if (res.data.success) {
          setService((perv) => ({ ...perv, data: res.data.data }))
        }
      } catch (error) {
        setService((perv) => ({ ...perv, error, loading: false }))
      } finally {
        setService((perv) => ({ ...perv, loading: false }))
      }
    })()
  }, [])
  useEffect(() => {
    if (status == 'authenticated' && id) {
      ; (async () => {
        try {
          const res = await axios.get(`/api/proposals?uid=${section.user.id}&service=${id}`)
          if (res.data.success && res.data?.data[0]) {
            setProposals((prev) => ({ ...prev, data: res.data.data, loading: false }));
          }
        }
        catch (error) {
          setProposals((prev) => ({ ...prev, error, loading: false }));
        }
      })()
    }
  }, [status])

  return (
    <div className='dark:bg-slate-900 '>
      <Section1
        service={service.data}
        loading={service.loading}
        proposals={proposals}
        setProposals={setProposals}
      />
      <section className="p-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <ul className="flex border-b">
            <li className="text-gray-800 font-semibold text-sm bg-gray-100 py-3 px-8 border-b-2 border-gray-800 cursor-pointer transition-all">
              Description
            </li>
          </ul>
          <div className="mt-8">

            {service.loading ?
              <>
                <div className='mb-5 '>
                  <div className="h-6 w-50 rounded-full bg-slate-300"></div>
                </div>

                <div className="max-w-full animate-pulse space-y-2">
                  {
                    Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="h-3 rounded-full bg-slate-300"></div>
                    ))
                  }
                </div>
              </>
              :
              <>
                <h3 className="text-xl font-bold text-gray-800">Service Description</h3>
                <p className="text-sm text-gray-500 mt-4">
                  {service?.data?.category?.description}
                </p>
              </>
            }
          </div>
        </div>
      </section >
    <Review service={service} 
    proposals={proposals} />
    </div >
  )
}

export default servicePage;