interface ProgressWheelProps {
  completed: number; // percentage 0-100
  remaining: number; // percentage 0-100
}

const ProgressWheel = ({ completed, remaining }: ProgressWheelProps) => {
  const size = 200;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke dash for completed portion
  const completedDash = (completed / 100) * circumference;
  const remainingDash = (remaining / 100) * circumference;
  
  // Rotation to start from top
  const rotation = -90;
  
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-xl font-semibold text-foreground mb-6">Progress Wheel</h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle (blue - remaining) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              transform={`rotate(${rotation + (completed / 100) * 360} ${size / 2} ${size / 2})`}
              strokeDasharray={`${remainingDash} ${circumference}`}
            />
            {/* Foreground circle (green - completed) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
              strokeDasharray={`${completedDash} ${circumference}`}
            />
          </svg>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-[hsl(142,71%,45%)]" />
            <span className="text-sm text-foreground">Percentage Of Task Completed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-[hsl(217,91%,60%)]" />
            <span className="text-sm text-foreground">Percentage Of Task Left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressWheel;
