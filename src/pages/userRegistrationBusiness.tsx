import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/hooks/use-toast";
import { BUSINESS_AREAS, BUSINESS_TYPES } from "@/constants/businessOptions";

import {EthiopiaLocationSelects} from "@/components/cities_data/City_selectors";

interface PersonalInfo {
  userName: string; phoneNumber: string; email: string; userAddress: string;
  password: string; ConformPassword: string;
}

interface BusinessInfo {
  BusinessName: string; BusinessCity: string; BusinessSubCity: string;
  BusinessWereda: string; BusinessKebele: string; BusinessType: string;
  Business: string; TIN: string; agreedToTerms: boolean;
}

interface RegistrationDraft { personal: PersonalInfo; business: BusinessInfo; }

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

const clearDraft = () => { if (typeof window !== "undefined") sessionStorage.removeItem(DRAFT_KEY); };

const isPersonalComplete = (p: PersonalInfo) =>
  Boolean(p.userName.trim() && p.phoneNumber.trim() && p.email.trim() &&
    p.userAddress.trim() && p.password.trim() && p.ConformPassword.trim());

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
const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const UserRegistrationBusiness = () => {
  const [personal, setPersonal] = useState<PersonalInfo>(defaultPersonal);
  const [business, setBusiness] = useState<BusinessInfo>(defaultBusiness);
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
  const { signup, loading, error, clearError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const draft = loadDraft();
    if (!draft || !isPersonalComplete(draft.personal)) {
      navigate("/userregistration", { replace: true });
      return;
    }
    setPersonal({ ...defaultPersonal, ...draft.personal });
    setBusiness({ ...defaultBusiness, ...draft.business });
  }, [navigate]);

  const handleInputChange = (field: keyof BusinessInfo) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setBusiness((prev) => ({ ...prev, [field]: event.target.value }));
      if (error) clearError();
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNationalIdFile(event.target.files?.[0] ?? null);
  };

  const handleBack = () => {
    saveDraft({ personal, business });
    navigate("/userregistration");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isPersonalComplete(personal)) {
      navigate("/userregistration", { replace: true });
      return;
    }
    const required: Array<keyof BusinessInfo> = [
      "BusinessName", "BusinessCity", "BusinessSubCity", "BusinessWereda",
      "BusinessKebele", "BusinessType", "Business",
    ];
    const missing = required.find((f) => !business[f].toString().trim());
    if (missing) {
      toast({ title: "Complete your business details", description: "Please fill in all business fields.", variant: "destructive" });
      return;
    }
    if (!business.agreedToTerms) {
      toast({ title: "Accept the terms", description: "You must accept the terms to continue.", variant: "destructive" });
      return;
    }
    try {
      const result = await signup({
        ...personal, ...business,
        nationalIdFile,
      });
      toast({ title: "Registration successful", description: result.message });
      clearDraft();
      navigate("/login", { replace: true });
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Unable to complete registration. Please try again.";
      toast({ title: "Registration failed", description: message, variant: "destructive" });
    }
  };

  return (
    <AuthLayout
      brandHeadline="Almost there — tell us about your business."
      brandSubcopy="This helps us connect you with the right consultants and resources."
    >
      <div className="space-y-8">
        <Stepper step={2} />
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Business information</h1>
          <p className="text-sm text-muted-foreground">Provide your business details to finish setting up your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="BusinessName">Business name</Label>
              <Input id="BusinessName" className={inputClass} value={business.BusinessName} onChange={handleInputChange("BusinessName")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="TIN">Tax ID (TIN) — optional</Label>
              <Input id="TIN" className={inputClass} value={business.TIN} onChange={handleInputChange("TIN")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="BusinessType">Business type</Label>
              <select id="BusinessType" className={selectClass} value={business.BusinessType} onChange={handleInputChange("BusinessType")} disabled={loading}>
                <option value="" disabled>Select business type</option>
                {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="Business">Business area</Label>
              <select id="Business" className={selectClass} value={business.Business} onChange={handleInputChange("Business")} disabled={loading}>
                <option value="" disabled>Select business area</option>
                {BUSINESS_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <EthiopiaLocationSelects
              city={business.BusinessCity}
              subCity={business.BusinessSubCity}
              onCityChange={(city) => setBusiness((prev) => ({ ...prev, BusinessCity: city }))}
              onSubCityChange={(subCity) => setBusiness((prev) => ({ ...prev, BusinessSubCity: subCity }))}
              disabled={loading}
            />
            <div className="space-y-1.5">
              <Label htmlFor="BusinessWereda">Wereda</Label>
              <Input id="BusinessWereda" className={inputClass} value={business.BusinessWereda} onChange={handleInputChange("BusinessWereda")} disabled={loading} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="BusinessKebele">Kebele</Label>
              <Input id="BusinessKebele" className={inputClass} value={business.BusinessKebele} onChange={handleInputChange("BusinessKebele")} disabled={loading} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>National ID image</Label>
            <label className="flex flex-col items-center justify-center h-28 border border-dashed border-border rounded-lg cursor-pointer bg-card hover:bg-muted/40 transition-colors">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={loading} />
              <span className="text-sm text-muted-foreground">
                {nationalIdFile ? nationalIdFile.name : "Click to upload your National ID"}
              </span>
              <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={business.agreedToTerms}
              onCheckedChange={(checked) => setBusiness((prev) => ({ ...prev, agreedToTerms: checked === true }))}
              disabled={loading} />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree with the{" "}
              <a href="#" className="font-medium text-primary hover:underline">Terms & Conditions</a> of Meri
            </label>
          </div>

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button type="button" variant="outline" className="h-12 sm:w-auto" onClick={handleBack} disabled={loading}>
              Back
            </Button>
            <Button type="submit"
              className="flex-1 h-12 text-base font-medium shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all"
              disabled={loading || !business.agreedToTerms}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default UserRegistrationBusiness;
