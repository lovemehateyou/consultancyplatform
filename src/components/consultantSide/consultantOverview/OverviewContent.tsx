import OverviewKPICards from "./OverviewKPICards";
import RequestsTable from "./RequestsTable";

const mockRequests = [
  {
    id: "1",
    name: "Olivia Rhye",
    username: "olivia",
    date: "03/15/2025",
    status: "Upcoming" as const,
    stage: "Approved" as const,
  },
  {
    id: "2",
    name: "Phoenix Baker",
    username: "phoenix",
    date: "03/15/2025",
    status: "Upcoming" as const,
    stage: "Approved" as const,
  },
  {
    id: "3",
    name: "Lana Steiner",
    username: "lana",
    date: "03/15/2025",
    status: "Upcoming" as const,
    stage: "Approved" as const,
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    username: "demi",
    date: "03/15/2025",
    status: "Upcoming" as const,
    stage: "Approved" as const,
  },
  {
    id: "5",
    name: "Candice Wu",
    username: "candice",
    date: "03/15/2025",
    status: "Upcoming" as const,
    stage: "Approved" as const,
  },
];

const OverviewContent = () => {
  const totalRequests = mockRequests.length;
  const approvedRequests = mockRequests.filter((r) => r.stage === "Approved").length;
  const rejectedRequests = totalRequests - approvedRequests;

  return (
    <div className="flex-1 p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Key metrics and insights</p>
      </div>

      <OverviewKPICards
        totalRequests={totalRequests}
        approvedRequests={approvedRequests}
        rejectedRequests={rejectedRequests}
      />

      <RequestsTable requests={mockRequests} />
    </div>
  );
};

export default OverviewContent;
