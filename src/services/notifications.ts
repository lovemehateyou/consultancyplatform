import { API_BASE_URL, parseResponse } from "./api";

export type NotificationRecord = {
	id: string;
	recipientId: string;
	type: "booking_request" | "booking_update" | "system";
	message: string;
	read: boolean;
	createdAt: string;
	updatedAt: string;
};

export type ListNotificationsResponse = {
	data: NotificationRecord[];
};

export const listNotifications = async (params: {
	recipientId: string;
	limit?: number;
	offset?: number;
	unreadOnly?: boolean;
}): Promise<ListNotificationsResponse> => {
	const query = new URLSearchParams({
		recipientId: params.recipientId,
		limit: String(params.limit ?? 50),
		offset: String(params.offset ?? 0),
		unreadOnly: String(params.unreadOnly ?? false),
	});

	const response = await fetch(`${API_BASE_URL}/notifications?${query.toString()}`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<ListNotificationsResponse>(response);
};

export const markNotificationRead = async (notificationId: string) => {
	const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
		method: "PATCH",
		credentials: "include",
	});

	return parseResponse<{ data: NotificationRecord }>(response);
};
