import { Search, Bell, PanelLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/authContext";

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  avatarUrl?: string | null;
  avatarFallback?: string;
}

const deriveInitials = (name?: string | null, fallback = "AD") => {
  if (!name?.trim()) {
    return fallback.slice(0, 2).toUpperCase();
  }
  const [first = "", second = ""] = name
    .trim()
    .split(/\s+/)
    .map((segment) => segment.charAt(0));
  return `${first}${second}`.trim().toUpperCase() || fallback.slice(0, 2).toUpperCase();
};

const DashboardHeader = ({ onToggleSidebar, avatarUrl, avatarFallback = "AD" }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const resolvedAvatar = avatarUrl ?? user?.profileImage ?? null;
  const fallbackInitials = deriveInitials(user?.name, avatarFallback);

  return (
    <header className="w-full h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
        <PanelLeft className="w-5 h-5 text-muted-foreground" />
      </Button>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-[200px] bg-muted/50 border-border"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => navigate("/consultantnotifications")}
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 bg-destructive rounded-full" />
        </Button>
        
        <Avatar className="w-9 h-9 border border-border">
          {resolvedAvatar ? (
            <AvatarImage src={resolvedAvatar} alt="User avatar" className="object-cover" />
          ) : (
            <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
              {fallbackInitials}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
