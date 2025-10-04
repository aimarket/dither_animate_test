import { NextResponse } from 'next/server';
import { MOCK_MOTORS } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json({
      data: MOCK_MOTORS,
      total: MOCK_MOTORS.length,
    });
  } catch (error) {
    console.error('Get motors error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch motors' },
      { status: 500 }
    );
  }
}
