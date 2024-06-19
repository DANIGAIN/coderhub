'use client'
import axios from 'axios'
import Link from 'next/link'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import React from 'react'
import toast from 'react-hot-toast';

export default function Roles({ setReq, setIsOpenRole, setRole ,roles , setRoles}) {
  
  const handelComponentUpdate = async (id) => {
    const data = roles.filter((data) => data._id == id)[0];
    setReq('update');
    setRole(data);
    setIsOpenRole(true);
}

  const handelDelete = async(id) => {
    try{

      const res = await axios.delete(`/api/roles/${id}`);
      if(res.data.success){
        const newRoles  = roles.filter((data) => data._id != id);
        setRoles(newRoles)
        toast.success(res.data.message);
      }

    }catch(error){
      if (!error.response.success && error.response.status === 400) {
        toast.error(error.response.data.message)
      }
    }
  }
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <div className="flow-root ">
          <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Role List</h4>
          <button onClick={() => (setIsOpenRole(true), setReq('create'))} className="float-right inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8">Add</button>
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium"> name </p>
        </div>
        <div className="hidden sm:block  col-span-2  items-center">
          <p className="font-medium"> status </p>
        </div>


        <div className="ml-auto col-span-2  items-center">
          <p className="font-medium"> Action</p>
        </div>
      </div>

      {roles.map((data, ind) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={ind}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {data?.name}
              </p>
            </div>
          </div>

          <div className="hidden sm:block py-5">
            <p
              className={`inline-flex rounded-full bg-opacity-10 px-3  text-sm font-medium ${data.isActive === false
                ? "bg-warning text-warning"
                : "bg-success text-success"
                }`}
            >
              {data?.isActive ? "Active " : "Unactive"}
            </p>
          </div>
          <div className="ml-auto col-span-3  items-center mr-15 sm:mr-0 space-x-3">
            <button onClick={() => handelDelete(data._id)} className="hover:text-primary text-xl">
              <MdDelete />
            </button>
            <button
              onClick={() => handelComponentUpdate(data._id)}
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
