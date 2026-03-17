"use client";

import type { ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2 animate-message-in ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div className="mb-1 hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 ring-1 ring-orange-200 sm:flex">
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
        </div>
      )}

      <div
        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed sm:max-w-[72%] ${
          isUser
            ? "rounded-br-md bg-orange-500 text-white shadow-sm"
            : "rounded-bl-md border border-gray-200 bg-white text-gray-800 shadow-sm"
        }`}
      >
        {!isUser && (
          <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-orange-500">
            Gang Sheet Assistant
          </p>
        )}
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="mb-1 hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 ring-1 ring-gray-300 sm:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 text-gray-500"
          >
            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
          </svg>
        </div>
      )}
    </div>
  );
}
