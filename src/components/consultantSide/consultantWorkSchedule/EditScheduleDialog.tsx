import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScheduleItem } from "./ScheduleTable";
import TimePicker from "./TimePicker";

interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: ScheduleItem | null;
  onSave: (id: string, day: string, startTime: string, endTime: string) => void;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const EditScheduleDialog = ({
  open,
  onOpenChange,
  schedule,
  onSave,
}: EditScheduleDialogProps) => {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (schedule) {
      setDay(schedule.name);
      setStartTime(schedule.startTime);
      setEndTime(schedule.endTime);
    }
  }, [schedule]);

  const handleSave = () => {
    if (schedule) {
      onSave(schedule.id, day, startTime, endTime);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Schedule</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Day Of The Week
            </label>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {daysOfWeek.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Start Time
            </label>
            <TimePicker value={startTime} onChange={setStartTime} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              End Time
            </label>
            <TimePicker value={endTime} onChange={setEndTime} />
          </div>
          <Button
            onClick={handleSave}
            className="w-full bg-green-700 hover:bg-green-800 text-white"
          >
            Edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditScheduleDialog;
