// FILE: api/gemini.ts
// PURPOSE: Vercel Serverless Function — keeps Gemini API key on the server.
// DEPLOY: Place this file at YOUR_PROJECT_ROOT/api/gemini.ts
//         Vercel automatically routes POST /api/gemini to this function.
//
// SETUP: In your Vercel project dashboard → Settings → Environment Variables:
//        Add GEMINI_API_KEY = your-actual-key (NOT prefixed with VITE_)

import type { VercelRequest, VercelResponse } from '@vercel/node';

// ─── RATE LIMITING (in-memory, per serverless instance) ──────────────────────
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;   // 20 requests per minute per IP

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

// ─── INPUT VALIDATION ────────────────────────────────────────────────────────
const VALID_ACTIONS = ['dailySass', 'vibeFinder', 'sassyMessage'] as const;
type ActionType = typeof VALID_ACTIONS[number];

const MAX_INPUT_LENGTH = 500; // characters

function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input.slice(0, MAX_INPUT_LENGTH).replace(/[<>]/g, ''); // strip HTML tags
}

// ─── PROMPT BUILDERS (all prompt logic lives server-side now) ─────────────────
function buildPrompt(action: ActionType, params: Record<string, string>): string {
  switch (action) {
    case 'dailySass':
      return 'Write a short, sassy, witty marketing tagline for a stationery shop called Sassynary. Max 8 words. Uppercase. No quotes.';

    case 'vibeFinder': {
      const vibe = sanitizeInput(params.vibe || '');
      return `
        I have a list of stationery products ids: [1, 16, 17, 24, 27, 19, 25, 26, 18, 20, 21, 22, 23, 34, 99].
        Product Context:
        - ID 99 is the "Surprise Me Bundle" (Mystery Box). It explicitly contains Witty Greeting Cards.
        - If the user mentions "cards", "greeting card", "indecisive", or "surprise", YOU MUST SUGGEST ID 99.
        User vibe: "${vibe}".
        Return a JSON object with "productId" (number from list) and "reason" (short witty sentence).
        JSON only.
      `;
    }

    case 'sassyMessage': {
      const recipient = sanitizeInput(params.recipient || 'friend');
      const occasion = sanitizeInput(params.occasion || 'birthday');
      const tone = sanitizeInput(params.tone || 'witty');
      return `Write a ${tone} message for ${recipient} on ${occasion}. Max 20 words.`;
    }

    default:
      throw new Error('Invalid action');
  }
}

// ─── HANDLER ─────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — only allow your own domain
  const allowedOrigins = [
    'https://www.sassynary.com',
    'https://sassynary.com',
    'https://sassynary.vercel.app',
  ];
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // Validate request body
  const { action, params } = req.body || {};
  if (!action || !VALID_ACTIONS.includes(action)) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  // Build prompt
  const prompt = buildPrompt(action as ActionType, params || {});
  const isJson = action === 'vibeFinder';

  // Call Gemini API (server-side only — key never exposed to browser)
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not configured in environment variables');
    return res.status(500).json({ error: 'AI service not configured' });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: isJson
            ? { responseMimeType: 'application/json' }
            : undefined,
        }),
      }
    );

    if (!geminiRes.ok) {
      console.error('Gemini API error:', geminiRes.status, await geminiRes.text());
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return res.status(200).json({ result: text.trim() });
  } catch (err) {
    console.error('Gemini proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
