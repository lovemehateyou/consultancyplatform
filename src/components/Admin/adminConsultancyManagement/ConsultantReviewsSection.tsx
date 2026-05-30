import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { getConsultant, listConsultants, type ConsultantSummary } from "@/services/users";
import {
  deleteReview,
  getConsultantRatingSummary,
  listConsultantReviews,
  type ReviewRecord,
} from "@/services/reviews";

interface ConsultantReviewsSectionProps {
  consultantId?: string;
}

const ConsultantReviewsSection = ({ consultantId }: ConsultantReviewsSectionProps) => {
  const { toast } = useToast();
  const [consultants, setConsultants] = useState<ConsultantSummary[]>([]);
  const [selectedConsultantId, setSelectedConsultantId] = useState<string>(consultantId ?? "");
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [summary, setSummary] = useState({ averageRating: 0, reviewCount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<ReviewRecord | null>(null);

  useEffect(() => {
    if (consultantId) {
      setSelectedConsultantId(consultantId);
    }
  }, [consultantId]);

  useEffect(() => {
    if (consultantId) return;
    let isMounted = true;
    const fetchConsultants = async () => {
      try {
        const response = await listConsultants();
        if (!isMounted) return;
        const items = response.data ?? [];
        setConsultants(items);
        if (!selectedConsultantId && items.length > 0) {
          setSelectedConsultantId(items[0].id);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load consultants.";
        toast({
          title: "Unable to load consultants",
          description: message,
          variant: "destructive",
        });
      }
    };

    fetchConsultants();
    return () => {
      isMounted = false;
    };
  }, [consultantId, toast]);

  useEffect(() => {
    if (!consultantId) return;
    let isMounted = true;

    const fetchConsultant = async () => {
      try {
        const response = await getConsultant(consultantId);
        if (!isMounted) return;
        setConsultants([response.data]);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load consultant.";
        toast({
          title: "Unable to load consultant",
          description: message,
          variant: "destructive",
        });
      }
    };

    fetchConsultant();

    return () => {
      isMounted = false;
    };
  }, [consultantId, toast]);

  useEffect(() => {
    if (!selectedConsultantId) return;
    let isMounted = true;

    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const [reviewsResponse, summaryResponse] = await Promise.all([
          listConsultantReviews(selectedConsultantId, { limit: 50 }),
          getConsultantRatingSummary(selectedConsultantId),
        ]);
        if (!isMounted) return;
        setReviews(reviewsResponse.data ?? []);
        setSummary(summaryResponse);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load reviews.";
        toast({
          title: "Unable to load reviews",
          description: message,
          variant: "destructive",
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [selectedConsultantId, toast]);

  const selectedConsultant = useMemo(
    () => consultants.find((consultant) => consultant.id === selectedConsultantId) ?? null,
    [consultants, selectedConsultantId],
  );

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    setIsDeleting(true);
    try {
      await deleteReview(reviewToDelete.id);
      setReviews((prev) => prev.filter((review) => review.id !== reviewToDelete.id));
      toast({
        title: "Review deleted",
        description: "The review has been removed.",
      });
      setReviewToDelete(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to delete review.";
      toast({
        title: "Delete failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString();
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Consultant Reviews</h2>
          <p className="text-sm text-muted-foreground">
            Manage reviews left for consultants.
          </p>
        </div>
        {!consultantId ? (
          <div className="w-full md:max-w-xs">
            <Select
              value={selectedConsultantId}
              onValueChange={(value) => setSelectedConsultantId(value)}
            >
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder="Select consultant" />
              </SelectTrigger>
              <SelectContent>
                {consultants.map((consultant) => (
                  <SelectItem key={consultant.id} value={consultant.id}>
                    {consultant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <Button asChild variant="outline">
            <Link to="/admin/usermanagement">Back to user management</Link>
          </Button>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Selected consultant</div>
            <div className="text-base font-semibold text-foreground">
              {selectedConsultant?.name ?? "No consultant selected"}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs uppercase text-muted-foreground">Average rating</div>
              <div className="text-lg font-semibold text-foreground">
                {summary.averageRating.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground">Reviews</div>
              <div className="text-lg font-semibold text-foreground">
                {summary.reviewCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {isLoading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No reviews available.</div>
        ) : (
          <div className="divide-y divide-border">
            {reviews.map((review) => {
              const reviewerName = review.reviewer?.name || "Anonymous";
              const reviewerCompany =
                review.reviewer?.businessName ||
                review.reviewer?.businessArea ||
                review.reviewer?.businessType ||
                "Client";

              return (
                <div key={review.id} className="p-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-foreground">{reviewerName}</div>
                      <div className="text-xs text-primary">{reviewerCompany}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground">{review.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.review}</p>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setReviewToDelete(review)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AlertDialog open={Boolean(reviewToDelete)} onOpenChange={(open) => {
        if (!open) setReviewToDelete(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete review</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the review. You cannot undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ConsultantReviewsSection;
