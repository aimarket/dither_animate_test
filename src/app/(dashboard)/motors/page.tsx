'use client';

import { useState, useEffect } from 'react';
import { MissionControlCard } from '@/components/ui/MissionControlCard';
import { MonospaceTable } from '@/components/ui/MonospaceTable';
import { TechnicalBorder } from '@/components/ui/TechnicalBorder';
import { CardSkeleton } from '@/components/ui/Loading';
import { Search, Zap } from 'lucide-react';

interface Motor {
  id: string;
  manufacturer: string;
  designation: string;
  type: string;
  impulse_class: string;
  total_impulse_ns: number;
  avg_thrust_n: number;
  max_thrust_n: number;
  burn_time_s: number;
}

export default function MotorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [motors, setMotors] = useState<Motor[]>([]);

  useEffect(() => {
    fetch('/api/motors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMotors(data);
        } else {
          setMotors([]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load motors:', err);
        setIsLoading(false);
      });
  }, []);

  const impulseClasses = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

  const filteredMotors = motors.filter(motor => {
    const matchesSearch = motor.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || motor.impulse_class === selectedClass;
    return matchesSearch && matchesClass;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
            PROPULSION DATABASE
          </h1>
        </div>
        <CardSkeleton />
      </div>
    );
  }

  const columns = [
    {
      key: 'designation',
      label: 'DESIGNATION',
      sortable: true,
      render: (value: unknown) => (
        <span style={{ color: 'var(--accent-orange)', fontWeight: 500 }}>
          {String(value)}
        </span>
      ),
    },
    {
      key: 'manufacturer',
      label: 'MANUFACTURER',
      sortable: true,
    },
    {
      key: 'impulse_class',
      label: 'CLASS',
      width: '90px',
      sortable: true,
      render: (value: unknown) => (
        <span className="px-2 py-1 rounded text-xs font-bold" style={{
          backgroundColor: 'rgba(255, 107, 0, 0.2)',
          color: 'var(--accent-orange)',
          border: '1px solid var(--accent-orange)',
        }}>
          {String(value)}
        </span>
      ),
    },
    {
      key: 'total_impulse_ns',
      label: 'IMPULSE',
      width: '110px',
      align: 'right' as const,
      sortable: true,
      render: (value: unknown) => `${Number(value).toFixed(1)} N·s`,
    },
    {
      key: 'avg_thrust_n',
      label: 'AVG THRUST',
      width: '120px',
      align: 'right' as const,
      sortable: true,
      render: (value: unknown) => `${Number(value).toFixed(1)} N`,
    },
    {
      key: 'max_thrust_n',
      label: 'MAX THRUST',
      width: '120px',
      align: 'right' as const,
      sortable: true,
      render: (value: unknown) => (
        <span style={{ color: 'var(--accent-orange)' }}>
          {Number(value).toFixed(1)} N
        </span>
      ),
    },
    {
      key: 'burn_time_s',
      label: 'BURN TIME',
      width: '110px',
      align: 'right' as const,
      sortable: true,
      render: (value: unknown) => `${Number(value).toFixed(2)} s`,
    },
  ];

  const classCounts = motors.reduce((acc, motor) => {
    acc[motor.impulse_class] = (acc[motor.impulse_class] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    {
      label: 'TOTAL MOTORS',
      value: motors.length,
      color: 'orange' as const,
    },
    {
      label: 'IMPULSE CLASSES',
      value: Object.keys(classCounts).length,
      color: 'cyan' as const,
    },
    {
      label: 'MAX THRUST',
      value: motors.length > 0
        ? Math.max(...motors.map(m => m.max_thrust_n)).toFixed(0)
        : '0',
      unit: 'N',
      color: 'green' as const,
    },
    {
      label: 'FILTERED',
      value: filteredMotors.length,
      color: 'blue' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
          PROPULSION DATABASE
        </h1>
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

      {/* Search and Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TechnicalBorder color="orange">
            <div className="p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--accent-orange)' }} />
                <input
                  type="text"
                  placeholder="SEARCH MOTORS BY DESIGNATION OR MANUFACTURER..."
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
        </div>
        <TechnicalBorder color="cyan">
          <div className="p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full py-3 bg-black border-none outline-none text-sm uppercase cursor-pointer"
              style={{
                color: 'var(--accent-cyan)',
                letterSpacing: '0.05em',
              }}
            >
              {impulseClasses.map((cls) => (
                <option key={cls} value={cls} className="bg-black">
                  {cls === 'all' ? 'ALL CLASSES' : `CLASS ${cls}`}
                </option>
              ))}
            </select>
          </div>
        </TechnicalBorder>
      </div>

      {/* Motors Table */}
      <MissionControlCard title="MOTOR SPECIFICATIONS" status="active" color="orange" glow>
        {filteredMotors.length === 0 ? (
          <div className="py-12 text-center">
            <Zap className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
              {searchTerm || selectedClass !== 'all' ? 'NO MOTORS MATCH CRITERIA' : 'MOTOR DATABASE EMPTY'}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {searchTerm || selectedClass !== 'all'
                ? 'Adjust search parameters or filter settings'
                : 'Motor specifications will be loaded from database'}
            </p>
          </div>
        ) : (
          <MonospaceTable
            columns={columns}
            data={filteredMotors}
            onRowClick={(row) => console.log('Motor selected:', row.id)}
          />
        )}
      </MissionControlCard>

      {/* Technical Info Panel */}
      <TechnicalBorder color="cyan">
        <div className="p-5" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
            <h3 className="text-sm font-bold uppercase" style={{ color: 'var(--accent-cyan)', letterSpacing: '0.1em' }}>
              MOTOR CLASSIFICATION REFERENCE
            </h3>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Impulse class designation follows NAR/TRA standards: Each letter represents a doubling of total impulse range.
            Class bounds: A (2.5-5 N·s), B (5-10 N·s), C (10-20 N·s), D (20-40 N·s), E (40-80 N·s), continuing exponentially.
            Higher classifications indicate greater propulsive capability and are certified for progressively larger vehicle platforms.
          </p>
        </div>
      </TechnicalBorder>
    </div>
  );
}
