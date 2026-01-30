import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";

import {
	signup as signupRequest,
	login as loginRequest,
	logout as logoutRequest,
	getUserInfoFromCookie,
	type AuthUser,
	type SignupPayload,
	type SignupResponse,
	type LoginPayload,
} from "../services/auth.ts";

interface AuthContextValue {
	user: AuthUser | null;
	loading: boolean;
	error: string | null;
	signup: (payload: SignupPayload) => Promise<SignupResponse>;
	login: (payload: LoginPayload) => Promise<void>;
	logout: () => Promise<void>;
	setUser: (user: AuthUser | null) => void;
	clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const parseUserInfoCookie = (): Partial<AuthUser> | null => {
	if (typeof document === "undefined") return null;
	const segment = document.cookie
		.split("; ")
		.find((row) => row.startsWith("userInfo="));
	if (!segment) return null;

	const raw = segment.split("=")[1];
	if (!raw) return null;

	try {
		let decoded = decodeURIComponent(raw);
		if (decoded.startsWith("j:")) {
			decoded = decoded.slice(2);
		}
		return JSON.parse(decoded) as Partial<AuthUser>;
	} catch (error) {
		console.error("Failed to parse userInfo cookie", error);
		return null;
	}
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const cookieUser = parseUserInfoCookie();
		if (cookieUser) {
			setUser((prev) => ({ ...prev, ...cookieUser } as AuthUser));
		}
	}, []);

	const withAsyncState = useCallback(
		async <T,>(handler: () => Promise<T>): Promise<T> => {
			setLoading(true);
			setError(null);
			try {
				return await handler();
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Unexpected error. Please try again.";
				setError(message);
				throw err instanceof Error ? err : new Error(message);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	const handleSignup = useCallback(
		(payload: SignupPayload) =>
			withAsyncState(async () => {
				const result = await signupRequest(payload);
				setUser(result.user ?? null);
				return result;
			}),
		[withAsyncState],
	);

	const handleLogin = useCallback(
		(payload: LoginPayload) =>
			withAsyncState(async () => {
				await loginRequest(payload);
				const nextUser = getUserInfoFromCookie();
				setUser(nextUser);
			}),
		[withAsyncState],
	);

	const handleLogout = useCallback(
		() =>
			withAsyncState(async () => {
				await logoutRequest();
				setUser(null);
			}),
		[withAsyncState],
	);

	const clearError = useCallback(() => setError(null), []);

	const hydrateFromCookie = useCallback(() => {
		const cookieUser = getUserInfoFromCookie();
		if (cookieUser) {
			setUser(cookieUser);
		}
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			loading,
			error,
			signup: handleSignup,
			login: handleLogin,
			logout: handleLogout,
			setUser,
			clearError,
		}),
		[user, loading, error, handleSignup, handleLogin, handleLogout, clearError],
	);

	useEffect(() => {
		hydrateFromCookie();
	}, [hydrateFromCookie]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
