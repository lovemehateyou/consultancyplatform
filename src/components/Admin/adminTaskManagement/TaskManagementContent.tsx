import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import TaskManagementKPICards from "./TaskManagementKPICards";
import TasksTable from "./TasksTable";
import TaskFormDialog, { type Task } from "./TaskFormDialog";
import TaskViewDialog from "./TaskViewDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const initialTasks: Task[] = [
  {
    id: "1",
    name: "Getting a TIN Number",
    consultantType: "Tax Consultant",
    details: "A Taxpayer Identification Number (TIN) is required for all businesses operating in the country. This task involves registering with the tax authority and obtaining your unique TIN.\n\nSteps:\n1. Gather required documents\n2. Visit the local tax office or apply online\n3. Submit application form\n4. Wait for processing (usually 5-7 business days)",
    businessTypes: ["PLC (Private Limited Company)", "Sole Proprietorship", "Partnership"],
    businessAreas: ["Sales", "Services", "Manufacturing", "Retail"],
    governmentLinks: ["https://www.irs.gov/businesses", "https://example.gov/tin-application"],
  },
  {
    id: "2",
    name: "VAT Registration",
    consultantType: "Finance Consultant",
    details: "Value Added Tax (VAT) registration is mandatory for businesses with annual turnover exceeding the threshold. This process involves registering with the revenue authority.\n\nRequirements:\n- Valid TIN\n- Business registration certificate\n- Bank account details\n- Proof of business address",
    businessTypes: ["PLC (Private Limited Company)", "LLC (Limited Liability Company)", "Corporation"],
    businessAreas: ["Sales", "Retail", "Manufacturing"],
    governmentLinks: ["https://example.gov/vat-registration"],
  },
  {
    id: "3",
    name: "Business License Renewal",
    consultantType: "Law Consultant",
    details: "Annual renewal of business operating license. Must be completed before the expiration date to avoid penalties and business interruption.",
    businessTypes: ["PLC (Private Limited Company)", "Sole Proprietorship", "Franchise"],
    businessAreas: ["Services", "Retail", "Food & Beverage"],
    governmentLinks: ["https://example.gov/business-license"],
  },
  {
    id: "4",
    name: "Employee Social Security Registration",
    consultantType: "HR Consultant",
    details: "Register employees with the national social security system. This is mandatory for all businesses with employees.",
    businessTypes: ["PLC (Private Limited Company)", "Corporation", "Non-Profit Organization"],
    businessAreas: ["Healthcare", "Education", "Technology"],
    governmentLinks: ["https://example.gov/social-security"],
  },
];

const TaskManagementContent = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.consultantType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueConsultantTypes = new Set(tasks.map((t) => t.consultantType).filter(Boolean));

  const handleAddTask = () => {
    setSelectedTask(null);
    setFormMode("add");
    setFormDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setFormMode("edit");
    setFormDialogOpen(true);
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete));
      setTaskToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSaveTask = (taskData: Omit<Task, "id"> & { id?: string }) => {
    if (taskData.id) {
      // Edit existing task
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...taskData, id: taskData.id } as Task : t))
      );
    } else {
      // Add new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
      };
      setTasks((prev) => [...prev, newTask]);
    }
  };

  return (
    <main className="flex-1 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Task Management</h1>
          <p className="text-muted-foreground">Manage and organize business tasks</p>
        </div>
        <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <TaskManagementKPICards
        totalTasks={tasks.length}
        activeTasks={tasks.length}
        consultantTypes={uniqueConsultantTypes.size}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">All Tasks</h2>
        <TasksTable
          tasks={filteredTasks}
          onView={handleViewTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteClick}
        />
      </div>

      <TaskFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        task={selectedTask}
        onSave={handleSaveTask}
        mode={formMode}
      />

      <TaskViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        task={selectedTask}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default TaskManagementContent;
