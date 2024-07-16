'use client'
import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import Mapings from '@/components/list/maping'
import MapingModal from '@/components/modal/MapingModal'
import { useAppContext } from '@/context'
import React, {  useState } from 'react'

export default function MapingPage() {
    const [isOpenMaping, setIsOpenMaping] = useState(false);
    const { mapings, setMapings ,components, roles } = useAppContext()
    const [maping, setMaping] = useState('');
    const [req, setReq] = useState(null);
    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName="Mapings" />
                {isOpenMaping && <MapingModal
                    req={req}
                    isOpenMaping={isOpenMaping}
                    setIsOpenMaping={setIsOpenMaping}
                    maping={maping}
                    mapings={mapings}
                    setMapings={setMapings}
                    components={components}
                    roles={roles}
                />}
                <Mapings
                    setIsOpenMaping={setIsOpenMaping}
                    mapings={mapings}
                    setMaping={setMaping}
                    setReq={setReq}
                />
            </DefaultLayout>
        </div>
    )
}
