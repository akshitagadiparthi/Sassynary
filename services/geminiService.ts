
import { GoogleGenAI } from "@google/genai";
import { GeneratorTone } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const model = 'gemini-3-flash-preview';

export const generateDailySass = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: "Write a short, sassy, witty marketing tagline for a stationery shop called Sassynary. Max 8 words. Uppercase. No quotes.",
    });
    return response.text?.trim() || "STATIONERY FOR THE BOLD";
  } catch (error) {
    console.error("AI Error:", error);
    return "STATIONERY FOR THE BOLD";
  }
};

export const recommendProductByVibe = async (vibe: string): Promise<{productId: number, reason: string}> => {
  try {
     const prompt = `
      I have a list of stationery products ids: [1, 16, 17, 24, 27, 19, 25, 26, 18, 20, 21, 22, 23, 34, 99].
      
      Product Context:
      - ID 99 is the "Surprise Me Bundle" (Mystery Box). It explicitly contains Witty Greeting Cards.
      - If the user mentions "cards", "greeting card", "indecisive", or "surprise", YOU MUST SUGGEST ID 99.
      
      User vibe: "${vibe}".
      
      Return a JSON object with "productId" (number from list) and "reason" (short witty sentence).
      JSON only.
    `;
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    
    const text = response.text || "{}";
    const data = JSON.parse(text);
    return {
        productId: data.productId || 1,
        reason: data.reason || "This just feels right."
    };
  } catch (error) {
    console.error("AI Error:", error);
    return { productId: 1, reason: "A classic choice." };
  }
};

export const generateSassyMessage = async (recipient: string, occasion: string, tone: GeneratorTone): Promise<string> => {
    try {
        const prompt = `Write a ${tone} message for ${recipient} on ${occasion}. Max 20 words.`;
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        return response.text?.trim() || "Happy Birthday!";
    } catch (error) {
        return "Happy Birthday!";
    }
}
