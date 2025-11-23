import Groq from "groq-sdk";

// Check if running on server side
if (typeof window !== 'undefined') {
  throw new Error("Groq client should only be initialized on the server side");
}

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY in environment variables");
}

export const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});