import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface KPICardsProps {
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

const ConsultancyManagementKPICards = ({
  totalRequests,
  approvedRequests,
  rejectedRequests,
}: KPICardsProps) => {
  const cards = [
    {
      title: "Total Requests",
      value: totalRequests,
    },
    {
      title: "Total Approved Requests",
      value: approvedRequests,
    },
    {
      title: "Total Rejected Requests",
      value: rejectedRequests,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">{card.title}</span>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-semibold text-foreground">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConsultancyManagementKPICards;
