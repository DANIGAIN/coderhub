'use client'
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { modalStyles } from "@/utils/Constants";
import toast from "react-hot-toast";
import Modal from 'react-modal'
import { GlobalContext } from "@/context";

export default function UserModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { users, setUsers, categories } = useContext(GlobalContext)
  const [skills, setSkills] = useState([]);
  const { req, setIsOpenUser, user, isOpenUser } = props;
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    data.phone && formData.append('phone', data.phone)
    data.bio && formData.append('bio', data.bio)
    data.specialist && formData.append('specialist', data.specialist)
    skills[0] && formData.append('skill', skills)
    data.image[0] && formData.append('image', data.image[0]);
    setIsLoading(true)
    try {
      if (req === 'create') {
        const res = await axios.post('/api/auth/users',formData);
        console.log(res.data)
        if (res.data.success) {
          console.log(res.data)
          setUsers([res.data.data, ...users])
          toast.success(res.data?.message);
        }
      } 
      
      reset()
      setIsOpenUser(false)

    } catch (error) {   
      if (!error.response.success && error.response.status === 400) {
        reset()
        setIsOpenUser(false)
        toast.error(error.response.data.message)
      }
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }

  }


  return (

    <Modal
      isOpen={isOpenUser}
      style={modalStyles}
      contentLabel="User Modal"
      onRequestClose={() => setIsOpenUser(false)}
    >
      <div className="flex justify-between">
        <p className="text-xl font-medium mb-4">{req} User</p>
        <span className="text-lg pr-2 pl-40 hover:text-red"
          onClick={() => setIsOpenUser(false)}
        >X</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="sm:flex sm:justify-between sm:space-x-4 ">
          <div>
            {
              !errors.name ? (
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Name
                </label>

              ) : (

                <label
                  htmlFor="name"
                  className="block text-bolt  font-medium text-red"
                >
                  {errors.name?.message}
                </label>
              )
            }

            <input
              type="text"
              {...register("name",
                {
                  required: "Name is required"
                })}
              id="name"
              name="name"
              placeholder='Enter your name'
              className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
                ? " border-red-400"
                : " border-gray-400"
                }`}
            />
          </div>
          <div>
            {
              !errors.email ? (
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mt-5 sm:mt-0"
                >
                  Email
                </label>

              ) : (

                <label
                  htmlFor="email"
                  className="block text-bolt  font-medium text-red"
                >
                  {errors.email?.message}
                </label>
              )
            }

            <input
              type="email"
              {...register("email",
                {
                  required: "Email is required"
                })}
              id="email"
              name="email"
              placeholder='Enter user email'
              className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
                ? " border-red-400"
                : " border-gray-400"
                }`}
            />
          </div>
        </div>
        <div className="sm:flex sm:justify-between sm:space-x-4 ">
          <div>
            {
              !errors.password ? (
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

              ) : (

                <label
                  htmlFor="email"
                  className="block text-bolt  font-medium text-red"
                >
                  {errors.password?.message}
                </label>
              )
            }

            <input
              type="password"
              {...register("password",
                {
                  required: "Password is required"
                })}
              id="password"
              name="password"
              placeholder='Enter user passowrd'
              className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
                ? " border-red-400"
                : " border-gray-400"
                }`}
            />
          </div>
          <div>

            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mt-5 sm:mt-0"
            >
              Phone
            </label>
            <input
              type="number"
              {...register("phone")}
              id="phone"
              name="phone"
              placeholder='Enter user phone - (optional)'
              className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
                ? " border-red-400"
                : " border-gray-400"
                }`}
            />
          </div>
        </div>
        <div>


          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <input
            type="text"
            {...register("bio")}
            id="bio"
            name="bio"
            placeholder='Enter user bio - (optional)'
            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
              ? " border-red-400"
              : " border-gray-400"
              }`}
          />
        </div>
        <div>


          <label
            htmlFor="specialist"
            className="block text-sm font-medium text-gray-700"
          >
            Specialist
          </label>
          <select
            id="specialist"
            name="specialist"
            {
            ...register('specialist')
            }
            defaultValue={""}
            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600  border-gray-400`}
          >
            <option disabled value="" hidden >Enter user specialist stack</option>
            {
              categories.map((data, index) => (
                <option key={index} value={data.id}>{data.name}</option>
              ))
            }
          </select>
        </div>
        <div>


          <label
            htmlFor="skill"
            className="block text-sm font-medium text-gray-700"
          >
            Skill
          </label>
          <select
            id="skill"
            name="skill"
            onChange={(e) => {
              if (!skills.includes(e.target.value)) setSkills((prev) => ([e.target.value, ...prev]))
            }}
            defaultValue={""}

            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600  border-gray-400`}
          >
            <option disabled value="" hidden >Enter user skill stack</option>
            {
              watch().specialist ?
                categories.find((data) => data.id === watch().specialist)
                  .subcategoris.map((data, index) => (
                    <option key={index} value={data}>{data}</option>
                  )) : null
            }

          </select>
          <div className="mt-2">
            {skills.map((data , index)=>(
              <span key={index}> {data}</span>
            ))}

          </div>
        </div>
        <div >
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="image">Upload file</label>
          <input
            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 border-gray-400`}
            id="image"
            {
            ...register('image')
            }
            type="file" />
        </div>


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


    </Modal>
  )
}