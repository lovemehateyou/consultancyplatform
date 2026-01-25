import { useState, useMemo } from "react";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import NotificationCard, { Notification } from "./NotificationCard";

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Task Assigned",
    message: "You have been assigned a new task: Business Plan Review",
    type: "task",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Appointment Reminder",
    message: "Your consultation with Dr. Smith is scheduled for tomorrow at 10:00 AM",
    type: "appointment",
    timestamp: "5 hours ago",
    isRead: false,
  },
  {
    id: "3",
    title: "Document Uploaded",
    message: "A new document has been uploaded to your library: Q4 Financial Report",
    type: "info",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "4",
    title: "Task Completed",
    message: "Your task 'Market Analysis' has been marked as completed",
    type: "success",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: "5",
    title: "Payment Pending",
    message: "You have a pending payment for your last consultation session",
    type: "warning",
    timestamp: "3 days ago",
    isRead: false,
  },
  {
    id: "6",
    title: "Profile Update Required",
    message: "Please update your professional information to continue receiving assignments",
    type: "warning",
    timestamp: "4 days ago",
    isRead: true,
  },
];

const NotificationsContent = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter((n) => !n.isRead);
    return notifications.filter((n) => n.isRead);
  }, [notifications, activeTab]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "You're all caught up!"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Tabs and Content */}
      <Card>
        <CardHeader className="pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="read">
                Read ({notifications.length - unreadCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications to display</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default NotificationsContent;
