/* import ConsultancyKPICards from "./ConsultancyKPICards"; */
import ConsultancyFilters from "./ConsultancyFilters";
import ConsultantsTable from "./ConsultantsTable";

const ConsultancyContent = () => {
  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Live Consultancy</h1>
      
      <div className="space-y-6">
      {/*   <ConsultancyKPICards /> */}
        <ConsultancyFilters />
        <ConsultantsTable />
      </div>
    </div>
  );
};

export default ConsultancyContent;
