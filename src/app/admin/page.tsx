import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-3 text-zinc-400">
        This section is a placeholder for future admin features.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left">
          <h2 className="font-semibold text-orange-400">Knowledge Base</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Upload FAQs, product info, and custom responses for the AI to reference.
          </p>
          <span className="mt-3 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
            Coming Soon
          </span>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left">
          <h2 className="font-semibold text-orange-400">AI Settings</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Adjust tone, temperature, and system prompt behavior.
          </p>
          <span className="mt-3 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
            Coming Soon
          </span>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left">
          <h2 className="font-semibold text-orange-400">Conversation Logs</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Review past chats to identify common questions and improve responses.
          </p>
          <span className="mt-3 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
            Coming Soon
          </span>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left">
          <h2 className="font-semibold text-orange-400">Promotions</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Set active promos so the AI can mention current deals to customers.
          </p>
          <span className="mt-3 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
            Coming Soon
          </span>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500"
      >
        Back to Chat
      </Link>
    </div>
  );
}
