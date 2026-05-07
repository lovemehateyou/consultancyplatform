import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, HelpCircle, ChevronDown, ChevronUp, ExternalLink, MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface Task {
  id: string;
  name: string;
  status: "Active" | "Completed";
  role: string;
  email: string;
  details?: string[];
  mapLinks?: TaskMapLink[];
}

export interface TaskMapLink {
  url: string;
  city: string;
  subCity: string;
}

interface TasksTableProps {
  tasks: Task[];
  onCompleteTask?: (taskId: string) => void;
  userCity: string;
  userSubCity: string;
}

const TasksTable = ({ tasks, onCompleteTask, userCity, userSubCity }: TasksTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (taskId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Default details if not provided
  const getTaskDetails = (task: Task): string[] => {
    return task.details || [
      `Review documentation for ${task.role}`,
      `Complete assigned requirements and deliverables`,
      `Coordinate with team members via ${task.email}`,
      `Submit progress report by deadline`,
      `Schedule follow-up meeting if needed`,
    ];
  };

  const normalizeLocation = (value: string) => value.trim().toLowerCase();

  const getMatchingMapLinks = (task: Task): TaskMapLink[] => {
    if (!task.mapLinks || task.mapLinks.length === 0) return [];
    const city = normalizeLocation(userCity);
    const subCity = normalizeLocation(userSubCity);
    if (!city || !subCity) return [];

    return task.mapLinks.filter((link) =>
      normalizeLocation(link.city) === city && normalizeLocation(link.subCity) === subCity
    );
  };




  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Name</TableHead>
            <TableHead className="text-muted-foreground font-medium">
              <div className="flex items-center gap-1">
                Status
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              <div className="flex items-center gap-1">
                Consultant Needed
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Consultant Needed for the Task if you want help</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <Collapsible key={task.id} open={expandedRows[task.id]} onOpenChange={() => toggleRow(task.id)} asChild>
              <>
                <TableRow className="border-b border-border hover:bg-muted/30">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{task.name}</TableCell>
                  <TableCell>
                    {task.status === "Active" ? (
                      <Badge variant="outline" className="bg-tag-green/20 text-tag-green border-tag-green/30">
                        Active
                      </Badge>
                    ) : (
                      <span className="flex items-center gap-1.5 text-tag-green text-sm">
                        <span className="w-2 h-2 rounded-full bg-tag-green" />
                        Completed
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{task.role}</TableCell>
                  <TableCell className="text-right">
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {expandedRows[task.id] ? (
                          <>
                            Less
                            <ChevronUp className="ml-1 w-4 h-4" />
                          </>
                        ) : (
                          <>
                            More
                            <ChevronDown className="ml-1 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </TableCell>
                </TableRow>
                <CollapsibleContent asChild>
                  <TableRow className="bg-muted/20 hover:bg-muted/30 border-b border-border">
                    <TableCell colSpan={6} className="p-0">
                      <div className="px-6 py-4">
                        <h4 className="font-semibold text-foreground mb-3">Task Details:</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                          {getTaskDetails(task).map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>Map Links for Your Area</span>
                          </div>
                          {getMatchingMapLinks(task).length > 0 ? (
                            <div className="space-y-2">
                              {getMatchingMapLinks(task).map((link, index) => (
                                <a
                                  key={index}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm"
                                >
                                  <span className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                    <ExternalLink className="w-4 h-4" />
                                    {link.url}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {link.city} · {link.subCity}
                                  </span>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No locations for your area</p>
                          )}
                        </div>
                        {task.status === "Active" && (
                          <Button 
                            onClick={() => onCompleteTask?.(task.id)}
                            className="bg-tag-green hover:bg-tag-green/90 text-white"
                          >
                            Complete Task
                          </Button>
                        )}
                        {task.status === "Completed" && (
                          <span className="text-tag-green font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-tag-green" />
                            Task Completed
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </CollapsibleContent>
              </>
            </Collapsible>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
