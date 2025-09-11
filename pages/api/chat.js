import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // ensure body is parsed
  const { message } = req.body;

  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ error: "No message provided" });
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

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
