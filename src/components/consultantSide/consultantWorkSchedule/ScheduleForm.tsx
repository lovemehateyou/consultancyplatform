import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TimePicker from "./TimePicker";

interface ScheduleFormProps {
  onAddSchedule: (day: string, startTime: string, endTime: string) => void;
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

const ScheduleForm = ({ onAddSchedule }: ScheduleFormProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleAddDate = () => {
    if (selectedDay && startTime && endTime) {
      onAddSchedule(selectedDay, startTime, endTime);
      setSelectedDay("");
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Select value={selectedDay} onValueChange={setSelectedDay}>
        <SelectTrigger className="w-[200px] bg-background">
          <SelectValue placeholder="Day Of The Week" />
        </SelectTrigger>
        <SelectContent className="bg-background z-50">
          {daysOfWeek.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Start Time</span>
        <TimePicker value={startTime} onChange={setStartTime} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">End Time</span>
        <TimePicker value={endTime} onChange={setEndTime} />
      </div>

      <Button
        onClick={handleAddDate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
      >
        Add Date
      </Button>
    </div>
  );
};

export default ScheduleForm;
