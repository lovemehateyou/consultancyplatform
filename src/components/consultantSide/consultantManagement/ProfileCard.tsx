import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileCardProps {
  name: string;
  phone: string;
  email: string;
  title: string;
  about: string;
  cvFileName?: string;
  cvFileUrl: string | null;
}

const withFallback = (value: string, fallback: string) =>
  value?.trim().length ? value : fallback;

const ProfileCard = ({
  name,
  phone,
  email,
  title,
  about,
  cvFileName,
  cvFileUrl,
}: ProfileCardProps) => {
  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <Avatar className="w-32 h-32 border-4 border-primary/20">
        <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
          {withFallback(name, "Anonymous").substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
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
      
      <div className="mt-8 w-full space-y-2 text-sm text-foreground">
        <p>{withFallback(name, "User name not set")}</p>
        <p>{withFallback(phone, "Phone number not set")}</p>
        <p>{withFallback(email, "Email not set")}</p>
        <p>{withFallback(title, "Professional title not set")}</p>
        <p className="text-muted-foreground">{withFallback(about, "Write something about yourself")}</p>
      </div>

      <div className="mt-6 w-full border border-dashed border-border rounded-lg p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Curriculum Vitae</p>
        {cvFileName ? (
          <a
            href={cvFileUrl ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-sm text-primary hover:underline"
            download={cvFileName}
          >
            {cvFileUrl ? "View / Download CV" : "CV ready to upload"} ({cvFileName})
          </a>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">No CV uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
