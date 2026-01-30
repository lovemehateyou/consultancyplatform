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

interface Request {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  date: string;
  status: "Upcoming" | "Passed";
  stage: "Approved" | "Pending" | "Rejected";
}

interface RequestsTableProps {
  requests: Request[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  busyId?: string | null;
}

const RequestsTable = ({ requests, onApprove, onReject, busyId }: RequestsTableProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Name</TableHead>
            <TableHead className="text-muted-foreground font-medium">Date</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium">Stage</TableHead>
            <TableHead className="text-muted-foreground font-medium text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} className="border-border">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    {request.avatar ? (
                      <AvatarImage src={request.avatar} alt={request.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials(request.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{request.name}</p>
                    <p className="text-sm text-muted-foreground">@{request.username}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-foreground">{request.date}</TableCell>
              <TableCell>
                <span className="text-blue-500 font-medium">{request.status}</span>
              </TableCell>
              <TableCell>
                <span className={
                  request.stage === "Approved"
                    ? "text-green-500 font-medium"
                    : request.stage === "Rejected"
                      ? "text-red-500 font-medium"
                      : "text-amber-500 font-medium"
                }>
                  {request.stage}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {request.stage === "Pending" ? (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onApprove(request.id)}
                      disabled={busyId === request.id}
                      className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-60"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => onReject(request.id)}
                      disabled={busyId === request.id}
                      className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestsTable;
