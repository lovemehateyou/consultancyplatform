import { API_BASE_URL, parseResponse } from "./api";
import type { AuthUser } from "./auth";

export type UpdateProfilePayload = {
	name?: string;
	phone?: string;
	businessName?: string;
	businessCity?: string;
	businessSubCity?: string;
	businessWereda?: string;
	businessKebele?: string;
	businessType?: string;
	businessArea?: string;
	tin?: string;
	profileImage?: File | null;
};

export type UpdateProfileResponse = {
	message: string;
	user: AuthUser;
};

export type GetProfileResponse = {
	user: AuthUser;
};

export type ConsultantSummary = {
	id: string;
	name: string;
	email: string;
	profileImage?: string | null;
	phone?: string | null;
	businessName?: string | null;
	businessCity?: string | null;
	businessSubCity?: string | null;
	businessWereda?: string | null;
	businessKebele?: string | null;
	businessType?: string | null;
	businessArea?: string | null;
	tin?: string | null;
};

export const getProfile = async (): Promise<GetProfileResponse> => {
	const response = await fetch(`${API_BASE_URL}/users/profile`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<GetProfileResponse>(response);
};

export const updateProfile = async (
	payload: UpdateProfilePayload,
): Promise<UpdateProfileResponse> => {
	const formData = new FormData();

	if (payload.name !== undefined) formData.append("name", payload.name);
	if (payload.phone !== undefined) formData.append("phone", payload.phone);
	if (payload.businessName !== undefined) formData.append("businessName", payload.businessName);
	if (payload.businessCity !== undefined)
		formData.append("businessCity", payload.businessCity);
	if (payload.businessSubCity !== undefined)
		formData.append("businessSubCity", payload.businessSubCity);
	if (payload.businessWereda !== undefined)
		formData.append("businessWereda", payload.businessWereda);
	if (payload.businessKebele !== undefined)
		formData.append("businessKebele", payload.businessKebele);
	if (payload.businessType !== undefined) formData.append("businessType", payload.businessType);
	if (payload.businessArea !== undefined) formData.append("businessArea", payload.businessArea);
	if (payload.tin !== undefined) formData.append("tin", payload.tin);
	if (payload.profileImage) formData.append("profileImage", payload.profileImage);

	const response = await fetch(`${API_BASE_URL}/users/profile`, {
		method: "PATCH",
		credentials: "include",
		body: formData,
	});

	return parseResponse<UpdateProfileResponse>(response);
};

export const listConsultants = async (search?: string) => {
	const query = search ? `?search=${encodeURIComponent(search)}` : "";
	const response = await fetch(`${API_BASE_URL}/users/consultants${query}`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<{ data: ConsultantSummary[] }>(response);
};

export const getConsultant = async (consultantId: string) => {
	const response = await fetch(`${API_BASE_URL}/users/consultants/${consultantId}`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<{ data: ConsultantSummary }>(response);
};
