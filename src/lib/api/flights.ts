import { apiClient } from './client';
import type { Flight, FlightMetrics } from '../types/flight';
import type { PaginatedResponse } from '../types/api';

export const flightsApi = {
  async getFlights(page = 1, perPage = 20): Promise<PaginatedResponse<Flight>> {
    const { data } = await apiClient.get('/api/flights', {
      params: { page, per_page: perPage },
    });
    return data;
  },

  async getFlight(id: string): Promise<Flight> {
    const { data } = await apiClient.get(`/api/flights/${id}`);
    return data;
  },

  async createFlight(flight: Partial<Flight>): Promise<Flight> {
    const { data } = await apiClient.post('/api/flights', flight);
    return data;
  },

  async updateFlight(id: string, flight: Partial<Flight>): Promise<Flight> {
    const { data } = await apiClient.put(`/api/flights/${id}`, flight);
    return data;
  },

  async deleteFlight(id: string): Promise<void> {
    await apiClient.delete(`/api/flights/${id}`);
  },

  async uploadFile(flightId: string, file: File, onProgress?: (progress: number) => void): Promise<Flight> {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await apiClient.post(`/api/flights/${flightId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(progress);
        }
      },
    });
    return data;
  },

  async exportFlight(id: string, format: 'csv' | 'json' | 'kml'): Promise<Blob> {
    const { data } = await apiClient.get(`/api/flights/${id}/export`, {
      params: { format },
      responseType: 'blob',
    });
    return data;
  },

  async getFlightMetrics(id: string): Promise<FlightMetrics> {
    const { data } = await apiClient.get(`/api/analysis/${id}/summary`);
    return data;
  },

  async recomputeMetrics(id: string): Promise<FlightMetrics> {
    const { data } = await apiClient.post(`/api/analysis/${id}/recompute`);
    return data;
  },
};
