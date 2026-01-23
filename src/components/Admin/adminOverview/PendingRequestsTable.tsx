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

interface PendingRequest {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  date: string;
}

interface PendingRequestsTableProps {
  requests: PendingRequest[];
  onViewDetails: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const PendingRequestsTable = ({ requests, onViewDetails, onApprove, onReject }: PendingRequestsTableProps) => {
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
            <TableHead className="text-muted-foreground font-medium">
              <div className="flex items-center gap-1">
                View More
                <span className="text-muted-foreground">ⓘ</span>
              </div>
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Reject users</TableHead>
            <TableHead className="text-muted-foreground font-medium">Approve</TableHead>
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
                <Button 
                  onClick={() => onViewDetails(request.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Details
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  onClick={() => onReject(request.id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Rejected
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  onClick={() => onApprove(request.id)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Approved
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingRequestsTable;
