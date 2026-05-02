import { useEffect, useState } from "react";
/* import ProfileKPICards from "./ProfileKPICards"; */
import AccountInfoForm, { type PasswordChangeValues, type ProfileInfoValues } from "./AccountInfoForm";
import ProfileCard from "./ProfileCard";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { getProfile, updateProfile } from "@/services/users";

interface ProfileState {
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
  avatarUrl?: string;
}

const initialProfile: ProfileState = {
  name: "",
  phone: "",
  email: "",
  businessName: "",
  businessCity: "",
  businessSubCity: "",
  businessWereda: "",
  businessKebele: "",
  businessType: "",
  businessArea: "",
  tin: "",
};

const ProfileContent = () => {
  const [profile, setProfile] = useState<ProfileState>(initialProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    setProfile({
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
      avatarUrl: user.profileImage ?? undefined,
    });
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

  const handleAvatarChange = (file: File | null, previewUrl?: string) => {
    setAvatarFile(file);
    setProfile((prev) => ({
      ...prev,
      avatarUrl: previewUrl ?? (file ? prev.avatarUrl : undefined),
    }));
  };

  const persistPasswordChange = async (formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Password payload ready for backend:", Object.fromEntries(formData.entries()));
  };

  const handleProfileSubmit = async (values: ProfileInfoValues) => {
    setIsProfileSaving(true);
    try {
      const response = await updateProfile({
        name: values.name,
        phone: values.phone,
        businessName: values.businessName,
        businessCity: values.businessCity,
        businessSubCity: values.businessSubCity,
        businessWereda: values.businessWereda,
        businessKebele: values.businessKebele,
        businessType: values.businessType,
        businessArea: values.businessArea,
        tin: values.tin,
        profileImage: avatarFile,
      });
      setUser(response.user ?? null);
      setProfile((prev) => ({
        ...prev,
        name: response.user.name ?? prev.name,
        phone: response.user.phone ?? prev.phone,
        email: response.user.email ?? prev.email,
        businessName: response.user.businessName ?? prev.businessName,
        businessCity: response.user.businessCity ?? prev.businessCity,
        businessSubCity: response.user.businessSubCity ?? prev.businessSubCity,
        businessWereda: response.user.businessWereda ?? prev.businessWereda,
        businessKebele: response.user.businessKebele ?? prev.businessKebele,
        businessType: response.user.businessType ?? prev.businessType,
        businessArea: response.user.businessArea ?? prev.businessArea,
        tin: response.user.tin ?? prev.tin,
        avatarUrl: response.user.profileImage ?? prev.avatarUrl,
      }));
      setAvatarFile(null);
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
      toast({
        title: "Password update queued",
        description: "Password updates are not available yet.",
      });
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
            disableEmail
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
