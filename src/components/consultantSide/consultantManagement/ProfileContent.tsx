import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { changePassword, getProfile, updateProfile } from "@/services/users";
import {
  Briefcase,
  Camera,
  CheckCircle2,
  FileText,
  Lock,
  Mail,
  Phone,
  RotateCcw,
  Save,
  User,
} from "lucide-react";

interface ProfileState {
  name: string;
  phone: string;
  email: string;
  title: string;
  about: string;
  avatarUrl?: string;
  cvFile: File | null;
  cvUrl?: string | null;
}

const initialProfile: ProfileState = {
  name: "",
  phone: "",
  email: "",
  title: "",
  about: "",
  cvFile: null,
  cvUrl: null,
};

const ProfileContent = () => {
  const [profile, setProfile] = useState<ProfileState>(initialProfile);
  const [originalProfile, setOriginalProfile] = useState<ProfileState>(initialProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [cvPreviewUrl, setCvPreviewUrl] = useState<string | null>(null);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const [passwordValues, setPasswordValues] = useState({ oldPassword: "", newPassword: "" });
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!profile.cvFile) {
      setCvPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(profile.cvFile);
    setCvPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profile.cvFile]);

  useEffect(() => {
    if (!user) return;
    const next: ProfileState = {
      name: user.name ?? "",
      phone: user.phone ?? "",
      email: user.email ?? "",
      title: user.title ?? "",
      about: user.about ?? "",
      avatarUrl: user.profileImage ?? undefined,
      cvFile: null,
      cvUrl: user.cv ?? null,
    };
    setProfile(next);
    setOriginalProfile(next);
  }, [user]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.user ?? null);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load profile data.";
        toast({ title: "Profile load failed", description: message, variant: "destructive" });
      }
    };
    if (user?.id) loadProfile();
  }, [user?.id, setUser, toast]);

  const handleField =
    (field: keyof Omit<ProfileState, "cvFile" | "avatarUrl">) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfile((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () =>
      setProfile((prev) => ({ ...prev, avatarUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleCvChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setProfile((prev) => ({ ...prev, cvFile: file }));
  };

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProfileSaving(true);
    try {
      const response = await updateProfile({
        name: profile.name,
        phone: profile.phone,
        title: profile.title,
        about: profile.about,
        profileImage: avatarFile,
        cvFile: profile.cvFile,
      });
      setUser(response.user ?? null);
      setAvatarFile(null);

      const nextProfile: ProfileState = {
        ...profile,
        name: response.user?.name ?? profile.name,
        phone: response.user?.phone ?? profile.phone,
        email: response.user?.email ?? profile.email,
        title: response.user?.title ?? profile.title,
        about: response.user?.about ?? profile.about,
        avatarUrl: response.user?.profileImage ?? profile.avatarUrl,
        cvFile: null,
        cvUrl: response.user?.cv ?? profile.cvUrl,
      };
      setProfile(nextProfile);
      setOriginalProfile(nextProfile);

      toast({
        title: "Profile updated",
        description: response.message || "Your changes have been saved.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to update profile right now.";
      toast({ title: "Profile update failed", description: message, variant: "destructive" });
    } finally {
      setIsProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPasswordSaving(true);
    try {
      const response = await changePassword({
        oldPassword: passwordValues.oldPassword,
        newPassword: passwordValues.newPassword,
      });
      toast({ title: "Password updated", description: response.message });
      setPasswordValues({ oldPassword: "", newPassword: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to update password right now.";
      toast({ title: "Password update failed", description: message, variant: "destructive" });
    } finally {
      setIsPasswordSaving(false);
    }
  };

  const handleReset = () => {
    setProfile(originalProfile);
    setAvatarFile(null);
  };

  const initials = (profile.name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const activeCvUrl = cvPreviewUrl ?? profile.cvUrl ?? null;

  return (
    <div className="flex-1 overflow-auto bg-muted/30">
      <div className="relative h-48 bg-gradient-to-br from-primary via-primary to-primary/70 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, hsl(var(--primary-foreground)) 1px, transparent 1px), radial-gradient(circle at 80% 70%, hsl(var(--primary-foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-primary-foreground/10 blur-2xl" />
      </div>

      <div className="px-6 md:px-10 -mt-20 pb-10 max-w-6xl mx-auto">
        <Card className="p-6 md:p-8 shadow-lg border-border/50 backdrop-blur">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="relative group">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-card shadow-xl ring-2 ring-primary/20">
                {profile.avatarUrl ? (
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-3xl font-bold">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Change profile photo"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {profile.name || "Your name"}
                </h1>
                <Badge
                  variant="secondary"
                  className="gap-1 bg-[hsl(var(--tag-green-bg))] text-[hsl(var(--tag-green))] border-0"
                >
                  <CheckCircle2 className="h-3 w-3" /> Active
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4" /> {profile.email || "your@email.com"}
              </p>
              {profile.title ? (
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> {profile.title}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full md:w-auto">
              {[
                { label: "Approved", value: 4, color: "tag-green" },
                { label: "Requests", value: 9, color: "tag-blue" },
                { label: "Tasks", value: 3, color: "tag-orange" },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-3 py-2 rounded-lg bg-muted/50">
                  <div className={`text-xl font-bold text-[hsl(var(--${stat.color}))]`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Tabs defaultValue="personal" className="mt-6">
          <TabsList className="bg-card border border-border/50 p-1 h-auto">
            <TabsTrigger
              value="personal"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Lock className="h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleProfileSubmit}>
            <TabsContent value="personal" className="mt-4">
              <Card className="p-6 md:p-8 shadow-sm border-border/50">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Consultant Profile</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your contact details, professional title, and profile summary.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FieldGroup icon={<User className="h-4 w-4" />} label="Full Name" htmlFor="name">
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={handleField("name")}
                      placeholder="Jane Doe"
                      disabled={isProfileSaving}
                    />
                  </FieldGroup>
                  <FieldGroup icon={<Phone className="h-4 w-4" />} label="Phone" htmlFor="phone">
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={handleField("phone")}
                      placeholder="+251 900 000 000"
                      disabled={isProfileSaving}
                    />
                  </FieldGroup>
                  <FieldGroup icon={<Mail className="h-4 w-4" />} label="Email" htmlFor="email" hint="Email cannot be changed">
                    <Input id="email" type="email" value={profile.email} disabled placeholder="jane@example.com" />
                  </FieldGroup>
                  <FieldGroup icon={<Briefcase className="h-4 w-4" />} label="Professional Title" htmlFor="title">
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={handleField("title")}
                      placeholder="Business Consultant"
                      disabled={isProfileSaving}
                    />
                  </FieldGroup>
                  <div className="md:col-span-2">
                    <FieldGroup label="About Me" htmlFor="about">
                      <Textarea
                        id="about"
                        value={profile.about}
                        onChange={handleField("about")}
                        placeholder="Share a brief summary about your expertise and focus areas."
                        className="min-h-[120px]"
                        disabled={isProfileSaving}
                      />
                    </FieldGroup>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> Curriculum Vitae
                  </h3>
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleCvChange}
                  />
                  <div className="border border-dashed border-border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm text-foreground">
                        {profile.cvFile
                          ? profile.cvFile.name
                          : activeCvUrl
                          ? "Current CV uploaded"
                          : "PDF or DOC up to 5MB"}
                      </p>
                        {activeCvUrl ? (
                        <a
                            href={activeCvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          View / Download CV
                        </a>
                      ) : null}
                    </div>
                    <Button type="button" variant="outline" onClick={() => cvInputRef.current?.click()}>
                      {profile.cvFile ? "Replace CV" : "Upload CV"}
                    </Button>
                  </div>
                </div>

                <FormActions saving={isProfileSaving} onReset={handleReset} />
              </Card>
            </TabsContent>
          </form>

          <TabsContent value="security" className="mt-4">
            <Card className="p-6 md:p-8 shadow-sm border-border/50">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Change Password</h2>
                <p className="text-sm text-muted-foreground">Use a strong password you do not use anywhere else.</p>
              </div>
              <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-md">
                <FieldGroup icon={<Lock className="h-4 w-4" />} label="Current Password" htmlFor="oldPassword">
                  <Input
                    id="oldPassword"
                    type="password"
                    value={passwordValues.oldPassword}
                    onChange={(event) =>
                      setPasswordValues((prev) => ({ ...prev, oldPassword: event.target.value }))
                    }
                    disabled={isPasswordSaving}
                  />
                </FieldGroup>
                <FieldGroup icon={<Lock className="h-4 w-4" />} label="New Password" htmlFor="newPassword">
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordValues.newPassword}
                    onChange={(event) =>
                      setPasswordValues((prev) => ({ ...prev, newPassword: event.target.value }))
                    }
                    disabled={isPasswordSaving}
                  />
                </FieldGroup>
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={
                      isPasswordSaving || !passwordValues.oldPassword || !passwordValues.newPassword
                    }
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isPasswordSaving ? "Updating..." : "Update Password"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setPasswordValues({ oldPassword: "", newPassword: "" })}
                    disabled={isPasswordSaving}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface FieldGroupProps {
  label: string;
  htmlFor: string;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}

const FieldGroup = ({ label, htmlFor, icon, hint, children }: FieldGroupProps) => (
  <div className="space-y-1.5">
    <Label htmlFor={htmlFor} className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5 uppercase tracking-wide">
      {icon && <span className="text-primary">{icon}</span>}
      {label}
    </Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const FormActions = ({ saving, onReset }: { saving: boolean; onReset: () => void }) => (
  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border/50">
    <Button type="submit" disabled={saving} className="gap-2">
      <Save className="h-4 w-4" />
      {saving ? "Saving..." : "Save Changes"}
    </Button>
    <Button type="button" variant="ghost" onClick={onReset} disabled={saving} className="gap-2">
      <RotateCcw className="h-4 w-4" /> Reset
    </Button>
  </div>
);

export default ProfileContent;
