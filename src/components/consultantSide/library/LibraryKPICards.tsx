/* import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
}

const KPICard = ({ title, value }: KPICardProps) => (
  <Card className="p-4 bg-card border-border">
    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
      {title}
      <HelpCircle className="w-3.5 h-3.5" />
    </div>
    <div className="text-2xl font-bold text-foreground">{value}</div>
  </Card>
);

const LibraryKPICards = () => {
  const kpiData = [
    { title: "Total Tasks", value: 5 },
    { title: "Total Tasks Completed", value: 2 },
    { title: "Total Tasks Left", value: 3 },
    { title: "Current Progress", value: "40%" },
    { title: "Total Progress Left", value: "60%" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {kpiData.map((kpi) => (
        <KPICard key={kpi.title} title={kpi.title} value={kpi.value} />
      ))}
    </div>
  );
};

export default LibraryKPICards;
 */