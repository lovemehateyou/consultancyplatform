import { useState } from "react";
/* import ProfileKPICards from "./ProfileKPICards"; */
import AccountInfoForm, { type PasswordChangeValues, type ProfileInfoValues } from "./AccountInfoForm";
import ProfileCard from "./ProfileCard";
import { Separator } from "@/components/ui/separator";

interface ProfileState {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  avatarUrl?: string;
}

const initialProfile: ProfileState = {
  name: "Adewale Doe",
  phone: "+234 800 000 0000",
  email: "user@example.com",
  businessName: "Doe Consulting",
};

const ProfileContent = () => {
  const [profile, setProfile] = useState<ProfileState>(initialProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);

  const handleAvatarChange = (file: File | null, previewUrl?: string) => {
    setAvatarFile(file);
    setProfile((prev) => ({
      ...prev,
      avatarUrl: previewUrl ?? (file ? prev.avatarUrl : undefined),
    }));
  };

  const persistProfile = async (formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Profile payload ready for backend:", Object.fromEntries(formData.entries()));
  };

  const persistPasswordChange = async (formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Password payload ready for backend:", Object.fromEntries(formData.entries()));
  };

  const handleProfileSubmit = async (values: ProfileInfoValues) => {
    setIsProfileSaving(true);
    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("phone", values.phone);
    payload.append("email", values.email);
    payload.append("businessName", values.businessName);
    if (avatarFile) payload.append("avatar", avatarFile);

    try {
      await persistProfile(payload);
      setProfile((prev) => ({
        ...prev,
        name: values.name,
        phone: values.phone,
        email: values.email,
        businessName: values.businessName,
      }));
      setAvatarFile(null);
    } finally {
      setIsProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (values: PasswordChangeValues) => {
    setIsPasswordSaving(true);
    const payload = new FormData();
    payload.append("oldPassword", values.oldPassword);
    payload.append("newPassword", values.newPassword);

    try {
      await persistPasswordChange(payload);
    } finally {
      setIsPasswordSaving(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">User Profile</h1>
      
      {/* <ProfileKPICards /> */}
      
      <div className="mt-8 flex gap-8">
        <div className="flex-1 max-w-md">
          <AccountInfoForm
            initialValues={profile}
            onProfileSubmit={handleProfileSubmit}
            onPasswordSubmit={handlePasswordSubmit}
            isProfileSaving={isProfileSaving}
            isPasswordSaving={isPasswordSaving}
          />
        </div>
        
        <Separator orientation="vertical" className="h-auto" />
        
        <div className="flex-1 flex justify-center pt-8">
          <ProfileCard profile={profile} onAvatarSelect={handleAvatarChange} />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
