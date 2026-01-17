import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex items-center gap-4 mb-6">
      <Select value={selectedDay} onValueChange={setSelectedDay}>
        <SelectTrigger className="w-[200px] bg-background">
          <SelectValue placeholder="Day Of The Week" />
        </SelectTrigger>
        <SelectContent>
          {daysOfWeek.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="w-[180px] bg-background"
      />

      <Input
        type="text"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="w-[180px] bg-background"
      />

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
