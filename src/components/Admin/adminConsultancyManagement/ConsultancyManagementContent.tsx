import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
/* import ConsultancyManagementKPICards from "./ConsultancyManagementKPICards";
 */import ConsultancyManagementTable from "./ConsultancyManagementTable";
import { listBookings, updateBookingStatus, type BookingRecord } from "@/services/bookings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  status: "pending" | "accepted" | "declined" | "cancelled" | "completed";
  stage: "Paid" | "Unpaid";
}

type StatusFilter = "all" | ConsultancyRequest["status"];

const ConsultancyManagementContent = () => {
  const [requests, setRequests] = useState<ConsultancyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const formatUsername = (email?: string | null, fallback = "user") => {
    if (!email) return fallback;
    return email.split("@")[0] || fallback;
  };

  const mapBookingToRequest = (booking: BookingRecord): ConsultancyRequest => {
    const appointment = booking.slotStart || booking.appointmentDate;
    const dateLabel = appointment
      ? new Date(appointment).toLocaleDateString()
      : "Unknown date";
    const paymentStatus =
      booking.metadata?.paymentStatus?.toLowerCase() === "paid" ? "Paid" : "Unpaid";
    const allowedStatuses: ConsultancyRequest["status"][] = [
      "pending",
      "accepted",
      "declined",
      "cancelled",
      "completed",
    ];
    const normalizedStatus = allowedStatuses.includes(booking.status as ConsultancyRequest["status"])
      ? (booking.status as ConsultancyRequest["status"])
      : "pending";

    return {
      id: booking.id,
      client: {
        name: booking.user?.name || "Unknown user",
        username: formatUsername(booking.user?.email, "user"),
      },
      consultant: {
        name: booking.consultant?.name || "Unknown consultant",
        username: formatUsername(booking.consultant?.email, "consultant"),
      },
      date: dateLabel,
      status: normalizedStatus,
      stage: paymentStatus,
    };
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await listBookings();
        const mapped = (response.data || []).map(mapBookingToRequest);
        setRequests(mapped);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load bookings.";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    if (statusFilter === "all") return requests;
    return requests.filter((request) => request.status === statusFilter);
  }, [requests, statusFilter]);

  const handleApprove = async (id: string) => {
    const request = requests.find((r) => r.id === id);
    if (!request) return;
    try {
      await updateBookingStatus(id, "accepted");
      setRequests((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "accepted" } : item))
      );
      toast.success(`Approved request for ${request.client.name}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to approve booking.";
      toast.error(message);
    }
  };

  const handleReject = async (id: string) => {
    const request = requests.find((r) => r.id === id);
    if (!request) return;
    try {
      await updateBookingStatus(id, "declined");
      setRequests((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "declined" } : item))
      );
      toast.error(`Rejected request for ${request.client.name}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to reject booking.";
      toast.error(message);
    }
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <h1 className="text-2xl font-semibold text-foreground mb-6">
        Consultancy Management
      </h1>

      <div className="space-y-6">
        {/* <ConsultancyManagementKPICards
          totalRequests={requests.length}
          approvedRequests={approvedCount}
          rejectedRequests={rejectedCount}
        /> */}

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-full max-w-xs">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as StatusFilter)}
            >
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ConsultancyManagementTable
          requests={filteredRequests}
          isLoading={isLoading}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </main>
  );
};

export default ConsultancyManagementContent;
