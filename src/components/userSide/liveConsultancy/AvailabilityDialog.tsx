import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { listAvailability, type AvailabilitySlot } from "@/services/availability";
import { createBooking } from "@/services/bookings";
import { useToast } from "@/hooks/use-toast";

interface AvailabilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultantName: string;
  consultantId: string;
}

const AvailabilityDialog = ({ open, onOpenChange, consultantName, consultantId }: AvailabilityDialogProps) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!open || !consultantId) return;

    const fetchAvailability = async () => {
      setIsLoading(true);
      try {
        const response = await listAvailability(consultantId);
        setSlots(response.data || []);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load availability.";
        toast({
          title: "Availability unavailable",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [open, consultantId, toast]);

  const timeSlots = useMemo(() => {
    return slots.map((slot) => {
      const startDate = new Date(slot.slotStart);
      const endDate = new Date(slot.slotEnd);
      return {
        id: slot.id,
        day: startDate.toLocaleDateString(undefined, { weekday: "long" }),
        startTime: startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        endTime: endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        available: slot.status === "open",
      };
    });
  }, [slots]);

  const handleBookSlot = async (availabilityId: string) => {
    setIsBooking(availabilityId);
    try {
      const response = await createBooking({
        consultantId,
        availabilityId,
      });

      const checkoutUrl = response.data?.payment?.checkout_url;
      if (checkoutUrl) {
        window.location.assign(checkoutUrl);
        return;
      }

      toast({
        title: "Booking created",
        description: "Payment link is not available.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create booking.";
      toast({
        title: "Booking failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsBooking(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal italic text-foreground">
            Availability for {consultantName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Header Row */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            <div className="font-semibold text-foreground">Day Of The Week</div>
            <div className="font-semibold text-foreground">Start Time</div>
            <div className="font-semibold text-foreground">End Time</div>
            <div className="font-semibold text-foreground">Availability Status</div>
            <div className="font-semibold text-foreground">Action</div>
          </div>
          
          {/* Time Slots */}
          {isLoading ? (
            <div className="py-6 text-muted-foreground">Loading availability...</div>
          ) : timeSlots.length ? (
            timeSlots.map((slot) => (
            <div key={slot.id} className="grid grid-cols-5 gap-4 items-center py-3">
              <div className="font-semibold text-foreground">{slot.day}</div>
              <div className="text-foreground">{slot.startTime}</div>
              <div className="text-foreground">{slot.endTime}</div>
              <div className={slot.available ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {slot.available ? "Available" : "Not Available"}
              </div>
              <div>
                {slot.available ? (
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6"
                    size="sm"
                    disabled={isBooking === slot.id}
                    onClick={() => handleBookSlot(slot.id)}
                  >
                    {isBooking === slot.id ? "Booking..." : "Book"}
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 rounded-full px-4"
                    size="sm"
                    disabled
                  >
                    Cant Book
                  </Button>
                )}
              </div>
            </div>
          ))
          ) : (
            <div className="py-6 text-muted-foreground">No availability posted yet.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityDialog;
