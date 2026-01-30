import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ScheduleItem {
  id: string;
  slotStart: string;
  slotEnd: string;
  timezone: string;
  status?: string;
}

interface ScheduleTableProps {
  schedules: ScheduleItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ScheduleTable = ({ schedules, onEdit, onDelete }: ScheduleTableProps) => {
  const formatDay = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  const formatTime = (value: string) =>
    new Date(value).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="bg-card rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="w-12"></TableHead>
            <TableHead className="text-muted-foreground font-medium">Day</TableHead>
            <TableHead className="text-muted-foreground font-medium">Start Time</TableHead>
            <TableHead className="text-muted-foreground font-medium">End Time</TableHead>
            <TableHead className="text-muted-foreground font-medium text-center">Edit</TableHead>
            <TableHead className="text-muted-foreground font-medium text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id} className="border-b border-border">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {formatDay(schedule.slotStart)}
              </TableCell>
              <TableCell className="text-blue-600 font-medium">
                {formatTime(schedule.slotStart)}
              </TableCell>
              <TableCell className="text-foreground">
                {formatTime(schedule.slotEnd)}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => onEdit(schedule.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => onDelete(schedule.id)}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white px-6"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleTable;
