'use client';

import { useRouter } from 'next/navigation';
import { useFlights } from '@/lib/hooks/useFlights';
import { MissionControlCard } from '@/components/ui/MissionControlCard';
import { MonospaceTable } from '@/components/ui/MonospaceTable';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

export function ActiveMissionsTable() {
  const { data: flights } = useFlights();
  const router = useRouter();

  const recentFlights = flights?.data?.slice(0, 10) || [];

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '80px',
      sortable: true,
      render: (value: string) => value.slice(0, 8).toUpperCase(),
    },
    {
      key: 'rocket_name',
      label: 'ROCKET',
      sortable: true,
      render: (_: any, row: any) => row.rocket?.name || 'Unknown',
    },
    {
      key: 'status',
      label: 'STATUS',
      width: '140px',
      sortable: true,
      render: (value: string) => {
        const statusMap: Record<string, 'active' | 'pending' | 'success' | 'failed' | 'idle'> = {
          ACTIVE: 'active',
          PROCESSING: 'pending',
          COMPLETED: 'success',
          FAILED: 'failed',
        };
        return (
          <StatusIndicator
            status={statusMap[value] || 'idle'}
            label={value}
            pulse={value === 'ACTIVE'}
            showDot={true}
          />
        );
      },
    },
    {
      key: 'apogee_altitude_m',
      label: 'APOGEE',
      width: '100px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => value ? `${value.toFixed(0)}m` : '-',
    },
    {
      key: 'flight_duration_s',
      label: 'DURATION',
      width: '100px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => value ? `${value.toFixed(1)}s` : '-',
    },
    {
      key: 'max_acceleration_g',
      label: 'MAX G',
      width: '90px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => value ? `${value.toFixed(1)}G` : '-',
    },
  ];

  return (
    <MissionControlCard title="ACTIVE MISSIONS" color="cyan" glow>
      <MonospaceTable
        columns={columns}
        data={recentFlights}
        onRowClick={(row) => router.push(`/flights/${row.id}`)}
      />
    </MissionControlCard>
  );
}
