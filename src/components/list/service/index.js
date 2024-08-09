"use client"
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import ListSkeleton from "@/components/loading/ListSkeleton";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

const Services = () => {
    const {data:session , status}= useSession();
    const {  services, setServices } = useContext(GlobalContext);
    const handelDelete = async(id)=>{
          try{
            const res = await axios.delete(`/api/services/${id}`);
            if(res.data.success){
                const filterServices = services.data.filter((data) => data._id != id);
                setServices((perv) =>({...perv , data:filterServices}));
                toast.success(res.data.message);
            }
          }catch(error){
            if (!error.response.success && (error.response.status === 422 || error.response.status === 400)) {
                toast.error(error.response.data.message)
            }
          }
    }

    if (services.loading || status === 'loading')
        return <ListSkeleton />
    else
        return (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <div className="flow-root ">
                        <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Top Services</h4>
                        <Link href={`/agency/dashboard/services/add`} className="float-right inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8">Add</Link>
                    </div>
                </div>

                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium"> Category</p>
                    </div>
                    <div className="col-span-1 hidden items-center sm:flex">
                        <p className="font-medium">Price</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Time</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="font-medium">Type</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Action</p>
                    </div>
                </div>

                {services.data.map((service, key) => (service?.category?.status && service.uid._id === session.user.id && (
                    <div
                        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                        key={key}
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-12.5 w-15 rounded-md">
                                    <Image
                                        src={'/category/' + service?.category?.image || null}
                                        width={600}
                                        height={500}
                                        alt="Product"
                                        className="h-full w-full"
                                    />
                                </div>
                                <p className="text-sm text-black dark:text-white">
                                    {service?.category?.name}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1 flex items-center ">
                            <p className="text-sm text-black dark:text-white">
                                ${service.price}
                            </p>
                        </div>
                        <div className="col-span-1 hidden sm:block items-center">
                            <p
                                className={`text-sm text-black dark:text-white`}
                            >
                                {service?.time}
                            </p>
                        </div>
                        <div className="col-span-2 hidden sm:block items-center">
                            <p className="font-medium">{service.type}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <div className="flex items-center space-x-3.5">
                                <Link href={`/agency/dashboard/services/${service._id}?category=${service.category._id}&price=${service.price}&time=${service.time}&type=${service.type}`} className="hover:text-primary">
                                    <MdModeEdit />
                                </Link>
                                <button onClick={() => handelDelete(service._id)} className="hover:text-primary">
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    </div>

                )))}
            </div>
        );
};

export default Services;
