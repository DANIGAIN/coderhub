'use client'
import Breadcrumb from '@/components/Breadcrumbs'
import DefaultLayout from '@/components/dashboardLayout'
import Roles from '@/components/list/role'
import RoleModal from '@/components/modal/RoleModal';
import { GlobalContext } from '@/context';
import React, { useContext, useEffect, useState } from 'react'

export default function RolePage() {
  const [isOpenRole , setIsOpenRole] = useState(false);
  const {roles , setRoles} = useContext(GlobalContext)
  const [role, setRole] = useState('');
  const [req, setReq] = useState(null);

  return (
    <div>
        <DefaultLayout>
            <Breadcrumb pageName="role" />
            {isOpenRole && <RoleModal
            req={req}
            isOpenRole={isOpenRole}
            setIsOpenRole={setIsOpenRole}
            role={role}
            roles={roles}
            setRoles={setRoles}
        />}
            <Roles
               setReq={setReq}
               roles={roles}
               setRoles={setRoles}
               setRole={setRole}
               role={role}
               setIsOpenRole ={setIsOpenRole}

            />
        </DefaultLayout>
    </div>
  )
}
