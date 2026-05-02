import { useEffect, useState } from "react";
/* import ProfileKPICards from "./ProfileKPICards"; */
import AccountInfoForm from "./AccountInfoForm";
import ProfileCard from "./ProfileCard";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/authContext";
import { getProfile, updateProfile } from "@/services/users";
import { useToast } from "@/hooks/use-toast";

type ProfileInfo = {
  name: string;
  phone: string;
  email: string;
  title: string;
  about: string;
  businessName: string;
  businessCity: string;
  businessSubCity: string;
  businessWereda: string;
  businessKebele: string;
  businessType: string;
  businessArea: string;
  tin: string;
  profileImage?: string;
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
  businessName: "",
  businessCity: "",
  businessSubCity: "",
  businessWereda: "",
  businessKebele: "",
  businessType: "",
  businessArea: "",
  tin: "",
  cvFile: null,
};

const initialPasswordState: PasswordValues = {
  oldPassword: "",
  newPassword: "",
};

const ProfileContent = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(initialProfileState);
  const [passwordValues, setPasswordValues] = useState<PasswordValues>(initialPasswordState);
  const [cvPreviewUrl, setCvPreviewUrl] = useState<string | null>(null);
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!profileInfo.cvFile) {
      setCvPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(profileInfo.cvFile);
    setCvPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profileInfo.cvFile]);

  useEffect(() => {
    if (!user) return;
    setProfileInfo((prev) => ({
      ...prev,
      name: user.name ?? "",
      phone: user.phone ?? "",
      email: user.email ?? "",
      businessName: user.businessName ?? "",
      businessCity: user.businessCity ?? "",
      businessSubCity: user.businessSubCity ?? "",
      businessWereda: user.businessWereda ?? "",
      businessKebele: user.businessKebele ?? "",
      businessType: user.businessType ?? "",
      businessArea: user.businessArea ?? "",
      tin: user.tin ?? "",
      profileImage: user.profileImage ?? undefined,
    }));
  }, [user]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.user ?? null);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load profile data.";
        toast({
          title: "Profile load failed",
          description: message,
          variant: "destructive",
        });
      }
    };

    if (user?.id) {
      loadProfile();
    }
  }, [user?.id, setUser, toast]);

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
    try {
      const response = await updateProfile({
        name: profileInfo.name,
        phone: profileInfo.phone,
        businessName: profileInfo.businessName,
        businessCity: profileInfo.businessCity,
        businessSubCity: profileInfo.businessSubCity,
        businessWereda: profileInfo.businessWereda,
        businessKebele: profileInfo.businessKebele,
        businessType: profileInfo.businessType,
        businessArea: profileInfo.businessArea,
        tin: profileInfo.tin,
      });
      setUser(response.user ?? null);
      toast({
        title: "Profile updated",
        description: response.message || "Your profile changes have been saved.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update profile right now.";
      toast({
        title: "Profile update failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", passwordValues.oldPassword);
    formData.append("newPassword", passwordValues.newPassword);
    console.info("Password payload ready for backend:", Array.from(formData.entries()));
    toast({
      title: "Password update queued",
      description: "Password updates are not available yet.",
    });
  };

  const handleProfileReset = () => setProfileInfo(initialProfileState);

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">User Profile</h1>
      
      {/* <ProfileKPICards /> */}
      
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
            businessName={profileInfo.businessName}
            businessCity={profileInfo.businessCity}
            businessSubCity={profileInfo.businessSubCity}
            businessWereda={profileInfo.businessWereda}
            businessKebele={profileInfo.businessKebele}
            businessType={profileInfo.businessType}
            businessArea={profileInfo.businessArea}
            tin={profileInfo.tin}
            profileImage={profileInfo.profileImage}
            cvFileName={profileInfo.cvFile?.name}
            cvFileUrl={cvPreviewUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
