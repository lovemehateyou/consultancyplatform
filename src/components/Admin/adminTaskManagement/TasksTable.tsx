import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import type { Task } from "./TaskFormDialog.tsx";

interface TasksTableProps {
  tasks: Task[];
  onView: (task: Task) => void;
  onEditGoal: (goalId: number) => void;
  onDeleteGoal: (goalId: number) => void;
}

const TasksTable = ({ tasks, onView, onEditGoal, onDeleteGoal }: TasksTableProps) => {
  return (
    <div className="bg-card border border-border rounded-lg min-w-0 ">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium min-w-[240px]">
                Task
              </TableHead>
              <TableHead className="text-muted-foreground font-medium min-w-[200px]">
                Goal
              </TableHead>
              <TableHead className="text-muted-foreground font-medium min-w-[160px]">
                Category
              </TableHead>
              <TableHead className="text-muted-foreground font-medium min-w-[120px]">
                Step Order
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right min-w-[140px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No tasks found. Create a goal with tasks to get started.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} className="border-border">
                  <TableCell>
                    <p className="font-medium text-foreground">{task.title}</p>
                    {task.description ? (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-foreground">{task.goalTitle}</p>
                    {task.goalDescription ? (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {task.goalDescription}
                      </p>
                    ) : null}
                    <p className="text-xs text-muted-foreground">
                      {task.goalBusinessArea || "All areas"} / {task.goalBusinessType || "All types"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-foreground">{task.goalCategory}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-foreground">{task.stepOrder}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onView(task)}
                        className="h-8"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditGoal(task.goalId)}
                        className="h-8"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit Goal
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeleteGoal(task.goalId)}
                        className="h-8"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete Goal
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksTable;
