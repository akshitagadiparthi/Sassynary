
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
     // Sanitize user input to prevent prompt injection
     const sanitizedVibe = vibe.slice(0, 100).replace(/["'\n\r]/g, '');
     
     const prompt = `
      I have a list of stationery products ids: [1, 16, 17, 24, 27, 19, 25, 26, 18, 20, 21, 22, 23, 34, 128, 129, 130, 131].
      
      Product Context:
      - IDs 128-131 are premium "Hard-Bound Notebooks". Suggest these for professional, luxury-focused, or premium vibes.
      - IDs 1, 16, 17, 24, 27 are spiral notebooks with various themes.
      - Other IDs are planners and various notebook styles.
      
      User vibe: "${sanitizedVibe}".
      
      Return a JSON object with "productId" (number from list) and "reason" (short witty sentence).
      JSON only. Do not include any code or explanations, just the JSON object.
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
