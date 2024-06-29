'use client'
import axios from "axios";
import React, { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { modalStyles } from "@/utils/Constants";
import toast from "react-hot-toast";
import Modal from 'react-modal'
import { useSession } from "next-auth/react";

export default function ProposalModal(props) {
    const { data: section, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const { req, isopenProposal, setIsOpenProposal, service, setProposals, fieldPermission = [], proposal, proposals} = props;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: proposal ? {
            title: proposal.title,
            day: proposal.day,
            type: proposal.type,
            description: proposal.description
        } : {}
    });
    const rootRef = createRef();
    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            if (req === 'create' && status === 'authenticated') {
                data.uid = section.user.id
                data.service = service._id
                const res = await axios.post('/api/proposals', data);
                if (res.data.success) {
                    toast.success(res.data?.message);
                    setProposals(res.data.data)
                }
            } else if (req === 'update') {
                const res = await axios.put(`/api/proposals/${proposal._id}`, data);
                if (res.data.success) {
                    const filterProposal = proposals.filter((data) => data._id !== proposal._id);
                    data._id = proposal._id;
                    setProposals([data, ...filterProposal]);
                    toast.success(res.data?.message);
                }
            }
            reset()
            setIsOpenProposal(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Modal
                isOpen={isopenProposal}
                style={modalStyles}
                contentLabel="Proposal Modal"
                appElement={rootRef.current}
                onRequestClose={() => setIsOpenProposal(false)}
            >
                <div className="flex flex-row">
                    <p className="text-xl font-medium mb-4">{req} proposal</p>
                    <span className="text-lg  pl-40 hover:text-red-600 "
                        onClick={() => setIsOpenProposal(false)}
                    >X</span>
                </div>
                <div ref={rootRef} id="root">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {(fieldPermission.includes('title') || req === 'create') && <div>
                            {
                                !errors.title ? (
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Title
                                    </label>

                                ) : (

                                    <label
                                        htmlFor="title"
                                        className="block text-bolt  font-medium text-red"
                                    >
                                        {errors.title?.message}
                                    </label>
                                )
                            }

                            <input
                                type="text"
                                {...register("title",
                                    {
                                        required: "Title is required"
                                    })}
                                id="title"
                                name="title"
                                placeholder='Enter your job title'
                                className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.title
                                    ? " border-red-400"
                                    : " border-gray-400"
                                    }`}
                            />
                        </div>}
                        {(fieldPermission.includes('type') || req === 'create') && <div>
                            {
                                !errors.type ? (
                                    <label
                                        htmlFor="type"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Type
                                    </label>

                                ) : (

                                    <label
                                        htmlFor="type"
                                        className="block text-sm font-medium text-red-700"
                                    >
                                        {errors.type?.message}
                                    </label>
                                )
                            }

                            <select
                                type="text"
                                {...register("type",
                                    {
                                        required: "Type is required",
                                    })}
                                id="type"
                                name="type"
                                defaultValue={''}
                                className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.type
                                    ? " border-red-400"
                                    : " border-gray-400"
                                    }`}
                            >
                                <option value='' disabled hidden> which type of you project ? </option>
                                <option value='small' > small </option>
                                <option value='medium' > medium </option>
                                <option value='large' > large </option>
                            </select>
                        </div>}
                        {(fieldPermission.includes('day') || req === 'create') && <div>
                            {
                                !errors.day ? (
                                    <label
                                        htmlFor="day"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Day
                                    </label>

                                ) : (

                                    <label
                                        htmlFor="day"
                                        className="block text-bolt  font-medium text-red"
                                    >
                                        {errors.day?.message}
                                    </label>
                                )
                            }

                            <input
                                type="number"
                                {...register("day",
                                    {
                                        required: "Days is required",
                                    })}
                                id="day"
                                name="day"
                                placeholder='how maney days will you pay for this ?'
                                className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.day
                                    ? " border-red-400"
                                    : " border-gray-400"
                                    }`}
                            />
                        </div>}
                        {(fieldPermission.includes('description') || req === 'create') && <div>
                            {
                                !errors.description ? (
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>

                                ) : (

                                    <label
                                        htmlFor="description"
                                        className="block text-bolt  font-medium text-red"
                                    >
                                        {errors.description?.message}
                                    </label>
                                )
                            }

                            <textarea
                                type="text"
                                {...register("description",
                                    {
                                        required: "Description is required",
                                    })}
                                id="description"
                                name="description"
                                placeholder='Over all describe of your project'
                                className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.description
                                    ? " border-red-400"
                                    : " border-gray-400"
                                    }`}
                            />
                        </div>}
                        {(fieldPermission.includes('amount') || req === 'create') && <div>
                            {
                                !errors.amount ? (
                                    <label
                                        htmlFor="amount"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Amount
                                    </label>

                                ) : (

                                    <label
                                        htmlFor="amount"
                                        className="block text-bolt  font-medium text-red"
                                    >
                                        {errors.amount?.message}
                                    </label>
                                )
                            }

                            <input
                                type="number"
                                {...register("amount",
                                    {
                                        required: "Amount is required",
                                    })}
                                id="amount"
                                name="amount"
                                placeholder='how maney amount will you pay?'
                                className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.day
                                    ? " border-red-400"
                                    : " border-gray-400"
                                    }`}
                            />
                        </div>}

                        <div>
                            {!isLoading ?
                                <button
                                    type="submit"
                                    className="w-full  bg-blue-500 focus:bg-blue-700  text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                                >
                                    Submit
                                </button> : <button
                                    type="button"
                                    className="w-full  bg-blue-500 focus:bg-blue-700  text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                                >
                                    ....
                                </button>}
                        </div>
                    </form>

                </div>


            </Modal>

        </>
    )
}