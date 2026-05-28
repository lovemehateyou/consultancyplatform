import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BUSINESS_AREAS, BUSINESS_TYPES } from "@/constants/businessOptions";

export interface ProfileInfoValues {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  businessCity: string;
  businessSubCity: string;
  businessWereda: string;
  businessKebele: string;
  businessType: string;
  businessArea: string;
  tin: string;
}

export interface PasswordChangeValues {
  oldPassword: string;
  newPassword: string;
}

interface AccountInfoFormProps {
  initialValues: ProfileInfoValues;
  isProfileSaving?: boolean;
  isPasswordSaving?: boolean;
  disableEmail?: boolean;
  onProfileSubmit: (values: ProfileInfoValues) => Promise<void> | void;
  onPasswordSubmit: (values: PasswordChangeValues) => Promise<void> | void;
}

const AccountInfoForm = ({
  initialValues,
  onProfileSubmit,
  onPasswordSubmit,
  isProfileSaving = false,
  isPasswordSaving = false,
  disableEmail = false,
}: AccountInfoFormProps) => {
  const [profileValues, setProfileValues] = useState<ProfileInfoValues>(initialValues);
  const [passwordValues, setPasswordValues] = useState<PasswordChangeValues>({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setProfileValues(initialValues);
  }, [initialValues]);

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProfileValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onProfileSubmit(profileValues);
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onPasswordSubmit(passwordValues);
    setPasswordValues({ oldPassword: "", newPassword: "" });
  };

  const resetProfile = () => {
    setProfileValues(initialValues);
  };

  const resetPassword = () => {
    setPasswordValues({ oldPassword: "", newPassword: "" });
  };

  const isPasswordDisabled =
    isPasswordSaving || !passwordValues.oldPassword || !passwordValues.newPassword;

  return (
    <div className="space-y-10">
      <form className="space-y-6" onSubmit={handleProfileSubmit}>
        <h3 className="text-sm font-medium text-foreground">Account Information</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm text-foreground font-bold">User Name</Label>
            <Input 
              id="name"
              name="name"
              className="mt-1 bg-muted border-border" 
              placeholder="e.g. Jane Doe"
              value={profileValues.name}
              onChange={handleProfileChange}
              disabled={isProfileSaving}
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-sm text-foreground font-bold">Phone No.</Label>
            <Input 
              id="phone" 
              name="phone"
              type="tel"
              className="mt-1 bg-muted border-border" 
              placeholder="e.g. +234 800 000 0000"
              value={profileValues.phone}
              onChange={handleProfileChange}
              disabled={isProfileSaving}
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm text-foreground font-bold">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              className="mt-1 bg-muted border-border" 
              placeholder="e.g. user@example.com"
              value={profileValues.email}
              onChange={handleProfileChange}
              disabled={isProfileSaving || disableEmail}
            />
          </div>

          <div>
            <Label htmlFor="businessName" className="text-sm text-foreground font-bold">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              className="mt-1 bg-muted border-border"
              placeholder="e.g. Acme Corp"
              value={profileValues.businessName}
              onChange={handleProfileChange}
              disabled={isProfileSaving}
            />
          </div>

          <div>
            <Label htmlFor="businessCity" className="text-sm text-foreground font-bold">Business City</Label>
            <Input
              id="businessCity"
              name="businessCity"
              className="mt-1 bg-muted border-border"
              placeholder="e.g. Addis Ababa"
              value={profileValues.businessCity}
              onChange={handleProfileChange}
              disabled={isProfileSaving}
            />
          </div>

          <div>
            <Label htmlFor="businessSubCity" className="text-sm text-foreground font-bold">Business Sub-city</Label>
            <Input
              id="businessSubCity"
              name="businessSubCity"
              className="mt-1 bg-muted border-border"
              placeholder="e.g. Bole"
              value={profileValues.businessSubCity}
              onChange={handleProfileChange}
              disabled={isProfileSaving}
            />
          </div>

          <div>
            <Label htmlFor="businessWereda" className="text-sm text-foreground font-bold">Business Wereda</Label>
            <Input
              id="businessWereda"
              name="businessWereda"
              className="mt-1 bg-muted border-border"
              placeholder="e.g. 04"
              value={profileValues.businessWereda}
              onChange={handleProfileChange}
              disabled={isProfileSaving}
            />
          </div>

          <div>
            <Label htmlFor="businessKebele" className="text-sm text-foreground font-bold">Business Kebele</Label>
            <Input
              id="businessKebele"
              name="businessKebele"
              className="mt-1 bg-muted border-border"
              placeholder="e.g. 12"
              value={profileValues.businessKebele}
              onChange={handleProfileChange}
              disabled={isProfileSaving}
            />
          </div>

          <div>
            <Label htmlFor="businessType" className="text-sm text-foreground font-bold">Business Type</Label>
            <select
              id="businessType"
              name="businessType"
              className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-foreground"
              value={profileValues.businessType}
              onChange={handleProfileChange}
              aria-label="Business type"
              disabled={isProfileSaving}
            >
              <option value="">Select Business Type</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="businessArea" className="text-sm text-foreground font-bold">Business Area</Label>
            <select
              id="businessArea"
              name="businessArea"
              className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-foreground"
              value={profileValues.businessArea}
              onChange={handleProfileChange}
              aria-label="Business area"
              disabled={isProfileSaving}
            >
              <option value="">Select Business Area</option>
              {BUSINESS_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="tin" className="text-sm text-foreground font-bold">TIN</Label>
            <Input
              id="tin"
              name="tin"
              className="mt-1 bg-muted border-border"
              placeholder="e.g. 1234567890"
              value={profileValues.tin}
              onChange={handleProfileChange}
              disabled={isProfileSaving}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-primary-foreground"
            disabled={isProfileSaving}
          >
            {isProfileSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10"
            onClick={resetProfile}
            disabled={isProfileSaving}
          >
            Cancel
          </Button>
        </div>
      </form>

      <form className="space-y-6" onSubmit={handlePasswordSubmit}>
        <h3 className="text-sm font-medium text-foreground">Change Password</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="oldPassword" className="text-sm text-muted-foreground">Old Password</Label>
            <Input 
              id="oldPassword" 
              name="oldPassword"
              type="password"
              className="mt-1 bg-muted border-border" 
              value={passwordValues.oldPassword}
              onChange={handlePasswordChange}
              disabled={isPasswordSaving}
            />
          </div>
          
          <div>
            <Label htmlFor="newPassword" className="text-sm text-muted-foreground">New Password</Label>
            <Input 
              id="newPassword" 
              name="newPassword"
              type="password"
              className="mt-1 bg-muted border-border" 
              value={passwordValues.newPassword}
              onChange={handlePasswordChange}
              disabled={isPasswordSaving}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-primary-foreground"
            disabled={isPasswordDisabled}
          >
            {isPasswordSaving ? "Updating..." : "Update Password"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-border text-foreground hover:bg-muted"
            onClick={resetPassword}
            disabled={isPasswordSaving}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfoForm;
