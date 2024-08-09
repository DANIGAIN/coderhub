'use client'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import React from 'react'
import toast from 'react-hot-toast';
import ListSkeletonOnly from '@/components/loading/ListSkeletonOnly';

export default function Contructs({contacts ,setContacts}) {

  const handelDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        const filterData = contacts.data.filter((data) => data._id != id);
        setContacts((perv) => ({ ...perv, data:filterData}))
      }
    } catch (error) {
      if (!error.response.success && (error.response.status === 422 || error.response.status === 400)) {
        toast.error(error.response.data.message)
      }
    }
  }

  if (contacts.loading) {
    return (
      <ListSkeletonOnly />
    )
  } else {
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

        <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark  md:px-6 2xl:px-7.5">
          <div className="col-span-1 items-center">
            <p className="font-medium">Name </p>
          </div>
          <div className="col-span-1 items-center">
            <p className="font-medium"> Subject </p>
          </div>
          <div className="col-span-2 ml-auto pr-10 items-center">
            <p className="font-medium"> Message</p>
          </div>
          <div className="col-span-1 ml-auto pr-10 items-center">
            <p className="font-medium"> Action</p>
          </div>
        </div>

        {contacts.data.map((data, ind) => (
          <div
            className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
            key={ind}
          >
            <div className="col-span-1 items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {data?.name}
                </p>
              </div>
            </div>
            <div className="col-span-1 items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {data?.subject}
                </p>
              </div>
            </div>
            <div className="col-span-2 items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {data?.message}
                </p>
              </div>
            </div>
            <div className="col-span-1 ml-auto pr-10 items-center space-x-3">
              <button onClick={() => handelDelete(data._id)} className="hover:text-primary text-xl">
                <MdDelete />
              </button>
            </div>

          </div>
        ))}
      </div>
    )
  }


}
