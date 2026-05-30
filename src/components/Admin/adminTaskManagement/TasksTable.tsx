import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Edit, Eye, Trash2 } from "lucide-react";
import type { Task } from "./TaskFormDialog.tsx";

export interface GoalTaskGroup {
  goalId: number;
  title: string;
  category: string;
  businessArea?: string | null;
  businessType?: string | null;
  description?: string | null;
  tasks: Task[];
}

interface TasksTableProps {
  goals: GoalTaskGroup[];
  onViewTask: (task: Task) => void;
  onEditGoal: (goalId: number) => void;
  onDeleteGoal: (goalId: number) => void;
}

const TasksTable = ({ goals, onViewTask, onEditGoal, onDeleteGoal }: TasksTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (goalId: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [String(goalId)]: !prev[String(goalId)],
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium">Goal</TableHead>
            <TableHead className="text-muted-foreground font-medium">Category</TableHead>
            <TableHead className="text-muted-foreground font-medium">Business Target</TableHead>
            <TableHead className="text-muted-foreground font-medium">Tasks</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No goals found. Create a goal with tasks to get started.
              </TableCell>
            </TableRow>
          ) : (
            goals.map((goal) => (
              <Collapsible
                key={goal.goalId}
                asChild
                open={expandedRows[String(goal.goalId)] ?? false}
                onOpenChange={() => toggleRow(goal.goalId)}
              >
                <>
                  <TableRow className="border-border align-top">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-base font-semibold text-foreground">
                          {goal.title}
                        </div>
                        {goal.description ? (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {goal.description}
                          </p>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{goal.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {[goal.businessArea || "All areas", goal.businessType || "All types"].join(" / ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">{goal.tasks.length}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <CollapsibleTrigger asChild>
                          <Button size="sm" variant="outline">
                            {expandedRows[String(goal.goalId)] ? (
                              <>
                                Hide
                                <ChevronUp className="ml-1 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                View
                                <ChevronDown className="ml-1 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <Button size="sm" variant="outline" onClick={() => onEditGoal(goal.goalId)}>
                          <Edit className="mr-1 h-4 w-4" />
                          Edit Goal
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDeleteGoal(goal.goalId)}>
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete Goal
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <TableRow className="bg-muted/30 border-border">
                      <TableCell colSpan={5} className="p-0">
                        <div className="px-6 py-4 space-y-4">
                          <h4 className="text-sm font-semibold text-foreground">Tasks in this goal</h4>
                          {goal.tasks.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No tasks added yet.</p>
                          ) : (
                            <div className="space-y-3">
                              {goal.tasks.map((task) => (
                                <div key={task.id} className="rounded-md border border-border bg-background px-4 py-3">
                                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                    <div className="space-y-1">
                                      <p className="text-sm font-semibold text-foreground">{task.title}</p>
                                      {task.description ? (
                                        <p className="text-xs text-muted-foreground">{task.description}</p>
                                      ) : null}
                                      <p className="text-xs text-muted-foreground">Step {task.stepOrder}</p>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={() => onViewTask(task)}>
                                      <Eye className="mr-1 h-4 w-4" />
                                      View
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
