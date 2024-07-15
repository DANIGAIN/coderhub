'use client'
import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import Components from '@/components/list/component'
import ComponentModal from '@/components/modal/ComponentModal';
import { useAppContext } from '@/context';
import React, { useState } from 'react'

export default function ComponentPage() {
    const [component, setComponent] = useState(null);
    const [isOpenComponent, setIsOpenComponent] = useState(false);
    const [req, setReq] = useState(null);
    const { components, setComponents } = useAppContext();
    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName="Component" />
                {isOpenComponent && <ComponentModal
                    req={req}
                    isOpenComponent={isOpenComponent}
                    setIsOpenComponent={setIsOpenComponent}
                    component={component}
                    components={components}
                    setComponents={setComponents}
                />}
                <Components
                   components={components}
                   setReq = {setReq}
                   setIsOpenComponent={setIsOpenComponent}
                   setComponent={setComponent}
                   setComponents={setComponents}
                />
            </DefaultLayout>
        </div>
    )
}
