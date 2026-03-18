/**
 * Common response patterns for the Ink Masters DTF AI assistant.
 *
 * Each category contains example phrases the AI can draw from when
 * answering frequent customer questions. The system prompt injects
 * these as reference examples — the AI will vary the wording
 * naturally so it never sounds scripted.
 *
 * To update: edit the strings below. Changes flow into the prompt
 * automatically on the next build / server restart.
 */

import { SUPPORT_CONTACT_TEXT } from "./businessKnowledge";

export interface ResponseCategory {
  topic: string;
  description: string;
  examples: readonly string[];
}

// ── Gang Sheet Help ─────────────────────────────────────────────────

export const GANG_SHEET_HELP: ResponseCategory = {
  topic: "Gang Sheet Sizing",
  description: "Used when customers ask about choosing a gang sheet size.",
  examples: [
    "How many designs do you have and about what size are they? That will help me recommend the best gang sheet.",
    "If you can share the width, height, and quantity of your designs, I can find the right sheet size for you.",
    "Our gang sheets are all 22 inches wide — the length depends on how many designs you need to fit.",
    "A bigger sheet gives you more room and better value per square inch, especially for larger orders.",
    "Would you like help figuring out which size works best for your project?",
  ],
};

// ── File Setup Help ─────────────────────────────────────────────────

export const FILE_SETUP_HELP: ResponseCategory = {
  topic: "File Setup",
  description: "Used when customers ask about artwork preparation.",
  examples: [
    "A high-resolution PNG with a transparent background works best for DTF transfers.",
    "We recommend 300 DPI for the sharpest print results.",
    "Avoid blurry or pixelated images — the higher the quality, the better your transfers will look.",
    "If you're not sure about your file quality, just upload it and our team will review it before printing.",
    "Make sure your design has a transparent background so only your artwork gets printed.",
  ],
};

// ── Pressing Guidance ───────────────────────────────────────────────

export const PRESSING_HELP: ResponseCategory = {
  topic: "Pressing Instructions",
  description: "Used when customers ask about heat pressing DTF transfers.",
  examples: [
    "For the best results, follow the pressing instructions that come with your order — settings can vary by transfer type.",
    "Generally, you want medium-to-firm pressure, but exact temperature and time depend on the transfer.",
    "We always include pressing instructions with every order so you have the right settings on hand.",
    "If your transfers aren't sticking or peeling correctly, double-check the temperature, time, and peel method.",
    "Our team can help troubleshoot pressing issues — just reach out and we will get you sorted.",
  ],
};

// ── Turnaround Questions ────────────────────────────────────────────

export const TURNAROUND_HELP: ResponseCategory = {
  topic: "Turnaround Time",
  description: "Used when customers ask how long orders take.",
  examples: [
    "For the most accurate turnaround, please check the website or contact our team directly.",
    "Turnaround times can vary depending on order volume and the time of year.",
    "We try to get orders out as quickly as possible, but I don't want to give you an estimate that might not be exact.",
    "The best way to get a current turnaround estimate is to check at checkout or reach out to the team.",
  ],
};

// ── Shipping Questions ──────────────────────────────────────────────

export const SHIPPING_HELP: ResponseCategory = {
  topic: "Shipping",
  description: "Used when customers ask about shipping options or delivery.",
  examples: [
    "Shipping options and estimated delivery times are shown at checkout based on your location.",
    "I don't want to guess on delivery times — the most accurate info will be at checkout or from our team.",
    "If you have a deadline, I'd recommend reaching out to the team so they can make sure your order arrives on time.",
    "We ship orders as soon as they're ready — you'll get tracking info once it's on the way.",
  ],
};

// ── Wholesale Questions ─────────────────────────────────────────────

export const WHOLESALE_HELP: ResponseCategory = {
  topic: "Wholesale",
  description: "Used when customers mention bulk or recurring orders.",
  examples: [
    "If you're ordering regularly or in larger quantities, wholesale pricing might be a great fit for you.",
    "For wholesale details, I'd recommend reaching out to our team — they can set you up with the best options.",
    "We work with a lot of businesses that order in bulk — our team can walk you through the wholesale process.",
    "Wholesale is definitely worth looking into if you're planning to order frequently.",
  ],
};

// ── Escalation Responses ────────────────────────────────────────────

export const ESCALATION_RESPONSES: ResponseCategory = {
  topic: "Escalation",
  description: "Used when the question requires a human team member.",
  examples: [
    "That sounds like something our team should review directly — let me connect you with them.",
    `I want to make sure this gets handled properly! You can reach our team at ${SUPPORT_CONTACT_TEXT} and they'll take care of you.`,
    "For anything related to a specific order, our team will be able to pull up the details and help you out.",
    "I'd rather connect you with someone who can give you a definitive answer on that.",
    "That's outside what I can handle, but our team is great at resolving these — reach out and they'll get you sorted.",
  ],
};

// ── Ready to Order ──────────────────────────────────────────────────

export const READY_TO_ORDER: ResponseCategory = {
  topic: "Ready to Order",
  description: "Used when the customer is ready to move forward.",
  examples: [
    "Sounds like you're all set! Head over to the website to upload your designs and place your order.",
    "Ready to go? Just pick your gang sheet size, upload your artwork, and you're good to order.",
    "If you've got your designs ready, the next step is to place your order on the website — it's quick and easy.",
    "Awesome! Once you place your order, our team will review your files and get everything started.",
    "Need help with anything else before you order, or are you ready to go?",
  ],
};

// ── All categories (for easy iteration) ─────────────────────────────

export const ALL_RESPONSE_CATEGORIES: readonly ResponseCategory[] = [
  GANG_SHEET_HELP,
  FILE_SETUP_HELP,
  PRESSING_HELP,
  TURNAROUND_HELP,
  SHIPPING_HELP,
  WHOLESALE_HELP,
  ESCALATION_RESPONSES,
  READY_TO_ORDER,
];
