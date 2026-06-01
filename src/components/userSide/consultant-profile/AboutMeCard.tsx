import { Mail, Phone, MapPin, FileText } from "lucide-react";

interface AboutMeCardProps {
  description: string;
  email: string;
  phone: string;
  location: string;
  cvUrl?: string | null;
}

const AboutMeCard = ({ description, email, phone, location, cvUrl }: AboutMeCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">About Me</h2>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{location}</span>
        </div>
        {cvUrl ? (
          <div className="flex items-center gap-3 text-sm">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              View CV
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AboutMeCard;
