'use client';

import { useQuery } from '@tanstack/react-query';
import { telemetryApi } from '../api/telemetry';
import type { TelemetryQueryParams } from '../types/telemetry';

export function useTelemetry(params: TelemetryQueryParams) {
  return useQuery({
    queryKey: ['telemetry', params],
    queryFn: () => telemetryApi.getTelemetry(params),
    enabled: !!params.flight_id,
    staleTime: 60 * 1000, // 1 minute - telemetry data doesn't change
  });
}

export function useFlightEvents(flightId: string) {
  return useQuery({
    queryKey: ['flightEvents', flightId],
    queryFn: () => telemetryApi.getFlightEvents(flightId),
    enabled: !!flightId,
    staleTime: 60 * 1000,
  });
}

export function useTrajectory(flightId: string) {
  return useQuery({
    queryKey: ['trajectory', flightId],
    queryFn: () => telemetryApi.getTrajectory(flightId),
    enabled: !!flightId,
    staleTime: 60 * 1000,
  });
}
