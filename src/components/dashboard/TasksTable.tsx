import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Task {
  id: string;
  name: string;
  status: "Active" | "Completed";
  role: string;
  email: string;
}

interface TasksTableProps {
  tasks: Task[];
  onBookCall?: (taskId: string) => void;
}

const TasksTable = ({ tasks, onBookCall }: TasksTableProps) => {
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
                Role
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>User's role in the task</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Email address</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Book a Call</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-b border-border hover:bg-muted/30">
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
              <TableCell className="text-muted-foreground">{task.email}</TableCell>
              <TableCell className="text-right">
                <Button 
                  onClick={() => onBookCall?.(task.id)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  More
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
