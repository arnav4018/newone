# Deployment Guide

## Vercel Deployment

### Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   - **Variable Name**: `VITE_OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environment**: Select Production, Preview, and Development

   - **Variable Name**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environment**: Select Production, Preview, and Development

4. Click **Save**
5. Redeploy your application for changes to take effect

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API keys:
   ```
   VITE_OPENAI_API_KEY=your-openai-key-here
   VITE_GEMINI_API_KEY=your-gemini-key-here
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

### Security Notes

- ⚠️ **Never commit `.env.local` or any file containing real API keys**
- The `.env.local` file is already in `.gitignore`
- Users can still enter API keys manually in the UI if they prefer
- Environment variables take precedence when both are available
