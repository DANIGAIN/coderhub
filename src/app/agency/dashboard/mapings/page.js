'use client'
import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import Mapings from '@/components/list/maping'
import MapingModal from '@/components/modal/MapingModal'
import { GlobalContext } from '@/context'
import React, { useContext, useState } from 'react'

export default function MapingPage() {
    const [isOpenMaping, setIsOpenMaping] = useState(true);
    const { mapings, setMapings ,components, roles } = useContext(GlobalContext)
    const [maping, setMaping] = useState('');
    const [req, setReq] = useState(null);
    return (
        <div>
            <DefaultLayout>
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
                <Breadcrumb pageName="Mapings" />
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
