import React from 'react'
import { MdModeEdit } from 'react-icons/md';
import Image from 'next/image';

export default function Users({ setIsOpenUser, setReq, users, setUser }) {
    const handleUpdate = (id) => {
        const data = users.data.find((data) => data._id == id);
        setReq('update');
        setUser(data);
        setIsOpenUser(true);
    }

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <div className="flow-root ">
                    <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Top Category</h4>
                    <button
                        onClick={() => (setReq('create'), setIsOpenUser(true))}
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
                <div className="hidden sm:block  col-span-1  items-center ">
                    <p className="font-medium">is_Verified </p>
                </div>

                <div className="ml-15 sm:ml-0 float-right sm:float-right col-span-1 flex items-center pl-5">
                    <p className="font-medium">Action</p>
                </div>
            </div>

            { users?.data?.map((data, index) => (
                <div
                   className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 h-full  items-center justify-center"
                    key={index}
                >
                    <div className="col-span-3 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            { data?.image ? <Image className='w-13 h-13 rounded-full ring-2 ring-slate-400 mr-5' src={data?.image} alt='no image ' width={50} height={50} /> :
                            <Image className='w-13 h-13 rounded-full ring-2 ring-slate-400 mr-5' src={'/images/user/user-06.png'} alt='no image ' width={50} height={50} /> }
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
                        <p className="inline-flex text-sm text-white">
                            {data.about?.specialist?.name}

                        </p>
                    </div>
                    <div className="px-4 py-5  hidden sm:block ">
                        <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm font-medium ${data.isVerified === false
                                ? "bg-warning text-warning" : "bg-success text-success"
                                }`}
                        >
                            {data?.isVerified ? "Verified " : "UnVerified"}
                        </p>
                    </div>

                    <div className="px-25 sm:px-10 py-2 ">
                        <div className="flex items-center ">
                            {/* <button className="hover:text-primary">
                                <ShowIcon/>
                            </button> */}
                            {/* <button onClick={() => handelDelete(category.id)} className="hover:text-primary">
                               <DeleteIcon/>
                            </button>*/}
                            <button
                                onClick={() => handleUpdate(data._id)}
                                className="hover:text-primary">
                                <MdModeEdit />
                            </button>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}
