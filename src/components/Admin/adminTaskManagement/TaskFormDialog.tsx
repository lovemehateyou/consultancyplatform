import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

export interface Task {
  id: string;
  name: string;
  consultantType: string;
  details: string;
  businessTypes: string[];
  businessAreas: string[];
  governmentLinks: string[];
  order: number;
}

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onSave: (task: Omit<Task, "id"> & { id?: string }) => void;
  mode: "add" | "edit";
}

const consultantTypes = [
  "Law Consultant",
  "Finance Consultant",
  "Tax Consultant",
  "Business Consultant",
  "HR Consultant",
  "Marketing Consultant",
];

const businessTypes = [
  "PLC (Private Limited Company)",
  "Sole Proprietorship",
  "Partnership",
  "Franchise",
  "LLC (Limited Liability Company)",
  "Corporation",
  "Non-Profit Organization",
];

const businessAreas = [
  "Sales",
  "Services",
  "Manufacturing",
  "Retail",
  "Technology",
  "Healthcare",
  "Education",
  "Construction",
  "Food & Beverage",
  "Transportation",
];

const TaskFormDialog = ({ open, onOpenChange, task, onSave, mode }: TaskFormDialogProps) => {
  const [name, setName] = useState("");
  const [consultantType, setConsultantType] = useState("");
  const [details, setDetails] = useState("");
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([]);
  const [selectedBusinessAreas, setSelectedBusinessAreas] = useState<string[]>([]);
  const [governmentLinks, setGovernmentLinks] = useState<string[]>([""]);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    if (task && mode === "edit") {
      setName(task.name);
      setConsultantType(task.consultantType);
      setDetails(task.details);
      setSelectedBusinessTypes(task.businessTypes);
      setSelectedBusinessAreas(task.businessAreas);
      setGovernmentLinks(task.governmentLinks.length > 0 ? task.governmentLinks : [""]);
      setOrder(task.order ?? 1);
    } else {
      setName("");
      setConsultantType("");
      setDetails("");
      setSelectedBusinessTypes([]);
      setSelectedBusinessAreas([]);
      setGovernmentLinks([""]);
      setOrder(1);
    }
  }, [task, mode, open]);

  const handleBusinessTypeToggle = (type: string) => {
    setSelectedBusinessTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBusinessAreaToggle = (area: string) => {
    setSelectedBusinessAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleAddLink = () => {
    setGovernmentLinks((prev) => [...prev, ""]);
  };

  const handleRemoveLink = (index: number) => {
    setGovernmentLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index: number, value: string) => {
    setGovernmentLinks((prev) => prev.map((link, i) => (i === index ? value : link)));
  };

  const handleSave = () => {
    const filteredLinks = governmentLinks.filter((link) => link.trim() !== "");
    
    onSave({
      id: task?.id,
      name,
      consultantType,
      details,
      businessTypes: selectedBusinessTypes,
      businessAreas: selectedBusinessAreas,
      governmentLinks: filteredLinks,
      order,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Task" : "Edit Task"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input
              id="name"
              placeholder="e.g., Getting a TIN Number"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Consultant Type */}
          <div className="space-y-2">
            <Label>Consultant Type Needed</Label>
            <Select value={consultantType} onValueChange={setConsultantType}>
              <SelectTrigger>
                <SelectValue placeholder="Select consultant type" />
              </SelectTrigger>
              <SelectContent>
                {consultantTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Task Details */}
          <div className="space-y-2">
            <Label htmlFor="details">Task Details</Label>
            <Textarea
              id="details"
              placeholder="Describe the task requirements, steps, and any important information..."
              className="min-h-[120px]"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          {/* Completion Order */}
          <div className="space-y-2">
            <Label htmlFor="order">Completion Order</Label>
            <Input
              id="order"
              type="number"
              min={1}
              value={order}
              onChange={(e) => setOrder(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>

          {/* Business Types */}
          <div className="space-y-3">
            <Label>Business Types (Select all that apply)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {businessTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedBusinessTypes.includes(type)}
                    onCheckedChange={() => handleBusinessTypeToggle(type)}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm font-normal cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Business Areas */}
          <div className="space-y-3">
            <Label>Business Areas (Select all that apply)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {businessAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={`area-${area}`}
                    checked={selectedBusinessAreas.includes(area)}
                    onCheckedChange={() => handleBusinessAreaToggle(area)}
                  />
                  <Label htmlFor={`area-${area}`} className="text-sm font-normal cursor-pointer">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Government Links */}
          <div className="space-y-3">
            <Label>Government Website Links</Label>
            <div className="space-y-2">
              {governmentLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="https://example.gov/..."
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {governmentLinks.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveLink(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddLink}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Link
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!name.trim()}
          >
            {mode === "add" ? "Add Task" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
