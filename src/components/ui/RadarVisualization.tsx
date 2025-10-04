'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FlightPoint {
  id: string;
  x: number; // Normalized -1 to 1
  y: number; // Normalized -1 to 1
  label: string;
  phase: 'BOOST' | 'COAST' | 'DESCENT' | 'IDLE';
}

interface RadarVisualizationProps {
  flights: FlightPoint[];
  size?: number;
  className?: string;
}

const phaseColors = {
  BOOST: '#ff6b00',
  COAST: '#0088ff',
  DESCENT: '#00ff88',
  IDLE: '#666666',
};

export function RadarVisualization({
  flights,
  size = 300,
  className = '',
}: RadarVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 2) % 360);
    }, 30); // 60 FPS

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = (Math.min(canvas.width, canvas.height) / 2) - 20;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw concentric circles
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw crosshairs
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.stroke();

    // Draw range markers
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    for (let i = 1; i <= 4; i++) {
      const r = (radius / 4) * i;
      ctx.fillText(`${i * 25}%`, centerX + r - 5, centerY - 5);
    }

    // Draw scan line
    const scanRad = (scanAngle * Math.PI) / 180;
    const gradient = ctx.createLinearGradient(
      centerX,
      centerY,
      centerX + Math.cos(scanRad) * radius,
      centerY + Math.sin(scanRad) * radius
    );
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
    gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(scanRad) * radius,
      centerY + Math.sin(scanRad) * radius
    );
    ctx.stroke();

    // Draw flight points
    flights.forEach((flight) => {
      const x = centerX + flight.x * radius;
      const y = centerY + flight.y * radius;
      const color = phaseColors[flight.phase] || phaseColors.IDLE;

      // Draw glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
      glowGradient.addColorStop(0, `${color}80`);
      glowGradient.addColorStop(1, `${color}00`);
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Draw point
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw label
      ctx.fillStyle = '#ffffff';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(flight.label, x, y - 10);
    });

    // Draw center dot
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

  }, [flights, scanAngle, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{
        backgroundColor: '#000000',
      }}
    />
  );
}
