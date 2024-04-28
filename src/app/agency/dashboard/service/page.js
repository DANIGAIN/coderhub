import Breadcrumb from "@/components/Breadcrumbs";
import DefaultLayout from "@/components/dashboardLayout";
import Services from "@/components/list/service";
export default function servicePage() {
    return (
        <DefaultLayout>
           <Breadcrumb pageName="service" />
           <Services/>
        </DefaultLayout>
    );
};


