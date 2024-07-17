import React from 'react';

export default function ListSkeleton() {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <div className="flow-root">
          <h4 className="float-left text-xl font-semibold text-black dark:text-white">
            <div className="h-6 w-30 sm:w-48 bg-slate-400 animate-pulse rounded" />
          </h4>
          <div className="float-right">
            <div className="h-6 w-12 bg-slate-400  animate-pulse rounded" />
          </div>
        </div>
      </div>
      {Array.from({ length: 11 }).map((_, ind) => (
        <div key={ind} className="flex justify-between border-t sm:space-x-5 space-x-3 border-stroke px-4 py-4.5 dark:border-strokedark ">
          <div className="flex-1 hidden sm:block">
            <div className="h-8 w-auto bg-slate-400 animate-pulse rounded" />
          </div>
          <div className="flex-1 hidden sm:block">
            <div className="h-8 w-auto bg-slate-400  animate-pulse rounded" />
          </div>
          <div className="flex-1">
            <div className="h-8 w-auto bg-slate-400 animate-pulse rounded" />
          </div>
          <div className="flex-1">
            <div className="h-8 w-auto bg-slate-400 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}