import { useState } from "react";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ConsultantReview = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    toast.success("Review submitted successfully!");
    setRating(0);
    setDescription("");
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">
        Consultant Review
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-lg font-semibold text-foreground">Rate out of 5 :</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="text-lg font-semibold text-foreground block mb-4">
            Description :
          </label>
          <Textarea
            placeholder="Write your review here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantReview;
