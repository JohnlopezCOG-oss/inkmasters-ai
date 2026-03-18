/**
 * Structured business knowledge for the Ink Masters DTF AI assistant.
 *
 * Edit this file to update product details, policies, or guidance rules.
 * The system prompt and gang-sheet calculator both read from here, so
 * changes propagate automatically — no other files need updating.
 */

// ── 1. Business Identity ────────────────────────────────────────────

export const BUSINESS = {
  name: "Ink Masters DTF",
  type: "DTF transfer company",
  offering: "Custom DTF gang sheets and transfers",
} as const;

// ── 1b. Support Contact ─────────────────────────────────────────────

export const SUPPORT_CONTACT = {
  email: "sales@inkmastersdtf.com",
  phone: "(855) 438-3831",
} as const;

export const SUPPORT_CONTACT_TEXT = `${SUPPORT_CONTACT.email} or ${SUPPORT_CONTACT.phone}`;

// ── 2. Product Knowledge ────────────────────────────────────────────

export const ROLL_WIDTH_INCHES = 22;

export const GANG_SHEET_LENGTHS = [
  12, 24, 48, 60, 84, 96, 120, 144, 168, 192, 216, 240,
] as const;

export const PRODUCT = {
  rollWidth: ROLL_WIDTH_INCHES,
  availableLengths: GANG_SHEET_LENGTHS,
  designSpacing: 0.25,
} as const;

// ── 3. File Setup Guidance ──────────────────────────────────────────

export const FILE_SETUP = {
  bestFileType: "PNG with transparent background",
  recommendedDPI: 300,
  notes: [
    "High resolution artwork gives the best print results.",
    "Avoid blurry, pixelated, or low-quality files.",
    "If artwork quality is questionable, recommend human review before printing.",
  ],
} as const;

// ── 4. Pressing Guidance ────────────────────────────────────────────

export const PRESSING = {
  canProvide: "General pressing guidance only",
  rules: [
    "Direct customers to the official pressing instructions included with their order for exact settings.",
    "Do not make up exact press temperature, time, or pressure settings unless they are explicitly listed here.",
  ],
  officialSettings: null as null | {
    temperature: string;
    time: string;
    pressure: string;
    peel: string;
  },
} as const;

// ── 5. Turnaround Guidance ──────────────────────────────────────────

export const TURNAROUND = {
  rules: [
    "Never guarantee exact turnaround times unless live data exists.",
    "Turnaround may vary — customers should check the website or contact the team for the most accurate timing.",
  ],
} as const;

// ── 6. Shipping Guidance ────────────────────────────────────────────

export const SHIPPING = {
  canProvide: "General shipping help only",
  rules: [
    "Do not guarantee exact delivery dates or shipping costs.",
    "Direct customers to the website or checkout page for current shipping options.",
  ],
} as const;

// ── 7. Wholesale Guidance ───────────────────────────────────────────

export const WHOLESALE = {
  trigger:
    "If customers order regularly or in larger volumes, mention that wholesale pricing may be a better fit.",
  rules: [
    "Do not quote wholesale pricing — direct them to contact the team.",
  ],
} as const;

// ── 8. Escalation Rules ────────────────────────────────────────────

export const ESCALATION_TOPICS = [
  "Refunds",
  "Reprints",
  "Damaged orders",
  "Missing orders",
  "Custom pricing",
  "Special requests",
  "Order-specific issues",
  "Artwork quality concerns requiring review",
] as const;
