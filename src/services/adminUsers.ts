import { API_BASE_URL, parseResponse } from "./api";

export type AdminUser = {
	id: string;
	name?: string | null;
	email: string;
	role: "user" | "consultant" | "admin";
	phone?: string | null;
	createdAt: string;
	updatedAt: string;
	profileImage?: string | null;
};

export type AdminUserListResponse = {
	data: AdminUser[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export const listAdminUsers = async (params?: {
	role?: string;
	search?: string;
	page?: number;
	limit?: number;
}): Promise<AdminUserListResponse> => {
	const query = new URLSearchParams();
	if (params?.role) query.set("role", params.role);
	if (params?.search) query.set("search", params.search);
	if (params?.page) query.set("page", String(params.page));
	if (params?.limit) query.set("limit", String(params.limit));

	const response = await fetch(`${API_BASE_URL}/admin/users?${query.toString()}`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<AdminUserListResponse>(response);
};

export const updateAdminUserRole = async (
	userId: string,
	role: AdminUser["role"],
): Promise<AdminUser> => {
	const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ role }),
	});

	return parseResponse<AdminUser>(response);
};
