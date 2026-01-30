import { ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ProfileFields = {
  name: string;
  phone: string;
  email: string;
  title: string;
  about: string;
  businessName: string;
  businessAddress: string;
  businessType: string;
  businessArea: string;
  tin: string;
  cvFile: File | null;
};

type PasswordFields = {
  oldPassword: string;
  newPassword: string;
};

interface AccountInfoFormProps {
  profileInfo: ProfileFields;
  passwordValues: PasswordFields;
  onProfileFieldChange: (field: keyof Omit<ProfileFields, "cvFile">, value: string) => void;
  onCvChange: (file: File | null) => void;
  onProfileSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onProfileReset: () => void;
  onPasswordFieldChange: (field: keyof PasswordFields, value: string) => void;
  onPasswordSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AccountInfoForm = ({
  profileInfo,
  passwordValues,
  onProfileFieldChange,
  onCvChange,
  onProfileSubmit,
  onProfileReset,
  onPasswordFieldChange,
  onPasswordSubmit,
}: AccountInfoFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCvInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onCvChange(file);
  };

  return (
    <div className="space-y-8">
      <form className="space-y-6" onSubmit={onProfileSubmit}>
        <h3 className="text-sm font-medium text-foreground">Account Information</h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm text-foreground">
              Name
            </Label>
            <Input
              id="name"
              className="mt-1 bg-muted border-border"
              value={profileInfo.name}
              onChange={(event) => onProfileFieldChange("name", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm text-foreground">
              Phone No.
            </Label>
            <Input
              id="phone"
              className="mt-1 bg-muted border-border"
              value={profileInfo.phone}
              onChange={(event) => onProfileFieldChange("phone", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="mt-1 bg-muted border-border"
              value={profileInfo.email}
              onChange={(event) => onProfileFieldChange("email", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="title" className="text-sm text-foreground">
              Professional Title
            </Label>
            <Input
              id="title"
              className="mt-1 bg-muted border-border"
              value={profileInfo.title}
              onChange={(event) => onProfileFieldChange("title", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="about" className="text-sm text-foreground">
              About Me
            </Label>
            <Textarea
              id="about"
              className="mt-1 bg-muted border-border min-h-[120px]"
              value={profileInfo.about}
              onChange={(event) => onProfileFieldChange("about", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="businessName" className="text-sm text-foreground">
              Business Name
            </Label>
            <Input
              id="businessName"
              className="mt-1 bg-muted border-border"
              value={profileInfo.businessName}
              onChange={(event) => onProfileFieldChange("businessName", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="businessAddress" className="text-sm text-foreground">
              Business Address
            </Label>
            <Input
              id="businessAddress"
              className="mt-1 bg-muted border-border"
              value={profileInfo.businessAddress}
              onChange={(event) => onProfileFieldChange("businessAddress", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="businessType" className="text-sm text-foreground">
              Business Type
            </Label>
            <Input
              id="businessType"
              className="mt-1 bg-muted border-border"
              value={profileInfo.businessType}
              onChange={(event) => onProfileFieldChange("businessType", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="businessArea" className="text-sm text-foreground">
              Business Area
            </Label>
            <Input
              id="businessArea"
              className="mt-1 bg-muted border-border"
              value={profileInfo.businessArea}
              onChange={(event) => onProfileFieldChange("businessArea", event.target.value)}
              placeholder=""
            />
          </div>

          <div>
            <Label htmlFor="tin" className="text-sm text-foreground">
              TIN
            </Label>
            <Input
              id="tin"
              className="mt-1 bg-muted border-border"
              value={profileInfo.tin}
              onChange={(event) => onProfileFieldChange("tin", event.target.value)}
              placeholder=""
            />
          </div>
        </div>

        <div>
          <Label htmlFor="cv" className="text-sm text-foreground">
            Upload CV
          </Label>
          <input
            id="cv"
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleCvInput}
            aria-label="Upload CV"
          />
          <div className="mt-1 border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              {profileInfo.cvFile ? "Replace CV" : "Upload CV"}
            </Button>
            <p className="text-xs text-muted-foreground">
              {profileInfo.cvFile ? profileInfo.cvFile.name : "PDF or DOC up to 5MB"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Profile
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10"
            onClick={onProfileReset}
          >
            Cancel
          </Button>
        </div>
      </form>

      <form className="space-y-4" onSubmit={onPasswordSubmit}>
        <h3 className="text-sm font-medium text-foreground">Change Password</h3>

        <div>
          <Label htmlFor="oldPassword" className="text-sm text-muted-foreground">
            Old Password
          </Label>
          <Input
            id="oldPassword"
            type="password"
            className="mt-1 bg-muted border-border"
            value={passwordValues.oldPassword}
            onChange={(event) => onPasswordFieldChange("oldPassword", event.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="newPassword" className="text-sm text-muted-foreground">
            New Password
          </Label>
          
          <Input
            id="newPassword"
            type="password"
            className="mt-1 bg-muted border-border"
            value={passwordValues.newPassword}
            onChange={(event) => onPasswordFieldChange("newPassword", event.target.value)}
          />
        </div>

        <Button type="submit" className="bg-primery text-secondary-foreground hover:bg-secondary/90">
          Save Password
        </Button>
      </form>
    </div>
  );
};

export default AccountInfoForm;
