import { useEffect, useMemo, useState } from "react";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import NotificationCard, { Notification } from "./NotificationCard";
import { listNotifications, markNotificationRead } from "@/services/notifications";
import { getUserInfoFromCookie } from "@/services/auth";

const typeTitleMap: Record<string, string> = {
  booking_request: "New booking request",
  booking_update: "Booking update",
  meeting_ready: "Meeting ready",
  system: "System notification",
};

const NotificationsContent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      const cookieUser = JSON.parse(localStorage.getItem("user") || "null");
      console.log("Fetching notifications for user:", cookieUser);
      if (!cookieUser) {
        setNotifications([]);
        return;
      }
      
      if (!cookieUser?.id) {
        setNotifications([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await listNotifications({ recipientId: cookieUser.id });
        const mapped = response.data.map((item) => {
          const meetingPath =
            item.metadata?.bookingId != null
              ? `/meeting/${item.metadata.bookingId}`
              : undefined;
          const resolveMeetingPath = () => {
            if (typeof item.metadata?.meetingLink !== "string") {
              return meetingPath;
            }
            if (item.metadata.meetingLink.startsWith("/")) {
              return item.metadata.meetingLink;
            }
            try {
              return new URL(item.metadata.meetingLink).pathname;
            } catch {
              return meetingPath;
            }
          };
          const actionUrl = resolveMeetingPath();

          return {
            id: item.id,
            title:
              item.metadata?.status === "cancelled"
                ? "Booking cancelled"
                : item.metadata?.status === "rescheduled"
                  ? "Booking rescheduled"
                  : typeTitleMap[item.type] ?? "Notification",
            message: item.message,
            type:
              item.metadata?.status === "cancelled"
                ? "warning"
                : item.metadata?.status === "rescheduled"
                  ? "appointment"
                  : item.type === "booking_request"
                    ? "task"
                    : item.type === "booking_update" || item.type === "meeting_ready"
                      ? "appointment"
                      : "info",
            timestamp: new Date(item.createdAt).toLocaleString(),
            isRead: item.read,
            actionUrl:
              item.type === "meeting_ready" || item.metadata?.meetingLink
                ? actionUrl
                : undefined,
          };
        }) as Notification[];
        setNotifications(mapped);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load notifications.";
        toast({
          title: "Failed to load notifications",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [toast]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter((n) => !n.isRead);
    return notifications.filter((n) => n.isRead);
  }, [notifications, activeTab]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      toast({
        title: "Notification marked as read",
        description: "The notification has been marked as read.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update notification.";
      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    if (unread.length === 0) return;

    try {
      await Promise.all(unread.map((n) => markNotificationRead(n.id)));
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast({
        title: "All notifications marked as read",
        description: "All notifications have been marked as read.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update notifications.";
      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
      });
    }
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
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading notifications...</p>
            </div>
          ) : filteredNotifications.length > 0 ? (
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
