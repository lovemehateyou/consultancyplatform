import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ConsultantHeader from "./ConsultantHeader";
import AboutMeCard from "./AboutMeCard";
import AvailabilitySchedule from "./AvailabilitySchedule";
import TestimonialsSection from "./TestimonialsSection";
import ConsultantReview from "./ConsultantReview";
import AvailabilityDialog from "../liveConsultancy/AvailabilityDialog";
import { listAvailability, type AvailabilitySlot } from "@/services/availability";
import { getConsultant, type ConsultantSummary } from "@/services/users";
import { listConsultantReviews, type ReviewRecord } from "@/services/reviews";
import { useToast } from "@/hooks/use-toast";

const ConsultantProfileContent = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [consultant, setConsultant] = useState<ConsultantSummary | null>(null);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [consultantResponse, availabilityResponse] = await Promise.all([
          getConsultant(id),
          listAvailability(id),
        ]);
        if (!isMounted) return;
        setConsultant(consultantResponse.data ?? null);
        setSlots(availabilityResponse.data ?? []);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load consultant.";
        toast({
          title: "Unable to load consultant",
          description: message,
          variant: "destructive",
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    const fetchReviews = async () => {
      setIsReviewsLoading(true);
      try {
        const response = await listConsultantReviews(id, { limit: 10 });
        if (!isMounted) return;
        setReviews(response.data ?? []);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load reviews.";
        toast({
          title: "Unable to load reviews",
          description: message,
          variant: "destructive",
        });
      } finally {
        if (isMounted) setIsReviewsLoading(false);
      }
    };

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, [id, toast]);

  const scheduleData = useMemo(() => {
    return slots.map((slot) => {
      const startDate = new Date(slot.slotStart);
      const endDate = new Date(slot.slotEnd);
      return {
        day: startDate.toLocaleDateString(undefined, { weekday: "long" }),
        startTime: startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        endTime: endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        available: slot.status === "open",
      };
    });
  }, [slots]);

  const consultantName = consultant?.name || "Consultant";
  const initials = consultantName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const consultantTitle =
    consultant?.title || consultant?.businessArea || consultant?.businessType || "Consultant";
  const consultantLocation = [
    consultant?.businessCity,
    consultant?.businessSubCity,
    consultant?.businessWereda,
    consultant?.businessKebele,
  ]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");

  const testimonials = useMemo(() => {
    return reviews.map((review) => {
      const reviewerName = review.reviewer?.name || "Anonymous";
      const initials = reviewerName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      const company =
        review.reviewer?.businessName ||
        review.reviewer?.businessArea ||
        review.reviewer?.businessType ||
        "Client";
      return {
        id: review.id,
        name: reviewerName,
        company,
        initials,
        rating: review.rating,
        testimonial: review.review,
        avatarUrl: review.reviewer?.profileImage ?? null,
      };
    });
  }, [reviews]);

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <ConsultantHeader
        name={consultantName}
        title={consultantTitle}
        initials={initials}
        avatarUrl={consultant?.profileImage ?? null}
        onBook={consultant ? () => setDialogOpen(true) : undefined}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <AboutMeCard
          description={
            consultant?.businessName
              ? `Business: ${consultant.businessName}`
              : "No bio provided yet."
          }
          email={consultant?.email || "Email not provided"}
          phone={consultant?.phone || "Phone not provided"}
          location={consultantLocation || "Location not provided"}
          cvUrl={consultant?.cv ?? "no cv available"}
        />
        {isLoading ? (
          <div className="bg-card border border-border rounded-lg p-6 text-muted-foreground">
            Loading availability...
          </div>
        ) : (
          <AvailabilitySchedule schedule={scheduleData} />
        )}
      </div>
      
      <TestimonialsSection testimonials={testimonials} isLoading={isReviewsLoading} />
      <ConsultantReview />


      {consultant ? (
        <AvailabilityDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          consultantName={consultantName}
          consultantId={consultant.id}
        />
      ) : null}
    </div>
  );
};

export default ConsultantProfileContent;
