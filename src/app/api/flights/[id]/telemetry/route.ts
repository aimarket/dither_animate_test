import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const telemetry = await prisma.telemetryFrame.findMany({
      where: { flightId: id },
      orderBy: { relativeTimeMs: 'asc' },
      select: {
        id: true,
        relativeTimeMs: true,
        altitudeAglM: true,
        verticalVelocityMs: true,
        accelXG: true,
        accelYG: true,
        accelZG: true,
        gpsLatitude: true,
        gpsLongitude: true,
        flightState: true,
      },
    });

    // Transform to match frontend interface
    const transformed = telemetry.map(frame => ({
      id: frame.id,
      timestamp_s: frame.relativeTimeMs / 1000,
      altitude_m: frame.altitudeAglM || 0,
      velocity_ms: frame.verticalVelocityMs || 0,
      acceleration_g: Math.sqrt(
        (frame.accelXG || 0) ** 2 +
        (frame.accelYG || 0) ** 2 +
        (frame.accelZG || 0) ** 2
      ),
      latitude: frame.gpsLatitude,
      longitude: frame.gpsLongitude,
      phase: frame.flightState || 'UNKNOWN',
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error('Error fetching telemetry:', error);
    return NextResponse.json(
      { error: 'Failed to fetch telemetry data' },
      { status: 500 }
    );
  }
}
