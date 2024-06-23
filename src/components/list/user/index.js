import React from 'react'
import Link from 'next/link'

export default function Users({setIsOpenUser, setReq, users}) {
    
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <div className="flow-root ">
                    <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Top Category</h4>
                    <button
                    onClick={() => (setReq('create'),setIsOpenUser(true))} 
                    className="float-right inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8">Add</button>
                </div>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-3 flex items-center">
                    <p className="font-medium">Name </p>
                </div>
                <div className="hidden sm:block  col-span-2  items-center">
                    <p className="font-medium">Role</p>
                </div>
                <div className="hidden sm:block  col-span-1 items-center ">
                    <p className="font-medium"> specialist </p>
                </div>
                <div className="col-span-1  items-center ">
                    <p className="font-medium">is_Verified </p>
                </div>

                <div className="float-right sm:float-right col-span-1 flex items-center pl-5">
                    <p className="font-medium">Action</p>
                </div>
            </div>

            {users && users.map((data, index) => (
                <div
                    className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={index}
                >
                    <div className="col-span-3 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="h-12.5 w-15 rounded-md">
                              {data.name}
                            </div>
                    
                        
                        </div>
                    </div>
                    <div className="hidden sm:block  col-span-1  items-center">
                        <p className="text-sm text-black dark:text-white">
                        {data.role.name}
                        </p>
                    </div>
                    <div className="hidden sm:block  col-span-1 items-center">
                        <p className="text-sm text-black dark:text-white">

                        </p>
                    </div>
                    <div className="hidden sm:block  col-span-1 items-center">
                        <p className="text-sm text-white">
                            {data.about?.specialist.name}
                            {
                                console.log(data.about)
                            }
                        </p>
                    </div>
                    <div className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                        <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${data.isVerified === false
                                ? "bg-warning text-warning" : "bg-success text-success"
                                }`}
                        >
                            {data?.isVerified ? "Verified " : "UnVerified"}
                        </p>
                    </div>

                    <div className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                            {/* <button className="hover:text-primary">
                                <ShowIcon/>
                            </button> */}
                            {/* <button onClick={() => handelDelete(category.id)} className="hover:text-primary">
                               <DeleteIcon/>
                            </button>
                            <button onClick={()=> router.push(`/agency/dashboard/category/${category.id}`)} className="hover:text-primary">
                               <UpdateIcon/>
                            </button> */}
                        </div>
                    </div>

                </div>
            ))}
    </div>
  )
}
