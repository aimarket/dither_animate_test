'use client';

import React, { useEffect, useRef } from 'react';
import { Circle, AlertCircle, CheckCircle, Info, Zap } from 'lucide-react';

type EventType = 'info' | 'success' | 'warning' | 'error' | 'activity';

interface LogEvent {
  id: string | number;
  type: EventType;
  message: string;
  timestamp: Date | string;
}

interface ActivityLogProps {
  events: LogEvent[];
  autoScroll?: boolean;
  maxHeight?: string;
  className?: string;
}

const eventConfig: Record<EventType, { icon: React.ElementType; color: string }> = {
  info: {
    icon: Info,
    color: '#0088ff',
  },
  success: {
    icon: CheckCircle,
    color: '#00ff88',
  },
  warning: {
    icon: AlertCircle,
    color: '#ffaa00',
  },
  error: {
    icon: AlertCircle,
    color: '#ff0044',
  },
  activity: {
    icon: Zap,
    color: '#00ffff',
  },
};

function formatTimestamp(timestamp: Date | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  if (seconds > 0) return `${seconds}s ago`;
  return 'Just now';
}

export function ActivityLog({
  events,
  autoScroll = true,
  maxHeight = '400px',
  className = '',
}: ActivityLogProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [events, autoScroll]);

  return (
    <div
      ref={containerRef}
      className={`overflow-y-auto space-y-2 ${className}`}
      style={{
        maxHeight,
      }}
    >
      {events.map((event) => {
        const config = eventConfig[event.type];
        const Icon = config.icon;

        return (
          <div
            key={event.id}
            className="flex items-start gap-3 p-2 rounded"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderLeft: `2px solid ${config.color}`,
            }}
          >
            <Icon
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{
                color: config.color,
              }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-sm"
                style={{
                  color: 'var(--text-primary)',
                }}
              >
                {event.message}
              </p>
              <p
                className="text-xs mt-1"
                style={{
                  color: 'var(--text-tertiary)',
                }}
              >
                {formatTimestamp(event.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
      {events.length === 0 && (
        <div
          className="text-center py-8 text-sm"
          style={{
            color: 'var(--text-tertiary)',
          }}
        >
          No activity yet
        </div>
      )}
    </div>
  );
}
