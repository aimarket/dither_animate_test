import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// GET /api/flights - List all flights for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '20');
    const skip = (page - 1) * perPage;

    const [flights, total] = await Promise.all([
      prisma.flight.findMany({
        where: { userId: user.userId },
        include: {
          rocket: true,
        },
        orderBy: { flightDate: 'desc' },
        skip,
        take: perPage,
      }),
      prisma.flight.count({
        where: { userId: user.userId },
      }),
    ]);

    // Convert to API format
    const data = flights.map(flight => ({
      id: flight.id,
      user_id: flight.userId,
      rocket_id: flight.rocketId,
      flight_name: flight.flightName,
      flight_date: flight.flightDate.toISOString(),
      location: flight.location,
      motor_designation: flight.motorDesignation,
      motor_manufacturer: flight.motorManufacturer,
      recovery_type: flight.recoveryType,
      notes: flight.notes,
      max_altitude_m: flight.maxAltitudeM,
      max_velocity_ms: flight.maxVelocityMs,
      max_acceleration_g: flight.maxAccelerationG,
      apogee_time_s: flight.apogeeTimeS,
      flight_duration_s: flight.flightDurationS,
      created_at: flight.createdAt.toISOString(),
    }));

    return NextResponse.json({
      data,
      total,
      page,
      per_page: perPage,
      total_pages: Math.ceil(total / perPage),
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get flights error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/flights - Create a new flight
export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const body = await request.json();

    const flight = await prisma.flight.create({
      data: {
        userId: user.userId,
        flightName: body.flight_name,
        flightDate: new Date(body.flight_date),
        location: body.location,
        rocketId: body.rocket_id,
        motorDesignation: body.motor_designation,
        motorManufacturer: body.motor_manufacturer,
        recoveryType: body.recovery_type,
        notes: body.notes,
      },
    });

    return NextResponse.json({
      id: flight.id,
      user_id: flight.userId,
      flight_name: flight.flightName,
      flight_date: flight.flightDate.toISOString(),
      location: flight.location,
      created_at: flight.createdAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Create flight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
