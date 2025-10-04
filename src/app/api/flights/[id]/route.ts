import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// GET /api/flights/[id] - Get a single flight
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAuth(request);
    const { id } = await params;

    const flight = await prisma.flight.findFirst({
      where: {
        id,
        userId: user.userId,
      },
      include: {
        rocket: true,
      },
    });

    if (!flight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    return NextResponse.json({
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
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get flight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/flights/[id] - Update a flight
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAuth(request);
    const body = await request.json();
    const { id } = await params;

    // Verify ownership
    const existingFlight = await prisma.flight.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!existingFlight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    const flight = await prisma.flight.update({
      where: { id },
      data: {
        flightName: body.flight_name,
        flightDate: body.flight_date ? new Date(body.flight_date) : undefined,
        location: body.location,
        notes: body.notes,
        motorDesignation: body.motor_designation,
        motorManufacturer: body.motor_manufacturer,
        recoveryType: body.recovery_type,
      },
    });

    return NextResponse.json({
      id: flight.id,
      flight_name: flight.flightName,
      flight_date: flight.flightDate.toISOString(),
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Update flight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/flights/[id] - Delete a flight
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAuth(request);
    const { id } = await params;

    // Verify ownership
    const existingFlight = await prisma.flight.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!existingFlight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    await prisma.flight.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Delete flight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
