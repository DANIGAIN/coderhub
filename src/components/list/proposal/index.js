import React from 'react'
import { MdModeEdit } from 'react-icons/md';
import ListSkeletonOnly from '@/components/loading/ListSkeletonOnly';
export default function Proposals({ setIsOpenProposal, proposals, setProposal }) {
  const handleUpdate = async (id) => {
    const data = proposals.data.find((data) => data._id == id);
    setProposal(data);
    setIsOpenProposal(true)
  }

  if (proposals.loading)
    return <ListSkeletonOnly />
  else
    return (
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
              <span
                className="font-medium"
                onClick={() => handleUpdate(data._id)}
              ><MdModeEdit /></span>
            </div>

          </div>
        ))}
      </div>
    )
}
