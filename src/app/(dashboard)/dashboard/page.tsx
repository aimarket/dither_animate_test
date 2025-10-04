'use client';

import { MissionMetrics } from '@/components/dashboard/MissionMetrics';
import { ActiveMissionsTable } from '@/components/dashboard/ActiveMissionsTable';
import { FlightRadar } from '@/components/dashboard/FlightRadar';
import { OperationsLog } from '@/components/dashboard/OperationsLog';
import { MissionQueue } from '@/components/dashboard/MissionQueue';
import { SystemStatus } from '@/components/dashboard/SystemStatus';
import { MissionControlCard } from '@/components/ui/MissionControlCard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Mission Metrics Bar */}
      <MissionMetrics />

      {/* Main Content Grid - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Active Missions Table (5 columns) */}
        <div className="lg:col-span-5">
          <ActiveMissionsTable />
        </div>

        {/* Center Column - Flight Radar (4 columns) */}
        <div className="lg:col-span-4">
          <FlightRadar />
        </div>

        {/* Right Column - Operations Log (3 columns) */}
        <div className="lg:col-span-3">
          <OperationsLog />
        </div>
      </div>

      {/* Mission Queue - Full Width */}
      <MissionQueue />

      {/* System Status - Bottom */}
      <MissionControlCard title="SYSTEM STATUS" color="cyan" glow>
        <SystemStatus />
      </MissionControlCard>
    </div>
  );
}
