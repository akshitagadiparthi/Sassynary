
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorTone, Product } from '../types';
import { PRODUCTS } from '../data/products';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Create client only if key exists (prevents blank page)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

function ensureAI() {
  if (!ai) {
    throw new Error("Missing VITE_GEMINI_API_KEY. Add it in Vercel Environment Variables.");
  }
  return ai;
}


export const generateSassyMessage = async (
  recipient: string,
  occasion: string,
  tone: GeneratorTone
): Promise<string> => {
  try {
    const prompt = `
      Write a short, punchy, and memorable message to write in a greeting card or notebook.
      Target Audience: ${recipient}
      Occasion/Context: ${occasion}
      Tone: ${tone}
      Brand: Sassynary (bold, fun, edgy).
      Keep it under 30 words. No hashtags.
    `;

    const response = await ensureAI().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 1.2,
        systemInstruction: "You are the Sassy Scribe for Sassynary stationery. You are witty, slightly roasting, and empowering.",
      }
    });

    return response.text || "Writer's block... try again!";
  } catch (error) {
    console.error("Error:", error);
    return "Oops! My sass circuit overloaded.";
  }
};

/**
 * Generates a single, witty line for the top announcement bar.
 */
export const generateDailySass = async (): Promise<string> => {
  try {
    const response = await ensureAI().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate one short, witty, and sassy announcement bar sentence (max 10 words) for a stationery shop. Examples: 'Your to-do list is judging you.', 'Buy the notebook, write the chaos.', 'Standard shipping, non-standard sass.'",
      config: {
        temperature: 1.0,
        systemInstruction: "You are a witty copywriter for Sassynary. You specialize in one-liners about stationery and life productivity.",
      }
    });
    return response.text?.trim() || "FLAT SHIPPING ₹79 ACROSS INDIA";
  } catch {
    return "FLAT SHIPPING ₹79 ACROSS INDIA";
  }
};

/**
 * Recommends a product based on the user's "vibe" using AI.
 */
export const recommendProductByVibe = async (vibe: string): Promise<{ productId: number; reason: string }> => {
  try {
    // We only send minimal product info to keep the prompt tokens low
    const productsContext = PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category
    }));

    const response = await ensureAI().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Recommend one product from this list that best matches this user's vibe: "${vibe}".
      Available Products: ${JSON.stringify(productsContext)}
      Explain your choice in one short, sassy sentence.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productId: {
              type: Type.NUMBER,
              description: "The ID of the recommended product."
            },
            reason: {
              type: Type.STRING,
              description: "A sassy and witty explanation for the recommendation."
            }
          },
          required: ["productId", "reason"]
        },
        systemInstruction: "You are the Sassy Matchmaker for Sassynary. You are an expert in pairing human chaos with perfect stationery products. Your tone is witty, insightful, and slightly edgy."
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    return {
      productId: Number(result.productId) || PRODUCTS[0].id,
      reason: result.reason || "Because you deserve nice things even if you're a mess."
    };
  } catch (error) {
    console.error("Vibe matching error:", error);
    return {
      productId: PRODUCTS[0].id,
      reason: "Our AI is currently judging its own life choices. Here's a safe bet for you."
    };
  }
};
