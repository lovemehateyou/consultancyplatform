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
}

const RequestsTable = ({ requests }: RequestsTableProps) => {
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
                <span className="text-green-500 font-medium">{request.stage}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestsTable;
