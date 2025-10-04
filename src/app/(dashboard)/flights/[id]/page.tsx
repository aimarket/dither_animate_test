'use client';

import { use } from 'react';
import { useFlight } from '@/lib/hooks/useFlights';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function FlightDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: flight } = useFlight(id);

  if (!flight) return null;

  return (
    <div className="space-y-6">
      {/* Flight Details */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Motor</p>
              <p className="text-white mt-1">
                {flight.motor_manufacturer} {flight.motor_designation || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Recovery</p>
              <p className="text-white mt-1">{flight.recovery_type || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Max Acceleration</p>
              <p className="text-white mt-1">
                {flight.max_acceleration_g?.toFixed(1) || 'N/A'} G
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Apogee Time</p>
              <p className="text-white mt-1">
                {flight.apogee_time_s?.toFixed(1) || 'N/A'} s
              </p>
            </div>
          </div>

          {flight.notes && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-2">Notes</p>
              <p className="text-white">{flight.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
