'use client';

import { use, useEffect, useState } from 'react';
import { useFlight } from '@/lib/hooks/useFlights';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { CardSkeleton } from '@/components/ui/Loading';
import { TrendingUp, TrendingDown, Clock, Zap } from 'lucide-react';

interface TelemetryFrame {
  id: string;
  timestamp_s: number;
  altitude_m: number;
  velocity_ms: number;
  acceleration_g: number;
  phase: string;
}

interface PhaseStats {
  phase: string;
  duration: number;
  maxAltitude: number;
  maxVelocity: number;
  maxAcceleration: number;
  avgAcceleration: number;
}

export default function FlightAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: flight } = useFlight(id);
  const [telemetry, setTelemetry] = useState<TelemetryFrame[]>([]);
  const [loading, setLoading] = useState(true);
  const [phaseStats, setPhaseStats] = useState<PhaseStats[]>([]);

  useEffect(() => {
    fetch(`/api/flights/${id}/telemetry`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTelemetry(data);
          calculatePhaseStats(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const calculatePhaseStats = (data: TelemetryFrame[]) => {
    const phases = [...new Set(data.map(f => f.phase))];
    const stats: PhaseStats[] = phases.map(phase => {
      const phaseFrames = data.filter(f => f.phase === phase);
      if (phaseFrames.length === 0) return null;

      const duration = phaseFrames[phaseFrames.length - 1].timestamp_s - phaseFrames[0].timestamp_s;
      const maxAltitude = Math.max(...phaseFrames.map(f => f.altitude_m));
      const maxVelocity = Math.max(...phaseFrames.map(f => Math.abs(f.velocity_ms)));
      const maxAcceleration = Math.max(...phaseFrames.map(f => f.acceleration_g));
      const avgAcceleration = phaseFrames.reduce((sum, f) => sum + f.acceleration_g, 0) / phaseFrames.length;

      return {
        phase,
        duration,
        maxAltitude,
        maxVelocity,
        maxAcceleration,
        avgAcceleration,
      };
    }).filter(Boolean) as PhaseStats[];

    setPhaseStats(stats);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!flight || telemetry.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-400">
          No telemetry data available for analysis
        </CardContent>
      </Card>
    );
  }

  const burnoutTime = telemetry.find(f => f.phase === 'COAST')?.timestamp_s || 0;
  const apogeeTime = flight.apogee_time_s || 0;
  const landingTime = flight.flight_duration_s || 0;

  return (
    <div className="space-y-6">
      {/* Flight Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-400">Burnout Time</CardTitle>
              <Clock className="w-4 h-4 text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {burnoutTime.toFixed(1)}
              <span className="text-sm text-gray-400 ml-2">s</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-400">Coast Time</CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(apogeeTime - burnoutTime).toFixed(1)}
              <span className="text-sm text-gray-400 ml-2">s</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-400">Descent Time</CardTitle>
              <TrendingDown className="w-4 h-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(landingTime - apogeeTime).toFixed(1)}
              <span className="text-sm text-gray-400 ml-2">s</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-400">Avg G-Force</CardTitle>
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(telemetry.reduce((sum, f) => sum + f.acceleration_g, 0) / telemetry.length).toFixed(1)}
              <span className="text-sm text-gray-400 ml-2">G</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Phase Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Phase</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Duration (s)</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Max Alt (m)</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Max Vel (m/s)</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Max Accel (G)</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Avg Accel (G)</th>
                </tr>
              </thead>
              <tbody>
                {phaseStats.map((stat, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        stat.phase === 'BOOST' ? 'bg-orange-500/20 text-orange-400' :
                        stat.phase === 'COAST' ? 'bg-blue-500/20 text-blue-400' :
                        stat.phase === 'DESCENT' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {stat.phase}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-white">{stat.duration.toFixed(1)}</td>
                    <td className="text-right py-3 px-4 text-white">{stat.maxAltitude.toFixed(0)}</td>
                    <td className="text-right py-3 px-4 text-white">{stat.maxVelocity.toFixed(1)}</td>
                    <td className="text-right py-3 px-4 text-white">{stat.maxAcceleration.toFixed(1)}</td>
                    <td className="text-right py-3 px-4 text-white">{stat.avgAcceleration.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Velocity Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Max Ascent Velocity</span>
              <span className="text-lg font-bold text-white">
                {Math.max(...telemetry.filter(f => f.velocity_ms > 0).map(f => f.velocity_ms)).toFixed(1)} m/s
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Max Descent Velocity</span>
              <span className="text-lg font-bold text-white">
                {Math.abs(Math.min(...telemetry.filter(f => f.velocity_ms < 0).map(f => f.velocity_ms))).toFixed(1)} m/s
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Velocity at Apogee</span>
              <span className="text-lg font-bold text-white">
                {telemetry.reduce((closest, frame) =>
                  Math.abs(frame.timestamp_s - apogeeTime) < Math.abs(closest.timestamp_s - apogeeTime) ? frame : closest
                ).velocity_ms.toFixed(1)} m/s
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acceleration Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Peak G-Force</span>
              <span className="text-lg font-bold text-white">
                {flight.max_acceleration_g?.toFixed(1)} G
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Avg Boost Acceleration</span>
              <span className="text-lg font-bold text-white">
                {(phaseStats.find(p => p.phase === 'BOOST')?.avgAcceleration || 0).toFixed(1)} G
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Time Above 10G</span>
              <span className="text-lg font-bold text-white">
                {(telemetry.filter(f => f.acceleration_g > 10).length / 10).toFixed(1)} s
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Quality */}
      <Card>
        <CardHeader>
          <CardTitle>Data Quality Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-400">Total Data Points</p>
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
              <p className="text-sm text-gray-400">Recording Duration</p>
              <p className="text-xl font-bold text-white mt-1">
                {(telemetry[telemetry.length - 1].timestamp_s - telemetry[0].timestamp_s).toFixed(1)} s
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Data Coverage</p>
              <p className="text-xl font-bold text-white mt-1">
                {((telemetry[telemetry.length - 1].timestamp_s / flight.flight_duration_s!) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
