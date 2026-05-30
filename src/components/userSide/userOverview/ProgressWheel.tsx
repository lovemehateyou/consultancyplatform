interface ProgressWheelProps {
  completed: number; // percentage 0-100
  remaining: number; // percentage 0-100
}

const ProgressWheel = ({ completed, remaining }: ProgressWheelProps) => {
  const size = 200;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const completedDash = (completed / 100) * circumference;

  return (
    <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight">Progress Wheel</h3>
          <p className="text-sm text-muted-foreground">Visual overview of your average goal completion</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(217, 91%, 60%)"
              strokeOpacity={0.12}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${completedDash} ${circumference}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground tracking-tight">{completed}%</span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">
              Goals Complete
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="flex items-center justify-between gap-6 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 min-w-[260px]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[hsl(142,71%,45%)]" />
              <span className="text-sm text-foreground font-medium">Average Goal Completion</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{completed}%</span>
          </div>
          <div className="flex items-center justify-between gap-6 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 min-w-[260px]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[hsl(217,91%,60%)]" />
              <span className="text-sm text-foreground font-medium">Goal Completion Left</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{remaining}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressWheel;
