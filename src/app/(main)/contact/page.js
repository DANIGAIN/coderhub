import React from 'react'

function ContactPage() {
  return (
    <section
    id="contact"
    className="py-12 bg-gray-100 flex justify-center items-center"
  >
    <div className="container mx-auto px-4 w-full md:w-2/3 lg:w-1/2">
      <div className="bg-white shadow-md  border-2 border-solid border-gray-600 rounded-lg p-5  w-3/4">
        <h3 className="text-3xl mb-8 text-gray-400 p-4 justify-center">
          Contact Us
        </h3>
        <form
          id="contactForm"
          action="#"
          method="POST"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-gray-800 focus:border-gray-800"
            />
            <div id="nameValidation" className="hidden text-red-600 text-sm">
              Please enter your name.
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-gray-800 focus:border-gray-800"
            />
            <div id="emailValidation" className="hidden text-red-600 text-sm">
              Please enter a valid email address.
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="subject"
              className="block text-gray-700 font-semibold mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter the subject"
              className="w-full border border-gray-300 text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-gray-800 focus:border-gray-800"
            />
            <div id="subjectValidation" className="hidden text-red-600 text-sm">
              Please enter the subject.
            </div>
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
              placeholder="Enter your message"
              rows={5}
              className="w-full border border-gray-300 text-slate-400 rounded-md px-4 py-2 focus:outline-none focus:ring-gray-
              800 focus:border-gray-800"
              defaultValue={""}
            />
            <div id="messageValidation" className="hidden text-red-600 text-sm">
              Please enter your message.
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  
  )
}

export default ContactPage