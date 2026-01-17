/* import HistoryKPICards from "./HistoryKPICards"; */
import HistoryTable from "./HistoryTable";

const HistoryContent = () => {
  return (
    <main className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">History</h1>
      
      <div className="space-y-6">
        {/* <HistoryKPICards /> */}
        <HistoryTable />
      </div>
    </main>
  );
};

export default HistoryContent;
