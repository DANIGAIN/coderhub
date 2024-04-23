"use client"
import React, { useState } from 'react'
import Sidebar from '../dashboardSidebar'
import Header from '../dashboardHeader'
export default function DefaultLayout({ childern }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className='mx-auto max-w-screen-2xl md:p-6 2xl:p-10'>
              {childern}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
