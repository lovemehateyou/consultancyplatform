import { useState } from "react";
import OverviewKPICards from "./OverviewKPICards";
import PendingRequestsTable, { PendingRequest } from "./PendingRequestsTable";

const OverviewContent = () => {
  const [requests, setRequests] = useState<PendingRequest[]>([
    { 
      id: "1", 
      name: "Olivia Rhye", 
      username: "olivia", 
      date: "03/15/2025",
      phone: "+251 911 234 567",
      email: "olivia.rhye@example.com",
    },
    { 
      id: "2", 
      name: "Phoenix Baker", 
      username: "phoenix", 
      date: "03/15/2025",
      phone: "+251 922 345 678",
      email: "phoenix.baker@example.com",
    },
    { 
      id: "3", 
      name: "Lana Steiner", 
      username: "lana", 
      date: "03/15/2025",
      phone: "+251 933 456 789",
      email: "lana.steiner@example.com",
    },
    { 
      id: "4", 
      name: "Demi Wilkinson", 
      username: "demi", 
      date: "03/15/2025",
      phone: "+251 944 567 890",
      email: "demi.wilkinson@example.com",
    },
    { 
      id: "5", 
      name: "Candice Wu", 
      username: "candice", 
      date: "03/15/2025",
      phone: "+251 955 678 901",
      email: "candice.wu@example.com",
    },
  ]);

  const [approvedCount, setApprovedCount] = useState(2);
  const [rejectedCount, setRejectedCount] = useState(3);

  const handleViewDetails = (id: string) => {
    console.log("View details for:", id);
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
