'use client'
import axios from 'axios'

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import React from 'react'
import ListSkeleton from '@/components/loading/ListSkeleton';
import toast from 'react-hot-toast';

export default function Components({ setReq, setIsOpenComponent, setComponent, components, setComponents }) {
  const handleUpdate = async (id) => {
    const data = components.data.find((data) => data._id == id);
    setReq('update');
    setComponent(data);
    setIsOpenComponent(true);
  }
  const handelDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/components/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        const filterComponent = components.data.filter((data) => data._id != id);
        setComponents((perv) => ({ ...perv, data: filterComponent }))
      }
    } catch (error) {
      console.log(error)
      if (!error.response.success && (error.response.status === 422 || error.response.status === 400)) {
        toast.error(error.response.data.message)
      }
    }
  }

  if (components.loading) {
    return (
      <ListSkeleton />
    )
  } else {
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <div className="flow-root ">
            <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Component List</h4>
            <button onClick={() => (setIsOpenComponent(true), setReq('create'))} className="float-right inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8">Add</button>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-strokedark  md:px-6 2xl:px-7.5">
          <div className="col-span-1 items-center">
            <p className="font-medium"> name </p>
          </div>
          <div className="col-span-1 items-center">
            <p className="font-medium"> status </p>
          </div>


          <div className="col-span-1 ml-auto pr-10 items-center">
            <p className="font-medium"> Action</p>
          </div>
        </div>

        {components.data.map((data, ind) => (
          <div
            className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
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
              <p
                className={`inline-flex rounded-full bg-opacity-10 px-3  text-sm font-medium ${data.isActive === false
                  ? "bg-warning text-warning"
                  : "bg-success text-success"
                  }`}
              >
                {data?.isActive ? "Active " : "Unactive"}
              </p>
            </div>
            <div className="col-span-1 ml-auto pr-10 items-center space-x-3">
              <button onClick={() => handelDelete(data._id)} className="hover:text-primary text-xl">
                <MdDelete />
              </button>
              <button
                onClick={() => handleUpdate(data._id)}
                className="hover:text-primary text-xl"
              >
                <MdModeEdit />
              </button>
            </div>

          </div>
        ))}
      </div>
    )
  }


}
