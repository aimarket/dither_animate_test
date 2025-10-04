'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { TelemetryFrame } from '../types/telemetry';

interface UseWebSocketOptions {
  maxBufferSize?: number;
  reconnectDelay?: number;
  autoConnect?: boolean;
}

export function useWebSocket(
  flightId: string,
  options: UseWebSocketOptions = {}
) {
  const {
    maxBufferSize = 1000,
    reconnectDelay = 3000,
    autoConnect = true,
  } = options;

  const [telemetry, setTelemetry] = useState<TelemetryFrame[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
    const ws = new WebSocket(`${wsUrl}/ws/telemetry/${flightId}`);

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const frame: TelemetryFrame = JSON.parse(event.data);
        setTelemetry((prev) => {
          const newData = [...prev, frame];
          // Keep only last N frames to prevent memory issues
          return newData.slice(-maxBufferSize);
        });
      } catch (err) {
        console.error('Failed to parse telemetry frame:', err);
      }
    };

    ws.onerror = (event) => {
      setError(new Error('WebSocket error'));
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');

      // Attempt to reconnect
      if (autoConnect) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connect();
        }, reconnectDelay);
      }
    };

    wsRef.current = ws;
  }, [flightId, maxBufferSize, reconnectDelay, autoConnect]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const clearBuffer = useCallback(() => {
    setTelemetry([]);
  }, []);

  useEffect(() => {
    if (autoConnect && flightId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [flightId, autoConnect, connect, disconnect]);

  const latestFrame = telemetry[telemetry.length - 1];

  return {
    telemetry,
    latestFrame,
    isConnected,
    error,
    connect,
    disconnect,
    clearBuffer,
  };
}
