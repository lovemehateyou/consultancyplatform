import { useState } from "react";
import OverviewKPICards from "./OverviewKPICards";
import PendingRequestsTable from "./PendingRequestsTable";

interface PendingRequest {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  date: string;
}

const OverviewContent = () => {
  const [requests, setRequests] = useState<PendingRequest[]>([
    { id: "1", name: "Olivia Rhye", username: "olivia", date: "03/15/2025" },
    { id: "2", name: "Phoenix Baker", username: "phoenix", date: "03/15/2025" },
    { id: "3", name: "Lana Steiner", username: "lana", date: "03/15/2025" },
    { id: "4", name: "Demi Wilkinson", username: "demi", date: "03/15/2025" },
    { id: "5", name: "Candice Wu", username: "candice", date: "03/15/2025" },
  ]);

  const [approvedCount, setApprovedCount] = useState(2);
  const [rejectedCount, setRejectedCount] = useState(3);

  const handleViewDetails = (id: string) => {
    console.log("View details for:", id);
    // TODO: Implement view details modal/navigation
  };

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setApprovedCount((prev) => prev + 1);
    console.log("Approved:", id);
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setRejectedCount((prev) => prev + 1);
    console.log("Rejected:", id);
  };

  return (
    <main className="flex-1 p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Key metrics and insights</p>
      </div>

      <OverviewKPICards 
        totalRequests={requests.length}
        approvedRequests={approvedCount}
        rejectedRequests={rejectedCount}
      />

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Pending Requests</h2>
        <PendingRequestsTable 
          requests={requests}
          onViewDetails={handleViewDetails}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </main>
  );
};

export default OverviewContent;
