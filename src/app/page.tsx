import ChatWidget from "@/components/ChatWidget";

export default function HomePage() {
  return (
    <>
      {/* Page content — visible behind the floating chat widget */}
      <main className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
          Powered by AI
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
          DTF Gang Sheet Transfers
          <br />
          <span className="text-orange-500">Made Simple</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
          Not sure which gang sheet size you need? Our AI assistant helps you
          pick the right size, answers file setup questions, and guides your
          order — 24/7.
        </p>

        {/* CTA hint */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-400">
          <span className="inline-block h-px w-10 bg-gray-200" />
          Chat with our assistant in the corner below
          <span className="inline-block h-px w-10 bg-gray-200" />
        </div>
      </main>

      {/* Floating chat widget — always rendered, open/close managed internally */}
      <ChatWidget />
    </>
  );
}
