import { useEffect, useMemo, useRef, useState } from "react";
/* import HistoryKPICards from "./HistoryKPICards"; */
import HistoryTable, { type HistoryEntry } from "./HistoryTable";
import RescheduleBookingDialog from "./RescheduleBookingDialog";
import { listConsultantBookings } from "@/services/bookings";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HistoryContent = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState<HistoryEntry | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | HistoryEntry["bookingStatus"]
  >("all");
  const isMountedRef = useRef(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await listConsultantBookings();
      const mapped: HistoryEntry[] = (response.data || []).map((booking) => {
        const clientName = booking.user?.name || "Client";
        const slotDate = booking.slotStart || booking.appointmentDate;
        const parsedDate = slotDate ? new Date(slotDate) : null;
        const status =
          parsedDate && parsedDate.getTime() > Date.now() ? "Upcoming" : "Passed";
        const allowedStatuses: HistoryEntry["bookingStatus"][] = [
          "pending",
          "accepted",
          "declined",
          "cancelled",
          "completed",
        ];
        const bookingStatus = allowedStatuses.includes(
          booking.status as HistoryEntry["bookingStatus"],
        )
          ? (booking.status as HistoryEntry["bookingStatus"])
          : "pending";
        const stageMap: Record<string, HistoryEntry["stage"]> = {
          accepted: "Approved",
          completed: "Approved",
          pending: "Pending",
          declined: "Rejected",
          cancelled: "Rejected",
        };
        return {
          id: booking.id,
          name: clientName,
          username: `@${clientName
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/[^a-z0-9_]/g, "")}`,
          avatar: undefined,
          date: parsedDate ? parsedDate.toLocaleDateString() : "-",
          slotStart: slotDate || "",
          slotEnd: booking.slotEnd || "",
          status,
          stage: stageMap[bookingStatus] || "Pending",
          bookingStatus,
        };
      });
      setEntries(mapped);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to load booking history.";
      toast({
        title: "Unable to load history",
        description: message,
        variant: "destructive",
      });
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchHistory();
    return () => {
      isMountedRef.current = false;
    };
  }, [toast]);

  const filteredEntries = useMemo(() => {
    if (statusFilter === "all") return entries;
    return entries.filter((entry) => entry.bookingStatus === statusFilter);
  }, [entries, statusFilter]);

  const handleRescheduled = async () => {
    setRescheduleTarget(null);
    await fetchHistory();
  };

  return (
    <main className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">History</h1>
      
      <div className="space-y-6">
        {/* <HistoryKPICards /> */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-full max-w-xs">
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as "all" | HistoryEntry["bookingStatus"])
              }
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

        <HistoryTable
          entries={filteredEntries}
          isLoading={isLoading}
          onReschedule={(entry) => setRescheduleTarget(entry)}
        />
      </div>

      <RescheduleBookingDialog
        open={Boolean(rescheduleTarget)}
        booking={rescheduleTarget}
        onOpenChange={(open) => !open && setRescheduleTarget(null)}
        onRescheduled={handleRescheduled}
      />
    </main>
  );
};

export default HistoryContent;
