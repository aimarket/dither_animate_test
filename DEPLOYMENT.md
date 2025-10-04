# Deployment Instructions - DEMO SITE

## 🚀 Quick Deploy for Netlify (or any platform)

This is a **DEMO SITE** - no security needed! Just get it up and running so people can see the UI.

### Step 1: Deploy

1. Push your code to GitHub
2. Connect to Netlify (or Vercel/Railway)
3. Add these environment variables:
   - `DATABASE_URL` - Your database connection (use a free PostgreSQL from Neon, Supabase, or Railway)
   - `JWT_SECRET` - anything (e.g., `demo-secret-123`)

### Step 2: Seed the Database (ONE TIME)

After deployment, just visit this URL in your browser:

```
https://your-app.netlify.app/api/admin/seed
```

That's it! The database is now seeded with all the demo data.

### Step 3: Share with Friends

Tell them to:
1. Go to your site
2. Click "Continue as Test User" button
3. Explore the UI with all the mock data!

## What Gets Seeded

- **Test User**: test@example.com / password123
- **5 Rockets**: Alpha Strike, Beta Racer, Gamma Explorer, Delta Prototype, Epsilon Heavy
- **6 Flights**: Complete flight records with telemetry
- **8 Motors**: Various rocket motors database
- **Telemetry Data**: Real-looking flight data for 3 flights

---

## Alternative Methods (if you want to use CLI)

After deployment, you need to run the seed script **once** to populate your database with:
- Test user (test@example.com / password123)
- 5 sample rockets
- 6 sample flights with telemetry data
- 8 motors in the database

#### Option A: Using Your Hosting Platform's CLI

**For Vercel:**
```bash
vercel env pull
bun run db:seed:prod
```

**For Railway:**
```bash
railway run bun run db:seed:prod
```

**For Generic platforms:**
```bash
# Set your DATABASE_URL environment variable first
export DATABASE_URL="your-production-database-url"
bun run db:seed:prod
```

#### Option B: Manual SQL (if you have direct database access)

1. Run migrations:
```bash
prisma migrate deploy
```

2. Run the seed script:
```bash
bun prisma/seed.ts
```

### Important Notes

⚠️ **The seed script deletes all existing data** - It runs `deleteMany()` on all tables before seeding. Only run this on a fresh database or when you want to reset to demo data.

⚠️ **Security Warning** - The test credentials (`test@example.com` / `password123`) are publicly known. Only use this for demos. For production apps with real data, create proper user accounts.

### Test User Credentials

After seeding, your friends can click "Continue as Test User" to log in with:
- **Email:** test@example.com
- **Password:** password123

### What Gets Seeded

- **1 User**: test@example.com with password123
- **8 Motors**: Various L, M, and N class motors
- **5 Rockets**: Alpha Strike, Beta Racer, Gamma Explorer, Delta Prototype, Epsilon Heavy
- **6 Flights**: Complete flight records with metrics
- **Telemetry Data**: 200 frames of telemetry data for the first 3 flights

### Troubleshooting

**"Invalid credentials" error on test user login:**
- The seed script hasn't been run on production
- Run `bun run db:seed:prod` with your production DATABASE_URL

**"Error: Cannot find module" during seeding:**
- Make sure all dependencies are installed in production
- Check that bcryptjs is in your production dependencies (not devDependencies)

**Database connection errors:**
- Verify your DATABASE_URL is correct
- Ensure your database allows connections from your deployment platform
