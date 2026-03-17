"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/*
       * Chat panel — always mounted so conversation survives close/reopen.
       * Visibility is driven by CSS opacity + transform + pointer-events only.
       */}
      <div
        className={`
          flex flex-col overflow-hidden
          w-[calc(100vw-2.5rem)] sm:w-[390px]
          h-[70vh]             sm:h-[580px]
          max-h-[640px]
          rounded-2xl border border-gray-200 bg-white
          shadow-[0_8px_40px_rgba(0,0,0,0.14)]
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-3 pointer-events-none"}
        `}
        aria-hidden={!isOpen}
      >
        {/* ── Panel header ─────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Brand avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 ring-1 ring-orange-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4.5 w-4.5 h-[18px] w-[18px] text-orange-500"
              >
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 20.97V18.35a47.71 47.71 0 0 1-1.087-.091C2.99 18.009 1.5 16.396 1.5 14.449V6.385c0-1.866 1.369-3.477 3.413-3.727ZM15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
              </svg>
            </div>

            {/* Name + online indicator */}
            <div>
              <p className="text-sm font-semibold leading-tight text-gray-900">
                Gang Sheet Assistant
              </p>
              <p className="flex items-center gap-1 text-[11px] text-green-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                Online — ready to help
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* ── Chat content (unchanged) ──────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatWindow />
        </div>
      </div>

      {/* ── Floating bubble button ────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg ring-2 ring-orange-400/30 transition-all duration-200 hover:bg-orange-600 hover:scale-105 active:scale-95"
      >
        {/* Toggle between chat icon and X */}
        <span
          className={`absolute transition-all duration-200 ${
            isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
          }`}
        >
          {/* X icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </span>
        <span
          className={`absolute transition-all duration-200 ${
            isOpen ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
          }`}
        >
          {/* Chat bubble icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 20.97V18.35a47.71 47.71 0 0 1-1.087-.091C2.99 18.009 1.5 16.396 1.5 14.449V6.385c0-1.866 1.369-3.477 3.413-3.727ZM15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
