import { API_BASE_URL, parseResponse } from "./api";
import type { BookingRecord } from "./bookings";

export type AdminBookingsResponse = {
	data: BookingRecord[];
};

export const listAdminBookings = async (params?: {
	userId?: string;
	consultantId?: string;
	status?: string;
}): Promise<AdminBookingsResponse> => {
	const query = new URLSearchParams();
	if (params?.userId) query.set("userId", params.userId);
	if (params?.consultantId) query.set("consultantId", params.consultantId);
	if (params?.status) query.set("status", params.status);

	const suffix = query.toString();
	const response = await fetch(
		`${API_BASE_URL}/admin/bookings${suffix ? `?${suffix}` : ""}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	return parseResponse<AdminBookingsResponse>(response);
};
