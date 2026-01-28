import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";

import {
	signup as signupRequest,
	login as loginRequest,
	logout as logoutRequest,
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
	clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
				// TODO: add profile fetch once endpoint is available
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

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			loading,
			error,
			signup: handleSignup,
			login: handleLogin,
			logout: handleLogout,
			clearError,
		}),
		[user, loading, error, handleSignup, handleLogin, handleLogout, clearError],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
