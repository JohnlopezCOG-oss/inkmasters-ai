export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  messages: { role: MessageRole; content: string }[];
}

export interface ChatResponse {
  message: string;
  error?: string;
}
