const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:5000/api";
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

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

const parseResponse = async <T,>(response: Response): Promise<T> => {
	const contentType = response.headers.get("content-type") ?? "";
	const isJson = contentType.includes("application/json");
	const payload = isJson ? await response.json() : await response.text();

	if (!response.ok) {
		throw new Error(buildErrorMessage(payload, response.status));
	}

	return payload as T;
};

export interface AuthUser {
	id: string;
	name: string;
	email: string;
	role: "user" | "consultant" | "admin";
	phone?: string | null;
	businessName?: string | null;
	businessAddress?: string | null;
	businessType?: string | null;
	businessArea?: string | null;
	tin?: string | null;
	cv?: string | null;
	nationalIdDocument?: string | null;
	agreedToTerms?: boolean;
	profileImage?: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface SignupPayload {
	userName: string;
	email: string;
	password: string;
	ConformPassword: string;
	role?: "user" | "consultant" | "admin";
	phoneNumber: string;
	BusinessName: string;
	BusinessAddress: string;
	BusinessType: string;
	Business: string;
	TIN?: string;
	nationalIdFile?: File | null;
	agreedToTerms: boolean;
}

export interface SignupResponse {
	message: string;
	user: AuthUser;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	message: string;
}

export interface LogoutResponse {
	message: string;
}

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
	const formData = new FormData();

	formData.append("userName", payload.userName.trim());
	formData.append("email", payload.email.trim());
	formData.append("password", payload.password);
	formData.append("ConformPassword", payload.ConformPassword);
	formData.append("phoneNumber", payload.phoneNumber.trim());
	formData.append("BusinessName", payload.BusinessName.trim());
	formData.append("BusinessAddress", payload.BusinessAddress.trim());
	formData.append("BusinessType", payload.BusinessType);
	formData.append("Business", payload.Business);
	if (payload.TIN?.trim()) {
    formData.append("TIN", payload.TIN.trim());
  }
	formData.append("agreedToTerms", String(payload.agreedToTerms));
    
	if (payload.role) {
		formData.append("role", payload.role);
	}

	if (payload.nationalIdFile) {
		formData.append("nationalIdFile", payload.nationalIdFile);
	}

	const response = await fetch(`${AUTH_BASE_URL}/signup`, {
		method: "POST",
		body: formData,
		credentials: "include",
	});

	return parseResponse<SignupResponse>(response);
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
	const response = await fetch(`${AUTH_BASE_URL}/login`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return parseResponse<LoginResponse>(response);
};

export const logout = async (): Promise<LogoutResponse> => {
	const response = await fetch(`${AUTH_BASE_URL}/logout`, {
		method: "POST",
		credentials: "include",
	});

	return parseResponse<LogoutResponse>(response);
};
