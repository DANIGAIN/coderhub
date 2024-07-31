"use client"
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListSkeletonOnly from "@/components/loading/ListSkeletonOnly";

const Transactions = () => {
    const [transactions, setTransactions] = useState({ data: [], error: null, loading: true });
    useEffect(() => {
        ; (async () => {
            try {
                const res = await axios.get('/api/payments');
                if (res.data.success) {
                    setTransactions((perv) => ({ ...perv, data: res.data.data, loading: false }))
                }
            } catch (error) {
                setTransactions((perv) => ({ ...perv, loading: false, error }))
            }
        })()
    }, [])
    const handelDelete = async (id) => {
        try {
            const filterDate = transactions.data.filter((data) => data._id != id);
            setTransactions((prev) => ({ ...prev, data: filterDate }))
            const res = await axios.delete(`/api/payments/${id}`)
            if (res.data.success) {
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }
    if (transactions.loading)
        return <ListSkeletonOnly />
    else
        return (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark  dark:bg-boxdark">
                <div className="grid grid-cols-6  sm:grid-cols-8  border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
                    <div className="col-span-2 sm:col-span-3 items-center">
                        <p className="font-medium"> Customer </p>
                    </div>
                    <div className="col-span-1 hidden items-center ">
                        <p className="font-medium">Status</p>
                    </div>
                    <div className="hidden sm:block col-span-1  items-center">
                        <p className="font-medium">Method</p>
                    </div>
                    <div className="col-span-1 items-center">
                        <p className="font-medium">Amount</p>
                    </div>
                    <div className="hidden sm:block col-span-1 items-center">
                        <p className="font-medium">Mode</p>
                    </div>
                    <div className="col-span-1 items-center ml-5 sm:ml-0">
                        <p className="font-medium">Date</p>
                    </div>
                    <div className="col-span-1 ml-auto  sm:mr-10 items-cente">
                        <p className="font-medium">Action</p>
                    </div>
                </div>

                {transactions.data.map((data, key) => (
                    <div
                        className="grid grid-cols-6  sm:grid-cols-8  border-t border-stroke px-4 py-4.5 dark:border-strokedark  md:px-6 2xl:px-7.5"
                        key={key}
                    >
                        <div className="col-span-2 sm:col-span-3 items-center">
                            <p className="text-sm text-black dark:text-white">
                                {data.uid.name}
                            </p>
                        </div>
                        <div className="col-span-1 hidden items-center">
                            <p className="text-sm text-black dark:text-white">
                                {data.payment_status}
                            </p>
                        </div>
                        <div className="hidden sm:block col-span-1  items-center">
                            <p className="text-sm text-black dark:text-white">
                                {data.method}
                            </p>
                        </div>
                        <div className="col-span-1 items-center">
                            <p
                                className={`text-sm text-black dark:text-white`}
                            >
                                {data.amount}
                            </p>
                        </div>
                        <div className="hidden sm:block col-span-1 items-center">
                            <p
                                className={`text-sm text-black dark:text-white`}
                            >
                                {data.mode}
                            </p>
                        </div>
                        <div className="col-span-1 items-center ml-5 sm:ml-0">
                            <p className="text-sm">{new Date(data.createdAt).toDateString()}</p>
                        </div>
                        <div className="col-span-1 ml-auto  sm:mr-10 items-cente">
                            <div className="flex items-center ml-5">
                                <button onClick={() => handelDelete(data._id)} className="hover:text-primary">
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    </div>
                )

                )}
            </div>
        );
};

export default Transactions;
