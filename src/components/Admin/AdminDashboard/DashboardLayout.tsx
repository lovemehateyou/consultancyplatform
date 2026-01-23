import { useState, type ReactNode } from "react";
import AdminDashboardSidebar from "@/components/Admin/AdminDashboard/DashboardSidebar";
import AdminDashboardHeader from "@/components/Admin/AdminDashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const AdminDashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-background">
      {isSidebarOpen && <AdminDashboardSidebar />}
      <div className="flex-1 flex flex-col">
        <AdminDashboardHeader onToggleSidebar={handleToggleSidebar} />
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
