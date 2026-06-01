import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ReviewRecord } from "@/services/reviews";

export interface HistoryEntry {
  id: string;
  consultantId: string;
  name: string;
  username: string;
  avatar?: string;
  date: string;
  slotStart?: string;
  status: "Upcoming" | "Passed";
  stage: "Approved" | "Pending" | "Rejected";
  bookingStatus: "pending" | "accepted" | "declined" | "cancelled" | "completed";
}

interface HistoryTableProps {
  entries: HistoryEntry[];
  oncancel: (id: string) => void;
  onWriteReview: (entry: HistoryEntry) => void;
  onDeleteReview: (reviewId: string, consultantId: string) => void;
  reviewsByConsultantId: Record<string, ReviewRecord>;
  isLoading?: boolean;
  emptyMessage?: string;
}

const HistoryTable = ({
  entries,
  oncancel,
  onWriteReview,
  onDeleteReview,
  reviewsByConsultantId,
  isLoading = false,
  emptyMessage,
}: HistoryTableProps) => {
  const renderAction = (entry: HistoryEntry) => {
    if (!entry.consultantId) {
      return <span className="text-sm text-muted-foreground">-</span>;
    }

    const isPast = entry.status === "Passed";
    const isReviewEligible =
      isPast &&
      (entry.bookingStatus === "accepted" || entry.bookingStatus === "completed");
    const existingReview = reviewsByConsultantId[entry.consultantId];
    const bookingStart = entry.slotStart ? new Date(entry.slotStart) : null;
    const isCancelableWindow = bookingStart
      ? bookingStart.getTime() - Date.now() >= 24 * 60 * 60 * 1000
      : false;
    const canCancel = entry.status === "Upcoming" &&
      (entry.bookingStatus === "pending" || entry.bookingStatus === "accepted") &&
      isCancelableWindow;

    if (isReviewEligible) {
      if (existingReview) {
        return (
          <button
            className="text-sm text-rose-500 hover:underline"
            onClick={() => onDeleteReview(existingReview.id, entry.consultantId)}
          >
            Delete Review
          </button>
        );
      }

      return (
        <button
          className="text-sm text-primary hover:underline"
          onClick={() => onWriteReview(entry)}
        >
          Write Review
        </button>
      );
    }

    if (canCancel) {
      return (
        <button
          className="text-sm text-primary hover:underline"
          onClick={() => oncancel(entry.id)}
        >
          Cancel
        </button>
      );
    }

    return <span className="text-sm text-muted-foreground">-</span>;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Name</TableHead>
            <TableHead className="text-muted-foreground font-medium">Date</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium">Stage</TableHead>
            <TableHead className="text-muted-foreground font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-muted/50">
              <TableCell colSpan={6} className="text-muted-foreground py-6">
                Loading booking history...
              </TableCell>
            </TableRow>
          ) : entries.length ? (
            entries.map((entry) => (
              <TableRow key={entry.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {entry.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{entry.name}</p>
                      <p className="text-sm text-muted-foreground">{entry.username}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{entry.date}</TableCell>
                <TableCell>
                  <span
                    className={
                      entry.status === "Upcoming"
                        ? "text-blue-500 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {entry.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-emerald-500 font-medium">{entry.stage}</span>
                </TableCell>
                <TableCell>
                  {renderAction(entry)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-muted/50">
              <TableCell colSpan={6} className="text-muted-foreground py-6">
                {emptyMessage || "No bookings found yet."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTable;
