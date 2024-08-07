'use client'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "@/context";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ListSkeleton from "@/components/loading/ListSkeleton";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
const Categorys = () => {
    const { categories, setCategories } = useAppContext();
    const {data:session,status} = useSession();
    const handelDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/categories/${id}`)
            if (res.data.success) {
                const newCategoryData = categories.data.filter((data) => data._id != id)
                setCategories((prev) => ({ ...prev, data: newCategoryData }))
                toast.success(res.data.message)
            }
        } catch (error) {
            if (!error.response.data?.success && (error.response.data?.status === 422 || error.response.data?.status === 400)) {
                toast.error(error.response.data.message)
            }
        }
    }
    if (categories.loading || status === 'loading') {
        return (
            <ListSkeleton />
        )
    } else {
        return (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <div className="flow-root ">
                        <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Top Category</h4>
                        <Link href={`./categories/add`} className="float-right inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8">Add</Link>
                    </div>
                </div>

                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium">Category </p>
                    </div>
                    <div className="hidden sm:block  col-span-2  items-center">
                        <p className="font-medium">Slug</p>
                    </div>
                    <div className="hidden sm:block  col-span-1 items-center ">
                        <p className="font-medium"> subcategoris </p>
                    </div>
                    <div className="col-span-1  items-center ">
                        <p className="font-medium">Status</p>
                    </div>

                    <div className="float-right sm:float-right col-span-1 flex items-center pl-5 ml-10 sm:ml-0">
                        <p className="font-medium">Action</p>
                    </div>
                </div>

                {categories.data.map((category, key) => (
                   session.user.id === category.uid ?
                     <div
                        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                        key={key}
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-15 w-10 rounded-lg">
                                    {category?.logo ?
                                      <Image
                                        src={`/category/${category.logo}`}
                                        width={0}
                                        height={0}
                                        style={{height:'100%',width:'100%'}}
                                        alt="category"
                                    /> : <Image
                                        src={`/images/cards/cards-02.png`}
                                        width={0}
                                        height={0}
                                        style={{height:'100%',width:'100%'}}
                                        alt="category"
                                    />}
                                </div>
                                <p className="text-sm text-black dark:text-white">
                                    {category.name}
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:block  col-span-2  items-center">
                            <p className="text-sm text-black dark:text-white">
                                {category.slug || null}
                            </p>
                        </div>
                        <div className="hidden sm:block  col-span-1 items-center">
                            <div className="text-sm text-white">
                                {Object.keys(category.subcategoris).map((key, index) => (
                                    <p key={index}>{category.subcategoris[key]}</p>
                                ))}
                            </div>
                        </div>
                        <div >
                            <p
                                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${category.status === false
                                    ? "bg-warning text-warning" : "bg-success text-success"
                                    }`}
                            >
                                {category?.status ? "Active " : "Unactive"}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center space-x-3.5 ml-10 sm:ml-0">
                                <Link className="hover:text-primary" href={`/agency/dashboard/categories/${category._id}?name=${category.name || ''}&slug=${category.slug || ''}&description=${category.description}&subcategoris=${category.subcategoris || ''}&status=${category.status}`} >
                                    < MdModeEdit />
                                </Link>
                                <button onClick={() => handelDelete(category._id)} className="hover:text-primary">
                                    <MdDelete />
                                </button>

                            </div>
                        </div>

                    </div>:null))}
            </div>
        );
    }

};

export default Categorys;
