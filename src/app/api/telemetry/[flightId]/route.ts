import { NextResponse } from 'next/server';
import { MOCK_FLIGHTS, generateMockTelemetry } from '@/lib/mockData';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ flightId: string }> }
) {
  try {
    const { flightId } = await params;

    // Find the flight
    const flight = MOCK_FLIGHTS.find(f => f.id === flightId);

    if (!flight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    // Generate telemetry for this flight
    const telemetry = generateMockTelemetry(flight);

    return NextResponse.json({ data: telemetry });
  } catch (error) {
    console.error('Get telemetry error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch telemetry' },
      { status: 500 }
    );
  }
}
