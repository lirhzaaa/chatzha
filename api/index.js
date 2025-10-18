import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: message,
    });

    const reply =
      result?.response?.text() ||
      result?.output_text ||
      result?.text ||
      "Maaf, tidak ada respons dari AI.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error generating content:", error.message);
    res.status(500).json({ error: "Something went wrong on the AI side" });
  }
}
