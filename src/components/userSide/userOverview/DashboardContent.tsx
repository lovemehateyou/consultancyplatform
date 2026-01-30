import { useState } from "react";
import KPICards from "./KPICards";
import ProgressWheel from "./ProgressWheel";
import TasksTable, { Task } from "./TasksTable";

const initialTasks: Task[] = [
  { id: "1", name: "Getting your Trade ID ", status: "Active", role: "Law Consultant", email: "olivia@untitledui.com" },
  { id: "2", name: "Registering For VAT Certificate", status: "Active", role: "Finance Consultant", email: "phoenix@untitledui.com" },
  { id: "3", name: "Registering Buisness Sectors", status: "Active", role: "Business consultant", email: "lana@untitledui.com" },

];

const DashboardContent = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const tasksLeft = totalTasks - completedTasks;
  const currentProgress = Math.round((completedTasks / totalTasks) * 100);
  const progressLeft = 100 - currentProgress;

  const handleCompleteTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: "Completed" as const }
          : task
      )
    );
  };

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Key metrics and insights</p>
      </div>
      
      <div className="space-y-6">
        <KPICards 
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          tasksLeft={tasksLeft}
          currentProgress={currentProgress}
          progressLeft={progressLeft}
        />
        
        <ProgressWheel 
          completed={currentProgress}
          remaining={progressLeft}
        />
        
        <TasksTable 
          tasks={tasks}
          onCompleteTask={handleCompleteTask}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
