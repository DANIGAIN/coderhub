import React from 'react'

function servicePage(props) {
  const { id } = props.params;
  return (
    <>
    <div class="bg-white rounded-lg shadow-lg p-6">
  <div class="flex items-center mb-6">
    <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
      <img src="https://source.unsplash.com/random/160x160?sig=1" alt="Service Image" class="w-full h-full object-cover"/>
    </div>
    <div>
      <h3 class="text-xl font-semibold text-gray-800">Service Name</h3>
      <p class="text-gray-600">Service Category</p>
    </div>
  </div>
  <p class="text-gray-600">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
  </p>
  <div class="flex justify-between items-center mt-6">
    <p class="text-xl font-semibold text-gray-800">$100</p>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Book Now
    </button>
  </div>
</div>
    </>

  )
}

export default servicePage;