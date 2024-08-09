"use client"
import DefaultLayout from '@/components/dashboardLayout'
import { useForm } from 'react-hook-form';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCategorySchema } from '@/schemas/categorySchema';
import { useAppContext } from '@/context';
import { useSession } from 'next-auth/react';

function AddCategory() {
    const [subcategoris, setSubcategories] = useState([]);
    const{data:session,status} = useSession();
    const {setCategories ,categories} = useAppContext();
    const [loading , setLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(CreateCategorySchema)
    })
    const handleKeyDown = (e) => {
        if (e.key == 'Enter') {
            if (subcategoris.length < 5 && !subcategoris.includes(e.target.value)) {
                e.target.value && setSubcategories([...subcategoris, e.target.value])
            }
            e.target.value = ''
        }
    }

    const removeSubcategory = (ind) => {
        setSubcategories(subcategoris.filter((d) => d !== subcategoris[ind]))
    }
    const onSubmit = async (d) => {
        if(status === 'authenticated'){
            toast('User can not found',{duration:5});
        }
        const data = new FormData()
        d.image.length && data.append('image', d.image?.[0])
        d.logo.length && data.append('logo', d.logo?.[0])
        data.append('name', d.name)
        data.append('description', d.description)
        data.append('status', d.status)
        subcategoris && data.append('subcategoris', subcategoris)
        d.slug && data.append('slug', d.slug)
        data.append('uid',session.user.id)

        try {
            setLoading(true);
            const res = await axios.post('/api/categories', data)
            if (res.data.success) {
                toast.success(res.data.message)
                setCategories((prev) =>({...prev , data:[res.data.data , ...categories.data]}))
                setLoading(true)
                router.push('/agency/dashboard/categories')
            }

        } catch (error) {
           if(!error.response.data?.success && (error.response.data?.status === 422 || error.response.data?.status === 400)){
               toast.error(error.response.data.message)
           } 
           setLoading(false)
        }
    }
    return (
        <DefaultLayout>
            <div className="grid  gap-9 ">
                <div className="flex flex-col gap-9">
                    <form >
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Add Category
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    {(!errors.name) ? <label className="mb-3 block text-sm font-medium text-black dark:text-white">Name</label> :
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-red">{errors.name.message}</label>}
                                    <input
                                        type="text"
                                        name='name'
                                        {
                                        ...register('name')
                                        }
                                        placeholder="Input category name"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:selection:bg-transparent " 
                                    />
                                </div>

                                <div>
                                    {errors.slug ?
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-red">
                                            {errors?.slug?.message}
                                        </label> :
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            slug
                                        </label>

                                    }
                                    <input
                                        type="text"
                                        name='slug'
                                        {
                                        ...register('slug')
                                        }
                                        placeholder="Input slug"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div>
                                    {
                                        errors.subcatagory ?
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-red">
                                                {errors.subcatagory?.message}
                                            </label> :
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                subcatagory
                                            </label>
                                    }

                                    <input
                                        type="text"
                                        placeholder="input subcategory"
                                        name='subcatagory'
                                        {
                                        ...register('subcatagory')
                                        }
                                        onKeyDown={handleKeyDown}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                                    />
                                    {subcategoris && subcategoris.map((data, ind) => (
                                        <div
                                            key={ind}
                                            className="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                                        >
                                            <div className="max-w-full flex-initial">
                                                {data}
                                            </div>
                                            <div className="flex flex-auto flex-row-reverse">
                                                <div
                                                    onClick={() => removeSubcategory(ind)}
                                                    className="cursor-pointer pl-2 hover:text-danger"
                                                >
                                                    <svg
                                                        className="fill-current"
                                                        role="button"
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-5.5 ">
                                    <div>
                                        {errors.image ?
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-red">
                                                {errors.image.message}
                                            </label> :
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Image
                                            </label>
                                        }
                                        <input
                                            type="file"
                                            name='image'
                                            {
                                            ...register('image')
                                            }
                                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                </div>
                                <div className="flex flex-col gap-5.5 ">
                                    <div>
                                        {errors.logo ?
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-red">
                                                {errors.logo.message}
                                            </label> :
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                logo
                                            </label>
                                        }
                                        <input
                                            type="file"
                                            name='logo'
                                            {
                                            ...register('logo')
                                            }
                                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                </div>


                                <div>
                                    {!(errors.description) ? <label className="mb-3 block text-sm font-medium text-black dark:text-white">Description</label> :
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-red">{errors.description.message}</label>
                                    }

                                    <textarea
                                        rows={6}
                                        name='description'
                                        placeholder="Description of the category"
                                        {
                                        ...register('description')
                                        }
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                                    ></textarea>
                                </div>
                                <div className='flex items-stretch'>
                                    <div className='pr-4'>
                                        <p className='text-bolt '>status</p>
                                    </div>

                                    <div x-data="{ switcherToggle: false }">
                                        <label
                                            htmlFor="toggle2"
                                            className="flex cursor-pointer select-none items-center"
                                        >
                                            <div className="relative">
                                                <input
                                                    id="toggle2"
                                                    name='status'
                                                    type="checkbox"
                                                    className="sr-only"
                                                    {
                                                    ...register('status')
                                                    }
                                                    onChange={() => {
                                                        setEnabled(!enabled);
                                                    }}
                                                />
                                                <div className="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
                                                <div
                                                    className={`dot absolute -top-1 left-0 h-7 w-7 rounded-full bg-white shadow-switch-1 transition ${enabled && "!right-0 !translate-x-full !bg-primary dark:!bg-white"}`}
                                                ></div>
                                            </div>
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                            <div className="flex flex-col gap-5.5 p-2">
                               {
                                 loading ?
                                 <button type='button' className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-full group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                    <span className="relative"> .....</span>
                                </button>
                                 :
                                 <button type='button' onClick={handleSubmit(onSubmit)} className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-full group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                    <span className="relative">Submit</span>
                                </button>
                               } 
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </DefaultLayout>
    )
}

export default AddCategory