import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfo {
  userName: string;
  phoneNumber: string;
  email: string;
  userAddress: string;
  password: string;
  ConformPassword: string;
}

interface BusinessInfo {
  BusinessName: string;
  BusinessCity: string;
  BusinessSubCity: string;
  BusinessWereda: string;
  BusinessKebele: string;
  BusinessType: string;
  Business: string;
  TIN: string;
  agreedToTerms: boolean;
}

interface RegistrationDraft {
  personal: PersonalInfo;
  business: BusinessInfo;
}

const DRAFT_KEY = "user-registration-draft";

const defaultPersonal: PersonalInfo = {
  userName: "", phoneNumber: "", email: "", userAddress: "", password: "", ConformPassword: "",
};

const defaultBusiness: BusinessInfo = {
  BusinessName: "", BusinessCity: "", BusinessSubCity: "", BusinessWereda: "",
  BusinessKebele: "", BusinessType: "", Business: "", TIN: "", agreedToTerms: false,
};

const loadDraft = (): RegistrationDraft | null => {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as RegistrationDraft; } catch { return null; }
};

const saveDraft = (draft: RegistrationDraft) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};

const Stepper = ({ step }: { step: 1 | 2 }) => (
  <div className="flex items-center gap-3">
    {[1, 2].map((n) => (
      <div key={n} className="flex items-center gap-3">
        <div className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-colors ${
          step >= n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}>{n}</div>
        <span className={`text-sm ${step === n ? "font-medium text-foreground" : "text-muted-foreground"}`}>
          {n === 1 ? "Personal" : "Business"}
        </span>
        {n === 1 && <div className="h-px w-8 bg-border" />}
      </div>
    ))}
  </div>
);

const inputClass = "h-11 bg-card";

const UserRegistrationPersonal = () => {
  const [personal, setPersonal] = useState<PersonalInfo>(defaultPersonal);
  const [business, setBusiness] = useState<BusinessInfo>(defaultBusiness);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setPersonal({ ...defaultPersonal, ...draft.personal });
      setBusiness({ ...defaultBusiness, ...draft.business });
    }
  }, []);

  const handleInputChange = (field: keyof PersonalInfo) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setPersonal((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleNext = (event: FormEvent) => {
    event.preventDefault();
    const required: Array<keyof PersonalInfo> = [
      "userName", "phoneNumber", "email", "userAddress", "password", "ConformPassword",
    ];
    const missing = required.find((f) => !personal[f]?.trim());
    if (missing) {
      toast({ title: "Complete your details", description: "Please fill in all fields before continuing.", variant: "destructive" });
      return;
    }
    if (personal.password.length < 8) {
      toast({ title: "Password too short", description: "Password must be at least 8 characters long.", variant: "destructive" });
      return;
    }
    if (personal.password !== personal.ConformPassword) {
      toast({ title: "Password mismatch", description: "Please confirm your password correctly.", variant: "destructive" });
      return;
    }
    saveDraft({ personal, business });
    navigate("/userregistration/business");
  };

  return (
    <AuthLayout
      brandHeadline="A few quick steps to get started."
      brandSubcopy="Step 1: tell us about yourself. Step 2: tell us about your business."
    >
      <div className="space-y-8">
        <Stepper step={1} />
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Personal information</h1>
          <p className="text-sm text-muted-foreground">Tell us about yourself before we set up your business profile.</p>
        </div>

        <form onSubmit={handleNext} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="userName">Full name</Label>
              <Input id="userName" className={inputClass} value={personal.userName} onChange={handleInputChange("userName")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input id="phoneNumber" type="tel" className={inputClass} value={personal.phoneNumber} onChange={handleInputChange("phoneNumber")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" className={inputClass} value={personal.email} onChange={handleInputChange("email")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="userAddress">Address</Label>
              <Input id="userAddress" className={inputClass} value={personal.userAddress} onChange={handleInputChange("userAddress")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className={inputClass} value={personal.password} onChange={handleInputChange("password")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ConformPassword">Confirm password</Label>
              <Input id="ConformPassword" type="password" className={inputClass} value={personal.ConformPassword} onChange={handleInputChange("ConformPassword")} />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-medium shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all">
            Continue to business info
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default UserRegistrationPersonal;
