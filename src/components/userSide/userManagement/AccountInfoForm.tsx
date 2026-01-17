import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ProfileInfoValues {
  name: string;
  phone: string;
  email: string;
}

export interface PasswordChangeValues {
  oldPassword: string;
  newPassword: string;
}

interface AccountInfoFormProps {
  initialValues: ProfileInfoValues;
  isProfileSaving?: boolean;
  isPasswordSaving?: boolean;
  onProfileSubmit: (values: ProfileInfoValues) => Promise<void> | void;
  onPasswordSubmit: (values: PasswordChangeValues) => Promise<void> | void;
}

const AccountInfoForm = ({
  initialValues,
  onProfileSubmit,
  onPasswordSubmit,
  isProfileSaving = false,
  isPasswordSaving = false,
}: AccountInfoFormProps) => {
  const [profileValues, setProfileValues] = useState<ProfileInfoValues>(initialValues);
  const [passwordValues, setPasswordValues] = useState<PasswordChangeValues>({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setProfileValues(initialValues);
  }, [initialValues]);

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            <Label htmlFor="name" className="text-sm text-foreground">User Name</Label>
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
            <Label htmlFor="phone" className="text-sm text-foreground">Phone No.</Label>
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
            <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              className="mt-1 bg-muted border-border" 
              placeholder="e.g. user@example.com"
              value={profileValues.email}
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
