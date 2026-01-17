import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const hours = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const minutes = ["00", "15", "30", "45"];
const periods = ["AM", "PM"];

const TimePicker = ({ value, onChange, placeholder = "Select time" }: TimePickerProps) => {
  // Parse existing value like "2:30 AM"
  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      return { hour: match[1], minute: match[2], period: match[3].toUpperCase() };
    }
    return { hour: "", minute: "", period: "" };
  };

  const parsed = parseTime(value);

  const handleChange = (type: "hour" | "minute" | "period", newValue: string) => {
    const current = parseTime(value);
    const updated = { ...current, [type]: newValue };
    
    if (updated.hour && updated.minute && updated.period) {
      onChange(`${updated.hour}:${updated.minute} ${updated.period}`);
    } else if (type === "hour" && newValue) {
      onChange(`${newValue}:${current.minute || "00"} ${current.period || "AM"}`);
    } else if (type === "minute" && newValue) {
      onChange(`${current.hour || "12"}:${newValue} ${current.period || "AM"}`);
    } else if (type === "period" && newValue) {
      onChange(`${current.hour || "12"}:${current.minute || "00"} ${newValue}`);
    }
  };

  return (
    <div className="flex gap-2">
      <Select value={parsed.hour} onValueChange={(v) => handleChange("hour", v)}>
        <SelectTrigger className="w-[80px] bg-background">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent className="bg-background z-50">
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={parsed.minute} onValueChange={(v) => handleChange("minute", v)}>
        <SelectTrigger className="w-[80px] bg-background">
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent className="bg-background z-50">
          {minutes.map((minute) => (
            <SelectItem key={minute} value={minute}>
              {minute}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={parsed.period} onValueChange={(v) => handleChange("period", v)}>
        <SelectTrigger className="w-[80px] bg-background">
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent className="bg-background z-50">
          {periods.map((period) => (
            <SelectItem key={period} value={period}>
              {period}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimePicker;
