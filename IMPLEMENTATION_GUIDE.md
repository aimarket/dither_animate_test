# Rocket Flight Logger - Implementation Guide

## ✅ Completed: Frontend Foundation

### Libraries Installed
- **D3.js v7** - Real-time streaming charts
- **Recharts** - Static flight analysis charts
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client with interceptors
- **React Hook Form + Zod** - Form validation
- **Framer Motion** - Animations
- **shadcn/ui components** (Radix UI primitives)
- **React Dropzone** - File uploads
- **Lucide React** - Icons

### Folder Structure Created

```
src/
├── lib/
│   ├── api/
│   │   ├── client.ts         ✅ Axios instance with auth interceptor
│   │   ├── auth.ts           ✅ Auth API calls
│   │   ├── flights.ts        ✅ Flight CRUD + upload
│   │   └── telemetry.ts      ✅ Telemetry queries
│   ├── hooks/
│   │   ├── useAuth.ts        ✅ Auth hook with React Query
│   │   ├── useFlights.ts     ✅ Flight data hooks
│   │   ├── useTelemetry.ts   ✅ Telemetry hooks
│   │   └── useWebSocket.ts   ✅ Real-time WebSocket hook
│   ├── types/
│   │   ├── api.ts            ✅ API response types
│   │   ├── flight.ts         ✅ Flight & Rocket types
│   │   └── telemetry.ts      ✅ Telemetry frame types
│   ├── utils/
│   │   └── cn.ts             ✅ Tailwind class merger
│   └── providers/
│       └── query-provider.tsx ✅ React Query provider
├── components/
│   ├── ui/              📋 TODO: shadcn components
│   ├── charts/          📋 TODO: D3.js + Recharts
│   ├── visualization/   📋 TODO: 3D trajectory
│   ├── flight/          📋 TODO: Flight cards, uploader
│   ├── telemetry/       📋 TODO: Live data display
│   └── layout/          📋 TODO: Sidebar, header
└── app/
    ├── (auth)/
    │   ├── login/       📋 TODO
    │   └── register/    📋 TODO
    └── (dashboard)/
        ├── flights/     📋 TODO
        ├── rockets/     📋 TODO
        └── motors/      📋 TODO
```

### Landing Page
✅ Beautiful hero page with your Three.js globe as background
✅ Gradient overlays for readability
✅ Feature cards showcasing platform capabilities

---

## 🚀 Next: Backend Setup (Rust/Actix)

### Step 1: Initialize Rust Project

```bash
# Create backend directory
cd /path/to/project
cargo new backend --bin
cd backend
```

### Step 2: Add Dependencies to `Cargo.toml`

```toml
[package]
name = "rocket-flight-logger"
version = "0.1.0"
edition = "2021"

[dependencies]
# Web framework
actix-web = "4.9"
actix-cors = "0.7"
actix-ws = "0.3"  # WebSocket support

# Async runtime
tokio = { version = "1.43", features = ["full"] }

# Database
sqlx = { version = "0.8", features = ["postgres", "runtime-tokio", "chrono", "uuid"] }

# Serialization
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# Authentication
jsonwebtoken = "9.3"
bcrypt = "0.16"

# Utilities
uuid = { version = "1.11", features = ["v4", "serde"] }
chrono = { version = "0.4", features = ["serde"] }
dotenv = "0.15"
env_logger = "0.11"
log = "0.4"

# Math for sensor fusion
nalgebra = "0.33"

# Binary parsing
byteorder = "1.5"
crc = "3.2"
```

### Step 3: PostgreSQL + TimescaleDB Setup

```bash
# Install PostgreSQL and TimescaleDB
# On Ubuntu/Debian:
sudo apt install postgresql-16 timescaledb-2-postgresql-16

# Create database
sudo -u postgres psql -c "CREATE DATABASE rocket_logger;"
sudo -u postgres psql -d rocket_logger -c "CREATE EXTENSION IF NOT EXISTS timescaledb;"

# Create .env file
cat > backend/.env << EOF
DATABASE_URL=postgresql://postgres:password@localhost/rocket_logger
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRY_MINUTES=15
REFRESH_TOKEN_EXPIRY_DAYS=7
RUST_LOG=info
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
CORS_ORIGIN=http://localhost:3000
EOF
```

### Step 4: Database Schema

Create `backend/migrations/001_initial_schema.sql`:

```sql
-- Enable TimescaleDB
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rockets table
CREATE TABLE rockets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    diameter_mm FLOAT NOT NULL,
    length_mm FLOAT NOT NULL,
    dry_mass_g FLOAT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flights table
CREATE TABLE flights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rocket_id UUID REFERENCES rockets(id) ON DELETE SET NULL,
    flight_name VARCHAR(100) NOT NULL,
    flight_date DATE NOT NULL,
    location VARCHAR(200),
    motor_designation VARCHAR(50),
    motor_manufacturer VARCHAR(50),
    recovery_type VARCHAR(50),
    notes TEXT,

    -- Computed metrics
    max_altitude_m FLOAT,
    max_velocity_ms FLOAT,
    max_acceleration_g FLOAT,
    apogee_time_s FLOAT,
    flight_duration_s FLOAT,
    rail_departure_velocity_ms FLOAT,

    -- Metadata
    raw_file_size_bytes INTEGER,
    sample_rate_hz INTEGER,
    telemetry_start_time TIMESTAMPTZ,
    telemetry_end_time TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- Telemetry hypertable
CREATE TABLE telemetry (
    flight_id UUID REFERENCES flights(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL,
    relative_time_ms INTEGER NOT NULL,

    -- IMU
    accel_x_g FLOAT,
    accel_y_g FLOAT,
    accel_z_g FLOAT,
    gyro_x_dps FLOAT,
    gyro_y_dps FLOAT,
    gyro_z_dps FLOAT,

    -- Magnetometer
    mag_x_ut FLOAT,
    mag_y_ut FLOAT,
    mag_z_ut FLOAT,

    -- Barometer
    pressure_pa FLOAT,
    temperature_c FLOAT,

    -- GPS
    gps_latitude FLOAT,
    gps_longitude FLOAT,
    gps_altitude_m FLOAT,
    gps_speed_ms FLOAT,
    gps_satellites INTEGER,

    -- Computed
    altitude_agl_m FLOAT,
    vertical_velocity_ms FLOAT,
    orientation_w FLOAT,
    orientation_x FLOAT,
    orientation_y FLOAT,
    orientation_z FLOAT,

    -- Status
    pyro_continuity_1 BOOLEAN,
    pyro_continuity_2 BOOLEAN,
    battery_voltage_v FLOAT,
    flight_state VARCHAR(20),

    PRIMARY KEY (flight_id, timestamp)
);

-- Convert to hypertable
SELECT create_hypertable('telemetry', 'timestamp',
    chunk_time_interval => INTERVAL '1 day',
    if_not_exists => TRUE
);

-- Indexes
CREATE INDEX idx_flights_user ON flights(user_id, flight_date DESC);
CREATE INDEX idx_telemetry_flight_time ON telemetry(flight_id, relative_time_ms);

-- Compression policy
SELECT add_compression_policy('telemetry', INTERVAL '7 days');
```

Run migrations:
```bash
cd backend
sqlx database create
sqlx migrate run
```

---

## 📊 Component Development Priorities

### Priority 1: Core UI Components (Week 1)

1. **Button, Input, Card** - Basic shadcn components
2. **Login/Register Forms** - With React Hook Form + Zod validation
3. **Dashboard Layout** - Sidebar navigation
4. **Flight Card** - List item component

### Priority 2: Data Visualization (Week 2)

1. **D3.js Real-time Chart** - Streaming telemetry
   - Line chart with zoom/pan
   - Configurable axes (altitude, velocity, acceleration)
   - Brush selection for time ranges

2. **Recharts Static Charts** - Flight analysis
   - Dual-axis altitude/velocity
   - Acceleration chart with phase markers
   - Phase timeline

3. **3D Trajectory** - React Three Fiber
   - GPS path visualization
   - Launch/apogee/landing markers
   - Controllable camera

### Priority 3: Advanced Features (Week 3)

1. **WebSocket Live Stream** - Real-time telemetry display
2. **File Upload** - Drag-drop .rkt file uploader
3. **Flight Comparison** - Overlay multiple flights
4. **Export Functionality** - CSV/JSON/KML

---

## 🎨 Design System

### Colors (Tailwind)
- **Primary**: Blue-600 (`bg-blue-600`)
- **Secondary**: Purple-600
- **Success**: Green-500
- **Warning**: Yellow-500
- **Error**: Red-500
- **Background**: Black (`bg-black`)
- **Surface**: White/5 with blur (`bg-white/5 backdrop-blur`)

### Typography
- **Headings**: Geist Sans (already configured)
- **Monospace**: Geist Mono (for telemetry data)

---

## 🔐 Authentication Flow

### Frontend → Backend
1. User submits login form
2. `authApi.login()` sends POST to `/api/auth/login`
3. Backend validates credentials, returns JWT in httpOnly cookie
4. React Query caches user data
5. All subsequent requests include cookie automatically

### Protected Routes
```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

---

## 📡 WebSocket Protocol

### Connection
```
WS ws://localhost:8080/ws/telemetry/{flight_id}
```

### Message Format
```json
{
  "flight_id": "uuid",
  "timestamp": "2025-10-03T12:34:56.789Z",
  "relative_time_ms": 5420,
  "altitude_agl_m": 245.3,
  "vertical_velocity_ms": 42.1,
  "accel_z_g": 8.3,
  "flight_state": "BOOST"
}
```

---

## 🧪 Testing Strategy

### Frontend
- **Unit**: Jest + React Testing Library
- **E2E**: Playwright
- **Visual**: Chromatic (optional)

### Backend
- **Unit**: Rust `#[cfg(test)]`
- **Integration**: `sqlx::test` with test database
- **Load**: Apache JMeter for WebSocket

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Docker)
```dockerfile
FROM rust:1.83 as builder
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y libpq5
COPY --from=builder /app/target/release/rocket-flight-logger /usr/local/bin/
EXPOSE 8080
CMD ["rocket-flight-logger"]
```

---

## 📚 Learning Resources

### D3.js Telemetry Charts
- [Observable HQ - D3 Gallery](https://observablehq.com/@d3/gallery)
- [D3.js Line Chart with Zoom](https://observablehq.com/@d3/focus-context)

### React Three Fiber
- [Three.js Journey](https://threejs-journey.com/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)

### Actix Web
- [Actix Web Guide](https://actix.rs/docs/)
- [Actix WebSocket Example](https://github.com/actix/examples/tree/master/websockets)

### TimescaleDB
- [TimescaleDB Tutorials](https://docs.timescale.com/tutorials/latest/)

---

## 🎯 Implementation Roadmap

### Phase 1: MVP (2 weeks)
- ✅ Frontend foundation
- ✅ Landing page with globe
- 📋 Backend auth endpoints
- 📋 Flight CRUD
- 📋 Basic upload + display

### Phase 2: Analytics (2 weeks)
- 📋 Binary telemetry parser
- 📋 D3.js charts
- 📋 3D trajectory
- 📋 Flight metrics calculation

### Phase 3: Real-time (1 week)
- 📋 WebSocket server
- 📋 Live telemetry streaming
- 📋 Real-time charts

### Phase 4: Polish (1 week)
- 📋 Mobile responsive
- 📋 Error boundaries
- 📋 Loading states
- 📋 Export functionality

---

## 🔧 Environment Variables

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

### Backend (`.env`)
```bash
DATABASE_URL=postgresql://postgres:password@localhost/rocket_logger
JWT_SECRET=your-secret-here
JWT_EXPIRY_MINUTES=15
REFRESH_TOKEN_EXPIRY_DAYS=7
RUST_LOG=info
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
CORS_ORIGIN=http://localhost:3000
```

---

## ✅ Ready to Start!

Run the development servers:

```bash
# Frontend
npm run dev

# Backend (once setup)
cd backend
cargo run
```

Visit `http://localhost:3000` to see your landing page with the globe! 🚀
