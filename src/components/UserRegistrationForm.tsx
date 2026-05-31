import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  userAddress: string;
  BusinessName: string;
  Business: string;
  BusinessCity: string;
  BusinessSubCity: string;
  BusinessWereda: string;
  BusinessKebele: string;
  BusinessType: string;
  TIN: string;
  password: string;
  ConformPassword: string;
  nationalIdFile: File | null;
  agreedToTerms: boolean;
}

const createInitialFormState = (): RegistrationData => ({
  userName: "",
  phoneNumber: "",
  email: "",
  userAddress: "",
  BusinessName: "",
  Business: "",
  BusinessCity: "",
  BusinessSubCity: "",
  BusinessWereda: "",
  BusinessKebele: "",
  BusinessType: "",
  TIN: "",
  password: "",
  ConformPassword: "",
  nationalIdFile: null,
  agreedToTerms: false,
});

const inputClass = "h-11 bg-card";
const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const UserRegistrationForm = ({
  onSubmit,
  title = "Create your account",
  subtitle = "Get started with Meri in just a few minutes.",
}: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationData>(() => createInitialFormState());
  const { signup, loading, error, clearError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateField = <K extends keyof RegistrationData>(field: K, value: RegistrationData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signup(formData);
      toast({ title: "Registration successful", description: result.message });
      onSubmit?.(formData);
      setFormData(createInitialFormState());
      navigate("/login", { replace: true });
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to complete registration. Please try again.";
      toast({ title: "Registration failed", description: message, variant: "destructive" });
    }
  };

  const handleInputChange =
    <K extends keyof RegistrationData>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      updateField(field, e.target.value as RegistrationData[K]);
    };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateField("nationalIdFile", file);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Personal information</h2>
            <p className="text-xs text-muted-foreground">Tell us who you are.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="userName">Full name</Label>
              <Input id="userName" placeholder="Jane Doe" className={inputClass}
                value={formData.userName} onChange={handleInputChange("userName")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input id="phoneNumber" type="tel" placeholder="+251 9..." className={inputClass}
                value={formData.phoneNumber} onChange={handleInputChange("phoneNumber")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@company.com" className={inputClass}
                value={formData.email} onChange={handleInputChange("email")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="userAddress">Address</Label>
              <Input id="userAddress" placeholder="Street, city" className={inputClass}
                value={formData.userAddress} onChange={handleInputChange("userAddress")} disabled={loading} />
            </div>
          </div>
        </section>

        {/* Business */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Business information</h2>
            <p className="text-xs text-muted-foreground">Where you do business.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="BusinessName">Business name</Label>
              <Input id="BusinessName" className={inputClass}
                value={formData.BusinessName} onChange={handleInputChange("BusinessName")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="TIN">Tax ID (TIN) — optional</Label>
              <Input id="TIN" className={inputClass}
                value={formData.TIN} onChange={handleInputChange("TIN")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="BusinessType">Business type</Label>
              <select id="BusinessType" className={selectClass} value={formData.BusinessType}
                onChange={handleInputChange("BusinessType")} disabled={loading}>
                <option value="" disabled>Select business type</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Corporation">Corporation</option>
                <option value="LLC">LLC</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="Business">Business area</Label>
              <select id="Business" className={selectClass} value={formData.Business}
                onChange={handleInputChange("Business")} disabled={loading}>
                <option value="" disabled>Select business area</option>
                <option value="Sales">Sales</option>
                <option value="Legal Work">Legal Work</option>
                <option value="Services">Services</option>
                <option value="Technologies">Technologies</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="BusinessCity">City</Label>
              <Input id="BusinessCity" className={inputClass}
                value={formData.BusinessCity} onChange={handleInputChange("BusinessCity")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="BusinessSubCity">Sub-city</Label>
              <Input id="BusinessSubCity" className={inputClass}
                value={formData.BusinessSubCity} onChange={handleInputChange("BusinessSubCity")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="BusinessWereda">Wereda</Label>
              <Input id="BusinessWereda" className={inputClass}
                value={formData.BusinessWereda} onChange={handleInputChange("BusinessWereda")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="BusinessKebele">Kebele</Label>
              <Input id="BusinessKebele" className={inputClass}
                value={formData.BusinessKebele} onChange={handleInputChange("BusinessKebele")} disabled={loading} />
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Security</h2>
            <p className="text-xs text-muted-foreground">Create a strong password.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className={inputClass}
                value={formData.password} onChange={handleInputChange("password")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ConformPassword">Confirm password</Label>
              <Input id="ConformPassword" type="password" className={inputClass}
                value={formData.ConformPassword} onChange={handleInputChange("ConformPassword")} disabled={loading} />
            </div>
          </div>
        </section>

        {/* National ID */}
        <section className="space-y-2">
          <Label>National ID image</Label>
          <label className="flex flex-col items-center justify-center h-28 border border-dashed border-border rounded-lg cursor-pointer bg-card hover:bg-muted/40 transition-colors">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={loading} />
            <span className="text-sm text-muted-foreground">
              {formData.nationalIdFile ? formData.nationalIdFile.name : "Click to upload your National ID"}
            </span>
            <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
          </label>
        </section>

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={formData.agreedToTerms}
            onCheckedChange={(checked) => updateField("agreedToTerms", checked === true)} disabled={loading} />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree with the{" "}
            <a href="#" className="font-medium text-primary hover:underline">Terms & Conditions</a> of Meri
          </label>
        </div>

        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>
        )}

        <Button type="submit"
          className="w-full h-12 text-base font-medium shadow-sm shadow-primary/20 transition-all hover:shadow-md hover:shadow-primary/30"
          disabled={loading || !formData.agreedToTerms}>
          {loading ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
