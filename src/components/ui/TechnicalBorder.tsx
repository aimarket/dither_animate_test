import React from 'react';

type BorderColor = 'cyan' | 'orange' | 'green' | 'blue' | 'red' | 'yellow';

interface TechnicalBorderProps {
  children: React.ReactNode;
  color?: BorderColor;
  glow?: boolean;
  label?: string;
  className?: string;
}

const colorMap: Record<BorderColor, { border: string; bracket: string; glow: string }> = {
  cyan: {
    border: 'rgba(0, 255, 255, 0.5)',
    bracket: '#00ffff',
    glow: '0 0 10px rgba(0, 255, 255, 0.3)',
  },
  orange: {
    border: 'rgba(255, 107, 0, 0.5)',
    bracket: '#ff6b00',
    glow: '0 0 10px rgba(255, 107, 0, 0.3)',
  },
  green: {
    border: 'rgba(0, 255, 136, 0.5)',
    bracket: '#00ff88',
    glow: '0 0 10px rgba(0, 255, 136, 0.3)',
  },
  blue: {
    border: 'rgba(0, 136, 255, 0.5)',
    bracket: '#0088ff',
    glow: '0 0 10px rgba(0, 136, 255, 0.3)',
  },
  red: {
    border: 'rgba(255, 0, 68, 0.5)',
    bracket: '#ff0044',
    glow: '0 0 10px rgba(255, 0, 68, 0.3)',
  },
  yellow: {
    border: 'rgba(255, 170, 0, 0.5)',
    bracket: '#ffaa00',
    glow: '0 0 10px rgba(255, 170, 0, 0.3)',
  },
};

export function TechnicalBorder({
  children,
  color = 'cyan',
  glow = false,
  label,
  className = '',
}: TechnicalBorderProps) {
  const colors = colorMap[color];

  return (
    <div
      className={`relative ${className}`}
      style={{
        border: `1px solid ${colors.border}`,
        boxShadow: glow ? colors.glow : 'none',
      }}
    >
      {/* Top-left corner bracket */}
      <div
        className="absolute"
        style={{
          top: -2,
          left: -2,
          width: 12,
          height: 12,
          borderTop: `2px solid ${colors.bracket}`,
          borderLeft: `2px solid ${colors.bracket}`,
        }}
      />

      {/* Top-right corner bracket */}
      <div
        className="absolute"
        style={{
          top: -2,
          right: -2,
          width: 12,
          height: 12,
          borderTop: `2px solid ${colors.bracket}`,
          borderRight: `2px solid ${colors.bracket}`,
        }}
      />

      {/* Bottom-left corner bracket */}
      <div
        className="absolute"
        style={{
          bottom: -2,
          left: -2,
          width: 12,
          height: 12,
          borderBottom: `2px solid ${colors.bracket}`,
          borderLeft: `2px solid ${colors.bracket}`,
        }}
      />

      {/* Bottom-right corner bracket */}
      <div
        className="absolute"
        style={{
          bottom: -2,
          right: -2,
          width: 12,
          height: 12,
          borderBottom: `2px solid ${colors.bracket}`,
          borderRight: `2px solid ${colors.bracket}`,
        }}
      />

      {/* Optional label */}
      {label && (
        <div
          className="absolute text-xs font-medium px-2 py-1"
          style={{
            top: -10,
            left: 16,
            backgroundColor: 'var(--bg-primary)',
            color: colors.bracket,
            letterSpacing: '0.1em',
          }}
        >
          {label}
        </div>
      )}

      {children}
    </div>
  );
}
