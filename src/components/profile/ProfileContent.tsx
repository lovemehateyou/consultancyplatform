import ProfileKPICards from "./ProfileKPICards";
import AccountInfoForm from "./AccountInfoForm";
import ProfileCard from "./ProfileCard";
import { Separator } from "@/components/ui/separator";

const ProfileContent = () => {
  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">User Profile</h1>
      
      <ProfileKPICards />
      
      <div className="mt-8 flex gap-8">
        <div className="flex-1 max-w-md">
          <AccountInfoForm />
        </div>
        
        <Separator orientation="vertical" className="h-auto" />
        
        <div className="flex-1 flex justify-center pt-8">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
