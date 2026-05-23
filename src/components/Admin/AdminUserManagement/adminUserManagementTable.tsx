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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminUser } from "@/services/adminUsers";

interface ConsultantsTableProps {
  users: AdminUser[];
  isLoading?: boolean;
  onRoleUpdate: (userId: string, role: AdminUser["role"]) => void;
  onStatusUpdate: (userId: string, status: AdminUser["status"]) => void;
}

const ConsultantsTable = ({
  users,
  isLoading = false,
  onRoleUpdate,
  onStatusUpdate,
}: ConsultantsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [roleDrafts, setRoleDrafts] = useState<Record<string, AdminUser["role"]>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
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
                        <p>User role</p>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground text-center py-10">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length ? (
              users.map((user) => {
                const isExpanded = expandedRows.has(user.id);
                const displayName = user.name || user.email || "User";
                const roleValue = roleDrafts[user.id] || user.role;
                const isActive = user.status === "active";
                const statusLabel = isActive ? "Active" : "Inactive";
                const statusDotClass = isActive ? "bg-green-500" : "bg-slate-400";
                const statusTextClass = isActive ? "text-green-600" : "text-slate-600";
                const nextStatus = isActive ? "inactive" : "active";
                const actionLabel = isActive ? "Suspend User" : "Activate User";

                return (
                  <Collapsible
                    key={user.id}
                    asChild
                    open={isExpanded}
                    onOpenChange={() => toggleRow(user.id)}
                  >
                    <>
                      <TableRow className="border-border">
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={user.profileImage ?? undefined} />
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {getInitials(displayName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground hover:text-primary">{displayName}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${statusDotClass}`}></span>
                            <span className={statusTextClass}>{statusLabel}</span>
                          </span>
                        </TableCell>
                        <TableCell className="text-foreground">{user.role}</TableCell>
                        <TableCell className="text-foreground">{user.email}</TableCell>
                        <TableCell className="flex flex-wrap gap-2">
                          <CollapsibleTrigger asChild>
                            <Button variant="outline" className="gap-1">
                              Details
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
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
                                  {user.email}
                                </p>
                                {user.phone && (
                                  <p className="flex items-center gap-2 text-sm text-foreground">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    {user.phone}
                                  </p>
                                )}
                              </section>

                              <section className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                  Role & Status
                                </h4>
                                <p className="flex items-center gap-2 text-sm text-foreground">
                                  <Shield className="h-4 w-4 text-muted-foreground" />
                                  Role: {user.role}
                                </p>
                                <p className="text-sm text-muted-foreground">Status: {statusLabel}</p>
                                <p className="text-sm text-muted-foreground">
                                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                                <div className="pt-2 space-y-2">
                                  <Select
                                    value={roleValue}
                                    onValueChange={(value) =>
                                      setRoleDrafts((prev) => ({
                                        ...prev,
                                        [user.id]: value as AdminUser["role"],
                                      }))
                                    }
                                  >
                                    <SelectTrigger className="bg-card border-border">
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="consultant">Consultant</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    variant="outline"
                                    onClick={() => onRoleUpdate(user.id, roleValue)}
                                  >
                                    Update Role
                                  </Button>
                                </div>
                              </section>

                              <section className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                  Quick Actions
                                </h4>
                                <div className="grid gap-2">
                                  <Button
                                    variant="ghost"
                                    className="border border-border"
                                    onClick={() => onStatusUpdate(user.id, nextStatus)}
                                  >
                                    {actionLabel}
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
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground text-center py-10">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ConsultantsTable;
