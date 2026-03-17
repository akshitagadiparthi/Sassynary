
import { GoogleGenAI } from "@google/genai";
import { GeneratorTone } from '../types';

// ============ SECURITY: API Key & Rate Limiting ============

if (!import.meta.env.VITE_GEMINI_API_KEY) {
  console.warn('⚠️  VITE_GEMINI_API_KEY is not set. AI features will be disabled.');
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
const model = 'gemini-3-flash-preview';

// Rate Limiting: Track API calls per session to prevent abuse
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_CALLS = {
  generateDailySass: 5,      // 5 calls per minute
  recommendProductByVibe: 10, // 10 calls per minute
  generateSassyMessage: 15,  // 15 calls per minute
};

function checkRateLimit(functionName: keyof typeof RATE_LIMIT_MAX_CALLS): boolean {
  const now = Date.now();
  const key = `${functionName}`;
  const limit = RATE_LIMIT_MAX_CALLS[functionName];
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  const entry = rateLimitStore.get(key)!;
  
  // Reset counter if window expired
  if (now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  // Check if under limit
  if (entry.count < limit) {
    entry.count++;
    return true;
  }
  
  return false;
}

export const generateDailySass = async (): Promise<string> => {
  // Rate limit check
  if (!checkRateLimit('generateDailySass')) {
    console.warn('Rate limit exceeded for generateDailySass');
    return "STATIONERY FOR THE BOLD";
  }

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
  // Rate limit check
  if (!checkRateLimit('recommendProductByVibe')) {
    console.warn('Rate limit exceeded for recommendProductByVibe');
    return { productId: 1, reason: "A classic choice." };
  }

  try {
     // Sanitize user input to prevent prompt injection
     const sanitizedVibe = vibe.slice(0, 100).replace(/[\"'\\n\\r]/g, '');
     
     const prompt = `
      I have a list of stationery products ids: [1, 16, 17, 24, 27, 19, 25, 26, 18, 20, 21, 22, 23, 34, 128, 129, 130, 131].
      
      Product Context:
      - IDs 128-131 are premium Hard-Bound Notebooks. Suggest these for professional, luxury-focused, or premium vibes.
      - IDs 1, 16, 17, 24, 27 are spiral notebooks with various themes.
      - Other IDs are planners and various notebook styles.
      
      User vibe: \"${sanitizedVibe}\".
      
      Return a JSON object with \"productId\" (number from list) and \"reason\" (short witty sentence).
      JSON only. Do not include any code or explanations.
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
    // Rate limit check
    if (!checkRateLimit('generateSassyMessage')) {
      console.warn('Rate limit exceeded for generateSassyMessage');
      return "Happy Birthday!";
    }

    try {
        // Sanitize inputs to prevent prompt injection
        const sanitizedRecipient = recipient.slice(0, 50).replace(/[\"'\\n\\r]/g, '');
        const sanitizedOccasion = occasion.slice(0, 50).replace(/[\"'\\n\\r]/g, '');
        
        const prompt = `Write a ${tone} message for ${sanitizedRecipient} on ${sanitizedOccasion}. Max 20 words.`;
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        return response.text?.trim() || "Happy Birthday!";
    } catch (error) {
        console.error("AI Error:", error);
        return "Happy Birthday!";
    }
}
