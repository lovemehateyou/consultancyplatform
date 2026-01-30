import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  tooltip: string;
}

const KPICard = ({ title, value, tooltip }: KPICardProps) => (
  <Card className="bg-card border-border">
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </CardContent>
  </Card>
);

interface UserManagementKPICardsProps {
  totalUsers: number;
  adminUsers: number;
  consultantUsers: number;
}

const UsermanagementKPICards = ({ totalUsers, adminUsers, consultantUsers }: UserManagementKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KPICard 
        title="Total Users" 
        value={totalUsers} 
        tooltip="Total number of users in the system" 
      />
      <KPICard 
        title="Admins" 
        value={adminUsers} 
        tooltip="Number of admin accounts" 
      />
      <KPICard 
        title="Consultants" 
        value={consultantUsers} 
        tooltip="Number of consultant accounts" 
      />
    </div>
  );
};

export default UsermanagementKPICards;
