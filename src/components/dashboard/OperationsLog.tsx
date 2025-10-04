'use client';

import { useMemo } from 'react';
import { useFlights } from '@/lib/hooks/useFlights';
import { MissionControlCard } from '@/components/ui/MissionControlCard';
import { ActivityLog } from '@/components/ui/ActivityLog';

export function OperationsLog() {
  const { data: flights } = useFlights();

  // Generate activity events from flight data
  const events = useMemo(() => {
    const flightData = flights?.data || [];
    if (flightData.length === 0) return [];

    return flightData.slice(0, 15).map((flight, idx) => {
      const eventTypes = ['info', 'success', 'warning', 'activity'] as const;
      const messages = [
        `Flight ${flight.id.slice(0, 8).toUpperCase()} launched from pad`,
        `${flight.rocket?.name || 'Rocket'} reached apogee at ${flight.apogee_altitude_m?.toFixed(0) || 'N/A'}m`,
        `Landing detected for mission ${flight.id.slice(0, 8).toUpperCase()}`,
        `Telemetry data processing completed`,
        `Maximum acceleration ${flight.max_acceleration_g?.toFixed(1) || 'N/A'}G recorded`,
      ];

      const messageIndex = idx % messages.length;
      const type = idx % 4 === 0 ? 'success' : eventTypes[idx % eventTypes.length];

      // Create timestamps going backwards from now
      const minutesAgo = idx * 2;
      const timestamp = new Date(Date.now() - minutesAgo * 60 * 1000);

      return {
        id: `event-${idx}`,
        type,
        message: messages[messageIndex],
        timestamp,
      };
    }).reverse(); // Reverse so newest is last (for auto-scroll)
  }, [flights]);

  return (
    <MissionControlCard title="OPERATIONS LOG" color="green" glow>
      <ActivityLog events={events} autoScroll maxHeight="400px" />
    </MissionControlCard>
  );
}
