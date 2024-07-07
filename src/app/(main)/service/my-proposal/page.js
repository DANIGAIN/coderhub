'use client'
import ProposalModal from '@/components/modal/ProposalModal';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdModeEdit } from 'react-icons/md';

export default function MyProposal() {
  const [proposals, setProposals] = useState([]);
  const [proposal, setProposal] = useState(null);
  const [isopenProposal, setIsOpenProposal] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const fieldPermission = ['day', 'type', 'title', 'description'];
  useEffect(() => {
    if (status === 'authenticated') {
      ; (async () => {
        const res = await axios.get(`/api/proposals?uid=${session.user.id}`)
        if (res.data.success) {
          setProposals(res.data.data)
        }
      })()
    }
  }, [status])
  const handleUpdate = (id) => {
    setIsOpenProposal(true);
    setProposal(proposals.find((data) => data._id == id))
  }
  const handlepay = async(id , amount) =>{
    try{
        const res = await axios.post('/api/payments',{
          service: id,
          amount
        })
        if(res.data.success){
          router.push(res.data.data.url)
        }
      
    }catch(error){
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
      <div className="bg-slate-900 p-8 rounded-md w-full mt-1">
        <div className="flex items-center justify-between pb-6 mt-20">
          <div>
            <h2 className="text-gray-600 font-semibold">List of proposals</h2>
            <span className="text-xs">Only for your</span>
          </div>
        </div>
        <div>
          <div className="overflow-y-auto h-125 mt-5">
            <div className="px-4 sm:px-8 py-4">
              <div className="min-w-full shadow rounded-lg overflow-hidden">
                <div className="min-w-full leading-normal">
                  <div className="flex px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="w-1/6">SR</div>
                    <div className="w-1/6">Type</div>
                    <div className="w-1/6">Days</div>
                    <div className="w-1/6">Title</div>
                    <div className="w-1/6">Description</div>
                    <div className="ml-30 w-1/6">Amount</div>
                    <div className="w-1/6">Action</div>
                  </div>
                  <div className='overflow-y-auto h-95'>

                    {
                      proposals.map((data, index) => (
                        <div key={index} className="bg-slate-600">
                          <div className="flex px-5 py-5 border-b border-gray-200 text-sm items-center">
                            <div className="w-1/6 flex items-center">
                              <p>{data._id}</p>
                            </div>
                            <div className="w-1/6">
                              <p className="text-gray-900 whitespace-no-wrap">{data.type}</p>
                            </div>
                            <div className="w-1/6">
                              <p className="text-gray-900 whitespace-no-wrap">{data.day}</p>
                            </div>
                            <div className="w-1/6">
                              <p className="text-gray-900 whitespace-no-wrap">{data.title}</p>
                            </div>
                            <div className="w-1/6">
                              <p className="text-gray-900 whitespace-no-wrap">{data.description}</p>
                            </div>
                            <div className=" ml-30 w-1/6">
                              <p className="text-gray-900 whitespace-no-wrap">{
                                data.status === 'pending'? data.status : data.amount
                              }</p>
                            </div>
                            <div className="w-1/6">
                              {data.status === 'pending' ?
                                <span
                                  className="font-medium"
                                  onClick={() => handleUpdate(data._id)}
                                ><MdModeEdit /></span>
                                :
                                <button
                                  onClick={()=> handlepay(data._id , data.amount)}
                                  className='bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-lg ring-2 '
                                > pay </button>}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>


  )
}
