"use client"
import { AiFillEye } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Services = () => {
    const {services } = useContext(GlobalContext);

    return (
        <div className="rounded-sm border  shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <div className="flow-root ">
                    <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Top Products</h4>
                    <Link href={`/agency/dashboard/service/add`} className="float-right inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8">Add</Link>
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
                    <p className="font-medium">status</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Avarage reviews</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Action</p>
                </div>
            </div>

            {services.map((service, key) => (
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
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            ${service.price}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${service.category.status === false
                                ? "bg-warning text-warning" : "bg-success text-success"
                                }`}
                        >
                            {service?.category?.status ? "Active " : "Unactive"}
                        </p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="font-medium">status</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <div className="flex items-center space-x-3.5">
                            <button className="hover:text-primary">
                                <AiFillEye />
                            </button>
                            <button onClick={() => handelDelete(category.id)} className="hover:text-primary">
                                <MdDelete />
                            </button>
                            <button onClick={() => router.push(`/agency/dashboard/category/${category.id}`)} className="hover:text-primary">
                                <MdModeEdit />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Services;
