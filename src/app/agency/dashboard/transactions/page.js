import Breadcrumb from "@/components/Breadcrumbs";
import DefaultLayout from "@/components/dashboardLayout";
import Transactions from "@/components/list/transaction";
export default function transactionPage() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="transaction" />
            <Transactions />
        </DefaultLayout>
    );
};
