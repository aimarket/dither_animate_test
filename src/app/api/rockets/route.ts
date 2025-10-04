import { NextResponse } from 'next/server';
import { MOCK_ROCKETS } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json({
      data: MOCK_ROCKETS,
      total: MOCK_ROCKETS.length,
    });
  } catch (error) {
    console.error('Get rockets error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rockets' },
      { status: 500 }
    );
  }
}
