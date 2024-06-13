import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import Roles from '@/components/list/role'
import React from 'react'

export default function RolePage() {
  return (
    <div>
        <DefaultLayout>
            <Breadcrumb pageName="role" />
            <Roles/>
        </DefaultLayout>
    </div>
  )
}
