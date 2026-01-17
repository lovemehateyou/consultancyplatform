/* import { Card, CardContent } from "@/components/ui/card";
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

const HistoryKPICards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <KPICard 
        title="Total Tasks" 
        value={5} 
        tooltip="Total number of consultancy sessions"
      />
      <KPICard 
        title="Total Tasks Completed" 
        value={2} 
        tooltip="Number of completed sessions"
      />
      <KPICard 
        title="Total Tasks Left" 
        value={3} 
        tooltip="Number of remaining sessions"
      />
      <KPICard 
        title="Current Progress" 
        value="40%" 
        tooltip="Percentage of sessions completed"
      />
      <KPICard 
        title="Total Progress Left" 
        value="60%" 
        tooltip="Percentage of sessions remaining"
      />
    </div>
  );
};

export default HistoryKPICards;
 */