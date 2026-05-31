import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Camera, Mail, Phone, Building2, MapPin, Briefcase, Hash, User, Lock, Save, RotateCcw, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { changePassword, getProfile, updateProfile } from "@/services/users";
import { BUSINESS_AREAS, BUSINESS_TYPES } from "@/constants/businessOptions";

import { listConsultantBookings } from '@/services/bookings';

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
type StatItem = {
  label: string;
  value: number;
  color: string;
};

const DEFAULT_STATS: StatItem[] = [
  { label: 'Approved', value: 0, color: '#10B981' },
  { label: 'Requests', value: 0, color: '#3B82F6' },
  { label: 'Completed', value: 0, color: '#6B7280' },
];

const ProfileContent = () => {
  const [profile, setProfile] = useState<ProfileState>(initialProfile);
  const [originalProfile, setOriginalProfile] = useState<ProfileState>(initialProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const [passwordValues, setPasswordValues] = useState({ oldPassword: "", newPassword: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

   useEffect(() => {
        let isActive = true;
    
        const loadProfile = async () => {
          setIsLoading(true);
          setErrorMessage(null);
    
          try {
            const [{ data: bookings }] = await Promise.all([listConsultantBookings()]);
            if (!isActive) {
              return;
            }
    
            const approvedCount = bookings.filter((booking) =>
              booking.status === 'accepted' || booking.status === 'completed',
            ).length;
            const requestCount = bookings.filter((booking) => booking.status === 'pending' || booking.status === 'declined' || booking.status === 'accepted' ).length;
            const completedCount = bookings.filter((booking) => booking.status === 'completed').length;
    
            setStats([
              { label: 'Approved', value: approvedCount, color: '#10B981' },
              { label: 'Requests', value: requestCount, color: '#3B82F6' },
              { label: 'Completed', value: completedCount, color: '#6B7280' },  
            ]);
          } catch (err) {
            if (isActive) {
              setErrorMessage(err instanceof Error ? err.message : 'Failed to load profile.');
              setStats(DEFAULT_STATS);
            }
          } finally {
            if (isActive) {
              setIsLoading(false);
            }
          }
        };
    
        loadProfile();
    
        return () => {
          isActive = false;
        };
      }, []);
  

  useEffect(() => {
    if (!user) return;
    const next: ProfileState = {
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
    (field: keyof ProfileState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfile((prev) => ({ ...prev, avatarUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProfileSaving(true);
    try {
      const response = await updateProfile({
        name: profile.name,
        phone: profile.phone,
        businessName: profile.businessName,
        businessCity: profile.businessCity,
        businessSubCity: profile.businessSubCity,
        businessWereda: profile.businessWereda,
        businessKebele: profile.businessKebele,
        businessType: profile.businessType,
        businessArea: profile.businessArea,
        tin: profile.tin,
        profileImage: avatarFile,
      });
      setUser(response.user ?? null);
      setAvatarFile(null);
      toast({ title: "Profile updated", description: response.message || "Your changes have been saved." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to update profile right now.";
      toast({ title: "Profile update failed", description: message, variant: "destructive" });
    } finally {
      setIsProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  const initials = (profile.name || "U").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const businessAddress = [profile.businessCity, profile.businessSubCity, profile.businessWereda, profile.businessKebele]
    .filter(Boolean).join(", ");

  return (
    <div className="flex-1 overflow-auto bg-muted/30">
      {/* Hero banner */}
      <div className="relative h-48 bg-gradient-to-br from-primary via-primary to-primary/70 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--primary-foreground)) 1px, transparent 1px), radial-gradient(circle at 80% 70%, hsl(var(--primary-foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-primary-foreground/10 blur-2xl" />
      </div>

      <div className="px-6 md:px-10 -mt-20 pb-10 max-w-6xl mx-auto">
        {/* Profile header card */}
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
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Change profile photo"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
                aria-label="Upload profile photo"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {profile.name || "Your name"}
                </h1>
                <Badge variant="secondary" className="gap-1 bg-[hsl(var(--tag-green-bg))] text-[hsl(var(--tag-green))] border-0">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4" /> {profile.email || "your@email.com"}
              </p>
              {businessAddress && (
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {businessAddress}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full md:w-auto">
              {[
                { label: "Approved", value: stats[0]?.value ?? 0, color: "tag-green" },
                { label: "Requests", value: stats[1]?.value ?? 0, color: "tag-blue" },
                { label: "Tasks", value: stats[2]?.value ?? 0, color: "tag-orange" },
              ].map((s) => (
                <div key={s.label} className="text-center px-3 py-2 rounded-lg bg-muted/50">
                  <div className={`text-xl font-bold text-[hsl(var(--${s.color}))]`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="mt-6">
          <TabsList className="bg-card border border-border/50 p-1 h-auto">
            <TabsTrigger value="personal" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="h-4 w-4" /> Personal
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Building2 className="h-4 w-4" /> Business
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Lock className="h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleProfileSubmit}>
            <TabsContent value="personal" className="mt-4">
              <Card className="p-6 md:p-8 shadow-sm border-border/50">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                  <p className="text-sm text-muted-foreground">Update your contact details so consultants can reach you.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FieldGroup icon={<User className="h-4 w-4" />} label="Full Name" htmlFor="name">
                    <Input id="name" value={profile.name} onChange={handleField("name")} placeholder="Jane Doe" disabled={isProfileSaving} />
                  </FieldGroup>
                  <FieldGroup icon={<Phone className="h-4 w-4" />} label="Phone" htmlFor="phone">
                    <Input id="phone" type="tel" value={profile.phone} onChange={handleField("phone")} placeholder="+251 900 000 000" disabled={isProfileSaving} />
                  </FieldGroup>
                  <FieldGroup icon={<Mail className="h-4 w-4" />} label="Email" htmlFor="email" hint="Email cannot be changed">
                    <Input id="email" type="email" value={profile.email} disabled placeholder="jane@example.com" />
                  </FieldGroup>
                </div>
                <FormActions saving={isProfileSaving} onReset={() => setProfile(originalProfile)} />
              </Card>
            </TabsContent>

            <TabsContent value="business" className="mt-4">
              <Card className="p-6 md:p-8 shadow-sm border-border/50">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Business Details</h2>
                  <p className="text-sm text-muted-foreground">Tell us about your business to get more relevant consultancy.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FieldGroup icon={<Building2 className="h-4 w-4" />} label="Business Name" htmlFor="businessName">
                    <Input id="businessName" value={profile.businessName} onChange={handleField("businessName")} placeholder="Acme Corp" disabled={isProfileSaving} />
                  </FieldGroup>
                  <FieldGroup icon={<Briefcase className="h-4 w-4" />} label="Business Type" htmlFor="businessType">
                    <select
                      id="businessType"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      value={profile.businessType}
                      onChange={handleField("businessType")}
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
                  </FieldGroup>
                  <FieldGroup icon={<Briefcase className="h-4 w-4" />} label="Business Area" htmlFor="businessArea">
                    <select
                      id="businessArea"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      value={profile.businessArea}
                      onChange={handleField("businessArea")}
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
                  </FieldGroup>
                  <FieldGroup icon={<Hash className="h-4 w-4" />} label="TIN" htmlFor="tin">
                    <Input id="tin" value={profile.tin} onChange={handleField("tin")} placeholder="1234567890" disabled={isProfileSaving} />
                  </FieldGroup>
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Business Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <FieldGroup label="City" htmlFor="businessCity">
                      <Input id="businessCity" value={profile.businessCity} onChange={handleField("businessCity")} placeholder="Addis Ababa" disabled={isProfileSaving} />
                    </FieldGroup>
                    <FieldGroup label="Sub-city" htmlFor="businessSubCity">
                      <Input id="businessSubCity" value={profile.businessSubCity} onChange={handleField("businessSubCity")} placeholder="Bole" disabled={isProfileSaving} />
                    </FieldGroup>
                    <FieldGroup label="Wereda" htmlFor="businessWereda">
                      <Input id="businessWereda" value={profile.businessWereda} onChange={handleField("businessWereda")} placeholder="04" disabled={isProfileSaving} />
                    </FieldGroup>
                    <FieldGroup label="Kebele" htmlFor="businessKebele">
                      <Input id="businessKebele" value={profile.businessKebele} onChange={handleField("businessKebele")} placeholder="12" disabled={isProfileSaving} />
                    </FieldGroup>
                  </div>
                </div>
                <FormActions saving={isProfileSaving} onReset={() => setProfile(originalProfile)} />
              </Card>
            </TabsContent>
          </form>

          <TabsContent value="security" className="mt-4">
            <Card className="p-6 md:p-8 shadow-sm border-border/50">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Change Password</h2>
                <p className="text-sm text-muted-foreground">Use a strong password you don't use anywhere else.</p>
              </div>
              <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-md">
                <FieldGroup icon={<Lock className="h-4 w-4" />} label="Current Password" htmlFor="oldPassword">
                  <Input id="oldPassword" type="password" value={passwordValues.oldPassword}
                    onChange={(e) => setPasswordValues((p) => ({ ...p, oldPassword: e.target.value }))}
                    disabled={isPasswordSaving} />
                </FieldGroup>
                <FieldGroup icon={<Lock className="h-4 w-4" />} label="New Password" htmlFor="newPassword">
                  <Input id="newPassword" type="password" value={passwordValues.newPassword}
                    onChange={(e) => setPasswordValues((p) => ({ ...p, newPassword: e.target.value }))}
                    disabled={isPasswordSaving} />
                </FieldGroup>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" disabled={isPasswordSaving || !passwordValues.oldPassword || !passwordValues.newPassword} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isPasswordSaving ? "Updating..." : "Update Password"}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setPasswordValues({ oldPassword: "", newPassword: "" })} disabled={isPasswordSaving}>
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
