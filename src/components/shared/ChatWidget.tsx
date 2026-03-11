import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, Send } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/authContext";
import { fetchChatThread, sendChatMessage, type ChatMessage } from "@/services/chat";
import { cn } from "@/lib/utils";

const isAdminPath = (path: string) => path.toLowerCase().startsWith("/admin");
const isLandingPath = (path: string) => path === "/";

const buildTempMessage = (message: string, sender: "user" | "ai"): ChatMessage => ({
  id: `temp-${Date.now()}`,
  threadId: "temp",
  sender,
  message,
  createdAt: new Date().toISOString(),
});

const ChatWidget = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const shouldShow = useMemo(() => {
    if (isAdminPath(location.pathname)) return false;
    if (user?.role === "admin") return false;
    if (isLandingPath(location.pathname)) return true;
    return user?.role === "user" || user?.role === "consultant";
  }, [user, location.pathname]);

  useEffect(() => {
    if (!open || !shouldShow || !user) return;

    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchChatThread();
        if (!active) return;
        setMessages(response.data.messages ?? []);
      } catch (err) {
        if (!active) return;
        const message = err instanceof Error ? err.message : "Failed to load chat";
        setError(message);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [open, shouldShow]);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (!user) {
      setError("Please sign in to start a chat.");
      return;
    }

    const optimistic = buildTempMessage(trimmed, "user");
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, optimistic]);

    try {
      const response = await sendChatMessage(trimmed);
      setMessages((prev) => [...prev, buildTempMessage(response.data.reply, "ai")]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send message";
      setError(message);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  if (!shouldShow) return null;

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onClick={() => setOpen(true)}
        aria-label="Open support chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl p-0">
          <div className="flex h-[520px] flex-col">
            <DialogHeader className="border-b bg-blue-600 px-6 py-4 text-left text-white">
              <DialogTitle className="text-white">Platform AI Support</DialogTitle>
              <p className="text-sm text-blue-50">
                Ask about platform features or guidance for users and consultants.
              </p>
            </DialogHeader>

            <div className="flex-1 space-y-4 overflow-y-auto bg-white px-6 py-4">
              {loading && (
                <p className="text-sm text-slate-500">Loading conversation...</p>
              )}
              {!loading && messages.length === 0 && (
                <p className="text-sm text-slate-500">
                  {user
                    ? "Start a conversation. I will answer using platform documentation."
                    : "Sign in to start a conversation with the AI assistant."}
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow",
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-800",
                    )}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {error && (
              <div className="border-t bg-rose-50 px-6 py-2 text-sm text-rose-600">
                {error}
              </div>
            )}

            <div className="border-t bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question..."
                  disabled={!user}
                  className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!user}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatWidget;
