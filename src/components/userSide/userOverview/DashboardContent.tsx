import { useState } from "react";
import KPICards from "./KPICards";
import ProgressWheel from "./ProgressWheel";
import TasksTable, { Task } from "./TasksTable";
import { useAuth } from "@/context/authContext";
import { Sparkles } from "lucide-react";

const initialTasks: Task[] = [
  {
    id: "1",
    name: "Getting your Trade ID ",
    status: "Active",
    role: "Law Consultant",
    email: "olivia@untitledui.com",
    mapLinks: [],
  },
  {
    id: "2",
    name: "Registering For VAT Certificate",
    status: "Active",
    role: "Finance Consultant",
    email: "phoenix@untitledui.com",
    mapLinks: [],
  },
  {
    id: "3",
    name: "Registering Buisness Sectors",
    status: "Active",
    role: "Business consultant",
    email: "lana@untitledui.com",
    mapLinks: [],
  },
];

const DashboardContent = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { user } = useAuth();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const tasksLeft = totalTasks - completedTasks;
  const currentProgress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const progressLeft = 100 - currentProgress;

  const handleCompleteTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" as const } : task,
      ),
    );
  };

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="flex-1 p-6 lg:p-8 bg-background overflow-auto">
      {/* Hero banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-6 lg:p-8 mb-6 shadow-sm">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-white/90 uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              Dashboard Overview
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Welcome back, {firstName}
            </h1>
            <p className="text-white/80 text-sm mt-1 max-w-md">
              Here's a snapshot of your tasks, progress, and consultant requests.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/15">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{currentProgress}%</div>
              <div className="text-[10px] uppercase tracking-widest text-white/80 font-semibold">
                Progress
              </div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{tasksLeft}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/80 font-semibold">
                Pending
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <KPICards
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          tasksLeft={tasksLeft}
          currentProgress={currentProgress}
          progressLeft={progressLeft}
        />

        <ProgressWheel completed={currentProgress} remaining={progressLeft} />

        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <div>
              <h2 className="text-lg font-semibold text-foreground tracking-tight">Your Tasks</h2>
              <p className="text-sm text-muted-foreground">Track and manage your business setup tasks</p>
            </div>
          </div>
          <TasksTable
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            userCity={user?.businessCity ?? ""}
            userSubCity={user?.businessSubCity ?? ""}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
