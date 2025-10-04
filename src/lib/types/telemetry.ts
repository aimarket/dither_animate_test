export type FlightState = 'PAD' | 'BOOST' | 'COAST' | 'DROGUE' | 'MAIN' | 'LANDED';

export interface TelemetryFrame {
  flight_id: string;
  timestamp: string;
  relative_time_ms: number;

  // IMU data
  accel_x_g?: number;
  accel_y_g?: number;
  accel_z_g?: number;
  gyro_x_dps?: number;
  gyro_y_dps?: number;
  gyro_z_dps?: number;

  // Magnetometer
  mag_x_ut?: number;
  mag_y_ut?: number;
  mag_z_ut?: number;

  // Barometer
  pressure_pa?: number;
  temperature_c?: number;

  // GPS
  gps_latitude?: number;
  gps_longitude?: number;
  gps_altitude_m?: number;
  gps_speed_ms?: number;
  gps_satellites?: number;

  // Computed/fused values
  altitude_agl_m?: number;
  vertical_velocity_ms?: number;
  orientation_w?: number;
  orientation_x?: number;
  orientation_y?: number;
  orientation_z?: number;

  // Flight computer status
  pyro_continuity_1?: boolean;
  pyro_continuity_2?: boolean;
  battery_voltage_v?: number;
  flight_state?: FlightState;
}

export interface TelemetryQueryParams {
  flight_id: string;
  start_time?: string;
  end_time?: string;
  start_ms?: number;
  end_ms?: number;
  downsample?: number; // Downsample to N samples
}

export interface TrajectoryPoint {
  latitude: number;
  longitude: number;
  altitude_agl_m: number;
  timestamp: string;
}

export interface FlightEvent {
  time_ms: number;
  event_type: 'launch' | 'max_q' | 'burnout' | 'apogee' | 'drogue' | 'main' | 'landing';
  description: string;
  altitude_m?: number;
  velocity_ms?: number;
}
