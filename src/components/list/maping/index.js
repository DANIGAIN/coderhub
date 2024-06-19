import React from 'react'
import Link from 'next/link'
import { MdModeEdit } from 'react-icons/md';

export default function Mapings({ setIsOpenMaping, mapings, setMaping, setReq }) {
  const handleUpdate = async (id) => {
    const data = mapings.filter((data) => data._id == id)[0];
    setReq('update');
    setMaping(data);
    setIsOpenMaping(true);
  }
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <div className="flow-root ">
          <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Component List</h4>
          <button onClick={() => (setIsOpenMaping(true), setReq('create'))} className="float-right inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8">Add</button>
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium"> role </p>
        </div>
        <div className="hidden sm:block  col-span-2  items-center">
          <p className="font-medium"> component </p>
        </div>


        <div className="ml-auto col-span-2  items-center">
          <p className="font-medium"> Action</p>
        </div>
      </div>
      {mapings.map((data, ind) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={ind}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {data?.role.name}
              </p>
            </div>
          </div>

          <div className="hidden sm:block py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {data?.component.name}
              </p>
            </div>
          </div>
          <div className="ml-auto col-span-3  items-center mr-15 sm:mr-0 space-x-3">
            {/* <button onClick={() => handelDelete(data._id)} className="hover:text-primary text-xl">
              <MdDelete />
            </button> */}
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
