import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import TasksTable from "./TasksTable";
import TaskFormDialog, { type Task } from "./TaskFormDialog.tsx";
import TaskViewDialog from "./TaskViewDialog";
import {
	createGoal,
	deleteGoal,
	listGoals,
	updateGoal,
	type CreateGoalPayload,
	type Goal,
} from "@/services/goals";
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

const TaskManagementContent = () => {
	const [goals, setGoals] = useState<Goal[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [formDialogOpen, setFormDialogOpen] = useState(false);
	const [viewDialogOpen, setViewDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [formMode, setFormMode] = useState<"add" | "edit">("add");
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
	const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const fetchGoals = useCallback(async () => {
		setIsLoading(true);
		setErrorMessage(null);
		try {
			const response = await listGoals();
			setGoals(response.goals ?? []);
		} catch (error) {
			setErrorMessage(error instanceof Error ? error.message : "Failed to load tasks.");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		void fetchGoals();
	}, [fetchGoals]);

	const tasks = useMemo<Task[]>(() => {
		const flattened = goals.flatMap((goal) =>
			(goal.Tasks ?? []).map((task) => ({
				id: task.id,
				goalId: task.goalId,
				title: task.title,
				description: task.description ?? "",
				stepOrder: task.stepOrder,
				mapLinks: task.mapLinks ?? [],
				goalTitle: goal.title,
				goalCategory: goal.category,
				goalBusinessArea: goal.businessArea ?? "",
				goalBusinessType: goal.businessType ?? "",
				goalDescription: goal.description ?? "",
			})),
		);

		return flattened.sort((a, b) => {
			if (a.goalTitle !== b.goalTitle) {
				return a.goalTitle.localeCompare(b.goalTitle);
			}
			return a.stepOrder - b.stepOrder;
		});
	}, [goals]);

	const categoryOptions = useMemo(() => {
		const categories = new Set(goals.map((goal) => goal.category).filter(Boolean));
		return Array.from(categories);
	}, [goals]);

	const filteredTasks = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		return tasks.filter((task) => {
			const matchesSearch =
				query.length === 0 ||
				task.title.toLowerCase().includes(query) ||
				task.goalTitle.toLowerCase().includes(query) ||
				task.goalCategory.toLowerCase().includes(query) ||
				task.goalBusinessArea?.toLowerCase().includes(query) ||
				task.goalBusinessType?.toLowerCase().includes(query);
			const matchesCategory =
				categoryFilter === "all" || task.goalCategory === categoryFilter;

			return matchesSearch && matchesCategory;
		});
	}, [tasks, searchQuery, categoryFilter]);

	const handleAddGoal = () => {
		setErrorMessage(null);
		setSelectedGoal(null);
		setFormMode("add");
		setFormDialogOpen(true);
	};

	const handleEditGoal = (goalId: number) => {
		const goal = goals.find((item) => item.id === goalId) ?? null;
		if (!goal) return;
		setErrorMessage(null);
		setSelectedGoal(goal);
		setFormMode("edit");
		setFormDialogOpen(true);
	};

	const handleDeleteGoal = (goalId: number) => {
		const goal = goals.find((item) => item.id === goalId) ?? null;
		if (!goal) return;
		setGoalToDelete(goal);
		setDeleteDialogOpen(true);
	};

	const handleViewTask = (task: Task) => {
		setSelectedTask(task);
		setViewDialogOpen(true);
	};

	const handleViewDialogChange = (open: boolean) => {
		setViewDialogOpen(open);
		if (!open) {
			setSelectedTask(null);
		}
	};

	const handleFormDialogChange = (open: boolean) => {
		setFormDialogOpen(open);
		if (!open) {
			setSelectedGoal(null);
			setFormMode("add");
		}
	};

	const handleDeleteDialogChange = (open: boolean) => {
		setDeleteDialogOpen(open);
		if (!open) {
			setGoalToDelete(null);
		}
	};

	const handleSaveGoal = async (payload: CreateGoalPayload) => {
		setIsSaving(true);
		setErrorMessage(null);
		try {
			if (formMode === "edit" && selectedGoal) {
				await updateGoal(selectedGoal.id, payload);
			} else {
				await createGoal(payload);
			}
			handleFormDialogChange(false);
			await fetchGoals();
		} catch (error) {
			setErrorMessage(
				error instanceof Error
					? error.message
					: formMode === "edit"
						? "Failed to update goal."
						: "Failed to create goal.",
			);
		} finally {
			setIsSaving(false);
		}
	};

	const handleConfirmDelete = async () => {
		if (!goalToDelete) {
			setDeleteDialogOpen(false);
			return;
		}
		setIsSaving(true);
		setErrorMessage(null);
		try {
			await deleteGoal(goalToDelete.id);
			setDeleteDialogOpen(false);
			setGoalToDelete(null);
			await fetchGoals();
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Failed to delete goal.",
			);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<main className="flex-1 p-4 md:p-6 overflow-auto space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Task Management</h1>
					<p className="text-muted-foreground">Manage goals and their tasks</p>
				</div>
				<Button onClick={handleAddGoal} className="bg-blue-600 hover:bg-blue-700 text-white">
					<Plus className="w-4 h-4 mr-2" />
					Add Goal
				</Button>
			</div>

			{errorMessage ? (
				<div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
					{errorMessage}
				</div>
			) : null}

			<div className="flex flex-col lg:flex-row gap-4">
				<div className="relative flex-1 max-w-md">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
					<Input
						placeholder="Search tasks or goals..."
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						className="pl-10"
					/>
				</div>
				<div className="flex flex-col sm:flex-row flex-1 gap-4">
					<select
						value={categoryFilter}
						onChange={(event) => setCategoryFilter(event.target.value)}
						aria-label="Filter by category"
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
					>
						<option value="all">All categories</option>
						{categoryOptions.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
				<Button
					variant="outline"
					onClick={() => {
						setSearchQuery("");
						setCategoryFilter("all");
					}}
					className="whitespace-nowrap"
				>
					Clear filters
				</Button>
			</div>

			{isLoading ? (
				<p className="text-sm text-muted-foreground">Loading tasks...</p>
			) : null}

			<div>
				<h2 className="text-xl font-semibold text-foreground mb-4">All Tasks</h2>
				<div className="overflow-x-auto rounded-lg border border-border bg-card">
					<TasksTable
						tasks={filteredTasks}
						onView={handleViewTask}
						onEditGoal={handleEditGoal}
						onDeleteGoal={handleDeleteGoal}
					/>
				</div>
			</div>

			<TaskFormDialog
				open={formDialogOpen}
				onOpenChange={handleFormDialogChange}
				goal={selectedGoal}
				mode={formMode}
				onSave={handleSaveGoal}
				isSaving={isSaving}
			/>

			<TaskViewDialog
				open={viewDialogOpen}
				onOpenChange={handleViewDialogChange}
				task={selectedTask}
			/>

			<AlertDialog open={deleteDialogOpen} onOpenChange={handleDeleteDialogChange}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Goal</AlertDialogTitle>
						<AlertDialogDescription>
							Deleting this goal will remove all tasks and reset progress for users
							associated with it. This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							disabled={isSaving}
						>
							Delete Goal
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</main>
	);
};

export default TaskManagementContent;
