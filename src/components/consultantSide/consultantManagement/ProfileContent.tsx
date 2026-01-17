import { useEffect, useState } from "react";
import ProfileKPICards from "./ProfileKPICards";
import AccountInfoForm from "./AccountInfoForm";
import ProfileCard from "./ProfileCard";
import { Separator } from "@/components/ui/separator";

type ProfileInfo = {
  name: string;
  phone: string;
  email: string;
  title: string;
  about: string;
  cvFile: File | null;
};

type PasswordValues = {
  oldPassword: string;
  newPassword: string;
};

const initialProfileState: ProfileInfo = {
  name: "",
  phone: "",
  email: "",
  title: "",
  about: "",
  cvFile: null,
};

const initialPasswordState: PasswordValues = {
  oldPassword: "",
  newPassword: "",
};

const postFormData = async (endpoint: string, formData: FormData) => {
  // TODO: Replace with real fetch when backend is available
  console.info(`Form data ready for ${endpoint}:`, Array.from(formData.entries()));
};

const ProfileContent = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(initialProfileState);
  const [passwordValues, setPasswordValues] = useState<PasswordValues>(initialPasswordState);
  const [cvPreviewUrl, setCvPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!profileInfo.cvFile) {
      setCvPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(profileInfo.cvFile);
    setCvPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profileInfo.cvFile]);

  const handleProfileFieldChange = (
    field: keyof Omit<ProfileInfo, "cvFile">,
    value: string
  ) => {
    setProfileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleCvChange = (file: File | null) => {
    setProfileInfo((prev) => ({ ...prev, cvFile: file }));
  };

  const handlePasswordFieldChange = (
    field: keyof PasswordValues,
    value: string
  ) => {
    setPasswordValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", profileInfo.name);
    formData.append("phone", profileInfo.phone);
    formData.append("email", profileInfo.email);
    formData.append("title", profileInfo.title);
    formData.append("about", profileInfo.about);

    if (profileInfo.cvFile) {
      formData.append("cv", profileInfo.cvFile);
    }

    await postFormData("/api/consultants/profile", formData);
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", passwordValues.oldPassword);
    formData.append("newPassword", passwordValues.newPassword);

    await postFormData("/api/consultants/password", formData);
  };

  const handleProfileReset = () => setProfileInfo(initialProfileState);

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">User Profile</h1>
      
      <ProfileKPICards />
      
      <div className="mt-8 flex gap-8">
        <div className="flex-1 max-w-md">
          <AccountInfoForm
            profileInfo={profileInfo}
            passwordValues={passwordValues}
            onProfileFieldChange={handleProfileFieldChange}
            onCvChange={handleCvChange}
            onProfileSubmit={handleProfileSubmit}
            onProfileReset={handleProfileReset}
            onPasswordFieldChange={handlePasswordFieldChange}
            onPasswordSubmit={handlePasswordSubmit}
          />
        </div>
        
        <Separator orientation="vertical" className="h-auto" />
        
        <div className="flex-1 flex justify-center pt-8">
          <ProfileCard
            name={profileInfo.name}
            phone={profileInfo.phone}
            email={profileInfo.email}
            title={profileInfo.title}
            about={profileInfo.about}
            cvFileName={profileInfo.cvFile?.name}
            cvFileUrl={cvPreviewUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
