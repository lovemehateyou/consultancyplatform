import { API_BASE_URL, parseResponse } from "./api";

export type AvailabilitySlot = {
	id: string;
	consultantId: string;
	slotStart: string;
	slotEnd: string;
	timezone: string;
	status: "open" | "pending" | "booked" | "archived";
	meta?: Record<string, unknown> | null;
};

export type CreateAvailabilityPayload = {
	slotStart: string;
	slotEnd: string;
	timezone?: string;
	meta?: Record<string, unknown> | null;
};

export type UpdateAvailabilityPayload = Partial<CreateAvailabilityPayload> & {
	status?: AvailabilitySlot["status"];
};

export const listAvailability = async (consultantId: string) => {
	const response = await fetch(
		`${API_BASE_URL}/availability/consultants/${consultantId}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	return parseResponse<{ data: AvailabilitySlot[] }>(response);
};

export const listMyAvailability = async () => {
	const response = await fetch(`${API_BASE_URL}/availability/me`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<{ data: AvailabilitySlot[] }>(response);
};

export const createAvailability = async (payload: CreateAvailabilityPayload) => {
	const response = await fetch(`${API_BASE_URL}/availability/me`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return parseResponse<{ data: AvailabilitySlot }>(response);
};

export const updateAvailability = async (
	availabilityId: string,
	payload: UpdateAvailabilityPayload,
) => {
	const response = await fetch(`${API_BASE_URL}/availability/${availabilityId}`, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return parseResponse<{ data: AvailabilitySlot }>(response);
};
