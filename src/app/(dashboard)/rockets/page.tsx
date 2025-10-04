'use client';

import { useState, useEffect } from 'react';
import { MissionControlCard } from '@/components/ui/MissionControlCard';
import { MonospaceTable } from '@/components/ui/MonospaceTable';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { TechnicalBorder } from '@/components/ui/TechnicalBorder';
import { CardSkeleton } from '@/components/ui/Loading';
import { Search, Plus, Rocket } from 'lucide-react';

interface RocketType {
  id: string;
  name: string;
  diameter_mm: number;
  length_mm: number;
  dry_mass_g: number;
  description?: string;
  created_at: string;
  flight_count: number;
}

export default function RocketsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [rockets, setRockets] = useState<RocketType[]>([]);

  useEffect(() => {
    fetch('/api/rockets')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRockets(data);
        } else {
          setRockets([]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load rockets:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
            ROCKET INVENTORY
          </h1>
        </div>
        <CardSkeleton />
      </div>
    );
  }

  const filteredRockets = rockets.filter(rocket =>
    rocket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rocket.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'id',
      label: 'VEHICLE ID',
      width: '120px',
      sortable: true,
      render: (value: string) => (
        <span style={{ color: 'var(--accent-cyan)' }}>
          {value.slice(0, 8).toUpperCase()}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'DESIGNATION',
      sortable: true,
      render: (value: string) => (
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
          {value}
        </span>
      ),
    },
    {
      key: 'diameter_mm',
      label: 'DIAMETER',
      width: '110px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => `${value}mm`,
    },
    {
      key: 'length_mm',
      label: 'LENGTH',
      width: '110px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => `${value}mm`,
    },
    {
      key: 'dry_mass_g',
      label: 'DRY MASS',
      width: '110px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => `${value}g`,
    },
    {
      key: 'flight_count',
      label: 'FLIGHTS',
      width: '90px',
      align: 'right' as const,
      sortable: true,
      render: (value: number) => (
        <span style={{ color: value > 0 ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'STATUS',
      width: '140px',
      render: (_: any, row: RocketType) => {
        const status = row.flight_count > 0 ? 'active' : 'idle';
        const label = row.flight_count > 0 ? 'OPERATIONAL' : 'STANDBY';
        return <StatusIndicator status={status} label={label} showDot={true} />;
      },
    },
  ];

  const stats = [
    {
      label: 'TOTAL VEHICLES',
      value: rockets.length,
      color: 'cyan' as const,
    },
    {
      label: 'OPERATIONAL',
      value: rockets.filter(r => r.flight_count > 0).length,
      color: 'green' as const,
    },
    {
      label: 'AVG DIAMETER',
      value: rockets.length > 0
        ? (rockets.reduce((sum, r) => sum + r.diameter_mm, 0) / rockets.length).toFixed(0)
        : '0',
      unit: 'mm',
      color: 'blue' as const,
    },
    {
      label: 'FILTERED',
      value: filteredRockets.length,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
          ROCKET INVENTORY
        </h1>
        <button
          className="px-4 py-2 rounded text-sm font-medium transition-all"
          style={{
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            color: 'var(--accent-green)',
            border: '1px solid var(--accent-green)',
          }}
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
          NEW VEHICLE
        </button>
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
              placeholder="SEARCH VEHICLES BY NAME OR DESCRIPTION..."
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

      {/* Rockets Table */}
      <MissionControlCard title="VEHICLE REGISTRY" status="active" color="cyan" glow>
        {filteredRockets.length === 0 ? (
          <div className="py-12 text-center">
            <Rocket className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
              {searchTerm ? 'NO VEHICLES MATCH SEARCH' : 'NO VEHICLES IN INVENTORY'}
            </p>
            {!searchTerm && (
              <button
                className="mt-4 px-6 py-3 rounded text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  color: 'var(--accent-green)',
                  border: '1px solid var(--accent-green)',
                }}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                ADD FIRST VEHICLE
              </button>
            )}
          </div>
        ) : (
          <MonospaceTable
            columns={columns}
            data={filteredRockets}
            onRowClick={(row) => console.log('Rocket selected:', row.id)}
          />
        )}
      </MissionControlCard>

      {/* Vehicle Details Cards */}
      {filteredRockets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRockets.slice(0, 6).map((rocket) => (
            <TechnicalBorder key={rocket.id} color="cyan">
              <div className="p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase" style={{ color: 'var(--accent-cyan)', letterSpacing: '0.1em' }}>
                    {rocket.id.slice(0, 8).toUpperCase()}
                  </span>
                  <StatusIndicator
                    status={rocket.flight_count > 0 ? 'active' : 'idle'}
                    label=""
                    showDot={true}
                    pulse={rocket.flight_count > 0}
                  />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {rocket.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--text-secondary)' }}>DIAMETER</span>
                    <span style={{ color: 'var(--text-primary)' }}>{rocket.diameter_mm}mm</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--text-secondary)' }}>LENGTH</span>
                    <span style={{ color: 'var(--text-primary)' }}>{rocket.length_mm}mm</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--text-secondary)' }}>DRY MASS</span>
                    <span style={{ color: 'var(--text-primary)' }}>{rocket.dry_mass_g}g</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--text-secondary)' }}>MISSIONS</span>
                    <span style={{ color: 'var(--accent-green)' }}>{rocket.flight_count}</span>
                  </div>
                </div>
                {rocket.description && (
                  <p className="mt-3 text-xs" style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {rocket.description}
                  </p>
                )}
              </div>
            </TechnicalBorder>
          ))}
        </div>
      )}
    </div>
  );
}
