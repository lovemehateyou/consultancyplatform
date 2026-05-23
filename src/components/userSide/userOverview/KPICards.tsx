import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, ListChecks, CheckCircle2, Clock, TrendingUp, CircleDashed } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  tooltip?: string;
  icon: React.ElementType;
  accent: string;
}

const KPICard = ({ title, value, tooltip, icon: Icon, accent }: KPICardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", accent)}>
            <Icon className="w-4.5 h-4.5" strokeWidth={2.2} />
          </div>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/70" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip || title}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {title}
        </div>
        <div className="text-3xl font-bold text-foreground tracking-tight">{value}</div>
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
  progressLeft,
}: KPICardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <KPICard
        title="Total Tasks"
        value={totalTasks}
        tooltip="Total number of tasks assigned"
        icon={ListChecks}
        accent="bg-blue-50 text-blue-600"
      />
      <KPICard
        title="Completed"
        value={completedTasks}
        tooltip="Number of completed tasks"
        icon={CheckCircle2}
        accent="bg-emerald-50 text-emerald-600"
      />
      <KPICard
        title="Tasks Left"
        value={tasksLeft}
        tooltip="Number of remaining tasks"
        icon={Clock}
        accent="bg-amber-50 text-amber-600"
      />
      <KPICard
        title="Current Progress"
        value={`${currentProgress}%`}
        tooltip="Percentage of tasks completed"
        icon={TrendingUp}
        accent="bg-violet-50 text-violet-600"
      />
      <KPICard
        title="Progress Left"
        value={`${progressLeft}%`}
        tooltip="Percentage of tasks remaining"
        icon={CircleDashed}
        accent="bg-rose-50 text-rose-600"
      />
    </div>
  );
};

export default KPICards;
