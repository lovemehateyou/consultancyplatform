import AdminDashboardLayout from "@/components/Admin/AdminDashboard/DashboardLayout";
import TaskManagementContent from "@/components/Admin/adminTaskManagement/TaskManagementContent";

const TaskManagement = () => {
  return (
    <AdminDashboardLayout>
      <TaskManagementContent />
    </AdminDashboardLayout>
  );
};

export default TaskManagement;
