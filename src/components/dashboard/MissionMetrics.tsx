'use client';

import { useFlights } from '@/lib/hooks/useFlights';
import { MetricsBar } from '@/components/ui/MetricsBar';
import { useEffect, useState } from 'react';

export function MissionMetrics() {
  const { data: flights } = useFlights();
  const [throughput, setThroughput] = useState(47);

  // Simulate live throughput
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput((prev) => {
        const change = Math.random() * 10 - 5;
        return Math.max(30, Math.min(60, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const flightData = flights?.data || [];
  const totalMissions = flightData.length || 0;
  const activeMissions = flightData.filter(f =>
    f.status === 'ACTIVE' || f.status === 'PROCESSING'
  ).length || 0;

  const successfulFlights = flightData.filter(f =>
    f.status === 'COMPLETED'
  ).length || 0;

  const successRate = totalMissions > 0
    ? ((successfulFlights / totalMissions) * 100).toFixed(1)
    : '0.0';

  // Count unique rockets and motors from flights
  const uniqueRockets = new Set(flightData.map(f => f.rocket_id).filter(Boolean)).size;
  const totalRockets = uniqueRockets || 5; // Fallback to known count
  const totalMotors = 8; // Known from seed data

  const metrics = [
    {
      label: 'TOTAL MISSIONS',
      value: totalMissions,
      color: 'cyan' as const,
    },
    {
      label: 'ACTIVE LAUNCHES',
      value: activeMissions,
      color: 'green' as const,
    },
    {
      label: 'TOTAL ROCKETS',
      value: totalRockets,
      color: 'blue' as const,
    },
    {
      label: 'TOTAL MOTORS',
      value: totalMotors,
      color: 'orange' as const,
    },
    {
      label: 'SUCCESS RATE',
      value: successRate,
      unit: '%',
      color: parseFloat(successRate) >= 90 ? 'green' as const : 'yellow' as const,
    },
    {
      label: 'THROUGHPUT',
      value: throughput.toFixed(0),
      unit: 'Hz',
      color: 'cyan' as const,
    },
  ];

  return <MetricsBar metrics={metrics} />;
}
