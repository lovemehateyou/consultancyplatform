import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

    const requiredFields: Array<keyof PersonalInfo> = [
      "userName",
      "phoneNumber",
      "email",
      "userAddress",
      "password",
      "ConformPassword",
    ];

    const missingField = requiredFields.find((field) => !personal[field]?.trim());
    if (missingField) {
      toast({
        title: "Complete your details",
        description: "Please fill in all personal information fields before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (personal.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (personal.password !== personal.ConformPassword) {
      toast({
        title: "Password mismatch",
        description: "Please confirm your password correctly.",
        variant: "destructive",
      });
      return;
    }

    saveDraft({ personal, business });
    navigate("/userregistration/business");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">Step 1 of 2</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Personal Information
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Tell us about yourself before we set up your business profile.
            </p>
          </div>

          <Card className="p-6 md:p-8">
            <form onSubmit={handleNext} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  placeholder="Full Name"
                  value={personal.userName}
                  onChange={handleInputChange("userName")}
                  className="h-12 text-left border-2 border-black"
                />
                <Input
                  placeholder="Phone number"
                  type="tel"
                  value={personal.phoneNumber}
                  onChange={handleInputChange("phoneNumber")}
                  className="h-12 text-left border-2 border-black"
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={personal.email}
                  onChange={handleInputChange("email")}
                  className="h-12 text-left border-2 border-black"
                />
                <Input
                  placeholder="User Address"
                  value={personal.userAddress}
                  onChange={handleInputChange("userAddress")}
                  className="h-12 text-left border-2 border-black"
                />
                <Input
                  placeholder="Create Password"
                  type="password"
                  value={personal.password}
                  onChange={handleInputChange("password")}
                  className="h-12 text-left border-2 border-black"
                />
                <Input
                  placeholder="Conform Password"
                  type="password"
                  value={personal.ConformPassword}
                  onChange={handleInputChange("ConformPassword")}
                  className="h-12 text-left border-2 border-black"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Next: Business Information
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationPersonal;
