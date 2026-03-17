import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-3 text-gray-500">
        This section is a placeholder for future admin features.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          <h2 className="font-semibold text-orange-500">Knowledge Base</h2>
          <p className="mt-2 text-sm text-gray-500">
            Upload FAQs, product info, and custom responses for the AI to reference.
          </p>
          <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400">
            Coming Soon
          </span>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          <h2 className="font-semibold text-orange-500">AI Settings</h2>
          <p className="mt-2 text-sm text-gray-500">
            Adjust tone, temperature, and system prompt behavior.
          </p>
          <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400">
            Coming Soon
          </span>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          <h2 className="font-semibold text-orange-500">Conversation Logs</h2>
          <p className="mt-2 text-sm text-gray-500">
            Review past chats to identify common questions and improve responses.
          </p>
          <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400">
            Coming Soon
          </span>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          <h2 className="font-semibold text-orange-500">Promotions</h2>
          <p className="mt-2 text-sm text-gray-500">
            Set active promos so the AI can mention current deals to customers.
          </p>
          <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400">
            Coming Soon
          </span>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
      >
        Back to Chat
      </Link>
    </div>
  );
}
