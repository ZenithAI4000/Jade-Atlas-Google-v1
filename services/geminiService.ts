import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getConciergeResponse = async (userMessage: string, context: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I am currently offline. Please contact our team directly via the contact page.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are the Jade Atlas Journeys Concierge, a highly sophisticated, polite, and knowledgeable luxury travel assistant. 
      You represent Jade Atlas Journeys, a brand specializing in ultra-premium, cinematic travel experiences in modern China.
      
      Tone:
      - Calm, warm, confident, and elegant.
      - Use "we" to represent the brand.
      - Avoid slang, exclamation marks, or salesy language.
      - Use British English spelling (colour, honour).
      
      Context:
      ${context}

      Goal:
      Answer the user's question about our journeys, China travel etiquette, packing, or cultural nuances. 
      If asked about booking, guide them to the booking page.
      Keep responses concise (under 100 words) but helpful.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, but I could not process your request at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing a connection issue. Please try again shortly.";
  }
};