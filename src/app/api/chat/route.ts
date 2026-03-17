import { NextRequest, NextResponse } from "next/server";
import { getAssistantReply } from "@/lib/chat";
import type { ChatRequest, ChatResponse } from "@/types/chat";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();

    if (
      !body.messages ||
      !Array.isArray(body.messages) ||
      body.messages.length === 0
    ) {
      return NextResponse.json<ChatResponse>(
        { message: "", error: "Messages array is required." },
        { status: 400 }
      );
    }

    const { reply } = await getAssistantReply(body.messages);

    return NextResponse.json<ChatResponse>({ message: reply });
  } catch (err: unknown) {
    console.error("Chat API error:", err);

    const isAuthError =
      err instanceof Error &&
      (err.message.includes("API key") || err.message.includes("401"));

    return NextResponse.json<ChatResponse>(
      {
        message: "",
        error: isAuthError
          ? "The AI service is not configured correctly. Please contact support."
          : "Something went wrong. Please try again in a moment.",
      },
      { status: isAuthError ? 503 : 500 }
    );
  }
}
