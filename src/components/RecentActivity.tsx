interface ActivityItem {
  action: string;
  target: string;
  time: string;
}

const RecentActivity = () => {
  const activities: ActivityItem[] = [
    { action: "Completed project", target: "Mobile App Redesign", time: "2 hours ago" },
    { action: "Shared design", target: "Dashboard UI Kit", time: "1 day ago" },
    { action: "Joined team", target: "Product Innovation", time: "3 days ago" },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="font-semibold text-foreground mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0 last:pb-0">
            <div className="text-sm">
              <span className="text-foreground font-medium">{activity.action}</span>{" "}
              <span className="text-tag-blue">{activity.target}</span>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
