import { API_BASE_URL, parseResponse } from "./api";

export type GoalTaskMapLink = {
	url: string;
	city?: string | null;
	subCity: string;
};

export type GoalTask = {
	id: number;
	goalId: number;
	title: string;
	description?: string | null;
	stepOrder: number;
	mapLinks?: GoalTaskMapLink[];
	createdAt?: string;
	updatedAt?: string;
};

export type GoalTaskInput = {
	id?: number;
	title: string;
	description?: string | null;
	stepOrder: number;
	mapLinks?: GoalTaskMapLink[];
};

export type Goal = {
	id: number;
	title: string;
	description?: string | null;
	category: string;
	businessArea?: string | null;
	businessType?: string | null;
	Tasks?: GoalTask[];
	createdAt?: string;
	updatedAt?: string;
};

export type UserTaskProgress = {
	id: number;
	userGoalId: number;
	taskId: number;
	isCompleted: boolean;
	completedAt?: string | null;
	Task?: GoalTask;
};

export type UserGoal = {
	id: number;
	userId?: string;
	goalId: number;
	progress: number;
	status: string;
	Goal?: Goal;
	UserTaskProgresses?: UserTaskProgress[];
	UserTaskProgress?: UserTaskProgress[];
	createdAt?: string;
	updatedAt?: string;
};

export type GoalListResponse = {
	message: string;
	goals: Goal[];
};

export type CreateGoalPayload = {
	title: string;
	category: string;
	businessArea?: string | null;
	businessType?: string | null;
	description?: string | null;
	tasks?: GoalTaskInput[];
};

export type UpdateGoalPayload = CreateGoalPayload;

export type CreateGoalResponse = {
	message: string;
	goal: Goal;
};

export type UpdateGoalResponse = {
	message: string;
	goal: Goal;
};

export type CompleteTaskPayload = {
	userGoalId: number;
	taskId: number;
};

export type CompleteTaskResponse = {
	message: string;
	result?: unknown;
};

export type StartGoalPayload = {
	goalId: number;
};

export type StartGoalResponse = {
	message: string;
	userGoal?: UserGoal;
};

export const listGoals = async (): Promise<GoalListResponse> => {
	const response = await fetch(`${API_BASE_URL}/goals`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<GoalListResponse>(response);
};

export const createGoal = async (
	payload: CreateGoalPayload,
): Promise<CreateGoalResponse> => {
	const response = await fetch(`${API_BASE_URL}/goals`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return parseResponse<CreateGoalResponse>(response);
};

export const updateGoal = async (
	goalId: number,
	payload: UpdateGoalPayload,
): Promise<UpdateGoalResponse> => {
	const response = await fetch(`${API_BASE_URL}/goals/${goalId}`, {
		method: "PUT",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return parseResponse<UpdateGoalResponse>(response);
};

export const deleteGoal = async (goalId: number): Promise<{ message: string }> => {
	const response = await fetch(`${API_BASE_URL}/goals/${goalId}`, {
		method: "DELETE",
		credentials: "include",
	});

	return parseResponse<{ message: string }>(response);
};

export const listMyGoals = async (): Promise<UserGoal[]> => {
	const response = await fetch(`${API_BASE_URL}/goals/my-goals`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<UserGoal[]>(response);
};

export const completeTask = async (
	payload: CompleteTaskPayload,
): Promise<CompleteTaskResponse> => {
	const response = await fetch(`${API_BASE_URL}/goals/complete-task`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return parseResponse<CompleteTaskResponse>(response);
};

export const startGoal = async (goalId: number): Promise<StartGoalResponse> => {
	const response = await fetch(`${API_BASE_URL}/goals/start`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ goalId } satisfies StartGoalPayload),
	});

	return parseResponse<StartGoalResponse>(response);
};
