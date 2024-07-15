import React from 'react'
import Skeleton from 'react-loading-skeleton'
export default  function  ListSkeleton () {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <div className="flow-root ">
                    <h4 className=" float-left text-xl font-semibold text-black dark:text-white">
                        <Skeleton height={30} width={300} borderRadius={10} />
                    </h4>
                    <div className='float-right'>
                        <Skeleton height={30} width={50} borderRadius={10} />
                    </div>

                </div>
            </div>
            {
                Array.from({ length: 10 }).map((_, ind) => (
                    <div key={ind} className="grid  grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                        <div className=" col-span-2 flex items-center">
                            <Skeleton height={35} width={300} borderRadius={10} />
                        </div>
                        <div className="col-span-2 flex items-center">
                            <Skeleton height={35} width={300} borderRadius={10} />
                        </div>
                        <div className="col-span-2 flex items-center">
                            <Skeleton height={35} width={300} borderRadius={10} />
                        </div>
                        <div className="col-span-2 flex items-center">
                            <Skeleton height={35} width={300} borderRadius={10} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
};
