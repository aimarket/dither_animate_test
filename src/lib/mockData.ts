// Mock data for demo - no database needed!

export const MOCK_USER = {
  id: 'user-1',
  email: 'test@example.com',
  username: 'testuser',
  password: '$2a$10$XqK5K5K5K5K5K5K5K5K5K.K5K5K5K5K5K5K5K5K5K5K5K5K5K', // hashed 'password123'
  createdAt: new Date('2025-01-01'),
};

export const MOCK_ROCKETS = [
  {
    id: 'rocket-1',
    name: 'Alpha Strike',
    diameter_mm: 98,
    length_mm: 1524,
    dry_mass_g: 2400,
    description: 'High-power rocket with dual deployment system',
    user_id: 'user-1',
    flight_count: 2,
    created_at: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'rocket-2',
    name: 'Beta Racer',
    diameter_mm: 75,
    length_mm: 1320,
    dry_mass_g: 1850,
    description: 'Speed-optimized rocket for altitude records',
    user_id: 'user-1',
    flight_count: 1,
    created_at: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'rocket-3',
    name: 'Gamma Explorer',
    diameter_mm: 98,
    length_mm: 1680,
    dry_mass_g: 2850,
    description: 'Research platform with payload bay',
    user_id: 'user-1',
    flight_count: 1,
    created_at: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'rocket-4',
    name: 'Delta Prototype',
    diameter_mm: 75,
    length_mm: 1200,
    dry_mass_g: 1650,
    description: 'Experimental composite airframe design',
    user_id: 'user-1',
    flight_count: 1,
    created_at: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'rocket-5',
    name: 'Epsilon Heavy',
    diameter_mm: 152,
    length_mm: 2100,
    dry_mass_g: 5400,
    description: 'Large-scale dual deploy rocket',
    user_id: 'user-1',
    flight_count: 1,
    created_at: '2025-01-01T00:00:00.000Z',
  },
];

export const MOCK_FLIGHTS = [
  {
    id: 'flight-1',
    user_id: 'user-1',
    rocket_id: 'rocket-1',
    rocket: MOCK_ROCKETS[0],
    flight_name: 'Alpha Strike - L850 Test',
    flight_date: '2025-09-15T00:00:00.000Z',
    location: 'Lucerne Valley, CA',
    motor_designation: 'L850',
    motor_manufacturer: 'Cesaroni',
    recovery_type: 'dual',
    notes: 'Perfect flight, successful dual deployment at 500ft',
    max_altitude_m: 2845.3,
    max_velocity_ms: 245.7,
    max_acceleration_g: 18.4,
    apogee_time_s: 18.2,
    apogee_altitude_m: 2845.3,
    flight_duration_s: 142.5,
    created_at: '2025-09-15T00:00:00.000Z',
    status: 'COMPLETED',
  },
  {
    id: 'flight-2',
    user_id: 'user-1',
    rocket_id: 'rocket-1',
    rocket: MOCK_ROCKETS[0],
    flight_name: 'Alpha Strike - M1419 High Alt',
    flight_date: '2025-09-20T00:00:00.000Z',
    location: 'Black Rock Desert, NV',
    motor_designation: 'M1419',
    motor_manufacturer: 'Cesaroni',
    recovery_type: 'dual',
    notes: 'High altitude attempt - successful, perfect recovery',
    max_altitude_m: 4127.8,
    max_velocity_ms: 312.4,
    max_acceleration_g: 24.1,
    apogee_time_s: 22.7,
    apogee_altitude_m: 4127.8,
    flight_duration_s: 185.3,
    created_at: '2025-09-20T00:00:00.000Z',
    status: 'COMPLETED',
  },
  {
    id: 'flight-3',
    user_id: 'user-1',
    rocket_id: 'rocket-2',
    rocket: MOCK_ROCKETS[1],
    flight_name: 'Beta Racer - L1520 Speed Run',
    flight_date: '2025-09-25T00:00:00.000Z',
    location: 'Mojave Desert, CA',
    motor_designation: 'L1520',
    motor_manufacturer: 'AeroTech',
    recovery_type: 'single',
    notes: 'Speed record attempt, slight weathercocking',
    max_altitude_m: 1980.5,
    max_velocity_ms: 385.2,
    max_acceleration_g: 28.7,
    apogee_time_s: 12.4,
    apogee_altitude_m: 1980.5,
    flight_duration_s: 98.6,
    created_at: '2025-09-25T00:00:00.000Z',
    status: 'COMPLETED',
  },
  {
    id: 'flight-4',
    user_id: 'user-1',
    rocket_id: 'rocket-3',
    rocket: MOCK_ROCKETS[2],
    flight_name: 'Gamma Explorer - Payload Test',
    flight_date: '2025-10-01T00:00:00.000Z',
    location: 'Lucerne Valley, CA',
    motor_designation: 'M1297',
    motor_manufacturer: 'AeroTech',
    recovery_type: 'dual',
    notes: 'Carried 2kg scientific payload, all systems nominal',
    max_altitude_m: 3245.6,
    max_velocity_ms: 198.3,
    max_acceleration_g: 15.2,
    apogee_time_s: 24.8,
    apogee_altitude_m: 3245.6,
    flight_duration_s: 165.4,
    created_at: '2025-10-01T00:00:00.000Z',
    status: 'COMPLETED',
  },
  {
    id: 'flight-5',
    user_id: 'user-1',
    rocket_id: 'rocket-4',
    rocket: MOCK_ROCKETS[3],
    flight_name: 'Delta Proto - Maiden Flight',
    flight_date: '2025-10-05T00:00:00.000Z',
    location: 'Lucerne Valley, CA',
    motor_designation: 'L935',
    motor_manufacturer: 'CTI',
    recovery_type: 'dual',
    notes: 'First flight of new design, minor fin flutter observed',
    max_altitude_m: 2567.3,
    max_velocity_ms: 215.8,
    max_acceleration_g: 19.3,
    apogee_time_s: 16.9,
    apogee_altitude_m: 2567.3,
    flight_duration_s: 128.7,
    created_at: '2025-10-05T00:00:00.000Z',
    status: 'COMPLETED',
  },
  {
    id: 'flight-6',
    user_id: 'user-1',
    rocket_id: 'rocket-5',
    rocket: MOCK_ROCKETS[4],
    flight_name: 'Epsilon Heavy - Certification',
    flight_date: '2025-10-10T00:00:00.000Z',
    location: 'Black Rock Desert, NV',
    motor_designation: 'N2501',
    motor_manufacturer: 'Cesaroni',
    recovery_type: 'dual',
    notes: 'L3 certification flight, textbook perfect',
    max_altitude_m: 5234.9,
    max_velocity_ms: 285.6,
    max_acceleration_g: 22.4,
    apogee_time_s: 28.3,
    apogee_altitude_m: 5234.9,
    flight_duration_s: 215.6,
    created_at: '2025-10-10T00:00:00.000Z',
    status: 'COMPLETED',
  },
];

export const MOCK_MOTORS = [
  {
    id: 'motor-1',
    manufacturer: 'Cesaroni',
    designation: 'L850',
    impulse_class: 'L',
    total_impulse_ns: 1897,
    avg_thrust_n: 850,
    max_thrust_n: 1050,
    burn_time_s: 2.23,
    propellant_mass_g: 980,
    total_mass_g: 1456,
    diameter: 75,
    length: 469,
    type: 'reloadable'
  },
  {
    id: 'motor-2',
    manufacturer: 'Cesaroni',
    designation: 'M1419',
    impulse_class: 'M',
    total_impulse_ns: 4242,
    avg_thrust_n: 1419,
    max_thrust_n: 1650,
    burn_time_s: 2.99,
    propellant_mass_g: 2145,
    total_mass_g: 3156,
    diameter: 98,
    length: 642,
    type: 'reloadable'
  },
  {
    id: 'motor-3',
    manufacturer: 'Cesaroni',
    designation: 'N2501',
    impulse_class: 'N',
    total_impulse_ns: 8456,
    avg_thrust_n: 2501,
    max_thrust_n: 2850,
    burn_time_s: 3.38,
    propellant_mass_g: 4234,
    total_mass_g: 5987,
    diameter: 98,
    length: 1024,
    type: 'reloadable'
  },
  {
    id: 'motor-4',
    manufacturer: 'AeroTech',
    designation: 'L1520',
    impulse_class: 'L',
    total_impulse_ns: 2048,
    avg_thrust_n: 1520,
    max_thrust_n: 1750,
    burn_time_s: 1.35,
    propellant_mass_g: 1120,
    total_mass_g: 1680,
    diameter: 75,
    length: 512,
    type: 'single-use'
  },
  {
    id: 'motor-5',
    manufacturer: 'AeroTech',
    designation: 'M1297',
    impulse_class: 'M',
    total_impulse_ns: 3896,
    avg_thrust_n: 1297,
    max_thrust_n: 1450,
    burn_time_s: 3.0,
    propellant_mass_g: 1980,
    total_mass_g: 2856,
    diameter: 75,
    length: 756,
    type: 'single-use'
  },
  {
    id: 'motor-6',
    manufacturer: 'CTI',
    designation: 'L935',
    impulse_class: 'L',
    total_impulse_ns: 2155,
    avg_thrust_n: 935,
    max_thrust_n: 1100,
    burn_time_s: 2.3,
    propellant_mass_g: 1045,
    total_mass_g: 1580,
    diameter: 75,
    length: 485,
    type: 'reloadable'
  },
  {
    id: 'motor-7',
    manufacturer: 'CTI',
    designation: 'M1670',
    impulse_class: 'M',
    total_impulse_ns: 4998,
    avg_thrust_n: 1670,
    max_thrust_n: 1900,
    burn_time_s: 2.99,
    propellant_mass_g: 2456,
    total_mass_g: 3654,
    diameter: 98,
    length: 680,
    type: 'reloadable'
  },
  {
    id: 'motor-8',
    manufacturer: 'Loki',
    designation: 'L1115',
    impulse_class: 'L',
    total_impulse_ns: 2010,
    avg_thrust_n: 1115,
    max_thrust_n: 1300,
    burn_time_s: 1.8,
    propellant_mass_g: 980,
    total_mass_g: 1425,
    diameter: 75,
    length: 450,
    type: 'single-use'
  },
];

// Generate mock telemetry for a flight
export function generateMockTelemetry(flight: typeof MOCK_FLIGHTS[0]) {
  const frames = [];
  const startTime = new Date(flight.flight_date);

  for (let i = 0; i < 200; i++) {
    const relativeTimeMs = i * 100;
    const t = relativeTimeMs / 1000;

    let altitude = 0;
    let velocity = 0;
    let accelZ = 0;
    let flightState = 'IDLE';

    if (t < 2) {
      flightState = 'IDLE';
      altitude = 0;
      velocity = 0;
      accelZ = 1;
    } else if (t < 4) {
      flightState = 'BOOST';
      const boostTime = t - 2;
      accelZ = 20 + (Math.random() - 0.5) * 3;
      velocity = boostTime * 80;
      altitude = Math.pow(boostTime, 2) * 40;
    } else if (t < (flight.apogee_time_s || 18)) {
      flightState = 'COAST';
      const coastTime = t - 4;
      accelZ = -1 + (Math.random() - 0.5) * 0.5;
      velocity = Math.max(0, 160 - coastTime * 12);
      altitude = 320 + 160 * coastTime - 0.5 * 9.81 * Math.pow(coastTime, 2) * 5;
    } else {
      flightState = 'DESCENT';
      accelZ = -0.5;
      velocity = -15;
      altitude = Math.max(0, (flight.max_altitude_m || 2000) - (t - (flight.apogee_time_s || 18)) * 15);
    }

    frames.push({
      id: `telemetry-${flight.id}-${i}`,
      flight_id: flight.id,
      timestamp: new Date(startTime.getTime() + relativeTimeMs).toISOString(),
      relative_time_ms: relativeTimeMs,
      accel_x_g: (Math.random() - 0.5) * 0.3,
      accel_y_g: (Math.random() - 0.5) * 0.3,
      accel_z_g: accelZ,
      gyro_x_dps: (Math.random() - 0.5) * 15,
      gyro_y_dps: (Math.random() - 0.5) * 15,
      gyro_z_dps: (Math.random() - 0.5) * 8,
      pressure_pa: 101325 - altitude * 12,
      temperature_c: 20 - altitude * 0.0065,
      gps_latitude: 34.8 + (Math.random() - 0.5) * 0.001,
      gps_longitude: -116.4 + (Math.random() - 0.5) * 0.001,
      gps_altitude_m: altitude + (Math.random() - 0.5) * 5,
      gps_satellites: Math.floor(8 + Math.random() * 4),
      altitude_agl_m: altitude,
      vertical_velocity_ms: velocity,
      battery_voltage_v: 11.1 - (t * 0.001),
      flight_state: flightState,
    });
  }

  return frames;
}
