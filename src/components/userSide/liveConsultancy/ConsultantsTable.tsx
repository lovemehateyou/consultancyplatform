import { useEffect, useMemo, useState } from "react";
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
import { listConsultants, type ConsultantSummary } from "@/services/users";
import { useToast } from "@/hooks/use-toast";

interface ConsultantRow {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status: "Active" | "Inactive";
  role: string;
  email: string;
}

const buildUsername = (name: string) =>
  `@${name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_]/g, "")}`;

const ConsultantsTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<string>("");
  const [selectedConsultantId, setSelectedConsultantId] = useState<string>("");
  const [consultants, setConsultants] = useState<ConsultantSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchConsultants = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await listConsultants();
        if (!isMounted) return;
        setConsultants(response.data || []);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load consultants.";
        if (isMounted) {
          setLoadError(message);
        }
        toast({
          title: "Unable to load consultants",
          description: message,
          variant: "destructive",
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchConsultants();
    return () => {
      isMounted = false;
    };
  }, [toast]);

  const handleBookClick = (consultant: ConsultantRow) => {
    setSelectedConsultant(consultant.name);
    setSelectedConsultantId(consultant.id);
    setDialogOpen(true);
  };

  const handleViewProfile = (id: string) => {
    navigate(`/consultant/${id}`);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const rows = useMemo<ConsultantRow[]>(() => {
    return consultants.map((consultant) => ({
      id: consultant.id,
      name: consultant.name,
      username: buildUsername(consultant.name || "consultant"),
      avatar: consultant.profileImage ?? undefined,
      status: "Active",
      role: consultant.businessArea || consultant.businessType || "Consultant",
      email: consultant.email,
    }));
  }, [consultants]);

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
            {isLoading ? (
              <TableRow className="border-border">
                <TableCell colSpan={6} className="text-muted-foreground py-6">
                  Loading consultants...
                </TableCell>
              </TableRow>
            ) : rows.length ? (
              rows.map((consultant) => (
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
                    onClick={() => handleBookClick(consultant)}
                  >
                    Book
                  </Button>
                </TableCell>
              </TableRow>
            ))
            ) : (
              <TableRow className="border-border">
                <TableCell colSpan={6} className="text-muted-foreground py-6">
                  {loadError || "No consultants available yet."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AvailabilityDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        consultantName={selectedConsultant}
        consultantId={selectedConsultantId}
      />
    </>
  );
};

export default ConsultantsTable;
