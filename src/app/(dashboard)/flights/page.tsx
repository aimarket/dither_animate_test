'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFlights } from '@/lib/hooks/useFlights';
import { MissionControlCard } from '@/components/ui/MissionControlCard';
import { MonospaceTable } from '@/components/ui/MonospaceTable';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { TechnicalBorder } from '@/components/ui/TechnicalBorder';
import { CardSkeleton } from '@/components/ui/Loading';
import { Search, Plus, Download } from 'lucide-react';

export default function FlightsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: flights, isLoading } = useFlights();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
            FLIGHT DATABASE
          </h1>
        </div>
        <CardSkeleton />
      </div>
    );
  }

  const flightData = flights?.data || [];
  const filteredFlights = flightData.filter(flight =>
    flight.flight_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.rocket?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'id',
      label: 'MISSION ID',
      width: '120px',
      sortable: true,
      render: (value: string) => (
        <span style={{ color: 'var(--text-neon)' }}>
          {value.slice(0, 8).toUpperCase()}
        </span>
      ),
    },
    {
      key: 'flight_name',
      label: 'FLIGHT NAME',
      sortable: true,
    },
    {
      key: 'rocket_name',
      label: 'ROCKET',
      sortable: true,
      render: (_: any, row: any) => row.rocket?.name || 'Unknown',
    },
    {
      key: 'flight_date',
      label: 'DATE',
      width: '120px',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'max_altitude_m',
      label: 'APOGEE',
      width: '100px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => value ? `${value.toFixed(0)}m` : '-',
    },
    {
      key: 'max_velocity_ms',
      label: 'MAX VEL',
      width: '100px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => value ? `${value.toFixed(1)}m/s` : '-',
    },
    {
      key: 'max_acceleration_g',
      label: 'MAX G',
      width: '90px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => value ? `${value.toFixed(1)}G` : '-',
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
            label={value || 'IDLE'}
            showDot={true}
          />
        );
      },
    },
  ];

  const stats = [
    {
      label: 'TOTAL FLIGHTS',
      value: flightData.length,
      color: 'cyan' as const,
    },
    {
      label: 'MAX ALTITUDE',
      value: flightData.length > 0
        ? Math.max(...flightData.map(f => f.max_altitude_m || 0)).toFixed(0)
        : '0',
      unit: 'm',
      color: 'green' as const,
    },
    {
      label: 'AVG ALTITUDE',
      value: flightData.length > 0
        ? (flightData.reduce((sum, f) => sum + (f.max_altitude_m || 0), 0) / flightData.length).toFixed(0)
        : '0',
      unit: 'm',
      color: 'blue' as const,
    },
    {
      label: 'FILTERED',
      value: filteredFlights.length,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
          FLIGHT DATABASE
        </h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded text-sm font-medium transition-all"
            style={{
              backgroundColor: 'rgba(0, 255, 255, 0.1)',
              color: 'var(--accent-cyan)',
              border: '1px solid var(--accent-cyan)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Download className="w-4 h-4 inline mr-2" />
            EXPORT
          </button>
          <button
            className="px-4 py-2 rounded text-sm font-medium transition-all"
            style={{
              backgroundColor: 'rgba(0, 255, 136, 0.1)',
              color: 'var(--accent-green)',
              border: '1px solid var(--accent-green)',
            }}
            onClick={() => router.push('/flights/upload')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 255, 136, 0.2)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            NEW FLIGHT
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <TechnicalBorder key={idx} color={stat.color}>
            <div className="p-4 text-center" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div className="text-xs uppercase mb-2" style={{ color: 'var(--text-secondary)', letterSpacing: '0.15em' }}>
                {stat.label}
              </div>
              <div className="text-2xl font-bold tabular-nums" style={{ color: `var(--accent-${stat.color})` }}>
                {stat.value}
                {stat.unit && <span className="text-sm ml-1" style={{ color: 'var(--text-secondary)' }}>{stat.unit}</span>}
              </div>
            </div>
          </TechnicalBorder>
        ))}
      </div>

      {/* Search Bar */}
      <TechnicalBorder color="cyan">
        <div className="p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
            <input
              type="text"
              placeholder="SEARCH FLIGHTS BY NAME, LOCATION, OR ROCKET..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black border-none outline-none text-sm uppercase"
              style={{
                color: 'var(--text-primary)',
                letterSpacing: '0.05em',
              }}
            />
          </div>
        </div>
      </TechnicalBorder>

      {/* Flights Table */}
      <MissionControlCard title="MISSION LOG" status="active" color="cyan" glow>
        {filteredFlights.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
              {searchTerm ? 'NO FLIGHTS MATCH SEARCH' : 'NO FLIGHTS IN DATABASE'}
            </p>
            {!searchTerm && (
              <button
                className="mt-4 px-6 py-3 rounded text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  color: 'var(--accent-green)',
                  border: '1px solid var(--accent-green)',
                }}
                onClick={() => router.push('/flights/upload')}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                UPLOAD FIRST FLIGHT
              </button>
            )}
          </div>
        ) : (
          <MonospaceTable
            columns={columns}
            data={filteredFlights}
            onRowClick={(row) => router.push(`/flights/${row.id}`)}
          />
        )}
      </MissionControlCard>
    </div>
  );
}
