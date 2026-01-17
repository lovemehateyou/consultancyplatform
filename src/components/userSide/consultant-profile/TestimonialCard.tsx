import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  company: string;
  initials: string;
  rating: number;
  testimonial: string;
}

const TestimonialCard = ({ name, company, initials, rating, testimonial }: TestimonialCardProps) => {
  return (
    <div className="flex gap-4">
      <Avatar className="w-24 h-24 rounded-lg">
        <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold rounded-lg">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">"{testimonial}"</p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-sm text-primary">{company}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
