import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ConsultantProfileContent from "@/components/consultant-profile/ConsultantProfileContent";

const ConsultantProfile = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <ConsultantProfileContent />
      </div>
    </div>
  );
};

export default ConsultantProfile;
