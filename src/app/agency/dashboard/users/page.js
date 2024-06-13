import Breadcrumb from "@/components/Breadcrumbs";
import DefaultLayout from "@/components/dashboardLayout";
import Users from "@/components/list/user";
export default function userPage() {
    return (
        <DefaultLayout>
           <Breadcrumb pageName="user" />
           <Users/>
        </DefaultLayout>
    );
};

