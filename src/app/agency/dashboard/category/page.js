import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import React from 'react'

export default function CategoryPage() {
  return (
    <div>
        <DefaultLayout>
            <Breadcrumb pageName="category" />
            
        </DefaultLayout>
    </div>
  )
}
