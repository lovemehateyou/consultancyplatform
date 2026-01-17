import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

interface AvailabilityScheduleProps {
  schedule: ScheduleItem[];
}

const AvailabilitySchedule = ({ schedule }: AvailabilityScheduleProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Availability Schedule</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground font-medium">Day Of The Week</TableHead>
            <TableHead className="text-foreground font-medium">Start Time</TableHead>
            <TableHead className="text-foreground font-medium">End Time</TableHead>
            <TableHead className="text-foreground font-medium">Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-foreground">{item.day}</TableCell>
              <TableCell className="text-foreground">{item.startTime}</TableCell>
              <TableCell className="text-foreground">{item.endTime}</TableCell>
              <TableCell>
                <span className={item.available ? "text-green-500" : "text-red-500"}>
                  {item.available ? "Available" : "Not Availability"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AvailabilitySchedule;
