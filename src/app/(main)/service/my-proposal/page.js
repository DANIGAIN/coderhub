'use client'
import ListSkeletonOnly from '@/components/loading/ListSkeletonOnly';
import ProposalModal from '@/components/modal/ProposalModal';
import { GlobalContext } from '@/context';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md';

export default function MyProposal() {
  const [proposals, setProposals] = useState({ data: [], loading: true, error: null });
  const [proposal, setProposal] = useState(null);
  const [isopenProposal, setIsOpenProposal] = useState(false);
  const { discount } = useContext(GlobalContext)
  const { data: session, status } = useSession();
  const router = useRouter();
  const fieldPermission = ['day', 'type', 'title', 'description'];
  useEffect(() => {
    if (status === 'authenticated') {
      ; (async () => {
        const res = await axios.get(`/api/proposals?uid=${session.user.id}`)
        if (res.data.success) {
          setProposals((prev) => ({ ...prev, data: res.data.data, loading: false }))
        }
      })()
    }
  }, [status])
  const handleUpdate = (id) => {
    setIsOpenProposal(true);
    setProposal(proposals.data.find((data) => data._id === id))
  }
  const handlepay = async (id, amount) => {
    try {
      const res = await axios.post('/api/payments', {
        service: id,
        amount,
        discount
      })
      if (res.data.success) {
        router.push(res.data.data.url)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isopenProposal && <ProposalModal
        req={'update'}
        fieldPermission={fieldPermission}
        isopenProposal={isopenProposal}
        setIsOpenProposal={setIsOpenProposal}
        setProposals={setProposals}
        proposals={proposals}
        proposal={proposal}
      />}

      <div className="dark:bg-slate-900 p-8 rounded-md w-full mt-1 h-screen">
        <div className="flex items-center justify-between pb-6 mt-20">
          <div>
            <h2 className="text-gray-600 font-semibold">List of proposals</h2>
            <span className="text-xs">Only for your</span>
          </div>
        </div>
        {
          proposals.loading ? <ListSkeletonOnly /> :
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark  md:px-6 2xl:px-7.5">
                <div className="col-span-1 items-center">
                  <p className="font-medium"> SR </p>
                </div>
                <div className=" col-span-1 sm:col-span-2 items-center">
                  <p className="font-medium"> Title </p>
                </div>
                <div className="hidden sm:block  col-span-1 items-center">
                  <p className="font-medium"> Days </p>
                </div>
                <div className="col-span-1 items-center ">
                  <p className="font-medium"> Types </p>
                </div>
                <div className="hidden sm:block col-span-3  items-center">
                  <p className="font-medium">Description </p>
                </div>
                <div className="col-span-1  items-center ">
                  <p className="font-medium"> Amount </p>
                </div>

                <div className="col-span-1  items-center ml-auto">
                  <p className="font-medium">Action</p>
                </div>
              </div>
              {proposals.data.map((data, ind) => (
                <div
                  className="grid grid-cols-6 sm:grid-cols-10 gap-5border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                  key={ind}
                >
                  <div className="col-span-1 items-center">
                    <p className="font-medium"> {data._id.slice(0, 6)} </p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 items-center ">
                    <p className="font-medium"> {data.title} </p>
                  </div>
                  <div className="hidden sm:block  col-span-1 items-center ">
                    <p className="font-medium"> {data.day} </p>
                  </div>
                  <div className="col-span-1 items-center">
                    <p className="font-medium"> {data.type} </p>
                  </div>
                  <div className="hidden sm:block col-span-3  items-center">
                    <p className="font-medium">{data.description} </p>
                  </div>
                  <div className="col-span-1  items-center">
                    <p className="font-medium">{(data.status != 'pending') ? data.amount : data.status} </p>
                  </div>
                  <div className="col-span-1  items-center ml-auto">
                    {
                      (data.status === 'pending') ?
                        <span
                          className="font-medium"
                          onClick={() => handleUpdate(data._id)}
                        ><MdModeEdit /></span> :
                        (data.status === 'accepted') ? <button
                          className="font-medium bg-sky-600 hover:bg-sky-800 p-2 rounded-lg px-6"
                          onClick={() => handlepay(data.service, data.amount)}
                        >pay</button> :
                          <span
                            className="font-medium"
                          >{data.status}</span>
                    }
                  </div>
                </div>
              ))}
            </div>}
      </div>



    </>


  )
}
