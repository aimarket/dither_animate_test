'use client';

import { use } from 'react';
import { useFlight } from '@/lib/hooks/useFlights';
import { TechnicalBorder } from '@/components/ui/TechnicalBorder';
import { CardSkeleton } from '@/components/ui/Loading';
import { Calendar, MapPin, Download, TrendingUp, Activity, Clock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FlightLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pathname = usePathname();
  const { data: flight, isLoading, error } = useFlight(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          FLIGHT NOT FOUND
        </p>
        <p className="text-sm mt-2" style={{ color: 'var(--text-tertiary)' }}>
          {error?.message || 'The requested flight could not be loaded'}
        </p>
      </div>
    );
  }

  const isActiveTab = (path: string) => pathname === path;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold uppercase" style={{ color: 'var(--text-neon)', letterSpacing: '0.1em' }}>
            {flight.flight_name}
          </h1>
          <div className="flex items-center gap-4 mt-2" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{new Date(flight.flight_date).toLocaleDateString()}</span>
            </div>
            {flight.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{flight.location}</span>
              </div>
            )}
          </div>
        </div>
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
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TechnicalBorder color="cyan">
          <div className="p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                MAX ALTITUDE
              </span>
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: 'var(--accent-cyan)' }}>
              {flight.max_altitude_m?.toFixed(0) || 'N/A'}
              <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>m</span>
            </div>
          </div>
        </TechnicalBorder>

        <TechnicalBorder color="green">
          <div className="p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                MAX VELOCITY
              </span>
              <Activity className="w-4 h-4" style={{ color: 'var(--accent-green)' }} />
            </div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: 'var(--accent-green)' }}>
              {flight.max_velocity_ms?.toFixed(1) || 'N/A'}
              <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>m/s</span>
            </div>
          </div>
        </TechnicalBorder>

        <TechnicalBorder color="orange">
          <div className="p-4" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                FLIGHT DURATION
              </span>
              <Clock className="w-4 h-4" style={{ color: 'var(--accent-orange)' }} />
            </div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: 'var(--accent-orange)' }}>
              {flight.flight_duration_s?.toFixed(1) || 'N/A'}
              <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>s</span>
            </div>
          </div>
        </TechnicalBorder>
      </div>

      {/* Navigation Tabs */}
      <TechnicalBorder color="cyan">
        <div className="flex gap-1 p-1 overflow-x-auto" style={{ backgroundColor: 'var(--bg-card)' }}>
          <Link href={`/flights/${id}`} className="flex-1 min-w-[100px]">
            <button
              className={`w-full px-4 py-2 text-sm font-medium uppercase transition-all ${
                isActiveTab(`/flights/${id}`) ? '' : ''
              }`}
              style={{
                backgroundColor: isActiveTab(`/flights/${id}`) ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
                color: isActiveTab(`/flights/${id}`) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: isActiveTab(`/flights/${id}`) ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                letterSpacing: '0.05em',
              }}
            >
              OVERVIEW
            </button>
          </Link>
          <Link href={`/flights/${id}/telemetry`} className="flex-1 min-w-[100px]">
            <button
              className={`w-full px-4 py-2 text-sm font-medium uppercase transition-all whitespace-nowrap`}
              style={{
                backgroundColor: isActiveTab(`/flights/${id}/telemetry`) ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
                color: isActiveTab(`/flights/${id}/telemetry`) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: isActiveTab(`/flights/${id}/telemetry`) ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                letterSpacing: '0.05em',
              }}
            >
              TELEMETRY
            </button>
          </Link>
          <Link href={`/flights/${id}/analysis`} className="flex-1 min-w-[100px]">
            <button
              className={`w-full px-4 py-2 text-sm font-medium uppercase transition-all whitespace-nowrap`}
              style={{
                backgroundColor: isActiveTab(`/flights/${id}/analysis`) ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
                color: isActiveTab(`/flights/${id}/analysis`) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: isActiveTab(`/flights/${id}/analysis`) ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                letterSpacing: '0.05em',
              }}
            >
              ANALYSIS
            </button>
          </Link>
          <Link href={`/flights/${id}/trajectory`} className="flex-1 min-w-[120px]">
            <button
              className={`w-full px-4 py-2 text-sm font-medium uppercase transition-all whitespace-nowrap`}
              style={{
                backgroundColor: isActiveTab(`/flights/${id}/trajectory`) ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
                color: isActiveTab(`/flights/${id}/trajectory`) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: isActiveTab(`/flights/${id}/trajectory`) ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                letterSpacing: '0.05em',
              }}
            >
              3D TRAJECTORY
            </button>
          </Link>
        </div>
      </TechnicalBorder>

      {/* Page Content */}
      {children}
    </div>
  );
}
