# Rocket Flight Logger - Mission Control UI Overhaul

## Project Overview
Transform the Rocket Flight Logger web application into a professional mission control interface inspired by command-center aesthetics. This comprehensive redesign will maintain all existing functionality while elevating the visual presentation to match aerospace industry standards.

## Design Inspiration Sources
- **agenttrafficcontrol repository**: Mission control dashboard with monitoring table, metrics bar, radar visualization, and global queue
- **Reference Images**: Agent data overview, workflow builder, operations monitoring, encrypted chat activity visualizations

## Core Design System

### Typography
- **Primary Font**: `'JetBrains Mono', 'Fira Code', 'Courier New', monospace`
- **Font Sizes**:
  - Headers: `text-lg` (18px)
  - Body: `text-sm` (14px)
  - Data: `text-xs` (12px)
  - Large Metrics: `text-3xl` (30px)
- **Font Weights**: Medium (500) for labels, Bold (700) for data values
- **Letter Spacing**: Slightly increased for technical readability

### Color Palette
```css
/* Background Layers */
--bg-primary: #000000       /* Pure black */
--bg-secondary: #0a0a0a     /* Near black */
--bg-tertiary: #0f0f0f      /* Card backgrounds */

/* Neon Accents */
--accent-cyan: #00ffff      /* Primary actions, borders */
--accent-orange: #ff6b00    /* Warnings, boost phase */
--accent-green: #00ff88     /* Success, active status */
--accent-blue: #0088ff      /* Info, coast phase */
--accent-red: #ff0044       /* Errors, critical alerts */

/* Status Colors */
--status-active: #00ff88    /* Running missions */
--status-pending: #ffaa00   /* Queued missions */
--status-success: #00ff88   /* Completed successfully */
--status-failed: #ff0044    /* Failed missions */
--status-idle: #666666      /* Idle/inactive */

/* Text Colors */
--text-primary: #ffffff     /* Main text */
--text-secondary: #999999   /* Labels, metadata */
--text-tertiary: #666666    /* Disabled, placeholders */
--text-neon: #00ffff        /* Highlighted data */
```

### Border & Shadow System
- **Technical Borders**: 1px solid with corner brackets
- **Glow Effects**: `box-shadow: 0 0 10px rgba(0, 255, 255, 0.3)`
- **Border Radius**: Minimal (2px) or sharp corners (0px)
- **Dividers**: 1px solid with low opacity (#1f2937)

### Spacing & Layout
- **Grid System**: Dense 4px base unit (multiples of 4)
- **Section Padding**: 16px-24px
- **Card Gaps**: 16px between cards
- **Dense Tables**: 8px vertical padding in cells
- **Compact Forms**: 12px input padding

## Component Library

### 1. TechnicalBorder Component
**File**: `src/components/ui/TechnicalBorder.tsx`
**Purpose**: Wrap content with corner brackets and optional glow
**Props**:
- `children`: ReactNode
- `color`: 'cyan' | 'orange' | 'green' | 'blue' | 'red'
- `glow`: boolean
- `label`: string (optional top-left label)

### 2. MonospaceTable Component
**File**: `src/components/ui/MonospaceTable.tsx`
**Purpose**: Data table with monospace font and technical styling
**Features**:
- Sortable columns
- Row hover effects
- Status indicators
- Compact density
- Fixed column widths

### 3. StatusIndicator Component
**File**: `src/components/ui/StatusIndicator.tsx`
**Purpose**: Colored status badge with optional pulse animation
**Props**:
- `status`: 'active' | 'pending' | 'success' | 'failed' | 'idle'
- `label`: string
- `pulse`: boolean

### 4. MetricsBar Component
**File**: `src/components/ui/MetricsBar.tsx`
**Purpose**: Horizontal metrics display with neon-styled labels
**Features**:
- Auto-sizing based on container
- Neon dividers between metrics
- Large numeric values with units
- Real-time update animation

### 5. ActivityLog Component
**File**: `src/components/ui/ActivityLog.tsx`
**Purpose**: Scrollable event feed with timestamps
**Features**:
- Auto-scroll to latest
- Event type icons
- Relative timestamps
- Color-coded by severity

### 6. RadarVisualization Component
**File**: `src/components/ui/RadarVisualization.tsx`
**Purpose**: Circular data visualization for flight positions
**Features**:
- Canvas-based rendering
- Concentric grid circles
- Rotating scan line
- Plotted flight positions

### 7. MissionControlCard Component
**File**: `src/components/ui/MissionControlCard.tsx`
**Purpose**: Base card component with technical styling
**Features**:
- Technical border with corner brackets
- Optional header with status indicator
- Compact padding
- Optional glow effect

## Page-by-Page Redesign Plan

### Dashboard (Priority 1)
**File**: `src/app/(dashboard)/dashboard/page.tsx`

#### Section 1: Mission Metrics Bar (Top)
**Layout**: Single row spanning full width
**Metrics**:
- Total Missions: Count of all flights
- Active Launches: Flights in progress (simulated live)
- Total Rockets: Inventory count
- Total Motors: Inventory count
- Success Rate: Calculated from flight data
- Live Throughput: Simulated data rate (Hz)

#### Section 2: Main Content (3-Column Grid)
**Left Column (40%)**: Active Missions Table
- MonospaceTable showing recent 10 flights
- Columns: ID, Rocket, Status, Apogee, Duration, Max G
- Row click navigates to flight detail
- Status indicators with color coding

**Center Column (35%)**: Flight Activity Radar
- RadarVisualization showing flight positions
- Circular grid with range markers
- Plotted flights based on lat/long or simulated positions
- Rotating scan line animation
- Legend for flight phases

**Right Column (25%)**: Mission Operations Log
- ActivityLog showing recent events
- Events: "Flight launched", "Apogee reached", "Landing detected"
- Timestamps with relative time
- Auto-scroll to latest

#### Section 3: Global Mission Queue (Bottom)
**Layout**: Full-width table
**Content**: Upcoming launches or historical flights
**Columns**: Launch ID, T-Minus, Rocket, Motor, Target Apogee, Status
**Features**: Countdown timers (simulated), priority badges

#### Section 4: System Status Indicators (Bottom Right Corner)
- Database: Connected
- Telemetry Stream: Active (simulated)
- API Status: Operational
- Data Rate: XX Hz

### Flights Page
**File**: `src/app/(dashboard)/flights/page.tsx`

#### Updates:
1. Replace grid of cards with MonospaceTable
2. Add StatusIndicator for each flight
3. Add filters: Phase, Date Range, Rocket Type
4. Add search bar with live filtering
5. Add bulk actions toolbar
6. Add export button (CSV/JSON)

### Flight Detail Pages
**Files**: `src/app/(dashboard)/flights/[id]/*.tsx`

#### Layout Component Updates:
1. Technical border around entire page
2. Metrics bar with neon-styled values
3. Tab navigation with corner brackets
4. Status indicator for flight phase

#### Telemetry Tab:
1. Replace Recharts with custom Canvas charts
2. Add grid lines with neon styling
3. Add phase markers on timeline
4. Add real-time playback controls

#### Trajectory Tab:
1. Enhance canvas with technical grid
2. Add corner bracket frame
3. Add altitude markers with neon text
4. Add phase transition indicators

#### Analysis Tab:
1. Convert tables to MonospaceTable
2. Add TechnicalBorder around sections
3. Add neon-styled metric cards
4. Add phase timeline visualization

### Rockets Page
**File**: `src/app/(dashboard)/rockets/page.tsx`

#### Updates:
1. Replace cards with MonospaceTable
2. Add technical specifications panel
3. Add status indicators (available, in-flight, maintenance)
4. Add rocket diagram (side view schematic)
5. Add flight history chart per rocket

### Motors Page
**File**: `src/app/(dashboard)/motors/page.tsx`

#### Updates:
1. MonospaceTable with motor specifications
2. Add thrust curve visualizations
3. Add usage statistics (flights per motor)
4. Add inventory status indicators
5. Add certification level badges

### Settings Page
**File**: `src/app/(dashboard)/settings/page.tsx`

#### Updates:
1. Technical border sections
2. Monospace input fields
3. Toggle switches with neon glow
4. Save/Reset buttons with status feedback
5. API configuration panel with connection status

## Implementation Phases

### Phase 1: Foundation (Days 1-2)
- [ ] Update global CSS with new color variables
- [ ] Add monospace font imports
- [ ] Create base TechnicalBorder component
- [ ] Create MissionControlCard component
- [ ] Create StatusIndicator component
- [ ] Test components in isolation

### Phase 2: Reusable Components (Days 3-4)
- [ ] Create MonospaceTable component
- [ ] Create MetricsBar component
- [ ] Create ActivityLog component
- [ ] Create RadarVisualization component
- [ ] Add Storybook or test pages for each component

### Phase 3: Dashboard Redesign (Days 5-7)
- [ ] Implement Mission Metrics Bar
- [ ] Create Active Missions Table
- [ ] Implement Flight Activity Radar
- [ ] Create Mission Operations Log
- [ ] Add Global Mission Queue
- [ ] Add System Status Indicators
- [ ] Connect all sections to real data
- [ ] Add animations and transitions
- [ ] Test responsive behavior

### Phase 4: Flights Page (Days 8-9)
- [ ] Replace card grid with MonospaceTable
- [ ] Add filters and search
- [ ] Add status indicators
- [ ] Add bulk actions
- [ ] Add export functionality
- [ ] Test pagination and performance

### Phase 5: Flight Detail Pages (Days 10-12)
- [ ] Update shared layout with technical styling
- [ ] Redesign Telemetry tab with Canvas charts
- [ ] Enhance Trajectory visualization
- [ ] Update Analysis tab with new components
- [ ] Add phase timeline component
- [ ] Test data loading and animations

### Phase 6: Rockets & Motors Pages (Days 13-14)
- [ ] Redesign Rockets page with MonospaceTable
- [ ] Add rocket schematics
- [ ] Add flight history charts
- [ ] Redesign Motors page
- [ ] Add thrust curve visualizations
- [ ] Add inventory tracking

### Phase 7: Settings & Polish (Days 15-16)
- [ ] Redesign Settings page
- [ ] Add API configuration panel
- [ ] Add system diagnostics section
- [ ] Review all pages for consistency
- [ ] Add loading states with technical spinners
- [ ] Add error states with technical styling

### Phase 8: Testing & Optimization (Days 17-18)
- [ ] Cross-browser testing
- [ ] Mobile responsive adjustments
- [ ] Performance optimization (Canvas rendering)
- [ ] Accessibility audit
- [ ] Documentation updates
- [ ] Final polish and bug fixes

## Technical Specifications

### Performance Requirements
- **Initial Load**: < 2 seconds
- **Page Transitions**: < 300ms
- **Canvas Rendering**: 60 FPS for animations
- **Table Rendering**: Support 1000+ rows with virtualization
- **API Calls**: Debounced to max 10/second

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (responsive design)

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation for all interactive elements
- Screen reader labels for visualizations
- High contrast mode support
- Focus indicators with neon styling

### Data Refresh Strategy
- Dashboard: Real-time updates every 5 seconds
- Tables: Optimistic updates with React Query
- Charts: Smooth transitions on data changes
- Radar: Continuous 2-second rotation cycle

## Testing Checklist

### Component Tests
- [ ] TechnicalBorder renders with all color variants
- [ ] StatusIndicator shows correct colors per status
- [ ] MonospaceTable sorts correctly
- [ ] MetricsBar auto-sizes properly
- [ ] ActivityLog auto-scrolls to latest
- [ ] RadarVisualization renders without errors

### Page Tests
- [ ] Dashboard loads all sections without errors
- [ ] Flights page table displays all flights
- [ ] Flight detail tabs navigate correctly
- [ ] Rockets page shows all rockets with stats
- [ ] Motors page shows all motors with specs
- [ ] Settings page saves configuration

### Integration Tests
- [ ] Navigation between pages preserves state
- [ ] API calls handle errors gracefully
- [ ] Loading states display correctly
- [ ] Empty states show helpful messages
- [ ] Filters and search work correctly

### Visual Regression Tests
- [ ] Dashboard matches design specifications
- [ ] All pages maintain consistent styling
- [ ] Responsive breakpoints work correctly
- [ ] Animations are smooth at 60 FPS
- [ ] No layout shifts on data load

## Dependencies

### New Packages to Install
```json
{
  "dependencies": {
    "@react-spring/web": "^9.7.3",
    "framer-motion": "^10.16.16",
    "date-fns": "^3.0.6"
  },
  "devDependencies": {
    "@storybook/react": "^7.6.7"
  }
}
```

### Font Imports (in globals.css)
```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
```

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── TechnicalBorder.tsx
│   │   ├── MissionControlCard.tsx
│   │   ├── StatusIndicator.tsx
│   │   ├── MonospaceTable.tsx
│   │   ├── MetricsBar.tsx
│   │   ├── ActivityLog.tsx
│   │   ├── RadarVisualization.tsx
│   │   └── index.ts (barrel exports)
│   └── dashboard/
│       ├── MissionMetrics.tsx
│       ├── ActiveMissionsTable.tsx
│       ├── FlightRadar.tsx
│       ├── OperationsLog.tsx
│       ├── MissionQueue.tsx
│       └── SystemStatus.tsx
├── app/
│   ├── globals.css (updated with design system)
│   └── (dashboard)/
│       ├── dashboard/page.tsx (redesigned)
│       ├── flights/page.tsx (redesigned)
│       ├── flights/[id]/ (all tabs redesigned)
│       ├── rockets/page.tsx (redesigned)
│       ├── motors/page.tsx (redesigned)
│       └── settings/page.tsx (redesigned)
└── lib/
    ├── hooks/
    │   └── useActivityLog.ts (simulated events)
    └── utils/
        └── formatters.ts (data formatting utilities)
```

## Design Mockup (ASCII Art)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ MISSION METRICS                                                          │
│ TOTAL: 827   ACTIVE: 3   ROCKETS: 5   MOTORS: 8   SUCCESS: 94.2%   47Hz │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────┐  ┌───────────────────────┐
│ ACTIVE MISSIONS      │  │  FLIGHT RADAR    │  │ OPERATIONS LOG        │
│ ┌──────────────────┐ │  │                  │  │ ┌───────────────────┐ │
│ │ ID  ROCKET  G  A │ │  │    *  •          │  │ │ 12:45 Launch #827 │ │
│ │ 827 Alpha  12 45m│ │  │   o    •    *    │  │ │ 12:43 Apogee #826 │ │
│ │ 826 Beta   8  32m│ │  │     ╲  │  ╱      │  │ │ 12:40 Landing #825│ │
│ │ 825 Gamma  15 28m│ │  │   •─ │ ┼ ─•     │  │ │ 12:35 Launch #825 │ │
│ └──────────────────┘ │  │      │          │  │ └───────────────────┘ │
└──────────────────────┘  └──────────────────┘  └───────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ GLOBAL MISSION QUEUE                                                     │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ ID  T-MINUS  ROCKET      MOTOR   TARGET   STATUS                    │ │
│ │ 828  00:45   Delta Heavy  M1850  1200m    ████░░░░ PREPPING        │ │
│ │ 829  02:30   Epsilon      L850   900m     ██░░░░░░ SCHEDULED       │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

## Success Metrics

### User Experience
- Reduced cognitive load through consistent visual hierarchy
- Faster data comprehension through technical typography
- Increased engagement through immersive mission control feel
- Professional aesthetic appropriate for aerospace industry

### Technical Performance
- No degradation in page load times
- Smooth 60 FPS animations on modern hardware
- Responsive design working on tablets and desktop
- Accessible to users with assistive technologies

### Development Quality
- Reusable component library for future features
- Comprehensive tests covering all components
- Clear documentation for maintenance
- Modular architecture for easy updates

## Next Steps

1. **Review and Approve Plan**: Ensure all stakeholders agree with scope
2. **Begin Phase 1**: Start with design system foundation
3. **Iterative Development**: Build and test components incrementally
4. **User Feedback**: Gather feedback on dashboard redesign before proceeding
5. **Full Rollout**: Apply design system across all pages systematically
