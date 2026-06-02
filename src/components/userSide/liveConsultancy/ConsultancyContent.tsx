import { useState } from "react";
import ConsultancyFilters from "./ConsultancyFilters";
import ConsultantsTable from "./ConsultantsTable";

const ConsultancyContent = () => {
  const [filters, setFilters] = useState<{ category?: string; date?: string }>({
    category: "all",
    date: "",
  });

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Live Consultancy</h1>

      <div className="space-y-6">
        <ConsultancyFilters
          category={filters.category}
          date={filters.date}
          onChange={(f) => setFilters((s) => ({ ...s, ...f }))}
        />
        <ConsultantsTable filters={filters} />
      </div>
    </div>
  );
};

export default ConsultancyContent;