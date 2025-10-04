'use client';

import { useFlights } from '@/lib/hooks/useFlights';
import { MissionControlCard } from '@/components/ui/MissionControlCard';
import { RadarVisualization } from '@/components/ui/RadarVisualization';

export function FlightRadar() {
  const { data: flights } = useFlights();

  // Transform flights into radar points
  // Since we don't have real GPS data for all flights, simulate positions
  const flightPoints = (flights?.data || []).slice(0, 8).map((flight, idx) => {
    const angle = (idx / 8) * Math.PI * 2;
    const distance = 0.3 + Math.random() * 0.5; // 0.3-0.8 normalized radius

    // Determine phase based on status or default
    let phase: 'BOOST' | 'COAST' | 'DESCENT' | 'IDLE' = 'IDLE';
    if (flight.status === 'ACTIVE') {
      const phases: Array<'BOOST' | 'COAST' | 'DESCENT'> = ['BOOST', 'COAST', 'DESCENT'];
      phase = phases[idx % 3];
    } else if (flight.status === 'COMPLETED') {
      phase = 'DESCENT';
    }

    return {
      id: flight.id,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      label: flight.rocket?.name?.slice(0, 5).toUpperCase() || flight.id.slice(0, 4).toUpperCase(),
      phase,
    };
  });

  return (
    <MissionControlCard title="FLIGHT RADAR" color="blue" glow>
      <div className="flex flex-col items-center">
        <RadarVisualization flights={flightPoints} size={300} />
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff6b00' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>BOOST</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0088ff' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>COAST</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00ff88' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>DESCENT</span>
          </div>
        </div>
      </div>
    </MissionControlCard>
  );
}
