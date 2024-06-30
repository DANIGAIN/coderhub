import React from 'react'
import Link from 'next/link'
import { MdModeEdit } from 'react-icons/md';
export default function Proposals({ setIsOpenProposal, proposals, setProposal }) {
    const handleUpdate = async (id) => {
      const data = proposals.find((data) => data._id == id);
      setProposal(data);
      setIsOpenProposal(true)
    }
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="space-x-20 grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium"> SR </p>
        </div>
        <div className="hidden sm:block  col-span-1  items-center">
          <p className="font-medium"> Title </p>
        </div>
        <div className="hidden sm:block  col-span-1 items-center ">
          <p className="font-medium"> Days </p>
        </div>
        <div className="hidden sm:block  col-span-1 items-center ">
          <p className="font-medium"> Types </p>
        </div>
        <div className="hidden sm:block  col-span-2  items-center  pl-10">
          <p className="font-medium">Description </p>
        </div>
        <div className="hidden sm:block  col-span-1  items-center ">
          <p className="font-medium"> Amount </p>
        </div>

        <div className=" sm:ml-0 float-end sm:float-right col-span-1 flex items-center pl-5">
          <p className="font-medium">Action</p>
        </div>
      </div>
      {proposals.map((data, ind) => (
        <div
          className="space-x-20 grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={ind}
        >
        <div className="col-span-1 flex items-center">
          <p className="font-medium"> {data._id} </p>
        </div>
        <div className="hidden sm:block  col-span-1  items-center ">
          <p className="font-medium"> {data.title} </p>
        </div>
        <div className="hidden sm:block  col-span-1 items-center ">
          <p className="font-medium"> {data.day} </p>
        </div>
        <div className="hidden sm:block  col-span-1 items-center ">
          <p className="font-medium"> {data.type} </p>
        </div>
        <div className="hidden sm:block  col-span-2  items-center  pl-10">
          <p className="font-medium">{data.description} </p>
        </div>
        <div className="hidden sm:block  col-span-1  items-center ">
          <p className="font-medium">{(data.status != 'pending') ? data.amount : data.status} </p>
        </div>
        <div className="ml-15 sm:ml-0 float-end sm:float-right col-span-1 flex items-center pl-5">
          <span 
           className="font-medium"
           onClick={()=> handleUpdate(data._id)}
          ><MdModeEdit/></span>
        </div>

        </div>
      ))}
    </div>
  )
}
