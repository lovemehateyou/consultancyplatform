import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  listConsultantAvailability,
  rescheduleConsultantBooking,
  type AvailabilityRecord,
} from "@/services/bookings";
import type { HistoryEntry } from "./HistoryTable";

interface RescheduleBookingDialogProps {
  open: boolean;
  booking: HistoryEntry | null;
  onOpenChange: (open: boolean) => void;
  onRescheduled: () => Promise<void> | void;
}

const formatSlot = (slot: AvailabilityRecord) => {
  const start = new Date(slot.slotStart);
  const end = new Date(slot.slotEnd);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Unavailable slot";
  }

  return `${start.toLocaleString()} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

const RescheduleBookingDialog = ({
  open,
  booking,
  onOpenChange,
  onRescheduled,
}: RescheduleBookingDialogProps) => {
  const { toast } = useToast();
  const [slots, setSlots] = useState<AvailabilityRecord[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSlots = slots.length > 0;

  useEffect(() => {
    const loadSlots = async () => {
      if (!open || !booking) {
        setSlots([]);
        setSelectedSlotId("");
        setNote("");
        return;
      }

      setIsLoading(true);
      try {
        const response = await listConsultantAvailability("open");
        const now = Date.now();
        const availableSlots = (response.data || []).filter((slot) => {
          const slotStart = new Date(slot.slotStart).getTime();
          return !Number.isNaN(slotStart) && slotStart > now;
        });

        setSlots(availableSlots);
        setSelectedSlotId(availableSlots[0]?.id || "");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load available slots.";
        toast({
          title: "Unable to load availability",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSlots();
  }, [booking, open, toast]);

  const selectedSlot = useMemo(
    () => slots.find((slot) => slot.id === selectedSlotId) || null,
    [selectedSlotId, slots],
  );

  const handleSubmit = async () => {
    if (!booking || !selectedSlotId) {
      return;
    }

    setIsSubmitting(true);
    try {
      await rescheduleConsultantBooking(booking.id, {
        availabilityId: selectedSlotId,
        note: note.trim() || undefined,
      });
      toast({
        title: "Booking rescheduled",
        description: "The client has been notified of the new time.",
      });
      onOpenChange(false);
      await onRescheduled();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to reschedule booking.";
      toast({
        title: "Reschedule failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reschedule booking</DialogTitle>
          <DialogDescription>
            Pick one of your open availability slots. The booking will be moved immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Client</p>
            <p>{booking?.name || "Client"}</p>
            <p className="mt-2 font-medium text-foreground">Current booking date</p>
            <p>{booking?.date || "-"}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">New slot</label>
            <Select
              value={hasSlots ? selectedSlotId : "__none__"}
              onValueChange={(value) => {
                if (value !== "__none__") {
                  setSelectedSlotId(value);
                }
              }}
              disabled={isLoading || !hasSlots}
            >
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? "Loading slots..." : "Select a slot"} />
              </SelectTrigger>
              <SelectContent>
                {hasSlots ? (
                  slots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {formatSlot(slot)}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="__none__" disabled>
                    No future open slots available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Note for client</label>
            <Textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional note to explain the new time"
            />
          </div>

          {selectedSlot ? (
            <p className="text-xs text-muted-foreground">
              New time: {formatSlot(selectedSlot)}
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedSlotId || isSubmitting || isLoading || !hasSlots}>
            {isSubmitting ? "Rescheduling..." : "Reschedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleBookingDialog;