import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface KPICardProps {
  title: string;
  value: string | number;
  tooltip?: string;
}

const KPICard = ({ title, value, tooltip }: KPICardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
          {title}
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-3.5 h-3.5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip || title}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
};

interface KPICardsProps {
  totalTasks: number;
  completedTasks: number;
  tasksLeft: number;
  currentProgress: number;
  progressLeft: number;
}

const KPICards = ({ 
  totalTasks, 
  completedTasks, 
  tasksLeft, 
  currentProgress, 
  progressLeft 
}: KPICardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <KPICard 
        title="Total Tasks" 
        value={totalTasks} 
        tooltip="Total number of tasks assigned"
      />
      <KPICard 
        title="Total Tasks Completed" 
        value={completedTasks} 
        tooltip="Number of completed tasks"
      />
      <KPICard 
        title="Total Tasks Left" 
        value={tasksLeft} 
        tooltip="Number of remaining tasks"
      />
      <KPICard 
        title="Current Progress" 
        value={`${currentProgress}%`} 
        tooltip="Percentage of tasks completed"
      />
      <KPICard 
        title="Total Progress Left" 
        value={`${progressLeft}%`} 
        tooltip="Percentage of tasks remaining"
      />
    </div>
  );
};

export default KPICards;
