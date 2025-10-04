import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/motors - List all motors (public database)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const impulseClass = searchParams.get('impulse_class');

    const where = impulseClass ? { impulseClass } : {};

    const motors = await prisma.motor.findMany({
      where,
      orderBy: [
        { impulseClass: 'asc' },
        { totalImpulseNs: 'asc' },
      ],
    });

    const data = motors.map(motor => ({
      id: motor.id,
      manufacturer: motor.manufacturer,
      designation: motor.designation,
      type: motor.type,
      impulse_class: motor.impulseClass,
      total_impulse_ns: motor.totalImpulseNs,
      avg_thrust_n: motor.avgThrustN,
      max_thrust_n: motor.maxThrustN,
      burn_time_s: motor.burnTimeS,
      propellant_mass_g: motor.propellantMassG,
      total_mass_g: motor.totalMassG,
      diameter: motor.diameter,
      length: motor.length,
      created_at: motor.createdAt.toISOString(),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get motors error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
