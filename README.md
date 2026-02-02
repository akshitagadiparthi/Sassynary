
# Sassynary | fun stationery

A bold and witty stationery shop built with React, Tailwind CSS, and the Google Gemini API.

## Features
- **Sassy AI Message Generator**: Uses Gemini 3 Flash to write witty card messages.
- **Dynamic Vibe Matcher**: Recommends products based on user mood.
- **Wishlist & Cart**: Full shopping experience with local and Firebase sync.
- **Deployment Ready**: Optimized for Cloudflare Pages and Vercel.

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: Firebase (Auth, Firestore, Storage) - *Configured in `services/firebase.ts`*
- **AI**: @google/genai (Gemini API)

## Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and add your `API_KEY` (Gemini API).
4. Run locally: `npm run dev`

## Deployment (Vercel)
1. Push this code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com) and "Add New Project".
3. Select your GitHub repository.
4. Vercel will auto-detect Vite. The Build Command (`vite build`) and Output Directory (`dist`) should be correct.
5. **Important:** In the **Environment Variables** section, add:
   - Name: `API_KEY`
   - Value: *Your Google Gemini API Key*
6. Click **Deploy**.

## Deployment (Cloudflare Pages)
- Connect your GitHub repository.
- Build command: `npm run build`
- Output directory: `dist`
- Add the `API_KEY` in Settings > Environment Variables.
