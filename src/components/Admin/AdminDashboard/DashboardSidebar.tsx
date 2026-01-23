import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Upload, 
  Book,
  Users, 
  MessageSquare, 
  CreditCard,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", path: "/admin/overview", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Task Management", path: "/admin/taskmanagement", icon: <Book className="w-5 h-5" /> },
  { label: "Upload Materials", path: "/admin/uploadlibrary", icon: <Upload className="w-5 h-5" /> },
  { label: "User Management", path: "/admin/usermanagement", icon: <Users className="w-5 h-5" /> },
  { label: "Consultancy Management", path: "/admin/consultancy", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Transaction Management", path: "/admin/transactions", icon: <CreditCard className="w-5 h-5" /> },
];

const AdminDashboardSidebar = () => {
  const location = useLocation();

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
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default AdminDashboardSidebar;
