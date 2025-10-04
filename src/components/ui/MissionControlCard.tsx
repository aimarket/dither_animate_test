import React from 'react';
import { TechnicalBorder } from './TechnicalBorder';
import { StatusIndicator } from './StatusIndicator';

type BorderColor = 'cyan' | 'orange' | 'green' | 'blue' | 'red' | 'yellow';
type StatusType = 'active' | 'pending' | 'success' | 'failed' | 'idle';

interface MissionControlCardProps {
  children: React.ReactNode;
  title?: string;
  status?: StatusType;
  color?: BorderColor;
  glow?: boolean;
  className?: string;
  headerRight?: React.ReactNode;
}

export function MissionControlCard({
  children,
  title,
  status,
  color = 'cyan',
  glow = false,
  className = '',
  headerRight,
}: MissionControlCardProps) {
  return (
    <TechnicalBorder color={color} glow={glow} className={className}>
      <div
        className="p-4"
        style={{
          backgroundColor: 'var(--bg-card)',
        }}
      >
        {(title || status || headerRight) && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              {title && (
                <h3
                  className="text-sm font-medium uppercase"
                  style={{
                    color: 'var(--text-neon)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {title}
                </h3>
              )}
              {status && <StatusIndicator status={status} pulse={status === 'active'} />}
            </div>
            {headerRight}
          </div>
        )}
        <div>{children}</div>
      </div>
    </TechnicalBorder>
  );
}
