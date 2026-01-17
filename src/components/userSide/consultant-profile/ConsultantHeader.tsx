import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConsultantHeaderProps {
  name: string;
  title: string;
  initials: string;
}

const ConsultantHeader = ({ name, title, initials }: ConsultantHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold text-foreground">{name}</h1>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      <Button 
        onClick={() => navigate('/consultancy')}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>
    </div>
  );
};

export default ConsultantHeader;
