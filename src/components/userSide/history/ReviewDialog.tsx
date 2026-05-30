import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultantName: string;
  isSubmitting?: boolean;
  onSubmit: (payload: { rating: number; review: string }) => Promise<void> | void;
}

const ReviewDialog = ({
  open,
  onOpenChange,
  consultantName,
  isSubmitting = false,
  onSubmit,
}: ReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) {
      setRating(0);
      setHoveredRating(0);
      setDescription("");
    }
  }, [open]);

  const handleSubmit = async () => {
    const trimmed = description.trim();
    if (!trimmed || rating === 0) return;
    await onSubmit({ rating, review: trimmed });
  };

  const isValid = rating > 0 && description.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Write a Review {consultantName ? `for ${consultantName}` : ""}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-foreground">
              Rate out of 5
            </span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                  aria-label={`Rate ${star} out of 5`}
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-semibold text-foreground">Description</span>
            <Textarea
              placeholder="Share details about your experience..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant="ghost"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
