import ChatWindow from "@/components/ChatWindow";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden">
        <ChatWindow />
      </section>
    </div>
  );
}
