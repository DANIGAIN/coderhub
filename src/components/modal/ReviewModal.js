'use client'
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { modalStyles } from "@/utils/Constants";
import toast from "react-hot-toast";
import Modal from 'react-modal'
import { IoMdStar } from "react-icons/io";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReviewSchema } from "@/schemas/reviewSchema";

export default function ReviewModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const { setIsOpenReview, service, isopenReview, setReviews } = props;
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver:zodResolver(CreateReviewSchema)
  }
  );
  const onSubmit = async (data) => {
     setIsLoading(true)
    try {
      if (status === 'authenticated') {
        data.uid = session.user.id;
        data.service = service.data._id;
        const res = await axios.post('/api/reviews', data);
        if (res.data.success) {
          setReviews((prev) => ({...prev , data:[...prev.reviews.data ,res.data.data]}))
          toast.success(res.data?.message);
        }
      } else {
        toast("you are unauthenticated  ! Login first", { duration: 6000 })
      }
      reset()
      setIsOpenReview(false)

    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <Modal
      isOpen={isopenReview}
      style={modalStyles}
      contentLabel="Role Modal"
      ariaHideApp={false}
      onRequestClose={() => setIsOpenReview(false)}
    >
      <div className="flex justify-between">
        <p className="text-xl font-medium mb-4"> create review</p>
        <span className="text-lg pr-2 pl-40 hover:text-red"
          onClick={() => setIsOpenReview(false)}
        >X</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          {
            !errors.comment ? (
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Comment
              </label>

            ) : (

              <label
                htmlFor="comment"
                className="block text-bolt  font-medium text-red"
              >
                {errors.comment?.message}
              </label>
            )
          }

          <input
            type="text"
            {...register("comment")}
            id="comment"
            name="comment"
            placeholder='Enter your message'
            className={`text-gray-700 block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-gray-400 focus:border-gray-600 ${errors.email
              ? " border-red-400"
              : " border-gray-400"
              }`}
          />
        </div>
        <div>

          {!errors.rating ? <h3 className="mb-4 block text-sm font-medium text-gray-700">
            Rating
          </h3> :
            <h3 className="block text-bolt  font-medium text-red">
              {errors?.rating?.message}
            </h3>}
          <ul className="w-full text-sm font-medium text-gray-700 dark:bg-gray-700">
            <li className="w-full rounded-t-lg ">
              <div className="flex items-center ps-3">
                <input
                  id="rating"
                  name="rating"
                  type="radio"
                   defaultValue="4"
                  {
                  ...register('rating')
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 "
                />
                <label
                  htmlFor="vue-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <span className="flex">
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                  </span>
                </label>
              </div>
            </li>
            <li className="w-full rounded-t-lg">
              <div className="flex items-center ps-3">
                <input
                  id="rating"
                  name="rating"
                  {
                    ...register('rating')
                  }
                  type="radio"
                  defaultValue="4"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 "
                />
                <label
                  htmlFor="vue-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <span className="flex">
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                  </span>
                </label>
              </div>
            </li>
            <li className="w-full rounded-t-lg ">
              <div className="flex items-center ps-3">
                <input
                  id="rating"
                  name="rating"
                  type="radio"
                  {
                    ...register('rating')
                  }
                  defaultValue="3"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 "
                />
                <label
                  htmlFor="vue-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <span className="flex">
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                  </span>
                </label>
              </div>
            </li>
            <li className="w-full rounded-t-lg ">
              <div className="flex items-center ps-3">
                <input
                  id="rating"
                  name="rating"
                  type="radio"
                  {
                    ...register('rating')
                  }
                  defaultValue="2"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 "
                />
                <label
                  htmlFor="vue-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <span className="flex">
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                  </span>
                </label>
              </div>
            </li>
            <li className="w-full rounded-t-lg ">
              <div className="flex items-center ps-3">
                <input
                  id="rating"
                  name="rating"
                  type="radio"
                  {
                    ...register('rating')
                  }
                  defaultValue="1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 "
                />
                <label
                  htmlFor="vue-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <span className="flex">
                    <IoMdStar className="text-yellow-400" />
                  </span>
                </label>
              </div>
            </li>
          </ul>

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