'use client'
import axios from "axios";
import { Catamaran } from "next/font/google";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Categorys = () => {
    const [categoryData, setCategoriData] = useState([]);
    const router = useRouter()
    const getCategory = async () => {
        try {
            const res = await axios.get('/api/categories');
            if (res.data.success) setCategoriData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handelDelete = async (id) => {
        try {
            await axios.delete(`/api/categories/${id}`)
            const newCategoryData = categoryData.filter((data) => data.id != id)
            setCategoriData(newCategoryData)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { getCategory() }, [])
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <div className="flow-root ">
                    <h4 className=" float-left text-xl font-semibold text-black dark:text-white">Top Category</h4>
                    <Link href={`./category/add`} className="float-right inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8">Add</Link>
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

                <div className="float-right sm:float-right col-span-1 flex items-center pl-5">
                    <p className="font-medium">Action</p>
                </div>
            </div>

            {categoryData && categoryData.map((category, key) => (
                <div
                    className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={key}
                >
                    <div className="col-span-3 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="h-12.5 w-15 rounded-md">
                                {category.logo ? <Image
                                    src={`/category/${category.logo}`}
                                    width={60}
                                    height={50}
                                    alt="category"
                                /> : <Image
                                    src={`/images/cards/cards-02.png`}
                                    width={60}
                                    height={50}
                                    alt="category"
                                />}
                            </div>
                            <p className="text-sm text-black dark:text-white">
                                {category.name}
                            </p>
                        </div>
                    </div>
                    <div className="hidden sm:block  col-span-1  items-center">
                        <p className="text-sm text-black dark:text-white">
                            {category.slug || null}

                        </p>
                    </div>
                    <div className="hidden sm:block  col-span-1 items-center">
                        <p className="text-sm text-black dark:text-white">

                        </p>
                    </div>
                    <div className="hidden sm:block  col-span-1 items-center">
                        <p className="text-sm text-white">
                            {Object.keys(category.subcategoris).map((key, index) => (
                                <p key={index}>{category.subcategoris[key]}</p>
                            ))}</p>
                    </div>
                    <div className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                        <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${category.status === false
                                ? "bg-warning text-warning" : "bg-success text-success"
                                }`}
                        >
                            {category.status ? "Active " : "Unactive"}
                        </p>
                    </div>

                    <div className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                            <button className="hover:text-primary">
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                        fill=""
                                    />
                                    <path
                                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                        fill=""
                                    />
                                </svg>
                            </button>
                            <button onClick={() => handelDelete(category.id)} className="hover:text-primary">
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                        fill=""
                                    />
                                    <path
                                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                        fill=""
                                    />
                                    <path
                                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                        fill=""
                                    />
                                    <path
                                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                        fill=""
                                    />
                                </svg>
                            </button>
                            <button onClick={()=> router.push(`/agency/dashboard/category/${category.id}`)} className="hover:text-primary">
                                <svg width="18" height="18" viewBox="0 0 420.827 420.827" fill="#ffffff">
                                    <path d="M210.29,0C156,0,104.43,20.693,65.077,58.269C25.859,95.715,2.794,146.022,0.134,199.921 c-0.135,2.734,0.857,5.404,2.744,7.388c1.889,1.983,4.507,3.105,7.244,3.105h45.211c5.275,0,9.644-4.098,9.979-9.362 c4.871-76.214,68.553-135.914,144.979-135.914c80.105,0,145.275,65.171,145.275,145.276c0,80.105-65.17,145.276-145.275,145.276 c-18.109,0-35.772-3.287-52.501-9.771l17.366-15.425c2.686-2.354,3.912-5.964,3.217-9.468c-0.696-3.506-3.209-6.371-6.592-7.521 l-113-32.552c-3.387-1.149-7.122-0.407-9.81,1.948c-2.686,2.354-3.913,5.963-3.218,9.467L69.71,403.157 c0.696,3.505,3.209,6.372,6.591,7.521c3.383,1.147,7.122,0.408,9.81-1.946l18.599-16.298 c31.946,18.574,68.456,28.394,105.581,28.394c116.021,0,210.414-94.392,210.414-210.414C420.705,94.391,326.312,0,210.29,0z"></path>
                                    <path d="M195.112,237.9h118.5c2.757,0,5-2.242,5-5v-30c0-2.757-2.243-5-5-5h-83.5v-91c0-2.757-2.243-5-5-5h-30 c-2.757,0-5,2.243-5,5v126C190.112,235.658,192.355,237.9,195.112,237.9z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Categorys;
