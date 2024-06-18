import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import Components from '@/components/list/component'
import React, { useState } from 'react'

export default function ComponentPage() {
    // const [component, setComponent] = useState(null);
    // const [isOpenComponent , setIsOpenComponents] = useState(true);
    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName="Component" />
                <Components/>
            </DefaultLayout>
        </div>
      )
}
