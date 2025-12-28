import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const AboutSection = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="font-semibold text-foreground mb-4">About</h2>
      
      <p className="text-muted-foreground text-sm mb-6 italic">
        Product designer passionate about creating intuitive user experiences. I love solving complex problems through simple, elegant design solutions.
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a href="mailto:sarah.johnson@example.com" className="text-tag-blue hover:underline">
            sarah.johnson@example.com
          </a>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">+1 (555) 123-4567</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">San Francisco, CA</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">Joined January 2023</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
