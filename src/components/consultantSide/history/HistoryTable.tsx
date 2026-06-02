import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface HistoryEntry {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  date: string;
  status: "Upcoming" | "Passed";
  stage: "Approved" | "Pending" | "Rejected";
  bookingStatus: "pending" | "accepted" | "declined" | "cancelled" | "completed";
}

interface HistoryTableProps {
  entries: HistoryEntry[];
  isLoading?: boolean;
  emptyMessage?: string;
  onReschedule?: (entry: HistoryEntry) => void;
}

const HistoryTable = ({ entries, isLoading = false, emptyMessage, onReschedule }: HistoryTableProps) => {
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
            <TableHead className="text-muted-foreground font-medium text-right">Action</TableHead>
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
                <TableCell className="text-right">
                  {entry.status === "Upcoming" && entry.bookingStatus === "accepted" && onReschedule ? (
                    <Button variant="outline" size="sm" onClick={() => onReschedule(entry)}>
                      Reschedule
                    </Button>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
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
