import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const kpiData = [
  { label: "Total Requests", value: "5" },
  { label: "Total Approved Requests", value: "2" },
  { label: "Total Rejected Requests", value: "3" },
];

const ProfileKPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              {kpi.label}
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileKPICards;
