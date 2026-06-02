import { Link } from "react-router-dom";
import { Bell, CheckCircle, AlertCircle, Info, Calendar, FileText, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NotificationType = "info" | "success" | "warning" | "task" | "appointment";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  task: FileText,
  appointment: Calendar,
};

const colorMap = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-amber-500",
  task: "text-primary",
  appointment: "text-purple-500",
};

const NotificationCard = ({ notification, onMarkAsRead }: NotificationCardProps) => {
  const Icon = iconMap[notification.type];

  return (
    <Card
      className={cn(
        "p-4 flex items-start gap-4 transition-all hover:shadow-md",
        !notification.isRead && "bg-muted/50 border-l-4 border-l-primary"
      )}
    >
      <div className={cn("mt-1", colorMap[notification.type])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-medium text-foreground truncate">{notification.title}</h4>
          {!notification.isRead && (
            <Badge variant="secondary" className="text-xs shrink-0">New</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
          <div className="flex items-center gap-2">
            {/* {notification.actionUrl && (
              <Button variant="default" size="sm" className="text-xs h-7" asChild>
                <Link to={notification.actionUrl}>
                  <Video className="w-3.5 h-3.5 mr-1" />
                  Join meeting
                </Link>
              </Button>
            )} */}
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => onMarkAsRead(notification.id)}
              >
                Mark as read
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationCard;
