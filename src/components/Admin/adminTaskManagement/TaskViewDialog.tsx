import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, User, FileText, Building2, Briefcase, Link as LinkIcon, MapPin } from "lucide-react";
import type { Task } from "./TaskFormDialog";

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
          <DialogTitle className="text-xl">{task.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Consultant Type */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Consultant Type Required</span>
            </div>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              {task.consultantType || "Not specified"}
            </Badge>
          </div>

          {/* Task Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Task Details</span>
            </div>
            <p className="text-foreground bg-muted/50 p-4 rounded-lg whitespace-pre-wrap">
              {task.details || "No details provided."}
            </p>
          </div>

          {/* Business Types */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span>Applicable Business Types</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {task.businessTypes.length > 0 ? (
                task.businessTypes.map((type) => (
                  <Badge key={type} variant="outline">
                    {type}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">None selected</span>
              )}
            </div>
          </div>

          {/* Business Areas */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span>Applicable Business Areas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {task.businessAreas.length > 0 ? (
                task.businessAreas.map((area) => (
                  <Badge key={area} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {area}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">None selected</span>
              )}
            </div>
          </div>

          {/* Government Links */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LinkIcon className="w-4 h-4" />
              <span>Government Website Links</span>
            </div>
            <div className="space-y-2">
              {task.governmentLinks.length > 0 ? (
                task.governmentLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {link}
                  </a>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No links provided</span>
              )}
            </div>
          </div>

          {/* Map Links */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Map Links by Location</span>
            </div>
            <div className="space-y-2">
              {task.mapLinks.length > 0 ? (
                task.mapLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <ExternalLink className="w-4 h-4" />
                      {link.url}
                    </span>
                    <span className="text-muted-foreground">
                      {link.city} · {link.subCity}
                    </span>
                  </a>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No map links provided</span>
              )}
            </div>
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
