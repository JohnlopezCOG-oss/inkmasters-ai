/**
 * Gang sheet recommendation rules and response wording templates.
 *
 * The calculator in gangSheetCalculator.ts handles the math.
 * This file defines the business rules (as documentation for maintainers)
 * and the natural-language templates the AI should use when presenting
 * recommendations to customers.
 *
 * Edit the WORDING section to change how the AI phrases suggestions.
 * Edit the RULES section to update the logic documentation.
 */

// ── Sizing Rules (mirrors gangSheetCalculator.ts logic) ─────────────

export const SIZING_RULES = {
  rollWidth: 22,
  packingEfficiency: 0.85,
  tightFitThreshold: 0.9,
  maxSheetLength: 240,
  designSpacing: 0.25,

  steps: [
    "Ask the customer for design width, design height, quantity, and whether rotation is allowed.",
    "If any information is missing, ask a follow-up question before calculating.",
    "Check if each design fits within the 22-inch roll width.",
    "If rotation is allowed, test the swapped width and height to see if it fits.",
    "If neither orientation fits, tell the customer the design is too wide for a standard 22-inch gang sheet unless resized or split.",
    "Calculate total design area: width × height × quantity.",
    "Apply 85% packing efficiency: adjusted area = total area / 0.85.",
    "Estimate required length: adjusted area / 22.",
    "Round up to the next available gang sheet length.",
    "If the sheet is more than 90% full, mention the next size up as a safer option.",
    "If required length exceeds 240 inches, recommend splitting across multiple gang sheets.",
  ],
} as const;

// ── Required Inputs ─────────────────────────────────────────────────

export const REQUIRED_INPUTS = [
  { field: "width", question: "What is the width of your design in inches?" },
  { field: "height", question: "What is the height of your design in inches?" },
  { field: "quantity", question: "How many of that design do you need?" },
  { field: "rotation", question: "Is it okay to rotate the design if it helps fit better?" },
] as const;

// ── Example Recommendation Wording ──────────────────────────────────

export const RECOMMENDATION_WORDING = {
  goodFit:
    "A {size} gang sheet should work great for that.",
  saferOption:
    "A {size} would be a safer option if you want some extra room.",
  tightFit:
    "A {size} will fit, but it\u2019s a tight squeeze. I\u2019d recommend going with the {nextSize} for a little breathing room.",
  tooWide:
    "That design appears too wide for a standard 22-inch gang sheet. You may need to resize it or split it into panels.",
  rotationSuggestion:
    "If you\u2019re okay with rotating the design, it would fit on a {size} gang sheet.",
  multiSheet:
    "That\u2019s a bigger order! I\u2019d recommend splitting it across {count} gang sheets of {size} each \u2014 roughly {perSheet} designs per sheet.",
  missingInfo:
    "To recommend the best size, I just need a couple more details \u2014 {missing}.",
  nextStep:
    "Would you like to go ahead and order the {size}, or do you have more designs to add?",
} as const;
