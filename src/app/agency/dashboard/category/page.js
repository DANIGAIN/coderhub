import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import Categorys from '@/components/list/category'
import React from 'react'

export default function CategoryPage() {
  return (
    <div>
        <DefaultLayout>
            <Breadcrumb pageName="category" />
             <Categorys/>
        </DefaultLayout>
    </div>
  )
}
