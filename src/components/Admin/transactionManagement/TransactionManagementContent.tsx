import { useState, useMemo } from "react";
/* import TransactionManagementKPICards from "./TransactionManagementKPICards";
 */
import TransactionManagementFilters from "./TransactionManagementFilters";
import TransactionManagementTable, { Transaction } from "./TransactionManagementTable";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    transactionId: "5146846548465",
    clientName: "Jane Cooper",
    billingDate: "2/19/21",
    status: "Paid",
    amount: "$500.00",
  },
  {
    id: "2",
    transactionId: "5467319467348",
    clientName: "Wade Warren",
    billingDate: "5/7/16",
    status: "Paid",
    amount: "$500.00",
  },
  {
    id: "3",
    transactionId: "1345705945446",
    clientName: "Esther Howard",
    billingDate: "9/18/16",
    status: "Failed",
    amount: "$500.00",
  },
  {
    id: "4",
    transactionId: "5440754979...",
    clientName: "Cameron Williamson",
    billingDate: "2/11/12",
    status: "Paid",
    amount: "$500.00",
  },
  {
    id: "5",
    transactionId: "1243467984543",
    clientName: "Brooklyn Simmons",
    billingDate: "9/18/16",
    status: "Failed",
    amount: "$500.00",
  },
  {
    id: "6",
    transactionId: "8454134649707",
    clientName: "Leslie Alexander",
    billingDate: "1/28/17",
    status: "Failed",
    amount: "$500.00",
  },
  {
    id: "7",
    transactionId: "2130164040451",
    clientName: "Jenny Wilson",
    billingDate: "5/27/15",
    status: "Paid",
    amount: "$500.00",
  },
  {
    id: "8",
    transactionId: "0439104645404",
    clientName: "Guy Hawkins",
    billingDate: "8/2/19",
    status: "Paid",
    amount: "$500.00",
  },
];

const TransactionManagementContent = () => {
  const [activeTab, setActiveTab] = useState("succeeded");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions;

    // Filter by tab
    switch (activeTab) {
      case "succeeded":
        filtered = filtered.filter((t) => t.status === "Paid");
        break;
      case "failed":
        filtered = filtered.filter((t) => t.status === "Failed");
        break;
      case "uncaptured":
        filtered = filtered.filter((t) => t.status === "Uncaptured");
        break;
      default:
        break;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.transactionId.toLowerCase().includes(query) ||
          t.clientName.toLowerCase().includes(query) ||
          t.amount.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  const kpiCounts = useMemo(() => {
    const total = mockTransactions.length;
    const approved = mockTransactions.filter((t) => t.status === "Paid").length;
    const rejected = mockTransactions.filter((t) => t.status === "Failed").length;
    return { total, approved, rejected };
  }, []);

  const handleSelectTransaction = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredTransactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransactions.map((t) => t.id));
    }
  };

  return (
    <main className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Transaction Management
      </h1>

      {/* <TransactionManagementKPICards
        totalRequests={kpiCounts.total}
        approvedRequests={kpiCounts.approved}
        rejectedRequests={kpiCounts.rejected}
      />
 */}
      <TransactionManagementFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <TransactionManagementTable
        transactions={filteredTransactions}
        selectedIds={selectedIds}
        onSelectTransaction={handleSelectTransaction}
        onSelectAll={handleSelectAll}
      />
    </main>
  );
};

export default TransactionManagementContent;
