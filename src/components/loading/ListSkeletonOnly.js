import React from 'react';

export default function ListSkeletonOnly() {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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