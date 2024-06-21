import React from 'react'
import service_img from '../../../../../public/assets/service.png'
import Image from 'next/image';
function servicePage(props) {
  const { id } = props.params;
  return (
    <>
      <div class=" flex bg-orange-100 rounded-lg shadow-lg p-6 pb-28">
        <div className='left w-1/2  text-left mt-20'>
          <div class=" items-center mb-6 ml-40">
            <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
              <Image src={service_img} alt="Service Image" class="w-full h-full object-cover" />
            </div>

            <h3 class="text-xl font-semibold  text-slate-950">Service Name</h3>
            <p class=" text-slate-950">Service Category</p>

          </div>
          <p class=" text-slate-950 ml-40">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
          </p>
          <div class=" justify-between items-center mt-6 ml-40">
            <p class="text-xl font-semibold text-slate-950">$100</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
              Book Now
            </button>
          </div>
        </div>
        <div className=' relative'>
          <Image className='w-150 absolute ' src={service_img} alt="Service Image" class="" />
        </div>

      </div>
    </>

  )
}

export default servicePage;