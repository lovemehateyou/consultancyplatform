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

interface TaskManagementKPICardsProps {
  totalTasks: number;
  activeTasks: number;
  consultantTypes: number;
}

const UsermanagementKPICards = ({ totalTasks, activeTasks, consultantTypes }: TaskManagementKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KPICard 
        title="Total Tasks" 
        value={totalTasks} 
        tooltip="Total number of tasks in the system" 
      />
      <KPICard 
        title="Active Tasks" 
        value={activeTasks} 
        tooltip="Number of currently active tasks" 
      />
      <KPICard 
        title="Consultant Types" 
        value={consultantTypes} 
        tooltip="Number of consultant types available" 
      />
    </div>
  );
};

export default UsermanagementKPICards;
