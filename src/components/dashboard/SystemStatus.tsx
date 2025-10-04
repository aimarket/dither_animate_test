'use client';

import { useEffect, useState } from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { Database, Activity, Wifi, Zap } from 'lucide-react';

export function SystemStatus() {
  const [dataRate, setDataRate] = useState(47);

  // Simulate fluctuating data rate
  useEffect(() => {
    const interval = setInterval(() => {
      setDataRate((prev) => {
        const change = Math.random() * 10 - 5;
        return Math.max(35, Math.min(55, prev + change));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const systems = [
    {
      icon: Database,
      label: 'Database',
      status: 'active' as const,
      value: 'Connected',
    },
    {
      icon: Activity,
      label: 'Telemetry Stream',
      status: 'active' as const,
      value: 'Active',
    },
    {
      icon: Wifi,
      label: 'API Status',
      status: 'success' as const,
      value: 'Operational',
    },
    {
      icon: Zap,
      label: 'Data Rate',
      status: 'active' as const,
      value: `${dataRate.toFixed(0)} Hz`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {systems.map((system, idx) => {
        const Icon = system.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(0, 255, 255, 0.1)',
            }}
          >
            <Icon
              className="w-5 h-5"
              style={{
                color: 'var(--accent-cyan)',
              }}
            />
            <div className="flex-1">
              <p
                className="text-xs uppercase mb-1"
                style={{
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                }}
              >
                {system.label}
              </p>
              <div className="flex items-center gap-2">
                <StatusIndicator status={system.status} showDot pulse={system.status === 'active'} />
                <span
                  className="text-sm font-medium"
                  style={{
                    color: 'var(--text-neon)',
                  }}
                >
                  {system.value}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
