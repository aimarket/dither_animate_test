# Deployment Instructions

## Netlify-Specific Instructions

For Netlify deployments, use **Option 3** below (API endpoint method) as it's the easiest.

## Important: Seeding Mock Data for Production

The "Continue as Test User" button on the login page requires mock data to be present in your production database. Without this data, the demo won't work properly.

### Step 1: Deploy Your Application

Deploy your app to your hosting platform (Vercel, Railway, etc.)

### Step 2: Set Up Environment Variables

Make sure your production environment has:
- `DATABASE_URL` - Your production database connection string
- `JWT_SECRET` - A secure random string for JWT signing
- `JWT_EXPIRY` - Token expiration time (e.g., "7d")

### Step 3: Seed the Production Database

#### Option A: Via API Endpoint (EASIEST - Works for Netlify!)

1. **Add a SEED_SECRET environment variable** in your Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add `SEED_SECRET` with a random value (e.g., `my-secret-seed-key-123`)

2. **After deployment, call the seed endpoint** using curl or Postman:
   ```bash
   curl -X POST https://your-app.netlify.app/api/admin/seed \
     -H "Content-Type: application/json" \
     -d '{"secret": "my-secret-seed-key-123"}'
   ```

3. **IMPORTANT: Delete or protect the endpoint** after seeding:
   - Either delete `src/app/api/admin/seed/route.ts`
   - Or add stronger authentication
   - Redeploy without the file

#### Option B: Local Connection to Production Database

### Step 3: Seed the Production Database (Alternative Methods)

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
