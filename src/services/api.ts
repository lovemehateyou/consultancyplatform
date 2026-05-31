export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "https://digital-consultancy-platform-backend-production.up.railway.app/";

type ErrorPayload = {
	message?: string;
	error?: string;
};

const buildErrorMessage = (payload: unknown, status: number): string => {
	if (!payload) {
		return `Request failed with status ${status}`;
	}

	if (typeof payload === "string") {
		return payload || `Request failed with status ${status}`;
	}

	const { message, error } = payload as ErrorPayload;
	return message || error || `Request failed with status ${status}`;
};

export const parseResponse = async <T,>(response: Response): Promise<T> => {
	const contentType = response.headers.get("content-type") ?? "";
	const isJson = contentType.includes("application/json");
	const payload = isJson ? await response.json() : await response.text();

	if (!response.ok) {
		throw new Error(buildErrorMessage(payload, response.status));
	}

	return payload as T;
};
