# Sassynary | fun stationery

A bold and witty stationery shop built with React, Tailwind CSS, and the Google Gemini API.

## Features
- **Sassy AI Message Generator**: Uses Gemini 3 Flash to write witty card messages.
- **Dynamic Vibe Matcher**: Recommends products based on user mood.
- **Wishlist & Cart**: Full shopping experience with local and Firebase sync.
- **Deployment Ready**: Optimized for Cloudflare Pages and Vercel.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: @google/genai (Gemini API)

## Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and add your `API_KEY` (Gemini API).
4. Run locally: `npm run dev`

## Deployment
- **Cloudflare Pages**: Connect your GitHub repository and set the build command to `npm run build` with the output directory set to `dist`.
- **Environment Variables**: Ensure the `API_KEY` is added in your deployment dashboard's environment settings.