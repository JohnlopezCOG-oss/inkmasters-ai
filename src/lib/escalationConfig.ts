/**
 * Escalation workflow configuration for the Ink Masters DTF assistant.
 *
 * Defines which topics trigger a human handoff, what customer info
 * the AI should collect, and how to phrase each step of the process.
 *
 * The detector in chat.ts scans the conversation for trigger keywords
 * and injects an [ESCALATION CONTEXT] system message so the AI knows
 * to switch into info-collection mode.
 */

// ── Trigger keywords (case-insensitive) ─────────────────────────────

export const ESCALATION_TRIGGERS: readonly string[] = [
  "refund",
  "money back",
  "reprint",
  "damaged",
  "broken",
  "ripped",
  "torn",
  "missing order",
  "lost order",
  "never received",
  "didn't arrive",
  "didn't get",
  "wrong order",
  "wrong item",
  "custom pricing",
  "bulk pricing",
  "special pricing",
  "artwork review",
  "review my file",
  "check my design",
  "order issue",
  "order problem",
  "tracking not working",
  "complaint",
];

// ── Info to collect during escalation ───────────────────────────────

export interface EscalationField {
  key: string;
  label: string;
  required: boolean;
  promptQuestion: string;
}

export const ESCALATION_FIELDS: readonly EscalationField[] = [
  {
    key: "name",
    label: "Customer name",
    required: true,
    promptQuestion: "Could I get your name so our team knows who to follow up with?",
  },
  {
    key: "email",
    label: "Email address",
    required: true,
    promptQuestion: "What email address should our team use to reach you?",
  },
  {
    key: "orderNumber",
    label: "Order number",
    required: false,
    promptQuestion: "If you have an order number, that will help our team pull up the details quickly.",
  },
  {
    key: "description",
    label: "Brief description of the issue",
    required: true,
    promptQuestion: "Can you give me a quick summary of what happened so I can pass it along?",
  },
];

// ── Workflow phrasing templates ──────────────────────────────────────

import { SUPPORT_CONTACT_TEXT } from "./businessKnowledge";

export const ESCALATION_PHRASING = {
  acknowledge:
    "I completely understand, and I want to make sure this gets taken care of properly. Our team is best equipped to help with this.",
  collectIntro:
    "So I can connect you with the right person, could you share a few details?",
  collectComplete:
    "Thank you! I have everything I need. Our team will review this and follow up with you shortly.",
  fallbackContact:
    `You can also reach our team directly at ${SUPPORT_CONTACT_TEXT} if you prefer.`,
};

// ── Regex patterns built from triggers ──────────────────────────────

const triggerPattern = new RegExp(
  ESCALATION_TRIGGERS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "i"
);

export function messageMatchesEscalation(text: string): boolean {
  return triggerPattern.test(text);
}

/**
 * Scan a conversation for collected escalation details.
 * Returns which fields have been provided and which are still missing.
 */
export interface EscalationStatus {
  triggered: boolean;
  collected: Record<string, string | undefined>;
  missing: EscalationField[];
  complete: boolean;
}

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/;
const ORDER_NUM_RE = /(?:#|order\s*(?:number|#|num)?[:\s]*)(\w{3,})/i;

const NAME_PATTERNS = [
  /(?:my name is|i'm|i am|this is|name'?s)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
  /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$/,
];

export function parseEscalationStatus(
  messages: { role: string; content: string }[]
): EscalationStatus {
  let triggered = false;
  let firstEscalationMessage: string | undefined;
  const collected: Record<string, string | undefined> = {};

  for (const msg of messages) {
    if (msg.role === "user") {
      const isEscalation = messageMatchesEscalation(msg.content);
      if (isEscalation) {
        triggered = true;
        if (!firstEscalationMessage) {
          firstEscalationMessage = msg.content;
        }
      }

      const emailMatch = msg.content.match(EMAIL_RE);
      if (emailMatch) collected.email = emailMatch[0];

      const orderMatch = msg.content.match(ORDER_NUM_RE);
      if (orderMatch) collected.orderNumber = orderMatch[1];

      if (!collected.name) {
        for (const pattern of NAME_PATTERNS) {
          const nameMatch = msg.content.match(pattern);
          if (nameMatch) {
            collected.name = nameMatch[1].trim();
            break;
          }
        }
      }
    }
  }

  if (triggered && !collected.description && firstEscalationMessage) {
    collected.description = firstEscalationMessage;
  }

  const missing = ESCALATION_FIELDS.filter(
    (f) => f.required && !collected[f.key]
  );

  return {
    triggered,
    collected,
    missing,
    complete: triggered && missing.length === 0,
  };
}
