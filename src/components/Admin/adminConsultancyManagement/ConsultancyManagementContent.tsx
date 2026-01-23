import { useState } from "react";
import { toast } from "sonner";
import ConsultancyManagementKPICards from "./ConsultancyManagementKPICards";
import ConsultancyManagementTable from "./ConsultancyManagementTable";

interface ConsultancyRequest {
  id: string;
  client: {
    name: string;
    username: string;
    avatar?: string;
  };
  consultant: {
    name: string;
    username: string;
    avatar?: string;
  };
  date: string;
  status: "Upcoming" | "Passed";
  stage: "Paid" | "unpaid";
}

const initialRequests: ConsultancyRequest[] = [
  {
    id: "1",
    client: { name: "Olivia Rhye", username: "olivia" },
    consultant: { name: "Olivia Rhye", username: "olivia" },
    date: "03/15/2025",
    status: "Upcoming",
    stage: "Paid",
  },
  {
    id: "2",
    client: { name: "Phoenix Baker", username: "phoenix" },
    consultant: { name: "Phoenix Baker", username: "phoenix" },
    date: "03/15/2025",
    status: "Upcoming",
    stage: "Paid",
  },
  {
    id: "3",
    client: { name: "Lana Steiner", username: "lana" },
    consultant: { name: "Lana Steiner", username: "lana" },
    date: "03/15/2025",
    status: "Upcoming",
    stage: "unpaid",
  },
  {
    id: "4",
    client: { name: "Demi Wilkinson", username: "demi" },
    consultant: { name: "Demi Wilkinson", username: "demi" },
    date: "03/15/2025",
    status: "Passed",
    stage: "unpaid",
  },
  {
    id: "5",
    client: { name: "Candice Wu", username: "candice" },
    consultant: { name: "Candice Wu", username: "candice" },
    date: "03/15/2025",
    status: "Passed",
    stage: "Paid",
  },
];

const ConsultancyManagementContent = () => {
  const [requests, setRequests] = useState<ConsultancyRequest[]>(initialRequests);
  const [approvedCount, setApprovedCount] = useState(2);
  const [rejectedCount, setRejectedCount] = useState(3);

  const handleApprove = (id: string) => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      setApprovedCount((prev) => prev + 1);
      toast.success(`Approved request for ${request.client.name}`);
    }
  };

  const handleReject = (id: string) => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      setRejectedCount((prev) => prev + 1);
      toast.error(`Rejected request for ${request.client.name}`);
    }
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <h1 className="text-2xl font-semibold text-foreground mb-6">
        Consultancy Management
      </h1>

      <div className="space-y-6">
        <ConsultancyManagementKPICards
          totalRequests={requests.length}
          approvedRequests={approvedCount}
          rejectedRequests={rejectedCount}
        />

        <ConsultancyManagementTable
          requests={requests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </main>
  );
};

export default ConsultancyManagementContent;
