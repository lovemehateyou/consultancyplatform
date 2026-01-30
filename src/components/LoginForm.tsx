import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { getUserInfoFromCookie } from "@/services/auth";

interface RegistrationFormProps {
  onSubmit?: (data: RegistrationData) => void;
  title?: string;
  subtitle?: string;
}

interface RegistrationData {
  email: string;
  password: string;
}

type UserRole = "user" | "consultant" | "admin";

const ROLE_REDIRECTS: Record<UserRole, string> = {
  user: "/userDashboard",
  consultant: "/consultantDashboard",
  admin: "/adminDashboard",
};

const extractRoleFromCookie = (): UserRole | null => {
  const cookieUser = getUserInfoFromCookie();
  return (cookieUser?.role as UserRole) ?? null;
};

const LoginForm = ({ 
  onSubmit, 
  title = "Create Free Consultant Account",
  subtitle = "Meri gives you the blocks and components you need to create a truly professional Business."
}: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationData>({
    email: "",
    password: "",
  });
  const { login, user, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      onSubmit?.(formData);

      const resolvedRole = user?.role ?? extractRoleFromCookie();
      const destination = (resolvedRole && ROLE_REDIRECTS[resolvedRole]) || "/";

      toast({
        title: "Welcome back",
        description: "You have been logged in successfully.",
      });

      navigate(destination, { replace: true });
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to log you in. Please try again.";
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof RegistrationData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (error) {
        clearError();
      }
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };
  return (
    <div className=" flex flex-col w-full h-[100vh] justify-center my-auto max-w-3xl mx-auto ">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {subtitle}
        </p>
      </div>

      <Card className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Text Inputs Grid */}
          <div className="grid grid-cols-1 gap-4">
            <Input
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={loading}
          >
            {loading ? "Signing you in..." : "Log In"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/userregistration" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
