import { NextResponse } from 'next/server';
import { MOCK_FLIGHTS } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json({
      data: MOCK_FLIGHTS,
      total: MOCK_FLIGHTS.length,
      page: 1,
      per_page: 20,
      total_pages: 1,
    });
  } catch (error) {
    console.error('Get flights error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flights' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Demo mode - cannot create flights' },
    { status: 403 }
  );
}
