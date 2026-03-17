"use client";

interface QuickAction {
  label: string;
  message: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Help me choose a gang sheet",
    message: "I need help choosing the right gang sheet size for my order.",
  },
  {
    label: "File setup help",
    message: "What are the file requirements for submitting my designs?",
  },
  {
    label: "Pressing instructions",
    message: "Can you walk me through how to heat press DTF transfers?",
  },
  {
    label: "Wholesale questions",
    message:
      "I'm interested in wholesale or bulk ordering. What options do you have?",
  },
];

interface WelcomePanelProps {
  onQuickAction: (message: string) => void;
}

export default function WelcomePanel({ onQuickAction }: WelcomePanelProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600/15">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7 text-orange-500"
        >
          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 20.97V18.35a47.71 47.71 0 0 1-1.087-.091C2.99 18.009 1.5 16.396 1.5 14.449V6.385c0-1.866 1.369-3.477 3.413-3.727ZM15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
        </svg>
      </div>

      {/* Welcome text */}
      <h2 className="text-center text-lg font-semibold text-white sm:text-xl">
        Ink Masters DTF Gang Sheet Assistant
      </h2>
      <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-zinc-400 sm:text-base">
        Need help picking the right gang sheet? I can recommend the best size
        based on your designs.
      </p>

      {/* Quick actions */}
      <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-2.5 sm:grid-cols-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => onQuickAction(action.message)}
            className="group rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-orange-500/40 hover:bg-zinc-800/80 hover:text-white"
          >
            <span className="inline-block transition group-hover:translate-x-0.5">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
