
import React from 'react'
import DefaultLayout from '@/components/dashboardLayout'
export default function Dashboardlayout({children}) {
  return (
    <div>
      <DefaultLayout>
           {children}
      </DefaultLayout> 
    </div>
  )
}
