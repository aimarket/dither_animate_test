export interface Flight {
  id: string;
  user_id: string;
  rocket_id?: string;
  flight_name: string;
  flight_date: string;
  location?: string;
  motor_designation?: string;
  motor_manufacturer?: string;
  recovery_type?: 'single' | 'dual';
  notes?: string;

  // Computed metrics
  max_altitude_m?: number;
  max_velocity_ms?: number;
  max_acceleration_g?: number;
  apogee_time_s?: number;
  flight_duration_s?: number;
  rail_departure_velocity_ms?: number;

  // Metadata
  raw_file_size_bytes?: number;
  sample_rate_hz?: number;
  telemetry_start_time?: string;
  telemetry_end_time?: string;

  created_at: string;
  processed_at?: string;
}

export interface FlightMetrics {
  apogee_altitude_m: number;
  apogee_time_s: number;
  max_velocity_ms: number;
  max_acceleration_g: number;
  rail_departure_velocity_ms: number;
  flight_duration_s: number;
  coast_time_s: number;
  descent_rate_ms: number;
}

export interface Rocket {
  id: string;
  user_id: string;
  name: string;
  diameter_mm: number;
  length_mm: number;
  dry_mass_g: number;
  description?: string;
  created_at: string;
}

export interface Motor {
  id: string;
  designation: string;
  manufacturer: string;
  impulse_class: string;
  total_impulse_ns: number;
  avg_thrust_n: number;
  max_thrust_n: number;
  burn_time_s: number;
  propellant_mass_g: number;
  thrust_curve: ThrustCurvePoint[];
}

export interface ThrustCurvePoint {
  time_s: number;
  thrust_n: number;
}
