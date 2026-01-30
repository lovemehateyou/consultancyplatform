import { useEffect, useMemo, useState } from "react";
import ScheduleForm from "./ScheduleForm";
import ScheduleTable, { ScheduleItem } from "./ScheduleTable";
import EditScheduleDialog from "./EditScheduleDialog";
import {
  createAvailability,
  listMyAvailability,
  updateAvailability,
} from "@/services/availability";
import { useAuth } from "@/context/authContext";

const WorkScheduleContent = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    [],
  );

  const parseTime = (value: string) => {
    const match = value.match(/^\s*(\d{1,2}):(\d{2})\s*(AM|PM)\s*$/i);
    if (!match) return null;
    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const period = match[3].toUpperCase();
    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return { hour, minute };
  };

  const buildSlotDate = (dayName: string, time: string) => {
    const parsed = parseTime(time);
    if (!parsed) return null;
    const dayMap: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const targetDay = dayMap[dayName];
    if (typeof targetDay !== "number") return null;

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDay = today.getDay();

    let diff = (targetDay - currentDay + 7) % 7;
    const targetMinutes = parsed.hour * 60 + parsed.minute;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    if (diff === 0 && targetMinutes <= nowMinutes) {
      diff = 7;
    }

    const date = new Date(today);
    date.setDate(today.getDate() + diff);
    date.setHours(parsed.hour, parsed.minute, 0, 0);
    return date;
  };

  const loadAvailability = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await listMyAvailability();
      const nextSchedules = (response.data || []).filter(
        (slot) => slot.status !== "archived",
      );
      setSchedules(nextSchedules);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load schedule";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAvailability();
  }, [user?.id]);

  const handleAddSchedule = (day: string, startTime: string, endTime: string) => {
    const startDate = buildSlotDate(day, startTime);
    const endDate = buildSlotDate(day, endTime);
    if (!startDate || !endDate) {
      setError("Please provide a valid day and time range.");
      return;
    }
    if (endDate <= startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    setLoading(true);
    setError(null);
    createAvailability({
      slotStart: startDate.toISOString(),
      slotEnd: endDate.toISOString(),
      timezone,
    })
      .then((response) => {
        setSchedules((prev) => [...prev, response.data]);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Failed to add schedule";
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  const handleEdit = (id: string) => {
    const schedule = schedules.find((s) => s.id === id);
    if (schedule) {
      setEditingSchedule(schedule);
      setEditDialogOpen(true);
    }
  };

  const handleSaveEdit = (id: string, day: string, startTime: string, endTime: string) => {
    const startDate = buildSlotDate(day, startTime);
    const endDate = buildSlotDate(day, endTime);
    if (!startDate || !endDate) {
      setError("Please provide a valid day and time range.");
      return;
    }
    if (endDate <= startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    setLoading(true);
    setError(null);
    updateAvailability(id, {
      slotStart: startDate.toISOString(),
      slotEnd: endDate.toISOString(),
      timezone,
    })
      .then((response) => {
        setSchedules((prev) =>
          prev.map((schedule) => (schedule.id === id ? response.data : schedule)),
        );
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Failed to update schedule";
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    setError(null);
    updateAvailability(id, { status: "archived" })
      .then(() => {
        setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Failed to delete schedule";
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Work Schedule</h1>

      {error ? (
        <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}
      
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
      {loading ? (
        <p className="mt-4 text-sm text-muted-foreground">Saving schedule changes...</p>
      ) : null}
    </main>
  );
};

export default WorkScheduleContent;
