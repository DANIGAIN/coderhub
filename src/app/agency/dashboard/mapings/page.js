import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import Mapings from '@/components/list/maping'
import React from 'react'

export default function MapingPage() {
    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName="Mapings" />
                <Mapings />
            </DefaultLayout>
        </div>
    )
}
