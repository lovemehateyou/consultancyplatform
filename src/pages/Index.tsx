import ProfileHeader from "@/components/ProfileHeader";
import AboutSection from "@/components/AboutSection";
import SkillsInterests from "@/components/SkillsInterests";
import RecentActivity from "@/components/RecentActivity";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <ProfileHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AboutSection />
          <SkillsInterests />
        </div>
        
        <RecentActivity />
      </div>
    </div>
  );
};

export default Index;
