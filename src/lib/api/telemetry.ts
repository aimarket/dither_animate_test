import { apiClient } from './client';
import type { TelemetryFrame, TelemetryQueryParams, TrajectoryPoint, FlightEvent } from '../types/telemetry';

export const telemetryApi = {
  async getTelemetry(params: TelemetryQueryParams): Promise<TelemetryFrame[]> {
    const { data } = await apiClient.get(`/api/telemetry/${params.flight_id}`, {
      params: {
        start_time: params.start_time,
        end_time: params.end_time,
        start_ms: params.start_ms,
        end_ms: params.end_ms,
        downsample: params.downsample,
      },
    });
    return data;
  },

  async getTelemetryRange(flightId: string, startMs: number, endMs: number): Promise<TelemetryFrame[]> {
    const { data } = await apiClient.get(`/api/telemetry/${flightId}/range/${startMs}/${endMs}`);
    return data;
  },

  async getFlightEvents(flightId: string): Promise<FlightEvent[]> {
    const { data } = await apiClient.get(`/api/telemetry/${flightId}/events`);
    return data;
  },

  async getTrajectory(flightId: string): Promise<TrajectoryPoint[]> {
    const { data } = await apiClient.get(`/api/analysis/${flightId}/trajectory`);
    return data;
  },
};
