import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { getUserInfoFromCookie } from "@/services/auth";

interface LoginFormProps {
  onSubmit?: (data: LoginData) => void;
  title?: string;
  subtitle?: string;
}

interface LoginData {
  email: string;
  password: string;
}

type UserRole = "user" | "consultant" | "admin";

const ROLE_REDIRECTS: Record<UserRole, string> = {
  user: "/userDashboard",
  consultant: "/consultantDashboard",
  admin: "/admin/usermanagement",
};

const extractRoleFromCookie = (): UserRole | null => {
  const cookieUser = getUserInfoFromCookie();
  return (cookieUser?.role as UserRole) ?? null;
};

const LoginForm = ({
  onSubmit,
  title = "Welcome back",
  subtitle = "Log in to your Meri account to continue.",
}: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, user, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(formData);
      onSubmit?.(formData);

      const resolvedRole = loggedInUser?.role;
      const destination = (resolvedRole && ROLE_REDIRECTS[resolvedRole]) || "/";
      console.log("Login successful, redirecting to:", destination);

      toast({ title: "Welcome back", description: "You have been logged in successfully." });
      navigate(destination, { replace: true });
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Unable to log you in. Please try again.";
      toast({ title: "Login failed", description: message, variant: "destructive" });
    }
  };

  const handleInputChange =
    (field: keyof LoginData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (error) clearError();
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  return (
    <div className="mx-auto md:w-1/2 space-y-8 px-4 py-28 sm:px-10">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">Email address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleInputChange("email")}
              disabled={loading}
              className="h-12 pl-10 bg-card"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-foreground">Password</Label>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange("password")}
              disabled={loading}
              className="h-12 pl-10 pr-10 bg-card"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium shadow-sm shadow-primary/20 transition-all hover:shadow-md hover:shadow-primary/30"
          disabled={loading}
        >
          {loading ? "Signing you in..." : "Log in"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/userregistration" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
