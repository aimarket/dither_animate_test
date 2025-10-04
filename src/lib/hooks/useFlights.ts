'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { flightsApi } from '../api/flights';
import type { Flight } from '../types/flight';

export function useFlights(page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['flights', page, perPage],
    queryFn: () => flightsApi.getFlights(page, perPage),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useFlight(id: string) {
  return useQuery({
    queryKey: ['flight', id],
    queryFn: () => flightsApi.getFlight(id),
    enabled: !!id,
  });
}

export function useFlightMetrics(id: string) {
  return useQuery({
    queryKey: ['flightMetrics', id],
    queryFn: () => flightsApi.getFlightMetrics(id),
    enabled: !!id,
  });
}

export function useCreateFlight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (flight: Partial<Flight>) => flightsApi.createFlight(flight),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });
}

export function useUpdateFlight(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (flight: Partial<Flight>) => flightsApi.updateFlight(id, flight),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flight', id] });
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });
}

export function useDeleteFlight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => flightsApi.deleteFlight(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });
}

export function useUploadFlight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ flightId, file, onProgress }: {
      flightId: string;
      file: File;
      onProgress?: (progress: number) => void
    }) => flightsApi.uploadFile(flightId, file, onProgress),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['flight', data.id] });
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });
}
