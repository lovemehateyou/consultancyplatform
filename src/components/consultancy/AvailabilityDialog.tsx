import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

interface AvailabilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultantName: string;
}

const timeSlots: TimeSlot[] = [
  { day: "Monday", startTime: "2:30Am", endTime: "4:00Am", available: false },
  { day: "Tuesday", startTime: "2:30Am", endTime: "4:00Am", available: true },
];

const AvailabilityDialog = ({ open, onOpenChange, consultantName }: AvailabilityDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal italic text-foreground">
            Availability Popup
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
          {timeSlots.map((slot, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 items-center py-3">
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
                  >
                    Book
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
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityDialog;
