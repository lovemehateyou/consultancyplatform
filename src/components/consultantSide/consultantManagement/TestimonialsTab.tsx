import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/userSide/consultant-profile/TestimonialCard";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/hooks/use-toast";
import {
  getConsultantRatingSummary,
  listConsultantReviews,
  type ReviewRecord,
  type ReviewSummary,
} from "@/services/reviews";

const PAGE_SIZE = 6;

const buildInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ConsultantTestimonialsTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setSummary(null);
      setReviews([]);
      setIsLoading(false);
      setErrorMessage(null);
      setPage(1);
      setTotalPages(1);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setErrorMessage(null);

    const loadData = async () => {
      try {
        const [summaryResponse, listResponse] = await Promise.all([
          getConsultantRatingSummary(user.id),
          listConsultantReviews(user.id, { page: 1, limit: PAGE_SIZE }),
        ]);

        if (!isMounted) return;

        setSummary(summaryResponse);
        setReviews(listResponse.data ?? []);
        setPage(listResponse.pagination.page);
        setTotalPages(listResponse.pagination.totalPages);
      } catch (error) {
        if (!isMounted) return;
        const message =
          error instanceof Error ? error.message : "Unable to load testimonials right now.";
        setErrorMessage(message);
        setSummary(null);
        setReviews([]);
        toast({
          title: "Unable to load testimonials",
          description: message,
          variant: "destructive",
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [user?.id, toast]);

  const testimonials = useMemo(() => {
    return reviews.map((review) => {
      const reviewerName = review.reviewer?.name || "Anonymous";
      const company =
        review.reviewer?.businessName ||
        review.reviewer?.businessArea ||
        review.reviewer?.businessType ||
        "Client";

      return {
        id: review.id,
        name: reviewerName,
        company,
        initials: buildInitials(reviewerName),
        rating: review.rating,
        testimonial: review.review,
        avatarUrl: review.reviewer?.profileImage ?? null,
      };
    });
  }, [reviews]);

  const averageRating = summary?.averageRating ?? 0;
  const roundedRating = Math.round(averageRating);

  const loadMore = async () => {
    if (!user?.id || isLoading || isLoadingMore || page >= totalPages) {
      return;
    }

    setIsLoadingMore(true);
    setErrorMessage(null);

    try {
      const nextPage = page + 1;
      const response = await listConsultantReviews(user.id, { page: nextPage, limit: PAGE_SIZE });
      setPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
      setReviews((prev) => {
        const existingIds = new Set(prev.map((review) => review.id));
        const merged = [...prev];
        response.data.forEach((review) => {
          if (!existingIds.has(review.id)) {
            merged.push(review);
          }
        });
        return merged;
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load more testimonials.";
      setErrorMessage(message);
      toast({
        title: "Unable to load more testimonials",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <Card className="p-6 md:p-8 shadow-sm border-border/50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Testimonials</h2>
          <p className="text-sm text-muted-foreground">
            Reviews from clients who booked sessions with you.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <div className="text-3xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={
                    index < roundedRating
                      ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                      : "h-4 w-4 text-muted-foreground"
                  }
                />
              ))}
            </div>
            <div className="text-xs text-muted-foreground">{summary?.reviewCount ?? 0} reviews</div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-muted/40 border border-border rounded-lg p-6 text-muted-foreground">
          Loading testimonials...
        </div>
      ) : testimonials.length ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
          {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
          {page < totalPages ? (
            <div className="flex justify-center">
              <Button variant="outline" onClick={loadMore} disabled={isLoadingMore}>
                {isLoadingMore ? "Loading..." : "Load more"}
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="bg-muted/40 border border-border rounded-lg p-6 text-muted-foreground">
          {errorMessage || "No testimonials yet."}
        </div>
      )}
    </Card>
  );
};

export default ConsultantTestimonialsTab;
