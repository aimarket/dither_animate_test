import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// GET /api/rockets - List all rockets for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);

    const rockets = await prisma.rocket.findMany({
      where: { userId: user.userId },
      include: {
        flights: {
          select: { id: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const data = rockets.map(rocket => ({
      id: rocket.id,
      user_id: rocket.userId,
      name: rocket.name,
      diameter_mm: rocket.diameterMm,
      length_mm: rocket.lengthMm,
      dry_mass_g: rocket.dryMassG,
      description: rocket.description,
      created_at: rocket.createdAt.toISOString(),
      flight_count: rocket.flights.length,
    }));

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Get rockets error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/rockets - Create a new rocket
export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const body = await request.json();

    const rocket = await prisma.rocket.create({
      data: {
        userId: user.userId,
        name: body.name,
        diameterMm: body.diameter_mm,
        lengthMm: body.length_mm,
        dryMassG: body.dry_mass_g,
        description: body.description,
      },
    });

    return NextResponse.json({
      id: rocket.id,
      name: rocket.name,
      diameter_mm: rocket.diameterMm,
      length_mm: rocket.lengthMm,
      dry_mass_g: rocket.dryMassG,
      description: rocket.description,
      created_at: rocket.createdAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Create rocket error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
