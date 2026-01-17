/* import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KPICardProps {
  title: string;
  value: string | number;
  tooltip?: string;
}

const KPICard = ({ title, value, tooltip }: KPICardProps) => (
  <Card className="bg-card border-border">
    <CardContent className="p-4">
      <div className="flex items-center gap-1 mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </CardContent>
  </Card>
);

const ConsultancyKPICards = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <KPICard title="Total Tasks" value={5} tooltip="Total number of tasks" />
      <KPICard title="Total Tasks Completed" value={2} tooltip="Tasks you've completed" />
      <KPICard title="Total Tasks Left" value={3} tooltip="Remaining tasks" />
      <KPICard title="Current Progress" value="40%" tooltip="Your current progress" />
      <KPICard title="Total Progress Left" value="60%" tooltip="Remaining progress" />
    </div>
  );
};

export default ConsultancyKPICards;
 */