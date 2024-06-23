'use client'
import Breadcrumb from "@/components/Breadcrumbs";
import DefaultLayout from "@/components/dashboardLayout";
import Users from "@/components/list/user";
import UserModal from "@/components/modal/UserModal";
import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
export default function userPage() {
    const [isOpenUser , setIsOpenUser] = useState(false);
    const {users , setUsers} = useContext(GlobalContext)
    const [user, setUser] = useState('');
    const [req, setReq] = useState(null);
    return (
        <DefaultLayout>
           <Breadcrumb pageName="user" />
            {isOpenUser && <UserModal
            req={req}
            isOpenUser={isOpenUser}
            setIsOpenUser={setIsOpenUser}
            user={user}
            users={users}
            setUsers={setUsers}
        />}
           <Users
             setIsOpenUser={setIsOpenUser}
             isOpenUser={isOpenUser}
             users={users}
             user={user}
             req={req}
             setUser={setUser}
             setReq={setReq}
           />
        </DefaultLayout>
    );
};

