import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { BUSINESS_AREAS, BUSINESS_TYPES } from "@/constants/businessOptions";

interface RegistrationFormProps {
  onSubmit?: (data: RegistrationData) => void;
  title?: string;
  subtitle?: string;
}

interface RegistrationData {
  userName: string;
  phoneNumber: string;
  email: string;
  userAddress: string;
  BusinessName: string;
  BusinessCity: string;
  BusinessSubCity: string;
  BusinessWereda: string;
  BusinessKebele: string;
  BusinessType: string;
  Business: string;
  TIN: string;
  password: string;
  nationalIdFile: File | null;
  agreedToTerms: boolean;
}

const RegistrationForm = ({ 
  onSubmit, 
  title = "Create Free Consultant Account",
  subtitle = "Meri gives you the blocks and components you need to create a truly professional Business."
}: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationData>({
    userName: "",
    phoneNumber: "",
    email: "",
    userAddress: "",
    BusinessName: "",
    BusinessCity: "",
    BusinessSubCity: "",
    BusinessWereda: "",
    BusinessKebele: "",
    BusinessType: "",
    Business: "",
    TIN: "",
    password: "",
    nationalIdFile: null,
    agreedToTerms: false,
  });
  const { signup, loading, error, clearError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signup({
        ...formData,
        role: "consultant",
        ConformPassword: formData.password,
      });
      toast({
        title: "Registration successful",
        description: result.message,
      });
      onSubmit?.(formData);
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

  const handleFileChange = (field: "nationalIdFile") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
    if (error) {
      clearError();
    }
  };

  const handleInputChange = (field: keyof RegistrationData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      if (error) {
        clearError();
      }
    };

  return (
    <div className="w-full max-w-3xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={formData.userName}
              onChange={handleInputChange("userName")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Phone number"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange("phoneNumber")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="User Address"
              value={formData.userAddress}
              onChange={handleInputChange("userAddress")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Create Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Business Name"
              value={formData.BusinessName}
              onChange={handleInputChange("BusinessName")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="City"
              value={formData.BusinessCity}
              onChange={handleInputChange("BusinessCity")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Sub-city"
              value={formData.BusinessSubCity}
              onChange={handleInputChange("BusinessSubCity")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Wereda"
              value={formData.BusinessWereda}
              onChange={handleInputChange("BusinessWereda")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Kebele"
              value={formData.BusinessKebele}
              onChange={handleInputChange("BusinessKebele")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <Input
              placeholder="Tax Identification Number (TIN)"
              value={formData.TIN}
              onChange={handleInputChange("TIN")}
              className="h-12 text-center border-border"
              disabled={loading}
            />
            <select
              className="h-12 text-center text-sm text-muted-foreground border-border rounded-lg bg-transparent"
              value={formData.BusinessType}
              onChange={handleInputChange("BusinessType")}
              aria-label="Business type"
              disabled={loading}
            >
              <option value="" disabled>Select Business Type</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              className="h-12 text-center text-sm text-muted-foreground border-border rounded-lg bg-transparent"
              value={formData.Business}
              onChange={handleInputChange("Business")}
              aria-label="Business area"
              disabled={loading}
            >
              <option value="" disabled>Select Business Area</option>
              {BUSINESS_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

          </div>

          {/* File Upload Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center justify-center h-28 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
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
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, agreedToTerms: checked === true }))
              }
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

export default RegistrationForm;
