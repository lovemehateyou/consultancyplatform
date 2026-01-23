import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Eye, ExternalLink } from "lucide-react";
import type { Task } from "./TaskFormDialog";

interface TasksTableProps {
  tasks: Task[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TasksTable = ({ tasks, onView, onEdit, onDelete }: TasksTableProps) => {
  return (
    <div className="bg-card border border-border rounded-lg min-w-0 ">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium min-w-[200px]">
                Task Name
              </TableHead>
              <TableHead className="text-muted-foreground font-medium min-w-[150px]">
                Consultant Type
              </TableHead>
              <TableHead className="text-muted-foreground font-medium min-w-[150px]">
                Business Types
              </TableHead>
              <TableHead className="text-muted-foreground font-medium min-w-[150px]">
                Business Areas
              </TableHead>
              <TableHead className="text-muted-foreground font-medium min-w-[100px]">
                Links
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right min-w-[200px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No tasks found. Click "Add Task" to create one.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} className="border-border">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">{task.name}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {task.consultantType || "Not specified"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {task.businessTypes.slice(0, 2).map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type.split(" ")[0]}
                        </Badge>
                      ))}
                      {task.businessTypes.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{task.businessTypes.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {task.businessAreas.slice(0, 2).map((area) => (
                        <Badge key={area} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          {area}
                        </Badge>
                      ))}
                      {task.businessAreas.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{task.businessAreas.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {task.governmentLinks.length}
                      </span>
                    </div>
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
                        onClick={() => onEdit(task)}
                        className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(task.id)}
                        className="h-8"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
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
