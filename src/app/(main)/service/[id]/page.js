'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
function servicePage(props) {
  const [service , setService] = useState('');
  const { id } = props.params;

  useEffect(()=>{
    ;(async()=>{
      const res = await axios.get(`/api/services/${id}`)
      if(res.data.success){
        setService(res.data.data)
      }
    })()
  },[])
  console.log(service)
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
      <div className=" flex bg-slate-700 rounded-lg shadow-lg h-125 m-5 p-6 ">
        <div classNameName='left w-1/2  text-left mt-20'>
          <div className=" items-center mb-6 ml-40">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ">
              {
                service?.category?.logo ?
                 <Image 
                 src={`/category/${service?.category?.logo}`}
                 alt="Service Logo"
                 width={200}
                 height={200}
                 className="w-full h-full object-cover" />:
                 <Image 
                 src={`/category/${service?.category?.image}`}
                 width={200}
                 height={200}
                 alt="Service Logo"
                 className="w-full h-full object-cover" />
              
            }
           
            </div>

            <h3 className="text-xl font-semibold  text-slate-950 mt-5">{service?.category?.name}</h3>
            <p className=" text-slate-950 mt-5">{service?.category?.slug}</p>

          </div>
          <p className=" text-slate-950 ml-40">
          {service?.category?.description}
          </p>
          <div className= ' text-slate-950 justify-between  items-center mt-6 ml-40' >
            {service?.category?.subcategoris.map((data , index) =>{
               return  <span  key={index}>{service?.category?.subcategoris.length-1 != index ?   data + ' | ': data}</span>
            })}
          </div>
          <div className=" justify-between items-center mt-6 ml-40">
            <p className="text-xl font-semibold text-slate-950">${service.price}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m mt-2">
              Book Now
            </button>
          </div>
        </div>
        
          <Image 
           className='w-150 rounded-lg'
           height={200}
           width={200}
           src={`/category/${service?.category?.image}`} 
           alt="Service Image"  />

      </div>
    </>

  )
}

export default servicePage;