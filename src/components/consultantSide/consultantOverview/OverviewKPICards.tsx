import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface OverviewKPICardsProps {
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

const OverviewKPICards = ({ totalRequests, approvedRequests, rejectedRequests }: OverviewKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KPICard 
        title="Total Requests" 
        value={totalRequests} 
        tooltip="Total number of consultation requests" 
      />
      <KPICard 
        title="Total Approved Requests" 
        value={approvedRequests} 
        tooltip="Number of approved consultation requests" 
      />
      <KPICard 
        title="Total Rejected Requests" 
        value={rejectedRequests} 
        tooltip="Number of rejected consultation requests" 
      />
    </div>
  );
};

export default OverviewKPICards;
