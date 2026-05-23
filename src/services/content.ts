import { API_BASE_URL, parseResponse } from "./api";

export type ContentItem = {
	id: string;
	title: string;
	description?: string | null;
	category: string;
	fileUrl?: string | null;
	imageUrl?: string | null;
	contentType: "file" | "article";
	createdAt: string;
	updatedAt: string;
};

export const listContent = async (params?: {
	category?: string;
	search?: string;
}): Promise<ContentItem[]> => {
	const query = new URLSearchParams();
	if (params?.category) query.set("category", params.category);
	if (params?.search) query.set("search", params.search);

	const suffix = query.toString();
	const response = await fetch(`${API_BASE_URL}/content${suffix ? `?${suffix}` : ""}` , {
		method: "GET",
		credentials: "include",
	});

	return parseResponse<ContentItem[]>(response);
};

export type CreateContentPayload = {
	title: string;
	category: string;
	contentType: "file" | "article";
	description?: string;
	file?: File | null;
	image?: File | null;
};

export type CreateContentResponse = {
	message: string;
	content: ContentItem;
};

export type UpdateContentPayload = {
	title?: string;
	category?: string;
	description?: string;
	file?: File | null;
	image?: File | null;
};

export type UpdateContentResponse = {
	message: string;
	content: ContentItem;
};

export const createContent = async (
	payload: CreateContentPayload,
): Promise<CreateContentResponse> => {
	const formData = new FormData();
	formData.append("title", payload.title);
	formData.append("category", payload.category);
	formData.append("contentType", payload.contentType);

	if (payload.description) {
		formData.append("description", payload.description);
	}

	if (payload.file) {
		formData.append("file", payload.file);
	}

	if (payload.image) {
		formData.append("image", payload.image);
	}

	const response = await fetch(`${API_BASE_URL}/content`, {
		method: "POST",
		credentials: "include",
		body: formData,
	});

	return parseResponse<CreateContentResponse>(response);
};

export const updateContent = async (
	contentId: string,
	payload: UpdateContentPayload,
): Promise<UpdateContentResponse> => {
	const formData = new FormData();

	if (payload.title !== undefined) {
		formData.append("title", payload.title);
	}

	if (payload.category !== undefined) {
		formData.append("category", payload.category);
	}

	if (payload.description !== undefined) {
		formData.append("description", payload.description);
	}

	if (payload.file) {
		formData.append("file", payload.file);
	}

	if (payload.image) {
		formData.append("image", payload.image);
	}

	const response = await fetch(`${API_BASE_URL}/content/${contentId}`, {
		method: "PUT",
		credentials: "include",
		body: formData,
	});

	return parseResponse<UpdateContentResponse>(response);
};

export const deleteContent = async (contentId: string): Promise<{ message: string }> => {
	const response = await fetch(`${API_BASE_URL}/content/${contentId}`, {
		method: "DELETE",
		credentials: "include",
	});

	return parseResponse<{ message: string }>(response);
};
