# Deployment Instructions - DEMO SITE

## 🚀 Super Simple Deploy - NO DATABASE NEEDED!

This is a **DEMO SITE** with **hardcoded mock data** - just deploy and it works!

### Step 1: Deploy to Netlify

1. Push your code to GitHub (including the new `netlify.toml` file)
2. Connect to Netlify
3. Build settings (should auto-detect from netlify.toml):
   - Build command: Uses bun (installs automatically)
   - Publish directory: `.next`
4. Add environment variable:
   - `JWT_SECRET` = `demo-secret-123` (or any random string)
5. Deploy!

**That's it!** No database setup needed - all data is hardcoded in the repo.

**Important:** The `netlify.toml` file configures Netlify to properly handle Next.js API routes.

### Step 2: Share with Friends

Tell them to:
1. Go to https://orbitalorigin.com/login
2. Click "Continue as Test User" button
3. Explore the entire UI with rockets, flights, and telemetry data!

## What's Included (Hardcoded Data)

- **Test User**: test@example.com / password123
- **5 Rockets**: Alpha Strike, Beta Racer, Gamma Explorer, Delta Prototype, Epsilon Heavy
- **6 Flights**: Complete flight records with metrics
- **8 Motors**: Various L, M, and N class motors
- **Telemetry Data**: Real-time looking flight data generated on-the-fly

## No Database Required!

All data lives in `/src/lib/mockData.ts` and is served directly from the API routes. Perfect for demos!
