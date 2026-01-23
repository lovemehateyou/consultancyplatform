import { useState } from "react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, FileText, Image as ImageIcon, Download, ExternalLink } from "lucide-react";

export interface PendingRequest {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  date: string;
  // Extended details from registration
  phone?: string;
  email?: string;
  nationalIdUrl?: string;
  cvUrl?: string;
}

interface PendingRequestsTableProps {
  requests: PendingRequest[];
  onViewDetails: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const PendingRequestsTable = ({ requests, onApprove, onReject }: PendingRequestsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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
          {requests.map((request) => {
            const isExpanded = expandedRows.has(request.id);
            return (
              <Collapsible key={request.id} asChild open={isExpanded} onOpenChange={() => toggleRow(request.id)}>
                <>
                  <TableRow className="border-border">
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
                      <CollapsibleTrigger asChild>
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
                        >
                          Details
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
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
                  <CollapsibleContent asChild>
                    <TableRow className="bg-muted/30 border-border hover:bg-muted/30">
                      <TableCell colSpan={6} className="p-0">
                        <div className="p-6 space-y-4">
                          <h4 className="text-lg font-semibold text-foreground mb-4">User Registration Details</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Personal Info</h5>
                              <div className="space-y-2">
                                <div>
                                  <p className="text-xs text-muted-foreground">Full Name</p>
                                  <p className="text-sm font-medium text-foreground">{request.name}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Phone Number</p>
                                  <p className="text-sm font-medium text-foreground">{request.phone || "+251 911 234 567"}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Email Address</p>
                                  <p className="text-sm font-medium text-foreground">{request.email || `${request.username}@example.com`}</p>
                                </div>
                              </div>
                            </div>

                            {/* National ID Preview */}
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">National ID</h5>
                              <div className="border border-border rounded-lg overflow-hidden bg-card">
                                <div className="aspect-video bg-muted flex items-center justify-center">
                                  {request.nationalIdUrl ? (
                                    <img 
                                      src={request.nationalIdUrl} 
                                      alt="National ID" 
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex flex-col items-center text-muted-foreground">
                                      <ImageIcon className="h-10 w-10 mb-2" />
                                      <span className="text-xs">National ID Photo</span>
                                    </div>
                                  )}
                                </div>
                                <div className="p-2 flex gap-2">
                                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                                    <Download className="h-3 w-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* CV Preview */}
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">CV / Resume</h5>
                              <div className="border border-border rounded-lg overflow-hidden bg-card">
                                <div className="aspect-video bg-muted flex items-center justify-center">
                                  <div className="flex flex-col items-center text-muted-foreground">
                                    <FileText className="h-10 w-10 mb-2" />
                                    <span className="text-xs">CV Document (PDF)</span>
                                  </div>
                                </div>
                                <div className="p-2 flex gap-2">
                                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                                    <Download className="h-3 w-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Quick Actions</h5>
                              <div className="space-y-2">
                                <Button 
                                  onClick={() => onApprove(request.id)}
                                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                                >
                                  Approve Consultant
                                </Button>
                                <Button 
                                  onClick={() => onReject(request.id)}
                                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                                >
                                  Reject Application
                                </Button>
                              </div>
                            </div>
                          </div>
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
  );
};

export default PendingRequestsTable;
