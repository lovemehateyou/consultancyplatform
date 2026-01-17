import { useState, type ReactNode } from "react";
import DashboardSidebar from "@/components/Userdashboard/DashboardSidebar";
import DashboardHeader from "@/components/Userdashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-background">
      {isSidebarOpen && <DashboardSidebar />}
      <div className="flex-1 flex flex-col">
        <DashboardHeader onToggleSidebar={handleToggleSidebar} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
