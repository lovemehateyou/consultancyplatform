import { API_BASE_URL, parseResponse } from "./api";

export type ReviewerSummary = {
	id: string;
	name: string;
	businessName?: string | null;
	businessType?: string | null;
	businessArea?: string | null;
	profileImage?: string | null;
};

export type ReviewRecord = {
	id: string;
	userId: string;
	consultantId: string;
	rating: number;
	review: string;
	createdAt: string;
	reviewer?: ReviewerSummary | null;
};

export type ReviewsListResponse = {
	data: ReviewRecord[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export type ReviewSummary = {
	averageRating: number;
	reviewCount: number;
};

export const createReview = async (payload: {
	consultantId: string;
	rating: number;
	review: string;
}) => {
	const response = await fetch(`${API_BASE_URL}/reviews`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return parseResponse<{ data: ReviewRecord }>(response);
};

export const listConsultantReviews = async (
	consultantId: string,
	params?: { page?: number; limit?: number },
) => {
	const query = new URLSearchParams({ consultantId });
	if (params?.page) query.set("page", String(params.page));
	if (params?.limit) query.set("limit", String(params.limit));

	const response = await fetch(`${API_BASE_URL}/reviews?${query.toString()}`, {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<ReviewsListResponse>(response);
};

export const listMyReviews = async (params?: {
	consultantId?: string;
	page?: number;
	limit?: number;
}) => {
	const query = new URLSearchParams();
	if (params?.consultantId) query.set("consultantId", params.consultantId);
	if (params?.page) query.set("page", String(params.page));
	if (params?.limit) query.set("limit", String(params.limit));

	const suffix = query.toString();
	const response = await fetch(`${API_BASE_URL}/reviews/me${suffix ? `?${suffix}` : ""}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	return parseResponse<ReviewsListResponse>(response);
};

export const deleteReview = async (reviewId: string) => {
	const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
		method: "DELETE",
		credentials: "include",
	});

	return parseResponse<{ data: ReviewRecord }>(response);
};

export const getConsultantRatingSummary = async (consultantId: string) => {
	const response = await fetch(
		`${API_BASE_URL}/reviews/consultants/${consultantId}/summary`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	return parseResponse<ReviewSummary>(response);
};
