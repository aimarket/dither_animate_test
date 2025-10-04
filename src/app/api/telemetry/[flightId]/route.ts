import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// GET /api/telemetry/[flightId] - Get telemetry data for a flight
export async function GET(
  request: NextRequest,
  { params }: { params: { flightId: string } }
) {
  try {
    const user = requireAuth(request);

    // Verify flight ownership
    const flight = await prisma.flight.findFirst({
      where: {
        id: params.flightId,
        userId: user.userId,
      },
    });

    if (!flight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    const telemetry = await prisma.telemetryFrame.findMany({
      where: { flightId: params.flightId },
      orderBy: { relativeTimeMs: 'asc' },
    });

    // Convert to API format
    const data = telemetry.map(frame => ({
      flight_id: frame.flightId,
      timestamp: frame.timestamp.toISOString(),
      relative_time_ms: frame.relativeTimeMs,
      accel_x_g: frame.accelXG,
      accel_y_g: frame.accelYG,
      accel_z_g: frame.accelZG,
      gyro_x_dps: frame.gyroXDps,
      gyro_y_dps: frame.gyroYDps,
      gyro_z_dps: frame.gyroZDps,
      mag_x_ut: frame.magXUt,
      mag_y_ut: frame.magYUt,
      mag_z_ut: frame.magZUt,
      pressure_pa: frame.pressurePa,
      temperature_c: frame.temperatureC,
      gps_latitude: frame.gpsLatitude,
      gps_longitude: frame.gpsLongitude,
      gps_altitude_m: frame.gpsAltitudeM,
      gps_speed_ms: frame.gpsSpeedMs,
      gps_satellites: frame.gpsSatellites,
      altitude_agl_m: frame.altitudeAglM,
      vertical_velocity_ms: frame.verticalVelocityMs,
      orientation_w: frame.orientationW,
      orientation_x: frame.orientationX,
      orientation_y: frame.orientationY,
      orientation_z: frame.orientationZ,
      pyro_continuity_1: frame.pyroContinuity1,
      pyro_continuity_2: frame.pyroContinuity2,
      battery_voltage_v: frame.batteryVoltageV,
      flight_state: frame.flightState,
    }));

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get telemetry error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
