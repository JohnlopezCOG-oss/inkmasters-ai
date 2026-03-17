"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-message-in">
      {/* Avatar matching assistant bubble style */}
      <div className="mb-1 hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-600/20 sm:flex">
        <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
      </div>

      <div className="rounded-2xl rounded-bl-md bg-zinc-800/80 px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400/80 [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400/80 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400/80 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
