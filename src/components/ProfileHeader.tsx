import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProfileHeader = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarFallback className="bg-muted text-muted-foreground text-xl font-medium">
              SJ
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Sarah Johnson</h1>
            <p className="text-muted-foreground">Senior Product Designer</p>
            <p className="text-muted-foreground text-sm">TechCorp Inc.</p>
          </div>
        </div>
        
        <Button variant="default" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>
      
      <div className="flex items-center gap-8 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg">💬</span>
            <span className="font-semibold text-foreground">24</span>
          </div>
          <p className="text-sm text-muted-foreground">Projects</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg">👥</span>
            <span className="font-semibold text-foreground">156</span>
          </div>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg">🏆</span>
            <span className="font-semibold text-foreground">8</span>
          </div>
          <p className="text-sm text-muted-foreground">Achievements</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
