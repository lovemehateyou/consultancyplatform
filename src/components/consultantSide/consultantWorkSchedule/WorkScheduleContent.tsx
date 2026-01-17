import { useState } from "react";
import ScheduleForm from "./ScheduleForm";
import ScheduleTable, { ScheduleItem } from "./ScheduleTable";
import EditScheduleDialog from "./EditScheduleDialog";

const initialSchedules: ScheduleItem[] = [
  { id: "1", name: "Monday", startTime: "2:30 AM", endTime: "4:00 AM" },
  { id: "2", name: "Wednesday", startTime: "2:30 AM", endTime: "4:00 AM" },
  { id: "3", name: "Thursday", startTime: "2:30 AM", endTime: "4:00 AM" },
  { id: "4", name: "Friday", startTime: "2:30 AM", endTime: "4:00 AM" },
];

const WorkScheduleContent = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);

  const handleAddSchedule = (day: string, startTime: string, endTime: string) => {
    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      name: day,
      startTime,
      endTime,
    };
    setSchedules([...schedules, newSchedule]);
  };

  const handleEdit = (id: string) => {
    const schedule = schedules.find((s) => s.id === id);
    if (schedule) {
      setEditingSchedule(schedule);
      setEditDialogOpen(true);
    }
  };

  const handleSaveEdit = (id: string, day: string, startTime: string, endTime: string) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, name: day, startTime, endTime }
          : schedule
      )
    );
  };

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Work Schedule</h1>
      
      <ScheduleForm onAddSchedule={handleAddSchedule} />
      
      <ScheduleTable
        schedules={schedules}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditScheduleDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        schedule={editingSchedule}
        onSave={handleSaveEdit}
      />
    </main>
  );
};

export default WorkScheduleContent;
