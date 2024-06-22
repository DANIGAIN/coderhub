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
  const { roles, setRoles, categories } = useContext(GlobalContext)
  const [skills, setSkills] = useState([]);
  const { req, setIsOpenUser, user, isOpenUser } = props;
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: user ? {
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image

    } : {}
  });
  const onSubmit = async (data) => {
    // setIsLoading(true)
    // try {
    //   if (req === 'create') {
    //     const res = await axios.post('/api/roles', data);
    //     if (res.data.success) {
    //       setRoles([res.data.data, ...roles])
    //       toast.success(res.data?.message);
    //     }
    //   } else if (req === 'update') {
    //     const res = await axios.put(`/api/roles/${role._id}`, data);
    //     if (res.data.success) {
    //       const filderRole = roles.filter((data) => data._id !== role._id);
    //       data._id = role._id;
    //       setRoles([data, ...filderRole]);
    //       toast.success(res.data?.message);
    //     }
    //   }
    //   reset()
    //   setIsOpenRole(false)

    // } catch (error) {
    //   if (!error.response.success && error.response.status === 400) {
    //     reset()
    //     setIsOpenMaping(false)
    //     toast.error(error.response.data.message)
    //   }
    //   // console.log(error);
    //   setIsLoading(false)
    // } finally {
    //   setIsLoading(false)
    // }

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
        <div className="flex justify-between space-x-4">
          <div>
            {
              !errors.name ? (
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
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
                  className="block text-sm font-medium text-gray-700"
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
        <div className="flex justify-between space-x-4">
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
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="number"
              {...register("phone",
                {
                  required: "Phone is required"
                })}
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

            defaultValue={""}
            
            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600  border-gray-400`}
          >
            <option disabled value="" hidden >Enter user specialist stack</option>
            <option value='Saturday'>Saturday</option>
            <option value='Sunday'>Sunday</option>
            <option value='Monday'>Monday</option>
            <option value='Tuesday'>Tuesday</option>
            <option value='Wednesday'>Wednesday</option>
            <option value='Thursday'>Thursday</option>
            <option value='Friday'>Friday</option>
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

            defaultValue={""}
            
            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600  border-gray-400`}
          >
            <option disabled value="" hidden >Enter user skill stack</option>
            <option value='Saturday'>Saturday</option>
            <option value='Sunday'>Sunday</option>
            <option value='Monday'>Monday</option>
            <option value='Tuesday'>Tuesday</option>
            <option value='Wednesday'>Wednesday</option>
            <option value='Thursday'>Thursday</option>
            <option value='Friday'>Friday</option>
          </select>
           <div>
          {/* {skills.map((data, index)=>(
               <span key={index}> {data}</span> 
          ))} */}
        
        </div>
        </div>
        <div >
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="image">Upload file</label>
          <input
            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 border-gray-400`}
            id="image" type="file" />
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