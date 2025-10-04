'use client';

import { useFlights } from '@/lib/hooks/useFlights';
import { MissionControlCard } from '@/components/ui/MissionControlCard';
import { MonospaceTable } from '@/components/ui/MonospaceTable';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

export function MissionQueue() {
  const { data: flights } = useFlights();

  // Get flights and simulate queue status
  const queueFlights = (flights?.data || []).slice(0, 5).map((flight, idx) => ({
    ...flight,
    countdown: idx === 0 ? 'T-00:45' : idx === 1 ? 'T-02:30' : 'STANDBY',
    priority: idx < 2 ? 'HIGH' : 'NORMAL',
    queueStatus: idx === 0 ? 'PREPPING' : 'SCHEDULED',
  }));

  const columns = [
    {
      key: 'id',
      label: 'LAUNCH ID',
      width: '100px',
      render: (value: string) => value.slice(0, 8).toUpperCase(),
    },
    {
      key: 'countdown',
      label: 'T-MINUS',
      width: '100px',
      render: (value: string) => (
        <span style={{ color: value.startsWith('T-') ? 'var(--accent-orange)' : 'var(--text-secondary)' }}>
          {value}
        </span>
      ),
    },
    {
      key: 'rocket_name',
      label: 'ROCKET',
      render: (_: any, row: any) => row.rocket?.name || 'Unknown',
    },
    {
      key: 'apogee_altitude_m',
      label: 'TARGET APOGEE',
      width: '130px',
      align: 'right' as const,
      render: (value: number) => value ? `${value.toFixed(0)}m` : 'N/A',
    },
    {
      key: 'queueStatus',
      label: 'STATUS',
      width: '180px',
      render: (value: string, row: any) => {
        const progress = value === 'PREPPING' ? 75 : 25;
        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div
                className="h-full rounded"
                style={{
                  width: `${progress}%`,
                  backgroundColor: value === 'PREPPING' ? 'var(--accent-green)' : 'var(--accent-yellow)',
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{value}</span>
          </div>
        );
      },
    },
  ];

  return (
    <MissionControlCard title="GLOBAL MISSION QUEUE" color="orange" glow>
      <MonospaceTable columns={columns} data={queueFlights} />
    </MissionControlCard>
  );
}
