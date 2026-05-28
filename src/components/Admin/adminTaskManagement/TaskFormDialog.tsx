import { useEffect, useMemo, useState } from "react";
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
import { Plus, Trash2 } from "lucide-react";
import type { CreateGoalPayload, Goal } from "@/services/goals";
import { BUSINESS_AREAS, BUSINESS_TYPES } from "@/constants/businessOptions";

export interface Task {
	id: number;
	goalId: number;
	title: string;
	description?: string | null;
	stepOrder: number;
	mapLinks?: MapLinkDraft[];
	goalTitle: string;
	goalCategory: string;
	goalBusinessArea?: string | null;
	goalBusinessType?: string | null;
	goalDescription?: string | null;
}

type MapLinkDraft = {
	city: string;
	subCity: string;
	url: string;
};

type TaskDraft = {
	id?: number;
	title: string;
	description: string;
	stepOrder: number;
	mapLinks: MapLinkDraft[];
};

interface TaskFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	goal?: Goal | null;
	mode: "add" | "edit";
	onSave: (payload: CreateGoalPayload) => void;
	isSaving?: boolean;
}

const TaskFormDialog = ({
	open,
	onOpenChange,
	goal,
	mode,
	onSave,
	isSaving = false,
}: TaskFormDialogProps) => {
	const [goalTitle, setGoalTitle] = useState("");
	const [goalCategory, setGoalCategory] = useState("");
	const [goalDescription, setGoalDescription] = useState("");
	const [goalBusinessArea, setGoalBusinessArea] = useState("");
	const [goalBusinessType, setGoalBusinessType] = useState("");
	const [tasks, setTasks] = useState<TaskDraft[]>([
		{ title: "", description: "", stepOrder: 1, mapLinks: [] },
	]);

	useEffect(() => {
		if (!open) return;
		if (mode === "edit" && goal) {
			setGoalTitle(goal.title ?? "");
			setGoalCategory(goal.category ?? "");
			setGoalDescription(goal.description ?? "");
			setGoalBusinessArea(goal.businessArea ?? "");
			setGoalBusinessType(goal.businessType ?? "");
			const orderedTasks = [...(goal.Tasks ?? [])].sort(
				(a, b) => a.stepOrder - b.stepOrder,
			);
			setTasks(
				orderedTasks.length
					? orderedTasks.map((task) => ({
							id: task.id,
							title: task.title,
							description: task.description ?? "",
							stepOrder: task.stepOrder,
							mapLinks: (task.mapLinks ?? []).map((link) => ({
								city: link.city ?? "",
								subCity: link.subCity ?? "",
								url: link.url ?? "",
							})),
						}))
					: [{ title: "", description: "", stepOrder: 1, mapLinks: [] }],
			);
			return;
		}

		setGoalTitle("");
		setGoalCategory("");
		setGoalDescription("");
		setGoalBusinessArea("");
		setGoalBusinessType("");
		setTasks([{ title: "", description: "", stepOrder: 1, mapLinks: [] }]);
	}, [open, goal, mode]);

	const hasValidTask = useMemo(
		() => tasks.some((task) => task.title.trim().length > 0),
		[tasks],
	);
	const hasBusinessTarget =
		goalBusinessArea.trim().length > 0 || goalBusinessType.trim().length > 0;
	const canSave =
		goalTitle.trim().length > 0 &&
		goalCategory.trim().length > 0 &&
		hasBusinessTarget &&
		hasValidTask;

	const handleTaskChange = (
		index: number,
		field: keyof TaskDraft,
		value: string,
	) => {
		setTasks((prev) =>
			prev.map((task, i) =>
				i === index
					? {
							...task,
							[field]:
								field === "stepOrder"
									? Math.max(1, Number(value) || 1)
									: value,
						}
					: task,
			),
		);
	};

	const handleAddTask = () => {
		setTasks((prev) => [
			...prev,
			{ title: "", description: "", stepOrder: prev.length + 1, mapLinks: [] },
		]);
	};

	const handleRemoveTask = (index: number) => {
		setTasks((prev) => prev.filter((_, i) => i !== index));
	};

	const handleMapLinkChange = (
		taskIndex: number,
		linkIndex: number,
		field: keyof MapLinkDraft,
		value: string,
	) => {
		setTasks((prev) =>
			prev.map((task, idx) => {
				if (idx !== taskIndex) return task;
				const mapLinks = task.mapLinks.map((link, mapIndex) =>
					mapIndex === linkIndex ? { ...link, [field]: value } : link,
				);
				return { ...task, mapLinks };
			}),
		);
	};

	const handleAddMapLink = (taskIndex: number) => {
		setTasks((prev) =>
			prev.map((task, idx) =>
				idx === taskIndex
					? {
							...task,
							mapLinks: [...task.mapLinks, { city: "", subCity: "", url: "" }],
						}
					: task,
				),
		);
	};

	const handleRemoveMapLink = (taskIndex: number, linkIndex: number) => {
		setTasks((prev) =>
			prev.map((task, idx) =>
				idx === taskIndex
					? {
							...task,
							mapLinks: task.mapLinks.filter((_, i) => i !== linkIndex),
						}
					: task,
				),
		);
	};

	const handleSave = () => {
		const normalizedTasks = tasks
			.map((task, index) => ({
				id: task.id,
				title: task.title.trim(),
				description: task.description.trim() || undefined,
				stepOrder: Number.isFinite(task.stepOrder)
					? task.stepOrder
					: index + 1,
				mapLinks: task.mapLinks
					.map((link) => ({
						city: link.city.trim() || undefined,
						subCity: link.subCity.trim(),
						url: link.url.trim(),
					}))
					.filter((link) => link.subCity && link.url),
			}))
			.filter((task) => task.title.length > 0);

		const payload: CreateGoalPayload = {
			title: goalTitle.trim(),
			category: goalCategory.trim(),
			businessArea: goalBusinessArea.trim() || undefined,
			businessType: goalBusinessType.trim() || undefined,
			description: goalDescription.trim() || undefined,
			tasks: normalizedTasks,
		};

		onSave(payload);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>
						{mode === "edit" ? "Edit Goal and Tasks" : "Create Goal and Tasks"}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 py-4">
					<div className="space-y-2">
						<Label htmlFor="goal-title">Goal Title</Label>
						<Input
							id="goal-title"
							placeholder="e.g., Business Registration"
							value={goalTitle}
							onChange={(event) => setGoalTitle(event.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="goal-category">Goal Category</Label>
						<Input
							id="goal-category"
							placeholder="e.g., Compliance"
							value={goalCategory}
							onChange={(event) => setGoalCategory(event.target.value)}
						/>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="goal-business-area">Business Area</Label>
							<select
								id="goal-business-area"
								value={goalBusinessArea}
								onChange={(event) => setGoalBusinessArea(event.target.value)}
								className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
								aria-label="Goal business area"
							>
								<option value="">All areas</option>
								{BUSINESS_AREAS.map((area) => (
									<option key={area} value={area}>
										{area}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="goal-business-type">Business Type</Label>
							<select
								id="goal-business-type"
								value={goalBusinessType}
								onChange={(event) => setGoalBusinessType(event.target.value)}
								className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
								aria-label="Goal business type"
							>
								<option value="">All types</option>
								{BUSINESS_TYPES.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
						</div>
						<p className="text-xs text-muted-foreground md:col-span-2">
							Provide at least one: business area or business type.
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="goal-description">Goal Description</Label>
						<Textarea
							id="goal-description"
							placeholder="Optional goal overview"
							value={goalDescription}
							onChange={(event) => setGoalDescription(event.target.value)}
						/>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Label>Tasks</Label>
							<Button type="button" variant="outline" size="sm" onClick={handleAddTask}>
								<Plus className="w-4 h-4 mr-2" />
								Add Task
							</Button>
						</div>

						<div className="space-y-4">
							{tasks.map((task, index) => (
								<div
									key={`task-${index}`}
									className="rounded-md border border-border p-4 space-y-4"
								>
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-foreground">
											Task {index + 1}
										</span>
										{tasks.length > 1 && (
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => handleRemoveTask(index)}
											>
												<Trash2 className="w-4 h-4 mr-1 text-destructive" />
												Remove
											</Button>
										)}
									</div>

									<div className="grid gap-4">
										<div className="space-y-2">
											<Label htmlFor={`task-title-${index}`}>Task Title</Label>
											<Input
												id={`task-title-${index}`}
												placeholder="e.g., Submit application"
												value={task.title}
												onChange={(event) =>
													handleTaskChange(index, "title", event.target.value)
												}
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor={`task-step-${index}`}>Step Order</Label>
											<Input
												id={`task-step-${index}`}
												type="number"
												min={1}
												value={task.stepOrder}
												onChange={(event) =>
													handleTaskChange(index, "stepOrder", event.target.value)
												}
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor={`task-description-${index}`}>Task Description</Label>
											<Textarea
												id={`task-description-${index}`}
												placeholder="Optional task details"
												value={task.description}
												onChange={(event) =>
													handleTaskChange(index, "description", event.target.value)
												}
											/>
										</div>

										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<Label>Map Links</Label>
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => handleAddMapLink(index)}
												>
													<Plus className="w-4 h-4 mr-2" />
													Add Location
												</Button>
											</div>

											{task.mapLinks.length === 0 ? (
												<p className="text-xs text-muted-foreground">
													No locations added yet.
												</p>
											) : (
												<div className="space-y-3">
													{task.mapLinks.map((link, linkIndex) => (
														<div
															key={`map-link-${index}-${linkIndex}`}
															className="rounded-md border border-border p-3 space-y-3"
														>
															<div className="flex items-center justify-between">
																<span className="text-xs font-semibold text-muted-foreground">
																	Location {linkIndex + 1}
																</span>
																<Button
																	type="button"
																	variant="ghost"
																	size="sm"
																	onClick={() => handleRemoveMapLink(index, linkIndex)}
																>
																	<Trash2 className="w-4 h-4 mr-1 text-destructive" />
																	Remove
																</Button>
															</div>
															<div className="grid gap-3 md:grid-cols-3">
																<div className="space-y-2">
																	<Label htmlFor={`map-city-${index}-${linkIndex}`}>City</Label>
																	<Input
																		id={`map-city-${index}-${linkIndex}`}
																		placeholder="e.g., Addis Ababa"
																		value={link.city}
																		onChange={(event) =>
																			handleMapLinkChange(index, linkIndex, "city", event.target.value)
																		}
																	/>
																</div>
																<div className="space-y-2">
																	<Label htmlFor={`map-subcity-${index}-${linkIndex}`}>Sub-city</Label>
																	<Input
																		id={`map-subcity-${index}-${linkIndex}`}
																		placeholder="e.g., Bole"
																		value={link.subCity}
																		onChange={(event) =>
																			handleMapLinkChange(index, linkIndex, "subCity", event.target.value)
																		}
																	/>
																</div>
																<div className="space-y-2">
																	<Label htmlFor={`map-url-${index}-${linkIndex}`}>Google Maps Link</Label>
																	<Input
																		id={`map-url-${index}-${linkIndex}`}
																		placeholder="https://maps.google.com/..."
																		value={link.url}
																		onChange={(event) =>
																			handleMapLinkChange(index, linkIndex, "url", event.target.value)
																		}
																	/>
																</div>
															</div>
														</div>
													))}
												</div>
											)}
										</div>
									</div>
								</div>
							))}
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
						disabled={!canSave || isSaving}
					>
						{isSaving
							? "Saving..."
							: mode === "edit"
								? "Save Changes"
								: "Create Goal"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TaskFormDialog;
