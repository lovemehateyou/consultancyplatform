import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AccountInfoForm = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-foreground">Account Information</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm text-foreground">Name</Label>
          <Input 
            id="name" 
            className="mt-1 bg-muted border-border" 
            placeholder=""
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-sm text-foreground">Phone No.</Label>
          <Input 
            id="phone" 
            className="mt-1 bg-muted border-border" 
            placeholder=""
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
          <Input 
            id="email" 
            type="email"
            className="mt-1 bg-muted border-border" 
            placeholder=""
          />
        </div>
        
        <div>
          <Label htmlFor="title" className="text-sm text-foreground">Professional Title</Label>
          <Input 
            id="title" 
            className="mt-1 bg-muted border-border" 
            placeholder=""
          />
        </div>
        
        <div>
          <Label htmlFor="about" className="text-sm text-foreground">About Me</Label>
          <Textarea 
            id="about" 
            className="mt-1 bg-muted border-border min-h-[100px]" 
            placeholder=""
          />
        </div>
      </div>
      
      <div>
        <Label className="text-sm text-foreground">Update CV</Label>
        <div className="mt-1 border border-dashed border-border rounded-lg p-8 flex items-center justify-center">
          <Button variant="ghost" className="text-muted-foreground">
            Update CV
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Change Password</h3>
        
        <div>
          <Label htmlFor="oldPassword" className="text-sm text-muted-foreground">Old Password</Label>
          <Input 
            id="oldPassword" 
            type="password"
            className="mt-1 bg-muted border-border" 
          />
        </div>
        
        <div>
          <Label htmlFor="newPassword" className="text-sm text-muted-foreground">New Password</Label>
          <Input 
            id="newPassword" 
            type="password"
            className="mt-1 bg-muted border-border" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 pt-4">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Save Changes
        </Button>
        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AccountInfoForm;
