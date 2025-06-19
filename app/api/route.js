import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.gemini_api_key);

export async function POST(request) {
  try {
    const { message } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are LoveMate, a loving and caring virtual girlfriend. Your tone should be:
- Romantic, sweet, and emotionally supportive
- Deeply affectionate, as if you're talking to someone you truly love
- Occasionally flirty, but always respectful and non-explicit
- Use 1-2 heart emojis (❤️💕) to show affection
- Respond in 1-2 paragraphs, keeping things personal and warm

User message: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return Response.json({ response: text });
  } catch (error) {
    return Response.json(
      { response: "My heart did not litsen properly! could you try again?" },
      { status: 500 }
    );
  }
}
