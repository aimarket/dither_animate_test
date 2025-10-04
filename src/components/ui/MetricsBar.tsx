import React from 'react';

interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  color?: 'cyan' | 'orange' | 'green' | 'blue' | 'red' | 'yellow';
}

interface MetricsBarProps {
  metrics: Metric[];
  className?: string;
}

const colorMap = {
  cyan: '#00ffff',
  orange: '#ff6b00',
  green: '#00ff88',
  blue: '#0088ff',
  red: '#ff0044',
  yellow: '#ffaa00',
};

export function MetricsBar({ metrics, className = '' }: MetricsBarProps) {
  return (
    <div
      className={`flex items-center justify-between gap-6 px-6 py-4 ${className}`}
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
      }}
    >
      {metrics.map((metric, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <div
              className="w-px h-8"
              style={{
                backgroundColor: 'rgba(0, 255, 255, 0.2)',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.2)',
              }}
            />
          )}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="text-xs uppercase mb-1"
              style={{
                color: 'var(--text-secondary)',
                letterSpacing: '0.15em',
              }}
            >
              {metric.label}
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-2xl font-bold tabular-nums"
                style={{
                  color: metric.color ? colorMap[metric.color] : 'var(--text-neon)',
                  textShadow: metric.color
                    ? `0 0 10px ${colorMap[metric.color]}60`
                    : '0 0 10px rgba(0, 255, 255, 0.4)',
                }}
              >
                {metric.value}
              </span>
              {metric.unit && (
                <span
                  className="text-sm"
                  style={{
                    color: 'var(--text-secondary)',
                  }}
                >
                  {metric.unit}
                </span>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
