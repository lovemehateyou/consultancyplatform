import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ExternalLink, FileText, Flag, Layers, MapPin } from "lucide-react";
import type { Task } from "./TaskFormDialog.tsx";

interface TaskViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
}

const TaskViewDialog = ({ open, onOpenChange, task }: TaskViewDialogProps) => {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Goal Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flag className="w-4 h-4" />
              <span>Goal</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                {task.goalTitle}
              </Badge>
              <Badge variant="outline">{task.goalCategory}</Badge>
            </div>
            {task.goalDescription ? (
              <p className="text-sm text-muted-foreground">{task.goalDescription}</p>
            ) : null}
          </div>

          {/* Business Target */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span>Business target</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                {task.goalBusinessArea || "All areas"}
              </Badge>
              <Badge variant="outline">
                {task.goalBusinessType || "All types"}
              </Badge>
            </div>
          </div>

          {/* Task Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Task Details</span>
            </div>
            <p className="text-foreground bg-muted/50 p-4 rounded-lg whitespace-pre-wrap">
              {task.description || "No details provided."}
            </p>
          </div>

          {task.mapLinks && task.mapLinks.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Map Links</span>
              </div>
              <div className="space-y-2">
                {task.mapLinks.map((link, index) => (
                  <a
                    key={`${link.url}-${index}`}
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
                      {link.city || ""}{link.city && link.subCity ? " · " : ""}{link.subCity}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {/* Step Order */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Layers className="w-4 h-4" />
              <span>Step Order</span>
            </div>
            <p className="text-sm text-foreground">{task.stepOrder}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskViewDialog;
