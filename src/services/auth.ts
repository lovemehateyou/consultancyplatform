import Cookies from "js-cookie";
import { API_BASE_URL, parseResponse } from "./api";

const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

export interface AuthUser {
	id: string;
	name: string;
	email?: string;
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
	TIN: string;
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

export const getUserInfoFromCookie = (): AuthUser | null => {
	if (typeof window === "undefined") return null;

	let value = Cookies.get("userInfo");
	if (!value) return null;

	try {
		if (value.startsWith("j:")) {
			value = value.slice(2);
		}
		const parsed = JSON.parse(value);
		return parsed ?? null;
	} catch (error) {
		console.error("Failed to parse userInfo cookie", error);
		return null;
	}
};

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
	formData.append("TIN", payload.TIN.trim());
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
