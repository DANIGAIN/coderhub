'use client'
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { modalStyles } from "@/utils/Constants";
import toast from "react-hot-toast";
import Modal from 'react-modal'
import { useSession } from "next-auth/react";
import {  CreateProposalAdminSchema, CreateProposalUserSchema } from "@/schemas/proposalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function ProposalModal(props) {
    const { data: section, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { req, isopenProposal, setIsOpenProposal, service, setProposals, fieldPermission = [], proposal, proposals } = props;
    const schema =  !fieldPermission.includes('amount') ? CreateProposalUserSchema : CreateProposalAdminSchema;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: proposal ? {
            title: proposal.title,
            day: proposal.day,
            type: proposal.type,
            description: proposal.description
        } : {}
    });
    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
                if (req === 'create' && status === 'authenticated') {
                    data.uid = section.user.id;
                    data.service = service._id;
                    const res = await axios.post('/api/proposals', data);
                    if (res.data.success) {
                        toast.success(res.data?.message);
                        setProposals((prev) => ({...prev , data:[...proposals.data, res.data.data]}))
                        router.push('/service/my-proposal') 
                    }
                } else if (req === 'update') {
                    (fieldPermission.includes('amount')) ? data.status = 'accepted' : data.status = 'pending';
                    const res = await axios.put(`/api/proposals/${proposal._id}`, data);
                    if (res.data.success) {
                        const filterProposal = proposals.data.filter((data) => data._id !== proposal._id);
                        setProposals((perv) => ({...perv, data:[res.data.data, ...filterProposal]}));
                        toast.success(res.data?.message);
                    }
                }
        } catch (error) {
            if(!error.response?.success && error?.response?.status === 422) {
                toast.error(error.response.data.message)
            }
            setIsLoading(false)
        } finally {
            reset()
            setIsOpenProposal(false)
            setIsLoading(false)
        }
    }
    return (
        <>
            <Modal
                isOpen={isopenProposal}
                style={modalStyles}
                contentLabel="Proposal Modal"
                ariaHideApp={false}
                onRequestClose={() => setIsOpenProposal(false)}
            >
                <div className="flex flex-row">
                    <p className="text-xl font-medium mb-4">{req} proposal</p>
                    <span className="text-lg  pl-40 hover:text-red-600 "
                        onClick={() => setIsOpenProposal(false)}
                    >X</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {(fieldPermission.includes('title')) && <div>
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
                            {...register("title")}
                            id="title"
                            name="title"
                            placeholder='Enter your job title'
                            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.title
                                ? " border-red-400"
                                : " border-gray-400"
                                }`}
                        />
                    </div>}
                    {(fieldPermission.includes('type')) && <div>
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
                                    className="block text-medium text-bolt font-medium text-red text-"
                                >
                                    {errors.type?.message}
                                </label>
                            )
                        }

                        <select
                            type="text"
                            {...register("type")}
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
                    {(fieldPermission.includes('day')) && <div>
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
                            {...register("day", { setValueAs: (value) => Number(value) })}
                            id="day"
                            name="day"
                            placeholder='how maney days will you pay for this ?'
                            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.day
                                ? " border-red-400"
                                : " border-gray-400"
                                }`}
                        />
                    </div>}
                    {(fieldPermission.includes('description')) && <div>
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
                            {...register("description")}
                            id="description"
                            name="description"
                            placeholder='Over all describe of your project'
                            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.description
                                ? " border-red-400"
                                : " border-gray-400"
                                }`}
                        />
                    </div>}
                    {(fieldPermission.includes('amount')) && <div>
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
                            {...register("amount", {
                                setValueAs:(value)=> Number(value)
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
                    {!isLoading ? (
                        <button type="submit" className="w-full bg-blue-500 focus:bg-blue-700 text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
                            Submit
                        </button>
                    ) : (
                        <button type="button" className="w-full bg-blue-500 focus:bg-blue-700 text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
                            ....
                        </button>
                    )}
                </form>
            </Modal>

        </>
    )
}