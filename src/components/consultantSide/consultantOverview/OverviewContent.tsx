import { useEffect, useMemo, useState } from "react";
import OverviewKPICards from "./OverviewKPICards";
import RequestsTable from "./RequestsTable";
import {
  listConsultantBookings,
  updateBookingStatus,
  type BookingRecord,
} from "@/services/bookings";

const OverviewContent = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadBookings = async () => {
    try {
      setError(null);
      const response = await listConsultantBookings();
      setBookings(response.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load bookings";
      setError(message);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const formatRequestDate = (value?: string | null) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
  };

  const requests = useMemo(
    () =>
      bookings.map((booking) => {
        const name = booking.user?.name || "Client";
        const username = booking.user?.email
          ? booking.user.email.split("@")[0]
          : name.split(" ")[0]?.toLowerCase() || "client";
        const slotDate = booking.slotStart || booking.appointmentDate;
        const status = slotDate && new Date(slotDate) < new Date() ? "Passed" : "Upcoming";
        const stage =
          booking.status === "accepted"
            ? "Approved"
            : booking.status === "declined" || booking.status === "cancelled"
              ? "Rejected"
              : "Pending";

        return {
          id: booking.id,
          name,
          username,
          date: formatRequestDate(slotDate),
          status,
          stage,
        };
      }),
    [bookings],
  );

  const totalRequests = requests.length;
  const approvedRequests = requests.filter((r) => r.stage === "Approved").length;
  const rejectedRequests = requests.filter((r) => r.stage === "Rejected").length;

  const handleApprove = async (bookingId: string) => {
    try {
      setBusyId(bookingId);
      await updateBookingStatus(bookingId, "accepted");
      await loadBookings();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to approve booking";
      setError(message);
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (bookingId: string) => {
    try {
      setBusyId(bookingId);
      await updateBookingStatus(bookingId, "declined");
      await loadBookings();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to reject booking";
      setError(message);
    } finally {
      setBusyId(null);
    }
  };

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

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <RequestsTable
        requests={requests}
        onApprove={handleApprove}
        onReject={handleReject}
        busyId={busyId}
      />
    </div>
  );
};

export default OverviewContent;
