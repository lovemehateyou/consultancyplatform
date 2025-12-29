import { Search, Bell, PanelLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
}

const DashboardHeader = ({ onToggleSidebar }: DashboardHeaderProps) => {
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
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        
        <Avatar className="w-9 h-9 border border-border">
          <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
