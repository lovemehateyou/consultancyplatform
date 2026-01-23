import AdminDashboardLayout from "@/components/Admin/AdminDashboard/DashboardLayout";
import TransactionManagementContent from "@/components/Admin/transactionManagement/TransactionManagementContent";

const TransactionManagement = () => {
  return (
    <AdminDashboardLayout>
      <TransactionManagementContent />
    </AdminDashboardLayout>
  );
};

export default TransactionManagement;
