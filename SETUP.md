# Rocket Flight Logger - Setup Guide

## Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager
- Git

## Installation

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd dither_animate_test

# Install dependencies
npm install
# or
bun install
```

### 2. Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080

# Feature Flags
NEXT_PUBLIC_ENABLE_LIVE_TELEMETRY=true
NEXT_PUBLIC_ENABLE_3D_TRAJECTORY=true
```

### 3. Run Development Server

```bash
npm run dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
dither_animate_test/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── (dashboard)/       # Protected dashboard pages
│   │       ├── flights/
│   │       ├── rockets/
│   │       ├── motors/
│   │       └── page.tsx       # Dashboard home
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Empty.tsx
│   │   ├── charts/            # D3.js & Recharts
│   │   ├── visualization/     # 3D trajectory
│   │   ├── flight/            # Flight-specific components
│   │   ├── telemetry/         # Telemetry display
│   │   └── layout/            # Layout components
│   ├── lib/
│   │   ├── api/               # API clients
│   │   │   ├── client.ts      # Axios instance
│   │   │   ├── auth.ts        # Auth endpoints
│   │   │   ├── flights.ts     # Flight endpoints
│   │   │   └── telemetry.ts   # Telemetry endpoints
│   │   ├── hooks/             # React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useFlights.ts
│   │   │   ├── useTelemetry.ts
│   │   │   └── useWebSocket.ts
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Utility functions
│   │   ├── config/            # Configuration
│   │   │   └── navigation.ts  # Navigation config
│   │   └── providers/         # React providers
│   └── middleware.ts          # Auth middleware
├── __tests__/                 # Test files
│   ├── components/
│   ├── lib/
│   └── integration/
├── public/                    # Static assets
├── .env.local                 # Environment variables (not in git)
├── .env.example               # Environment template
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Jest setup
└── package.json
```

## Available Scripts

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Testing
```bash
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Linting
```bash
npm run lint         # Run ESLint
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI primitives + custom components
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Real-time**: WebSocket
- **3D Graphics**: Three.js + React Three Fiber
- **Visualization**: D3.js + Recharts
- **Animation**: Framer Motion

### Development
- **Language**: TypeScript 5
- **Build Tool**: Turbopack (Next.js)
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint

## Key Features

### 1. Authentication
- JWT-based authentication with httpOnly cookies
- Protected routes via middleware
- Automatic token refresh

### 2. Flight Management
- Upload telemetry files (.rkt format)
- View flight details and metrics
- Real-time telemetry streaming
- Flight comparison and analytics

### 3. Visualizations
- **D3.js Charts**: Real-time streaming telemetry data
- **Recharts**: Static flight analysis charts
- **3D Trajectory**: GPS flight path visualization

### 4. Rocket Fleet
- Manage multiple rockets
- Track rocket specifications
- Link flights to rockets

### 5. Motor Database
- Browse motor specifications
- Search by designation or manufacturer
- Filter by impulse class

## API Integration

The frontend connects to a Rust/Actix backend (not included in this repository).

### Expected Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

#### Flights
- `GET /api/flights` - List flights
- `GET /api/flights/:id` - Get flight details
- `POST /api/flights` - Create flight
- `PUT /api/flights/:id` - Update flight
- `DELETE /api/flights/:id` - Delete flight
- `POST /api/flights/upload` - Upload telemetry file

#### Telemetry
- `GET /api/flights/:id/telemetry` - Get telemetry data
- `WS /ws/telemetry/:id` - Real-time telemetry stream

#### Rockets
- `GET /api/rockets` - List rockets
- `POST /api/rockets` - Create rocket
- `PUT /api/rockets/:id` - Update rocket
- `DELETE /api/rockets/:id` - Delete rocket

#### Motors
- `GET /api/motors` - List motors
- `GET /api/motors/:id` - Get motor details

## Testing

### Unit Tests
Run component and utility tests:
```bash
npm run test
```

### Writing Tests
Example test structure:

```typescript
import { render, screen } from '@testing-library/react';
import { YourComponent } from '@/components/YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
vercel deploy

# Or push to main branch (if connected to GitHub)
git push origin main
```

### Environment Variables
Set these in your deployment platform:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_WS_URL` - WebSocket URL

## Troubleshooting

### Build Errors
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node.js version: `node --version` (should be 18+)

### TypeScript Errors
1. Restart TypeScript server in your IDE
2. Check `tsconfig.json` paths configuration
3. Ensure all type declarations are up to date

### API Connection Issues
1. Verify backend is running on correct port
2. Check CORS configuration on backend
3. Verify `.env.local` has correct API URLs
4. Check browser console for detailed errors

## Next Steps

1. **Install test dependencies**: `npm install` (includes Jest and Testing Library)
2. **Start backend**: Follow backend setup guide (separate repository)
3. **Run tests**: `npm run test` to verify setup
4. **Start development**: `npm run dev`

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Run linter: `npm run lint`
5. Run tests: `npm run test`
6. Submit pull request

## License

MIT
