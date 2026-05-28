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
  id: number;
  taskId: number;
  userGoalId: number;
  name: string;
  status: "Active" | "Completed";
  goalTitle: string;
  goalCategory: string;
  goalBusinessArea?: string | null;
  goalBusinessType?: string | null;
  taskDescription?: string | null;
  goalDescription?: string | null;
  stepOrder: number;
  details?: string[];
  mapLinks?: TaskMapLink[];
}

export interface TaskMapLink {
  url: string;
  city?: string | null;
  subCity: string;
}

interface TasksTableProps {
  tasks: Task[];
  onCompleteTask?: (task: Task) => void;
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
    if (task.details && task.details.length > 0) {
      return task.details;
    }

    const details: string[] = [];
    if (task.taskDescription) {
      details.push(task.taskDescription);
    }
    if (task.goalDescription) {
      details.push(task.goalDescription);
    }
    if (task.goalCategory) {
      details.push(`Goal category: ${task.goalCategory}`);
    }

    const target = [task.goalBusinessArea, task.goalBusinessType]
      .filter((value) => value && value.trim().length > 0)
      .join(" / ");
    if (target) {
      details.push(`Business target: ${target}`);
    }

    return details.length > 0 ? details : ["No additional details provided."];
  };

  const normalizeLocation = (value: string) => {
    return value.trim().toLowerCase();
  };

  const getMatchingMapLinks = (task: Task): TaskMapLink[] => {
    if (!task.mapLinks || task.mapLinks.length === 0) return [];
    const subCity = normalizeLocation(userSubCity);
    if (!subCity) return [];
    const city = normalizeLocation(userCity);

    return task.mapLinks.filter((link) => {
      const linkSubCity = normalizeLocation(link.subCity ?? "");
      if (!linkSubCity || linkSubCity !== subCity) return false;
      const linkCity = normalizeLocation(link.city ?? "");
      return !linkCity || !city || linkCity === city;
    });
  };

  return (
    <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border/60 bg-muted/30">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Name</TableHead>
            <TableHead className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
              <div className="flex items-center gap-1">
                Status
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </TableHead>
            <TableHead className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
              <div className="flex items-center gap-1">
                Goal
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Goal context for the task</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableHead>
            <TableHead className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider text-right">Details</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => (
            <Collapsible
              key={task.id}
              open={expandedRows[String(task.id)] ?? false}
              onOpenChange={() => toggleRow(String(task.id))}
              asChild
            >
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
                  <TableCell className="text-muted-foreground">
                    <div className="text-sm text-foreground">{task.goalTitle}</div>
                    <div className="text-xs text-muted-foreground">
                      {task.goalCategory}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {expandedRows[String(task.id)] ? (
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
                                    {link.city ? `${link.city} - ${link.subCity}` : link.subCity}
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
                            onClick={() => onCompleteTask?.(task)}
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
