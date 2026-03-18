import { getOpenAIClient, MODEL } from "./openai";
import { SYSTEM_PROMPT } from "./systemPrompt";
import {
  parseConversationDimensions,
  hasEnoughForCalculation,
  getMissingFields,
} from "./dimensionParser";
import {
  calculateGangSheet,
  isCalculatorError,
} from "./gangSheetCalculator";
import { parseEscalationStatus } from "./escalationConfig";
import type { MessageRole } from "@/types/chat";

interface CompletionMessage {
  role: MessageRole;
  content: string;
}

export interface ChatResult {
  reply: string;
}

// ── Calculator context builder ─────────────────────────────────────

/**
 * Scan the conversation for sizing details. If enough info is
 * present, run the calculator and return a context block the AI
 * can reference. If partial info is found, return hints about
 * what's still missing so the AI can ask follow-up questions.
 * Returns null if the conversation has no sizing signals at all.
 */
function buildSizingContext(messages: CompletionMessage[]): string | null {
  const parsed = parseConversationDimensions(messages);

  // Nothing sizing-related mentioned at all
  const hasAnything =
    parsed.width !== undefined ||
    parsed.height !== undefined ||
    parsed.quantity !== undefined;

  if (!hasAnything) return null;

  // Enough to run the calculator
  if (hasEnoughForCalculation(parsed)) {
    const result = calculateGangSheet({
      width: parsed.width!,
      height: parsed.height!,
      quantity: parsed.quantity!,
      allowRotation: parsed.allowRotation,
    });

    if (isCalculatorError(result)) {
      const lines = [
        `[CALCULATOR RESULT — ERROR]`,
        `Input: ${parsed.width}" × ${parsed.height}", qty ${parsed.quantity}, rotation ${parsed.allowRotation ? "allowed" : "not specified"}`,
        `Error: ${result.error}`,
      ];
      if (result.notes.length > 0) {
        lines.push(`Notes: ${result.notes.join(" ")}`);
      }
      lines.push(
        `Use this information to explain the issue to the customer clearly and suggest alternatives.`
      );
      return lines.join("\n");
    }

    const lines = [
      `[CALCULATOR RESULT — RECOMMENDATION]`,
      `Input: ${parsed.width}" × ${parsed.height}", qty ${parsed.quantity}, rotation ${parsed.allowRotation ? "allowed" : "not specified"}`,
      `Recommended sheet: ${result.recommendedSize}`,
      `Estimated required length: ${result.estimatedRequiredLength}"`,
      `Sheet fullness: ${Math.round(result.fullnessRatio * 100)}%`,
    ];
    if (result.nextSizeUp) {
      lines.push(`Next size up: ${result.nextSizeUp}`);
    }
    if (result.notes.length > 0) {
      lines.push(`Notes: ${result.notes.join(" ")}`);
    }
    lines.push(
      `Present this recommendation naturally. Do NOT show raw numbers or say "the calculator says." Just recommend the size confidently with brief reasoning.`
    );
    return lines.join("\n");
  }

  // Partial info — tell the AI what to ask for
  const missing = getMissingFields(parsed);
  const missingList: string[] = [];
  if (missing.width || missing.height) missingList.push("design dimensions (width and height in inches)");
  if (missing.quantity) missingList.push("number of designs / quantity");

  const known: string[] = [];
  if (parsed.width !== undefined && parsed.height !== undefined)
    known.push(`dimensions: ${parsed.width}" × ${parsed.height}"`);
  else if (parsed.width !== undefined) known.push(`width: ${parsed.width}"`);
  else if (parsed.height !== undefined) known.push(`height: ${parsed.height}"`);
  if (parsed.quantity !== undefined) known.push(`quantity: ${parsed.quantity}`);

  return [
    `[SIZING CONTEXT — INCOMPLETE]`,
    `Detected so far: ${known.join(", ") || "none"}`,
    `Still needed: ${missingList.join(", ")}`,
    `Ask the customer for the missing details naturally so you can recommend a gang sheet size.`,
  ].join("\n");
}

// ── Escalation context builder ─────────────────────────────────────

/**
 * Scan the conversation for escalation triggers. If an escalation-worthy
 * topic is detected, return a context block telling the AI what info has
 * been collected and what is still missing.
 * Returns null if no escalation signals are found.
 */
function buildEscalationContext(messages: CompletionMessage[]): string | null {
  const status = parseEscalationStatus(messages);

  if (!status.triggered) return null;

  if (status.complete) {
    const collected = Object.entries(status.collected)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `  - ${k}: ${v}`)
      .join("\n");

    return [
      "[ESCALATION CONTEXT — COMPLETE]",
      "The customer has provided all required info for a human handoff:",
      collected,
      "Thank them, confirm you have everything, and let them know the team will follow up.",
      "Offer the direct contact option as a fallback.",
    ].join("\n");
  }

  const collectedEntries = Object.entries(status.collected)
    .filter(([, v]) => v !== undefined);

  const collectedStr = collectedEntries.length > 0
    ? `Collected so far:\n${collectedEntries.map(([k, v]) => `  - ${k}: ${v}`).join("\n")}`
    : "No info collected yet.";

  const missingStr = status.missing
    .map((f) => `  - ${f.label} — ask: "${f.promptQuestion}"`)
    .join("\n");

  return [
    "[ESCALATION CONTEXT — COLLECTING INFO]",
    "This conversation requires human escalation.",
    collectedStr,
    `Still needed:\n${missingStr}`,
    "Ask for the missing details naturally. Do NOT ask everything at once.",
  ].join("\n");
}

// ── Main chat function ─────────────────────────────────────────────

/**
 * Send a conversation to OpenAI and return the assistant's reply.
 *
 * Before calling the model, this scans the conversation for sizing
 * details and injects calculator results as an additional system
 * message so the AI can give data-backed recommendations while
 * still speaking naturally.
 */
export async function getAssistantReply(
  conversationHistory: CompletionMessage[]
): Promise<ChatResult> {
  const client = getOpenAIClient();

  // Build the message list for the model
  const systemMessages: { role: "system"; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  const escalationContext = buildEscalationContext(conversationHistory);
  if (escalationContext) {
    systemMessages.push({ role: "system", content: escalationContext });
  }

  const sizingContext = buildSizingContext(conversationHistory);
  if (sizingContext) {
    systemMessages.push({ role: "system", content: sizingContext });
  }

  const completion = await client.chat.completions.create({
    model: MODEL,
    temperature: 0.7,
    max_tokens: 800,
    messages: [
      ...systemMessages,
      ...conversationHistory.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
    ],
  });

  const reply =
    completion.choices[0]?.message?.content?.trim() ??
    "Sorry, I wasn't able to generate a response. Please try again.";

  return { reply };
}
