import { GoogleGenAI } from "@google/genai";

export const runtime = 'edge';

const ai = new GoogleGenAI({});

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method Not Allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { message } = body;

  if (!message || typeof message !== "string" || message.trim() === "") {
    return new Response(
      JSON.stringify({ error: "No message provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const prompt = `
You are a helpful assistant about fashion, clothing, styling, shoe brands.
If question is unrelated to fashion, reply: "Sorry, I can only help with fashion‑related questions. 100 Word limit. No asteriks."

User: ${message}
Assistant:
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    let reply = response.text?.trim();

    if (!reply || reply.length < 5) {
      reply = "Here are some gym clothing brands: Nike, Adidas, Gymshark, Lululemon, Under Armour.";
    }

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // console.error not recommended in edge, can use console.log if needed
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
