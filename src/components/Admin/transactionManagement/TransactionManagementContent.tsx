import { useEffect, useMemo, useState } from "react";
import { listAdminBookings } from "@/services/adminBookings";
import type { BookingRecord } from "@/services/bookings";
import TransactionManagementFilters from "./TransactionManagementFilters";
import TransactionManagementTable, { Transaction } from "./TransactionManagementTable";

const formatAmount = (metadata?: BookingRecord["metadata"] | null) => {
  const amount = metadata?.paymentAmount;
  const currency = metadata?.paymentCurrency;

  if (amount == null && !currency) return "N/A";
  if (amount == null) return String(currency);
  if (!currency) return String(amount);
  return `${currency} ${amount}`;
};

const formatBillingDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString();
};

const getPaymentStatus = (
  metadata?: BookingRecord["metadata"] | null,
): "paid" | "unpaid" => {
  const status = metadata?.paymentStatus?.toLowerCase();
  return status === "paid" ? "paid" : "unpaid";
};

const TransactionManagementContent = () => {
  const [activeTab, setActiveTab] = useState<"all" | "paid" | "unpaid">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as "all" | "paid" | "unpaid");
  };

  useEffect(() => {
    let isActive = true;

    const loadBookings = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const { data } = await listAdminBookings();
        if (isActive) {
          setBookings(data);
        }
      } catch (error) {
        if (isActive) {
          setErrorMessage(
            error instanceof Error ? error.message : "Unable to load transactions",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadBookings();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    setSelectedIds([]);
  }, [bookings]);

  const filteredTransactions = useMemo(() => {
    let filtered = bookings;

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(
        (booking) => getPaymentStatus(booking.metadata) === activeTab,
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) => {
          const transactionId = booking.transactionId ?? "";
          const clientName = booking.user?.name ?? "";
          const consultantName = booking.consultant?.name ?? "";
          const amount = formatAmount(booking.metadata);

          return (
            transactionId.toLowerCase().includes(query) ||
            clientName.toLowerCase().includes(query) ||
            consultantName.toLowerCase().includes(query) ||
            amount.toLowerCase().includes(query)
          );
        },
      );
    }

    return filtered.map((booking): Transaction => ({
      id: booking.id,
      transactionId: booking.transactionId ?? "N/A",
      clientName: booking.user?.name ?? "N/A",
      consultantName: booking.consultant?.name ?? "N/A",
      billingDate: formatBillingDate(booking.createdAt),
      status: getPaymentStatus(booking.metadata),
      amount: formatAmount(booking.metadata),
    }));
  }, [activeTab, bookings, searchQuery]);

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
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {errorMessage ? (
        <p className="text-sm text-red-600 mb-4">{errorMessage}</p>
      ) : null}
      {isLoading ? (
        <p className="text-sm text-muted-foreground mb-4">Loading transactions...</p>
      ) : null}

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
