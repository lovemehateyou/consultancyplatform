import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProfileCard = () => {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-32 h-32 border-4 border-primary/20">
        <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
          AD
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
      
      <div className="mt-8 space-y-2 text-sm text-foreground">
        <p>Users User name</p>
        <p>Users phone number</p>
        <p>Users Email</p>
      </div>
    </div>
  );
};

export default ProfileCard;
