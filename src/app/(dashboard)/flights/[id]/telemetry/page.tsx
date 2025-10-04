'use client';

import { use, useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { CardSkeleton } from '@/components/ui/Loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TelemetryFrame {
  id: string;
  timestamp_s: number;
  altitude_m: number;
  velocity_ms: number;
  acceleration_g: number;
  latitude?: number;
  longitude?: number;
  phase: string;
}

export default function FlightTelemetryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [telemetry, setTelemetry] = useState<TelemetryFrame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/flights/${id}/telemetry`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTelemetry(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Telemetry Charts */}
      {telemetry.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-400">
            No telemetry data available for this flight
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Altitude Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Altitude Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={telemetry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="timestamp_s"
                    stroke="#9ca3af"
                    label={{ value: 'Time (s)', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    label={{ value: 'Altitude (m)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#9ca3af' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="altitude_m"
                    stroke="#3b82f6"
                    name="Altitude (m)"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Velocity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Velocity Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={telemetry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="timestamp_s"
                    stroke="#9ca3af"
                    label={{ value: 'Time (s)', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    label={{ value: 'Velocity (m/s)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#9ca3af' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="velocity_ms"
                    stroke="#10b981"
                    name="Velocity (m/s)"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Acceleration Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Acceleration Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={telemetry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="timestamp_s"
                    stroke="#9ca3af"
                    label={{ value: 'Time (s)', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    label={{ value: 'Acceleration (G)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#9ca3af' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="acceleration_g"
                    stroke="#8b5cf6"
                    name="Acceleration (G)"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Data Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Telemetry Data Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Total Frames</p>
                  <p className="text-xl font-bold text-white mt-1">{telemetry.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sample Rate</p>
                  <p className="text-xl font-bold text-white mt-1">
                    {telemetry.length > 1
                      ? (1 / (telemetry[1].timestamp_s - telemetry[0].timestamp_s)).toFixed(1)
                      : 'N/A'} Hz
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Flight Phases</p>
                  <p className="text-xl font-bold text-white mt-1">
                    {new Set(telemetry.map(t => t.phase)).size}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">GPS Coordinates</p>
                  <p className="text-xl font-bold text-white mt-1">
                    {telemetry.filter(t => t.latitude && t.longitude).length > 0 ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
