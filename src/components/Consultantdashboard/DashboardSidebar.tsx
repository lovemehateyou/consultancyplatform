import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  MessageSquare, 
  History,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", path: "/consultantdashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Document Library", path: "/consultantlibrary", icon: <BookOpen className="w-5 h-5" /> },
  { label: "User Profile", path: "/consultantprofile", icon: <User className="w-5 h-5" /> },
  { label: "Work Schedule", path: "/consultantworkschedule", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "History", path: "/consultanthistory", icon: <History className="w-5 h-5" /> },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Signed out",
        description: "You have been logged out successfully.",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to log you out. Please try again.";
      toast({ title: "Logout failed", description: message, variant: "destructive" });
    }
  };

  return (
    <aside className="w-[250px] min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-4">
        <h1 className="text-lg font-bold text-foreground">
          <Link to="/">
          Digital Consultancy Platform
          </Link>
        </h1>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-muted-foreground hover:bg-blue-600 hover:text-white"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div className="p-3 mt-auto">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
