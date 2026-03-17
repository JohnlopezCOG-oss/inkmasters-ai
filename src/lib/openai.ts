import OpenAI from "openai";

let _client: OpenAI | null = null;

/** Lazy singleton — only created when first called at runtime, not at build time. */
export function getOpenAIClient(): OpenAI {
  if (!_client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is not set.");
    }
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
