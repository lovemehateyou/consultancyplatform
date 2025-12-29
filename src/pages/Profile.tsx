import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileContent from "@/components/profile/ProfileContent";

const Profile = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Profile;
