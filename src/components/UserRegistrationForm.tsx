import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";

interface RegistrationFormProps {
  onSubmit?: (data: RegistrationData) => void;
  title?: string;
  subtitle?: string;
}

interface RegistrationData {
  userName: string;
  phoneNumber: string;
  email: string;
  BusinessName: string;
  Business:string;
  BusinessAddress: string;
  BusinessType: string;
  TIN: string;
  password: string;
  ConformPassword:string;
  nationalIdFile: File | null;
  agreedToTerms: boolean;
}

const createInitialFormState = (): RegistrationData => ({
  userName: "",
  phoneNumber: "",
  email: "",
  BusinessName: "",
  Business: "",
  BusinessAddress: "",
  BusinessType: "",
  TIN: "",
  password: "",
  ConformPassword: "",
  nationalIdFile: null,
  agreedToTerms: false,
});

const userRegistrationForm = ({ 
  onSubmit, 
  title = "Create Free Consultant Account",
  subtitle = "Meri gives you the blocks and components you need to create a truly professional Business."
}: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationData>(() => createInitialFormState());
  const { signup, loading, error, clearError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateField = <K extends keyof RegistrationData>(field: K, value: RegistrationData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signup(formData);
      toast({
        title: "Registration successful",
        description: result.message,
      });
      onSubmit?.(formData);
      setFormData(createInitialFormState());
      navigate("/login", { replace: true });
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to complete registration. Please try again.";
      toast({
        title: "Registration failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = <K extends keyof RegistrationData>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      updateField(field, e.target.value as RegistrationData[K]);
    };

  const handleFileChange = (field: "nationalIdFile") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateField(field, file);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Full Name"
              value={formData.userName}
              onChange={handleInputChange("userName")}
              className="h-12 text-left border-2 border-black"
              disabled={loading}
            />
            <Input
              placeholder="Phone number"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange("phoneNumber")}
              className="h-12 text-left  border-2 border-black"
              disabled={loading}
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              className="h-12 text-left border-2 border-black"
              disabled={loading}
            />
            <Input
              placeholder="Business Name"
              value={formData.BusinessName}
              onChange={handleInputChange("BusinessName")}
              className="h-12 text-left border-2 border-black"
              disabled={loading}
            />
             <Input
              placeholder="Business Address"
              value={formData.BusinessAddress}
              onChange={handleInputChange("BusinessAddress")}
              className="h-12 text-left border-2 border-black"
              disabled={loading}
            />
             <Input
              placeholder="Tax Identification Number (TIN)"
              value={formData.TIN}
              onChange={handleInputChange("TIN")}
              className="h-12 text-left border-2 border-black"
              disabled={loading}
            />
             <select
              className="h-12 text-left text-sm text-muted-foreground border-2 border-black rounded-lg bg-transparent"
              value={formData.BusinessType}
              onChange={handleInputChange("BusinessType")}
              disabled={loading}
            >
              <option value="" disabled>Select Business Type</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Partnership">Partnership</option>
              <option value="Corporation">Corporation</option>
              <option value="LLC">LLC</option>
            </select>

            <select
              className="h-12 text-left text-sm text-muted-foreground border-2 border-black rounded-lg bg-transparent "
              value={formData.Business}
              onChange={handleInputChange("Business")}
              disabled={loading}
            >
              <option value="" disabled>Select Business Area </option>
              <option value="Sales">Sales</option>
              <option value="Legal Work">Legal Work</option>
              <option value="Services">Services</option>
              <option value="Technologies">Technologies</option>
            </select>

            
            <Input
              placeholder="Create Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              className="h-12 text-left border-2 border-black"
              disabled={loading}
            />

            <Input
              placeholder="Conform Password"
              type="password"
              value={formData.ConformPassword}
              onChange={handleInputChange("ConformPassword")}
              className="h-12 text-left border-2 border-black"
              disabled={loading}
            />
          </div>

          {/* File Upload Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center justify-center h-28 border-2 rounded-lg border-black ounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange("nationalIdFile")}
                className="hidden"
                disabled={loading}
              />
              <span className="text-muted-foreground">
                {formData.nationalIdFile ? formData.nationalIdFile.name : "National Id image"}
              </span>
            </label>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreedToTerms}
              onCheckedChange={(checked) => updateField("agreedToTerms", checked === true)}
              disabled={loading}
            />
            <label htmlFor="terms" className="text-sm text-foreground">
              I agree with the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms & Conditions
              </a>{" "}
              of Meri
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={loading || !formData.agreedToTerms}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground">
            Have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default userRegistrationForm;
