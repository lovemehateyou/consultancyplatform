import { useCallback, useEffect, useState } from "react";
import KPICards from "./KPICards";
import ProgressWheel from "./ProgressWheel";
import TasksTable, { GoalTaskGroup, Task } from "./TasksTable";
import { useAuth } from "@/context/authContext";
import { Sparkles } from "lucide-react";
import { completeTask, listMyGoals, type UserGoal } from "@/services/goals";

const DashboardContent = () => {
  const [goals, setGoals] = useState<GoalTaskGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useAuth();

  const buildGoalsFromGoals = useCallback((userGoals: UserGoal[]): GoalTaskGroup[] => {
    return userGoals
      .map((userGoal) => {
        const goal = userGoal.Goal;
        const progressRows = userGoal.UserTaskProgresses ?? userGoal.UserTaskProgress ?? [];
        const tasks = progressRows
          .map((progress) => {
            const task = progress.Task;
            if (!task) return null;

            return {
              id: task.id,
              taskId: task.id,
              userGoalId: userGoal.id,
              name: task.title,
              status: progress.isCompleted ? "Completed" : "Active",
              goalTitle: goal?.title ?? "Goal",
              goalCategory: goal?.category ?? "General",
              goalBusinessArea: goal?.businessArea ?? null,
              goalBusinessType: goal?.businessType ?? null,
              taskDescription: task.description ?? null,
              goalDescription: goal?.description ?? null,
              stepOrder: task.stepOrder,
              mapLinks: task.mapLinks ?? [],
            } as Task;
          })
          .filter((task): task is Task => Boolean(task))
          .sort((a, b) => a.stepOrder - b.stepOrder);

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task) => task.status === "Completed").length;
        const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

        return {
          userGoalId: userGoal.id,
          goalTitle: goal?.title ?? "Goal",
          goalCategory: goal?.category ?? "General",
          goalBusinessArea: goal?.businessArea ?? null,
          goalBusinessType: goal?.businessType ?? null,
          goalDescription: goal?.description ?? null,
          progress,
          completedTasks,
          totalTasks,
          tasks,
        };
      })
      .sort((a, b) => a.goalTitle.localeCompare(b.goalTitle));
  }, []);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await listMyGoals();
      setGoals(buildGoalsFromGoals(response));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to load your goals.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [buildGoalsFromGoals]);

  useEffect(() => {
    void fetchGoals();
  }, [fetchGoals]);

  const totalTasks = goals.reduce((sum, goal) => sum + goal.totalTasks, 0);
  const completedTasks = goals.reduce((sum, goal) => sum + goal.completedTasks, 0);
  const tasksLeft = totalTasks - completedTasks;
  const currentProgress = goals.length
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0;
  const progressLeft = 100 - currentProgress;

  const handleCompleteTask = async (task: Task) => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await completeTask({
        userGoalId: task.userGoalId,
        taskId: task.taskId,
      });
      await fetchGoals();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to complete the task.",
      );
    } finally {
      setIsSaving(false);
    }
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
        {errorMessage ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}
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
          {isLoading ? (
            <p className="text-sm text-muted-foreground px-1">Loading goals...</p>
          ) : null}
          <TasksTable
            goals={goals}
            onCompleteTask={isSaving ? undefined : handleCompleteTask}
            userCity={user?.businessCity ?? ""}
            userSubCity={user?.businessSubCity ?? ""}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
