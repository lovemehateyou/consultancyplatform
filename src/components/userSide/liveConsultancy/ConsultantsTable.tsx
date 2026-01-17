import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowDown, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AvailabilityDialog from "./AvailabilityDialog";

interface Consultant {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status: "Active" | "Inactive";
  role: string;
  email: string;
}

const consultants: Consultant[] = [
  { id: "1", name: "Olivia Rhye", username: "@olivia", status: "Active", role: "Law Consultant", email: "olivia@untitledui.com" },
  { id: "2", name: "Phoenix Baker", username: "@phoenix", status: "Active", role: "Finance Consultant", email: "phoenix@untitledui.com" },
  { id: "3", name: "Lana Steiner", username: "@lana", status: "Active", role: "Business Consultant", email: "lana@untitledui.com" },
  { id: "4", name: "Demi Wilkinson", username: "@demi", status: "Active", role: "Law Consultant", email: "demi@untitledui.com" },
  { id: "5", name: "Candice Wu", username: "@candice", status: "Active", role: "Business Consultant", email: "candice@untitledui.com" },
  { id: "6", name: "Natali Craig", username: "@natali", status: "Active", role: "Finance Consultant", email: "natali@untitledui.com" },
];

const ConsultantsTable = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<string>("");

  const handleBookClick = (name: string) => {
    setSelectedConsultant(name);
    setDialogOpen(true);
  };

  const handleViewProfile = (id: string) => {
    navigate(`/consultant/${id}`);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">
                <div className="flex items-center gap-1">
                  Status
                  <ArrowDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground">
                <div className="flex items-center gap-1">
                  Role
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Consultant's role</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground">Email address</TableHead>
              <TableHead className="text-muted-foreground">Book a Call</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultants.map((consultant) => (
              <TableRow key={consultant.id} className="border-border">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleViewProfile(consultant.id)}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={consultant.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials(consultant.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground hover:text-primary">{consultant.name}</p>
                      <p className="text-sm text-muted-foreground">{consultant.username}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-green-600">Active</span>
                  </span>
                </TableCell>
                <TableCell className="text-foreground">{consultant.role}</TableCell>
                <TableCell className="text-foreground">{consultant.email}</TableCell>
                <TableCell>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-primary-foreground rounded-lg px-6"
                    onClick={() => handleBookClick(consultant.name)}
                  >
                    Book
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AvailabilityDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        consultantName={selectedConsultant}
      />
    </>
  );
};

export default ConsultantsTable;
