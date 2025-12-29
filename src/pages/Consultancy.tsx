import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ConsultancyContent from "@/components/consultancy/ConsultancyContent";

const Consultancy = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <ConsultancyContent />
      </div>
    </div>
  );
};

export default Consultancy;
