import { useEffect, useMemo, useState } from "react";
/* import HistoryKPICards from "./HistoryKPICards"; */
import HistoryTable, { type HistoryEntry } from "./HistoryTable";
import { listUserBookings } from "@/services/bookings";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/hooks/use-toast";

const HistoryContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await listUserBookings(user.id);
        if (!isMounted) return;
        const mapped: HistoryEntry[] = (response.data || []).map((booking) => {
          const consultantName = booking.consultant?.name || "Consultant";
          const slotDate = booking.slotStart || booking.appointmentDate;
          const parsedDate = slotDate ? new Date(slotDate) : null;
          const status =
            parsedDate && parsedDate.getTime() > Date.now() ? "Upcoming" : "Passed";
          const stageMap: Record<string, HistoryEntry["stage"]> = {
            accepted: "Approved",
            completed: "Approved",
            pending: "Pending",
            declined: "Rejected",
            cancelled: "Rejected",
          };
          return {
            id: booking.id,
            name: consultantName,
            username: `@${consultantName
              .toLowerCase()
              .replace(/\s+/g, "")
              .replace(/[^a-z0-9_]/g, "")}`,
            avatar: undefined,
            date: parsedDate ? parsedDate.toLocaleDateString() : "-",
            status,
            stage: stageMap[booking.status] || "Pending",
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
        if (isMounted) setIsLoading(false);
      }
    };

    fetchHistory();
    return () => {
      isMounted = false;
    };
  }, [toast, user?.id]);

  const emptyMessage = useMemo(() => {
    if (!user?.id) return "Log in to view your booking history.";
    return "No bookings found yet.";
  }, [user?.id]);

  return (
    <main className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">History</h1>
      
      <div className="space-y-6">
        {/* <HistoryKPICards /> */}
        <HistoryTable entries={entries} isLoading={isLoading} emptyMessage={emptyMessage} />
      </div>
    </main>
  );
};

export default HistoryContent;
