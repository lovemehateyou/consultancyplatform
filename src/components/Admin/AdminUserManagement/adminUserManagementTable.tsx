import { useState } from "react";
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
import { ArrowDown, ChevronDown, ChevronUp, HelpCircle, Mail, Phone, Shield } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


interface Consultant {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status: "Active" | "Inactive";
  role: string;
  email: string;
  phone?: string;
  department?: string;
  joinedDate?: string;
}

const consultants: Consultant[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    username: "@olivia",
    status: "Active",
    role: "Consultant",
    email: "olivia@untitledui.com",
    phone: "+251 911 234 567",
    department: "Strategy",
    joinedDate: "Jan 12, 2024",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    username: "@phoenix",
    status: "Inactive",
    role: "Consultant",
    email: "phoenix@untitledui.com",
    phone: "+251 922 345 678",
    department: "Finance",
    joinedDate: "Feb 01, 2024",
  },
  {
    id: "3",
    name: "Lana Steiner",
    username: "@lana",
    status: "Active",
    role: "User",
    email: "lana@untitledui.com",
    phone: "+251 933 456 789",
    department: "Operations",
    joinedDate: "Mar 05, 2024",
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    username: "@demi",
    status: "Inactive",
    role: "User",
    email: "demi@untitledui.com",
    phone: "+251 944 567 890",
    department: "Legal",
    joinedDate: "Apr 19, 2024",
  },
  {
    id: "5",
    name: "Candice Wu",
    username: "@candice",
    status: "Active",
    role: "Consultant",
    email: "candice@untitledui.com",
    phone: "+251 955 678 901",
    department: "Technology",
    joinedDate: "May 02, 2024",
  },
  {
    id: "6",
    name: "Natali Craig",
    username: "@natali",
    status: "Active",
    role: "User",
    email: "natali@untitledui.com",
    phone: "+251 966 789 012",
    department: "Talent",
    joinedDate: "Jun 14, 2024",
  },
];

const ConsultantsTable = () => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
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
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultants.map((consultant) => {
              const isExpanded = expandedRows.has(consultant.id);

              return (
                <Collapsible
                  key={consultant.id}
                  asChild
                  open={isExpanded}
                  onOpenChange={() => toggleRow(consultant.id)}
                >
                  <>
                    <TableRow className="border-border">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div 
                          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
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
                          <span
                            className={`w-2 h-2 rounded-full ${
                              consultant.status === "Active" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          ></span>
                          <span
                            className={
                              consultant.status === "Active"
                                ? "text-green-600"
                                : "text-amber-600"
                            }
                          >
                            {consultant.status}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-foreground">{consultant.role}</TableCell>
                      <TableCell className="text-foreground">{consultant.email}</TableCell>
                      <TableCell className="flex flex-wrap gap-2">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            className="gap-1"
                          >
                            Details
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <Button
                          className={`rounded-lg px-6 ${
                            consultant.status === "Active"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-emerald-600 hover:bg-emerald-700"
                          }`}
                        >
                          {consultant.status === "Active" ? "Suspend" : "Approve"}
                        </Button>
                      </TableCell>
                    </TableRow>

                    <CollapsibleContent asChild>
                      <TableRow className="bg-muted/40 border-border">
                        <TableCell colSpan={6} className="p-0">
                          <div className="p-6 grid gap-6 md:grid-cols-3">
                            <section className="space-y-2">
                              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Contact Details
                              </h4>
                              <p className="flex items-center gap-2 text-sm text-foreground">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                {consultant.email}
                              </p>
                              {consultant.phone && (
                                <p className="flex items-center gap-2 text-sm text-foreground">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  {consultant.phone}
                                </p>
                              )}
                            </section>

                            <section className="space-y-2">
                              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Role & Status
                              </h4>
                              <p className="flex items-center gap-2 text-sm">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                {consultant.role}
                              </p>
                              {consultant.department && (
                                <p className="text-sm text-muted-foreground">
                                  Department: {consultant.department}
                                </p>
                              )}
                              {consultant.joinedDate && (
                                <p className="text-sm text-muted-foreground">
                                  Joined: {consultant.joinedDate}
                                </p>
                              )}
                              <p className="text-sm">
                                Status: {" "}
                                <span
                                  className={
                                    consultant.status === "Active"
                                      ? "text-green-600"
                                      : "text-amber-600"
                                  }
                                >
                                  {consultant.status}
                                </span>
                              </p>
                            </section>

                            <section className="space-y-2">
                              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Quick Actions
                              </h4>
                              <div className="grid gap-2">
                                <Button variant="ghost" className="border border-border">
                                  View Profile
                                </Button>
                              </div>
                            </section>
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ConsultantsTable;
