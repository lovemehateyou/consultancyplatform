import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConsultantHeaderProps {
  name: string;
  title: string;
  initials: string;
  avatarUrl?: string | null;
  onBook?: () => void;
}

const ConsultantHeader = ({ name, title, initials, avatarUrl, onBook }: ConsultantHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-primary/20">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold text-foreground">{name}</h1>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {onBook ? (
          <Button
            onClick={onBook}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Book Consultation
          </Button>
        ) : null}
        <Button
          onClick={() => navigate("/consultancy")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ConsultantHeader;
