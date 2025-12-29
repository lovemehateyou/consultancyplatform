import KPICards from "./KPICards";
import ProgressWheel from "./ProgressWheel";
import TasksTable, { Task } from "./TasksTable";

const sampleTasks: Task[] = [
  { id: "1", name: "Task 1", status: "Active", role: "Law Consultant", email: "olivia@untitledui.com" },
  { id: "2", name: "Task 2", status: "Completed", role: "Finance Consultant", email: "phoenix@untitledui.com" },
  { id: "3", name: "Task 3", status: "Active", role: "Frontend Developer", email: "lana@untitledui.com" },
  { id: "4", name: "Task 4", status: "Completed", role: "Backend Developer", email: "demi@untitledui.com" },
  { id: "5", name: "Task 5", status: "Completed", role: "Fullstack Developer", email: "candice@untitledui.com" },
];

const DashboardContent = () => {
  const totalTasks = sampleTasks.length;
  const completedTasks = sampleTasks.filter(t => t.status === "Completed").length;
  const tasksLeft = totalTasks - completedTasks;
  const currentProgress = Math.round((completedTasks / totalTasks) * 100);
  const progressLeft = 100 - currentProgress;

  const handleBookCall = (taskId: string) => {
    console.log("Book call for task:", taskId);
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
          tasks={sampleTasks}
          onBookCall={handleBookCall}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
