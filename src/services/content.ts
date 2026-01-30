import { API_BASE_URL, parseResponse } from "./api";

export type ContentItem = {
	id: string;
	title: string;
	description?: string | null;
	category: string;
	fileUrl?: string | null;
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
};

export type CreateContentResponse = {
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

	const response = await fetch(`${API_BASE_URL}/content`, {
		method: "POST",
		credentials: "include",
		body: formData,
	});

	return parseResponse<CreateContentResponse>(response);
};
