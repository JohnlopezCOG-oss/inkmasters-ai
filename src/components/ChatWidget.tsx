"use client";

import { useEffect, useMemo, useState } from "react";
import ChatWindow from "./ChatWindow";

const CLOSED_SIZE = 72;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [viewport, setViewport] = useState({ width: 390, height: 580 });

  const collapseWidget = () => setIsOpen(false);

  useEffect(() => {
    const syncViewport = () => {
      setIsEmbedded(window.self !== window.top);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const embeddedSize = useMemo(() => {
    const openWidth = Math.min(Math.max(viewport.width - 16, 280), 390);
    const openHeight = Math.min(Math.max(viewport.height - 16, 420), 640);

    return {
      width: isOpen ? openWidth : CLOSED_SIZE,
      height: isOpen ? openHeight : CLOSED_SIZE,
    };
  }, [isOpen, viewport.height, viewport.width]);

  useEffect(() => {
    if (!isEmbedded) return;

    window.parent.postMessage(
      {
        source: "inkmasters-ai-widget",
        type: "resize",
        isOpen,
        width: embeddedSize.width,
        height: embeddedSize.height,
      },
      "*"
    );
  }, [embeddedSize.height, embeddedSize.width, isEmbedded, isOpen]);

  const panelClass =
    "mb-3 flex h-[70vh] max-h-[640px] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.14)] sm:h-[580px] sm:w-[390px]";

  const bubbleClass =
    "flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg ring-2 ring-orange-400/30 transition-all duration-200 hover:bg-orange-600 hover:scale-105 active:scale-95";

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="pointer-events-auto absolute bottom-5 right-5 flex flex-col items-end">
      {/* Open state: panel only */}
      {isOpen && (
      <div className={`${panelClass} animate-widget-in`}>
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

          <div className="flex items-center gap-1">
            {/* Minimize button */}
            <button
              onClick={collapseWidget}
              aria-label="Minimize chat"
              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M4.75 9.25a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H4.75Z" />
              </svg>
            </button>

            {/* Close button */}
            <button
              onClick={collapseWidget}
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
        </div>

        {/* ── Chat content (unchanged) ──────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatWindow />
        </div>
      </div>
      )}

      {/* ── Floating bubble button ────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Chat with us"
          className={bubbleClass}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 20.97V18.35a47.71 47.71 0 0 1-1.087-.091C2.99 18.009 1.5 16.396 1.5 14.449V6.385c0-1.866 1.369-3.477 3.413-3.727ZM15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
          </svg>
        </button>
      )}
      </div>
    </div>
  );
}
