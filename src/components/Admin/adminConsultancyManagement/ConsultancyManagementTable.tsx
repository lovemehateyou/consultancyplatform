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
  status: "Upcoming" | "Passed";
  stage: "Paid" | "unpaid";
}

interface ConsultancyManagementTableProps {
  requests: ConsultancyRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ConsultancyManagementTable = ({
  requests,
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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Clients</TableHead>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Consultants</TableHead>
            <TableHead className="text-muted-foreground font-medium">Date</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium">Stage</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">See Details</TableHead>
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
                <Checkbox />
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
                <span
                  className={`font-medium ${
                    request.status === "Upcoming" ? "text-blue-500" : "text-green-500"
                  }`}
                >
                  {request.status}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`font-medium ${
                    request.stage === "Paid" ? "text-green-500" : "text-red-500"
                  }`}
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
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onReject(request.id)}
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
