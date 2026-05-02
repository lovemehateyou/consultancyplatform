import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
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
  userName: "",
  phoneNumber: "",
  email: "",
  userAddress: "",
  password: "",
  ConformPassword: "",
};

const defaultBusiness: BusinessInfo = {
  BusinessName: "",
  BusinessCity: "",
  BusinessSubCity: "",
  BusinessWereda: "",
  BusinessKebele: "",
  BusinessType: "",
  Business: "",
  TIN: "",
  agreedToTerms: false,
};

const loadDraft = (): RegistrationDraft | null => {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegistrationDraft;
  } catch (error) {
    console.error("Failed to parse registration draft", error);
    return null;
  }
};

const saveDraft = (draft: RegistrationDraft) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};

const clearDraft = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(DRAFT_KEY);
};

const isPersonalComplete = (personal: PersonalInfo) => {
  return Boolean(
    personal.userName.trim() &&
      personal.phoneNumber.trim() &&
      personal.email.trim() &&
      personal.userAddress.trim() &&
      personal.password.trim() &&
      personal.ConformPassword.trim()
  );
};

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
      if (error) {
        clearError();
      }
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setNationalIdFile(file);
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

    const requiredFields: Array<keyof BusinessInfo> = [
      "BusinessName",
      "BusinessCity",
      "BusinessSubCity",
      "BusinessWereda",
      "BusinessKebele",
      "BusinessType",
      "Business",
    ];

    const missingField = requiredFields.find((field) => !business[field].toString().trim());
    if (missingField) {
      toast({
        title: "Complete your business details",
        description: "Please fill in all business information fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!business.agreedToTerms) {
      toast({
        title: "Accept the terms",
        description: "You must accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await signup({
        userName: personal.userName,
        phoneNumber: personal.phoneNumber,
        email: personal.email,
        userAddress: personal.userAddress,
        password: personal.password,
        ConformPassword: personal.ConformPassword,
        BusinessName: business.BusinessName,
        BusinessCity: business.BusinessCity,
        BusinessSubCity: business.BusinessSubCity,
        BusinessWereda: business.BusinessWereda,
        BusinessKebele: business.BusinessKebele,
        BusinessType: business.BusinessType,
        Business: business.Business,
        TIN: business.TIN,
        nationalIdFile,
        agreedToTerms: business.agreedToTerms,
      });

      toast({
        title: "Registration successful",
        description: result.message,
      });
      clearDraft();
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

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">Step 2 of 2</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Business Information
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Provide your business details to finish setting up your account.
            </p>
          </div>

          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  placeholder="Business Name"
                  value={business.BusinessName}
                  onChange={handleInputChange("BusinessName")}
                  className="h-12 text-left border-2 border-black"
                  disabled={loading}
                />

                <select
                  className="h-12 text-left text-sm text-muted-foreground border-2 border-black rounded-lg bg-transparent"
                  value={business.BusinessType}
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
                  className="h-12 text-left text-sm text-muted-foreground border-2 border-black rounded-lg bg-transparent"
                  value={business.Business}
                  onChange={handleInputChange("Business")}
                  disabled={loading}
                >
                  <option value="" disabled>Select Business Area</option>
                  <option value="Sales">Sales</option>
                  <option value="Legal Work">Legal Work</option>
                  <option value="Services">Services</option>
                  <option value="Technologies">Technologies</option>
                </select>

                <Input
                  placeholder="Tax Identification Number (TIN) - optional"
                  value={business.TIN}
                  onChange={handleInputChange("TIN")}
                  className="h-12 text-left border-2 border-black"
                  disabled={loading}
                />

                <Input
                  placeholder="City"
                  value={business.BusinessCity}
                  onChange={handleInputChange("BusinessCity")}
                  className="h-12 text-left border-2 border-black"
                  disabled={loading}
                />
                <Input
                  placeholder="Sub-city"
                  value={business.BusinessSubCity}
                  onChange={handleInputChange("BusinessSubCity")}
                  className="h-12 text-left border-2 border-black"
                  disabled={loading}
                />
                <Input
                  placeholder="Wereda"
                  value={business.BusinessWereda}
                  onChange={handleInputChange("BusinessWereda")}
                  className="h-12 text-left border-2 border-black"
                  disabled={loading}
                />
                <Input
                  placeholder="Kebele"
                  value={business.BusinessKebele}
                  onChange={handleInputChange("BusinessKebele")}
                  className="h-12 text-left border-2 border-black"
                  disabled={loading}
                />
                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center justify-center h-28 border-2 rounded-lg border-black cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={loading}
                  />
                  <span className="text-muted-foreground">
                    {nationalIdFile ? nationalIdFile.name : "National Id image"}
                  </span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={business.agreedToTerms}
                  onCheckedChange={(checked) =>
                    setBusiness((prev) => ({ ...prev, agreedToTerms: checked === true }))
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

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12"
                  onClick={handleBack}
                  disabled={loading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={loading || !business.agreedToTerms}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationBusiness;
