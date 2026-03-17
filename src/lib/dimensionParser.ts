/**
 * Lightweight parser that extracts design dimensions, quantity, and
 * rotation preference from plain-language customer messages.
 *
 * This is intentionally simple regex-based extraction — not an NLP
 * engine. It catches the common patterns customers use and returns
 * whatever it can find. Missing fields come back as undefined so the
 * caller knows what follow-up questions to ask.
 */

export interface ParsedDimensions {
  width?: number;
  height?: number;
  quantity?: number;
  allowRotation?: boolean;
}

/**
 * Which sizing fields are still missing from a parsed result.
 * Used to tell the AI what to ask the customer next.
 */
export interface MissingFields {
  width: boolean;
  height: boolean;
  quantity: boolean;
}

// ── Regex patterns ─────────────────────────────────────────────────

/**
 * Matches dimension patterns like:
 *   4x5, 4"x5", 4 x 5, 4" × 5", 4 by 5, 4"by 5"
 *   4.5x6.25, etc.
 */
const DIMENSION_PATTERN =
  /(\d+\.?\d*)\s*"?\s*(?:x|×|by)\s*(\d+\.?\d*)\s*"?/i;

/**
 * Matches quantity patterns like:
 *   10 designs, 5 images, 20 logos, qty 15, quantity: 8, x12, need 6
 */
const QUANTITY_PATTERNS = [
  /(\d+)\s*(?:designs?|images?|logos?|graphics?|prints?|pieces?|transfers?|copies?|of them)/i,
  /(?:qty|quantity|count)[:\s]*(\d+)/i,
  /(?:need|want|have|got|doing|printing|order(?:ing)?)\s+(\d+)/i,
  /x\s*(\d+)(?:\s|$|,)/i,
];

/** Detects if the customer mentions rotation being OK. */
const ROTATION_YES =
  /rotat(?:e|ed|ion)?\s*(?:is\s*)?(?:ok|okay|fine|allowed|sure|yes|can|good)/i;

const ROTATION_NO =
  /(?:no|don'?t|do not|cannot|can'?t)\s*rotat/i;

// ── Parser ─────────────────────────────────────────────────────────

export function parseDimensions(text: string): ParsedDimensions {
  const result: ParsedDimensions = {};

  // Dimensions
  const dimMatch = text.match(DIMENSION_PATTERN);
  if (dimMatch) {
    result.width = parseFloat(dimMatch[1]);
    result.height = parseFloat(dimMatch[2]);
  }

  // Quantity
  for (const pattern of QUANTITY_PATTERNS) {
    const qtyMatch = text.match(pattern);
    if (qtyMatch) {
      const num = parseInt(qtyMatch[1], 10);
      if (num > 0 && num <= 10_000) {
        result.quantity = num;
        break;
      }
    }
  }

  // Rotation preference
  if (ROTATION_YES.test(text)) {
    result.allowRotation = true;
  } else if (ROTATION_NO.test(text)) {
    result.allowRotation = false;
  }

  return result;
}

/** Returns which required fields are still missing. */
export function getMissingFields(parsed: ParsedDimensions): MissingFields {
  return {
    width: parsed.width === undefined,
    height: parsed.height === undefined,
    quantity: parsed.quantity === undefined,
  };
}

/** True if we have at least width + height + quantity. */
export function hasEnoughForCalculation(parsed: ParsedDimensions): boolean {
  return (
    parsed.width !== undefined &&
    parsed.height !== undefined &&
    parsed.quantity !== undefined
  );
}

/**
 * Scan the full conversation for dimension details. Later messages
 * override earlier ones so the customer can correct themselves.
 */
export function parseConversationDimensions(
  messages: { role: string; content: string }[]
): ParsedDimensions {
  const merged: ParsedDimensions = {};

  for (const msg of messages) {
    if (msg.role !== "user") continue;
    const parsed = parseDimensions(msg.content);

    if (parsed.width !== undefined) merged.width = parsed.width;
    if (parsed.height !== undefined) merged.height = parsed.height;
    if (parsed.quantity !== undefined) merged.quantity = parsed.quantity;
    if (parsed.allowRotation !== undefined)
      merged.allowRotation = parsed.allowRotation;
  }

  return merged;
}
