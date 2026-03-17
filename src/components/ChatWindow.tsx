"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage } from "@/types/chat";
import type { ChatResponse } from "@/types/chat";
import WelcomePanel from "./WelcomePanel";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    if (hasMessages) scrollToBottom();
  }, [messages, isLoading, hasMessages, scrollToBottom]);

  const sendMessage = async (content: string) => {
    setError(null);

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].map(({ role, content }) => ({
        role,
        content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data: ChatResponse = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Something went wrong.");
      }

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to get a response.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Welcome state or conversation */}
      {!hasMessages && !isLoading ? (
        <WelcomePanel onQuickAction={sendMessage} />
      ) : (
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-3 py-4 sm:px-4 sm:py-6"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mx-3 mb-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600 sm:mx-4">
          <span className="mr-1.5 font-medium">Error:</span>
          {error}
        </div>
      )}

      {/* Input — always visible */}
      <div className="shrink-0 border-t border-gray-200 bg-white px-3 py-3 shadow-[0_-1px_4px_rgba(0,0,0,0.04)] sm:px-4">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
