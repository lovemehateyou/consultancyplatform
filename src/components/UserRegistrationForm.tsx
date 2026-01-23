import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

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

const userRegistrationForm = ({ 
  onSubmit, 
  title = "Create Free Consultant Account",
  subtitle = "Meri gives you the blocks and components you need to create a truly professional Business."
}: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationData>({
    userName: "",
    phoneNumber: "",
    email: "",
    BusinessName: "",
    Business:"",
    BusinessAddress: "",
    BusinessType: "",
    TIN: "",
    password: "",
    ConformPassword: "",
    nationalIdFile: null,
    agreedToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleFileChange = (field: "nationalIdFile") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
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
              placeholder="User Name"
              value={formData.userName}
              onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
              className="h-12 text-left border-2 border-black"
            />
            <Input
              placeholder="Phone number"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="h-12 text-left  border-2 border-black"
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="h-12 text-left border-2 border-black"
            />
            <Input
              placeholder="Business Name"
              value={formData.BusinessName}
              onChange={(e) => setFormData(prev => ({ ...prev, BusinessName: e.target.value }))}
              className="h-12 text-left border-2 border-black"
            />
             <Input
              placeholder="Business Address"
              value={formData.BusinessAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, BusinessAddress: e.target.value }))}
              className="h-12 text-left border-2 border-black"
            />
             <Input
              placeholder="Tax Identification Number (TIN)"
              value={formData.TIN}
              onChange={(e) => setFormData(prev => ({ ...prev, TIN: e.target.value }))}
              className="h-12 text-left border-2 border-black"
            />
             <select
              className="h-12 text-left text-sm text-muted-foreground border-2 border-black rounded-lg bg-transparent"
              value={formData.BusinessType}
              onChange={(e) => setFormData(prev => ({ ...prev, BusinessType: e.target.value }))}
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
              onChange={(e) => setFormData(prev => ({ ...prev, Business: e.target.value }))}
            >
              <option value="" disabled>Select Business Form </option>
              <option value="Sole Proprietorship">Sales</option>
              <option value="Partnership">Legal Work</option>
              <option value="Corporation">Services</option>
              <option value="LLC">Technologies</option>
            </select>

            
            <Input
              placeholder="Create Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="h-12 text-left border-2 border-black"
            />

            <Input
              placeholder="Conform Password"
              type="password"
              value={formData.ConformPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="h-12 text-left border-2 border-black"
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
            />
            <label htmlFor="terms" className="text-sm text-foreground">
              I agree with the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms & Conditions
              </a>{" "}
              of Clarity
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Sign Up
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground">
            have an account?{" "}
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
