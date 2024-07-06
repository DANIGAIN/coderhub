"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
export default function ContactPage() {
  const { data, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
    }
  })

  useEffect(() => {
    if (data && data?.user) {
      setValue("name", data.user.name);
    }
  }, [data])

  const onSubmit = async (d) => {
    if (status === 'unauthenticated') {
      toast("Please login first  then come ", { duration: 3000 })
    } else {
      setIsLoading(true)
      try {
        d.uid = data.user.id
        const res = await axios.post('/api/contact', d)
        if (res.data.success) {
          toast.success(res.data.message)
          router.push('/')
        }
      } catch (error) {
        // toast.error(error?.message)
      } finally {
        setIsLoading(false)
      }
    }
  }
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 " />
      <section
        id="contact"
        className="py-12 bg-gray-100 flex justify-center items-center mt-1 "
      >
        <div className="container mx-auto px-4 w-full items-center md:w-2/3 lg:w-1/2 items center mt-15 ">
          <div className="bg-zinc-700 shadow-md  border-2 border-solid border-gray-600 rounded-lg p-5 ">
            <h3 className="text-3xl mb-8 text-gray-400 p-4 justify-center">
              Contact Us
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="contactForm"
              action="#"
              method="POST"
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="sm:col-span-2">
                {!errors.name ?
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2" > Name </label> :
                  <label htmlFor="name" className="block text-red-600  mb-2" > {errors.name.message} </label>
                }

                <input
                  type="text"
                  id="name"
                  {
                  ...register('name', {
                    required: 'Please enter your name'
                  })
                  }
                  name="name"
                  placeholder="Enter your name"
                  className= " bg-zinc-500 focus:border-blue-300  w-full border border-gray-300 text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-gray-800 focus:border-gray-800 "
                />
              </div>

              <div className="sm:col-span-2">
                {!errors.subject ?
                  <label htmlFor="subject" className="block font-semibold mb-2" > Subject </label> :
                  <label htmlFor="subject" className="block mb-2" > {errors.subject.message} </label>

                }

                <input
                  type="text"
                  id="subject"
                  {
                  ...register('subject', {
                    required: "Please enter Subject"
                  })
                  }
                  name="subject"
                  placeholder="Enter the subject"
                  className=" bg-zinc-500 focus:border-blue-300  w-full border border-gray-300 text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-gray-800 focus:border-gray-800"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  {
                  ...register('message')
                  }
                  placeholder="Enter your message"
                  rows={5}
                  className="bg-zinc-500 focus:border-blue-300 w-full border border-gray-300 text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-gray-
              800 focus:border-gray-800"
                  defaultValue={""}
                />
                <div id="messageValidation" className="hidden text-red-600 text-sm">
                  Please enter your message.
                </div>
              </div>
              <div className="sm:col-span-2">
                {!isLoading ?
                  <button
                    type="submit"
                    className="bg-blue-500 focus:bg-blue-700 w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                  >
                    Submit
                  </button> :
                  <button
                    type="button"
                    className="bg-blue-500 focus:bg-blue-700  w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                  >
                    Loading ....
                  </button>
                }

              </div>
            </form>
          </div>
        </div>
      </section>
    </>




  )
}

