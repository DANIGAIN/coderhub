'use client'
import DefaultLayout from '@/components/dashboardLayout'
import { useAppContext } from '@/context';
import {  UpdateServiceSchema } from '@/schemas/serviceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function UpdateService({params}) {
    const id  = params.id;
    const search = useSearchParams();
    const {categories, setServices, services} = useAppContext()
    const{data:session} = useSession();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver:zodResolver(UpdateServiceSchema),
        defaultValues:{
            category:search.get('category'),
            price:search.get('price'),
            time:search.get('time'),
            type:search.get('type')
        }
    })
    const router = useRouter()
    const onSubmit = async(data) => {
        data.uid = session.user.id;
        try{
            const res = await axios.put(`/api/services/${id}`,data)
            if(res.data.success){
                const filterServices = services.data.filter((data)=> data._id != id);
                setServices((prev) =>({...prev,data:[res.data.data, ...filterServices]}))
                router.push('/agency/dashboard/services')
                toast.success(res.data.message);
            }
        }catch(error){
            if (!error.response.success && (error.response.status === 422  ||error.response.status === 400)) {
                toast.error(error.response.data.message)
              }
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
                                    {errors.category ? 
                                     <label className="mb-3 block text-sm font-medium text-red">{errors.category.message}</label>:
                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white">Name </label>
                                    }
                
                                    <select
                                        id="category"
                                        name='category'
                                        defaultValue={''}
                                        {
                                            ...register('category')  
                                        }
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    >
                                        <option value={''} hidden >Choose a category name</option>
                                        {categories.data.length &&
                                            categories.data.map((data, ind) => {
                                                return <option key={ind} value={data._id}>{data.name}</option>;
                                            })}
                                    </select>
                                </div>

                                <div>
                                    {errors.price ?
                                     <label className="mb-3 block text-sm font-medium text-red"> {errors.price.message} </label>:
                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white"> price </label>
                                    }
                                   
                                    <input
                                        type="number"
                                        name='price'
                                        {
                                            ...register('price')
                                            
                                        }
                                        placeholder="Input price"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div>
                                    {errors.time ?
                                     <label className="mb-3 block text-sm font-medium  text-red"> {errors.time.message} </label>:
                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white"> time </label>
                                    }
                                   
                                    <input
                                        type="number"
                                        name='time'
                                        {
                                            ...register('time')
                                            
                                        }
                                        placeholder="how many day for this ?"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div>
                                    {errors.type ? 
                                     <label className="mb-3 block text-sm font-medium text-red">{errors.type.message}</label>:
                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white">Type </label>
                                    }
                
                                    <select
                                        id="categoryId"
                                        defaultValue={''}
                                        {
                                            ...register('type') 
                                        }
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                       
                                    >
                                        <option value={''} hidden disabled>Choose which type do you work ? </option>
                                        <option value={'small'}>small</option>;
                                        <option value={'medium'}>medium</option>;
                                        <option value={'large'}>large</option>;                                        
                                    </select>
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

export default UpdateService;