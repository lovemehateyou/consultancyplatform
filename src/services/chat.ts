import { API_BASE_URL, parseResponse } from "./api";

const CHAT_BASE_URL = `${API_BASE_URL}/chat`;

export type ChatMessage = {
  id: string;
  threadId: string;
  sender: "user" | "ai";
  message: string;
  createdAt: string;
};

export type ChatThreadResponse = {
  data: {
    threadId: string;
    messages: ChatMessage[];
  };
};

export type ChatSendResponse = {
  data: {
    threadId: string;
    reply: string;
  };
};

export const fetchChatThread = async (): Promise<ChatThreadResponse> => {
  const response = await fetch(`${CHAT_BASE_URL}/thread`, {
    credentials: "include",
  });

  return parseResponse<ChatThreadResponse>(response);
};

export const sendChatMessage = async (message: string): Promise<ChatSendResponse> => {
  const response = await fetch(`${CHAT_BASE_URL}/messages`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return parseResponse<ChatSendResponse>(response);
};
