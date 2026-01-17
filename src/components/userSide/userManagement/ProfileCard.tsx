import { useRef, type ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  profile: {
    name: string;
    phone: string;
    email: string;
    avatarUrl?: string;
  };
  onAvatarSelect: (file: File | null, previewUrl?: string) => void;
}

const ProfileCard = ({ profile, onAvatarSelect }: ProfileCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      onAvatarSelect(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onAvatarSelect(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Upload profile photo"
      >
        <Avatar className="w-32 h-32 border-4 border-primary/20">
          {profile.avatarUrl ? (
            <AvatarImage src={profile.avatarUrl} alt="Profile avatar" className="object-cover" />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
              AD
            </AvatarFallback>
          )}
        </Avatar>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <div className="flex items-center gap-8 mt-6">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">4</div>
          <div className="text-xs text-muted-foreground">Approved<br />meeting</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">9</div>
          <div className="text-xs text-muted-foreground">Requested<br />meetings</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">3</div>
          <div className="text-xs text-muted-foreground">Tasks left</div>
        </div>
      </div>
      
      <div className="mt-8 space-y-2 text-sm text-foreground">
        <p>{profile.name || "Add your display name"}</p>
        <p>{profile.phone || "Add your phone number"}</p>
        <p>{profile.email || "Add your email address"}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
