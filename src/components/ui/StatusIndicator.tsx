import React from 'react';

type StatusType = 'active' | 'pending' | 'success' | 'failed' | 'idle';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  pulse?: boolean;
  showDot?: boolean;
  className?: string;
}

const statusConfig: Record<StatusType, { color: string; bg: string; label: string }> = {
  active: {
    color: '#00ff88',
    bg: 'rgba(0, 255, 136, 0.1)',
    label: 'ACTIVE',
  },
  pending: {
    color: '#ffaa00',
    bg: 'rgba(255, 170, 0, 0.1)',
    label: 'PENDING',
  },
  success: {
    color: '#00ff88',
    bg: 'rgba(0, 255, 136, 0.1)',
    label: 'SUCCESS',
  },
  failed: {
    color: '#ff0044',
    bg: 'rgba(255, 0, 68, 0.1)',
    label: 'FAILED',
  },
  idle: {
    color: '#666666',
    bg: 'rgba(102, 102, 102, 0.1)',
    label: 'IDLE',
  },
};

export function StatusIndicator({
  status,
  label,
  pulse = false,
  showDot = true,
  className = '',
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <div
      className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${className}`}
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.color}40`,
      }}
    >
      {showDot && (
        <span
          className="relative flex h-2 w-2"
          style={{
            color: config.color,
          }}
        >
          {pulse && (
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{
                backgroundColor: config.color,
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
              }}
            />
          )}
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{
              backgroundColor: config.color,
            }}
          />
        </span>
      )}
      <span style={{ letterSpacing: '0.1em' }}>{displayLabel}</span>
    </div>
  );
}

// Add keyframes for pulse animation to globals.css if not already there
// @keyframes ping {
//   75%, 100% {
//     transform: scale(2);
//     opacity: 0;
//   }
// }
