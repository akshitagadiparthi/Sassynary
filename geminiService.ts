// FILE: services/geminiService.ts (FIXED)
// CHANGE: No more API key in the browser. All calls go through /api/gemini.

import { GeneratorTone } from '../types';

const API_URL = '/api/gemini';

async function callGeminiProxy(action: string, params: Record<string, string> = {}): Promise<string> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, params }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error('Gemini proxy error:', res.status, errData);
      return '';
    }

    const data = await res.json();
    return data.result || '';
  } catch (error) {
    console.error('Network error calling AI service:', error);
    return '';
  }
}

export const generateDailySass = async (): Promise<string> => {
  const result = await callGeminiProxy('dailySass');
  return result || 'STATIONERY FOR THE BOLD';
};

export const recommendProductByVibe = async (
  vibe: string
): Promise<{ productId: number; reason: string }> => {
  const result = await callGeminiProxy('vibeFinder', { vibe });

  try {
    const data = JSON.parse(result);
    return {
      productId: data.productId || 1,
      reason: data.reason || 'This just feels right.',
    };
  } catch {
    return { productId: 1, reason: 'A classic choice.' };
  }
};

export const generateSassyMessage = async (
  recipient: string,
  occasion: string,
  tone: GeneratorTone
): Promise<string> => {
  const result = await callGeminiProxy('sassyMessage', {
    recipient,
    occasion,
    tone,
  });
  return result || 'Happy Birthday!';
};
