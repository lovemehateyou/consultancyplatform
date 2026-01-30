import { API_BASE_URL, parseResponse } from "./api";

export type CreateBookingPayload = {
	consultantId: string;
	availabilityId: string;
	notes?: string;
};

export type BookingPayment = {
	checkout_url: string;
	tx_ref: string;
	amount_charged: string;
	currency: string;
};

export type BookingRecord = {
	id: string;
	status: string;
	appointmentDate: string;
	slotStart: string;
	slotEnd: string;
	timezone: string;
	transactionId?: string | null;
	user?: {
		id: string;
		name: string;
		email?: string;
	} | null;
	consultant?: {
		id: string;
		name: string;
		email?: string;
	} | null;
};

export type CreateBookingResponse = {
	data: {
		booking: BookingRecord;
		payment: BookingPayment;
	};
};

export const createBooking = async (
	payload: CreateBookingPayload,
): Promise<CreateBookingResponse> => {
	const response = await fetch(`${API_BASE_URL}/bookings`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return parseResponse<CreateBookingResponse>(response);
};

export const verifyBookingPayment = async (txRef: string, status?: string) => {
	const params = new URLSearchParams();
	params.set("tx_ref", txRef);
	if (status) {
		params.set("status", status);
	}

	const response = await fetch(
		`${API_BASE_URL}/bookings/verify-payment?${params.toString()}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	return parseResponse<{ data: BookingRecord }>(response);
};

export const listUserBookings = async (userId: string, status?: string) => {
	const params = new URLSearchParams({ userId });
	if (status) {
		params.set("status", status);
	}
	const response = await fetch(`${API_BASE_URL}/bookings?${params.toString()}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	return parseResponse<{ data: BookingRecord[] }>(response);
};

export const listConsultantBookings = async (status?: string) => {
	const query = status ? `?status=${encodeURIComponent(status)}` : "";
	const response = await fetch(`${API_BASE_URL}/bookings/consultants/me${query}`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<{ data: BookingRecord[] }>(response);
};

export const updateBookingStatus = async (
	bookingId: string,
	status: "accepted" | "declined" | "cancelled" | "completed",
	note?: string,
) => {
	const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ status, note }),
	});

	return parseResponse<{ data: BookingRecord }>(response);
};
