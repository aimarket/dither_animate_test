'use client';

import { use, useEffect, useState, useRef } from 'react';
import { useFlight } from '@/lib/hooks/useFlights';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { CardSkeleton } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

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

export default function FlightTrajectoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: flight } = useFlight(id);
  const [telemetry, setTelemetry] = useState<TelemetryFrame[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

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

  useEffect(() => {
    if (!canvasRef.current || telemetry.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      const y = (canvas.height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();

      const x = (canvas.width / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Calculate scaling
    const maxAlt = Math.max(...telemetry.map(f => f.altitude_m));
    const scaleY = (canvas.height * 0.8) / maxAlt;
    const centerX = canvas.width / 2;

    // Draw trajectory path
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    telemetry.slice(0, currentFrame + 1).forEach((frame, idx) => {
      const x = centerX + (idx - currentFrame / 2) * 2;
      const y = canvas.height - (frame.altitude_m * scaleY + 50);

      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw current position
    if (currentFrame < telemetry.length) {
      const frame = telemetry[currentFrame];
      const x = centerX;
      const y = canvas.height - (frame.altitude_m * scaleY + 50);

      // Rocket
      ctx.fillStyle = frame.phase === 'BOOST' ? '#f59e0b' :
                      frame.phase === 'COAST' ? '#3b82f6' :
                      frame.phase === 'DESCENT' ? '#10b981' : '#6b7280';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Glow effect
      const gradient = ctx.createRadialGradient(x, y, 6, x, y, 15);
      gradient.addColorStop(0, frame.phase === 'BOOST' ? 'rgba(245, 158, 11, 0.6)' :
                             frame.phase === 'COAST' ? 'rgba(59, 130, 246, 0.6)' :
                             'rgba(16, 185, 129, 0.6)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();

      // Info text
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px monospace';
      ctx.fillText(`Alt: ${frame.altitude_m.toFixed(0)}m`, 20, 30);
      ctx.fillText(`Vel: ${frame.velocity_ms.toFixed(1)}m/s`, 20, 50);
      ctx.fillText(`Time: ${frame.timestamp_s.toFixed(1)}s`, 20, 70);
      ctx.fillText(`Phase: ${frame.phase}`, 20, 90);
    }

    // Draw ground
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 40);
    ctx.lineTo(canvas.width, canvas.height - 40);
    ctx.stroke();

  }, [telemetry, currentFrame]);

  useEffect(() => {
    if (isPlaying && currentFrame < telemetry.length - 1) {
      animationRef.current = requestAnimationFrame(() => {
        setCurrentFrame(prev => prev + 1);
      });
    } else if (currentFrame >= telemetry.length - 1) {
      setIsPlaying(false);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentFrame, telemetry.length]);

  const handlePlayPause = () => {
    if (currentFrame >= telemetry.length - 1) {
      setCurrentFrame(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentFrame(0);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <CardSkeleton />
      </div>
    );
  }

  if (!flight || telemetry.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-400">
          No telemetry data available for trajectory visualization
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 3D Trajectory Canvas */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Trajectory Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full bg-black rounded-lg"
              style={{ height: '500px' }}
            />

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button onClick={handlePlayPause} variant="outline">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <div className="flex-1 max-w-md">
                <input
                  type="range"
                  min="0"
                  max={telemetry.length - 1}
                  value={currentFrame}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setCurrentFrame(Number(e.target.value));
                  }}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-gray-400 min-w-[100px]">
                {currentFrame + 1} / {telemetry.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trajectory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Flight Path Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {telemetry.reduce((total, frame, idx) => {
                if (idx === 0) return 0;
                const prev = telemetry[idx - 1];
                const dx = Math.abs(frame.altitude_m - prev.altitude_m);
                return total + dx;
              }, 0).toFixed(0)}
              <span className="text-sm text-gray-400 ml-2">m</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Apogee Altitude</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.max(...telemetry.map(f => f.altitude_m)).toFixed(0)}
              <span className="text-sm text-gray-400 ml-2">m</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Max Lateral Drift</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {telemetry.some(f => f.latitude && f.longitude) ?
                (Math.max(...telemetry.filter(f => f.latitude).map((f, idx) => {
                  if (idx === 0 || !f.latitude) return 0;
                  const first = telemetry.find(t => t.latitude);
                  if (!first || !first.latitude || !first.longitude) return 0;
                  const dx = (f.latitude - first.latitude) * 111000; // rough m per degree
                  const dy = (f.longitude! - first.longitude) * 111000;
                  return Math.sqrt(dx * dx + dy * dy);
                }))).toFixed(0) : 'N/A'}
              {telemetry.some(f => f.latitude && f.longitude) && <span className="text-sm text-gray-400 ml-2">m</span>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Phases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-300">Boost Phase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-300">Coast Phase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-300">Descent Phase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              <span className="text-sm text-gray-300">Idle/Other</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
