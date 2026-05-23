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

interface ConsultancyManagementTableProps {
  requests: ConsultancyRequest[];
  isLoading?: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ConsultancyManagementTable = ({
  requests,
  isLoading = false,
  onApprove,
  onReject,
}: ConsultancyManagementTableProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const statusClasses: Record<ConsultancyRequest["status"], string> = {
    pending: "text-blue-600",
    accepted: "text-green-600",
    declined: "text-red-600",
    cancelled: "text-slate-500",
    completed: "text-emerald-600",
  };

  const statusLabel = (status: ConsultancyRequest["status"]) =>
    `${status.charAt(0).toUpperCase()}${status.slice(1)}`;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium">Clients</TableHead>
            <TableHead className="text-muted-foreground font-medium">Consultants</TableHead>
            <TableHead className="text-muted-foreground font-medium">Date</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium">Stage</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">See Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                Loading bookings...
              </TableCell>
            </TableRow>
          ) : null}
          {requests.map((request) => (
            <TableRow key={request.id} className="border-border">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    {request.client.avatar ? (
                      <AvatarImage src={request.client.avatar} alt={request.client.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials(request.client.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{request.client.name}</p>
                    <p className="text-sm text-muted-foreground">@{request.client.username}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    {request.consultant.avatar ? (
                      <AvatarImage src={request.consultant.avatar} alt={request.consultant.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials(request.consultant.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{request.consultant.name}</p>
                    <p className="text-sm text-muted-foreground">@{request.consultant.username}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-foreground">{request.date}</TableCell>
              <TableCell>
                <span className={`font-medium ${statusClasses[request.status]}`}>
                  {statusLabel(request.status)}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`font-medium ${request.stage === "Paid" ? "text-green-500" : "text-red-500"}`}
                >
                  {request.stage}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => onApprove(request.id)}
                    disabled={request.status == "completed"}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onReject(request.id)}
                    disabled={request.status == "completed"}
                  >
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConsultancyManagementTable;
