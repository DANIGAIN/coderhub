'use client'
import DefaultLayout from '@/components/dashboardLayout'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function AddService() {
    const [categories, setCategories] = useState([])
    const { data: session, status } = useSession()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()
    const getCategory = async () => {
        try {
            const res = await axios.get('/api/categories')
            if (res.data.success) {
                setCategories(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getCategory() }, [])

    const onSubmit = async(data) => {
        if(status == 'authenticated')data.uid = session.user.id
        try{
            const res = await axios.post('/api/services',data)
            if(res.data.success){
                toast.success('create a new service');
            }
        }catch(error){
            console.log(error)
        }
    }
                
    return (
        <DefaultLayout>
            <div className="grid  gap-9 ">
                <div className="flex flex-col gap-9">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Add Service
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    {errors.categoryId ? 
                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white">{errors.categoryId.message}</label>:
                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white">Name </label>
                                    }
                
                                    <select
                                        id="categoryId"
                                        defaultValue={''}
                                        {
                                            ...register('categoryId',{
                                               required:"Please choice a category name" 
                                            })
                                            
                                        }
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                       
                                    >
                                        <option value={''} disabled>Choose a category name</option>
                                        {categories.length &&
                                            categories.map((data, ind) => {
                                                return <option key={ind} value={data.id}>{data.name}</option>;
                                            })}
                                    </select>
                                </div>

                                <div>
                                    {errors.price ?
                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white"> {errors.price.message} </label>:
                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white"> price </label>
                                    }
                                   
                                    <input
                                        type="number"
                                        name='price'
                                        {
                                            ...register('price',{
                                                required:'Please put service price'
                                            })
                                            
                                        }
                                        // onChange={(e) => setService((prev) => ({ ...prev, price: e.target.value }))}
                                        placeholder="Input price"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                            <div className="flex flex-col gap-5.5 p-2">
                                <button type='submit'  className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-full group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                    <span className="relative">Submit</span>
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </DefaultLayout>
    )
}

export default AddService