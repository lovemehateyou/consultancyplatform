import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TransactionManagementKPICardsProps {
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

const TransactionManagementKPICards = ({
  totalRequests,
  approvedRequests,
  rejectedRequests,
}: TransactionManagementKPICardsProps) => {
  const kpiData = [
    {
      title: "Total Requests",
      value: totalRequests,
      tooltip: "Total number of transaction requests",
    },
    {
      title: "Total Approved Requests",
      value: approvedRequests,
      tooltip: "Number of approved/paid transactions",
    },
    {
      title: "Total Rejected Requests",
      value: rejectedRequests,
      tooltip: "Number of rejected/failed transactions",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="bg-card border border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">{kpi.title}</span>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{kpi.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransactionManagementKPICards;
