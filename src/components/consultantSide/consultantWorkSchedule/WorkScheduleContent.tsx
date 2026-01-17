import { useState } from "react";
import ScheduleForm from "./ScheduleForm";
import ScheduleTable, { ScheduleItem } from "./ScheduleTable";

const initialSchedules: ScheduleItem[] = [
  { id: "1", name: "Monday", startTime: "2:30 AM", endTime: "4:00 AM" },
  { id: "2", name: "Wednesday", startTime: "2:30 AM", endTime: "4:00 AM" },
  { id: "3", name: "Thursday", startTime: "2:30 AM", endTime: "4:00 AM" },
  { id: "4", name: "Friday", startTime: "2:30 AM", endTime: "4:00 AM" },
];

const WorkScheduleContent = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules);

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
    // Edit functionality - could open a modal or inline edit
    console.log("Edit schedule:", id);
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
    </main>
  );
};

export default WorkScheduleContent;
