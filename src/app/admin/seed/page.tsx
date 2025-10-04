'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SeedPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setStatus('loading');
    setMessage('Seeding database... this may take a moment...');

    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(`✅ Success! Database seeded with:
- ${data.summary.users} user
- ${data.summary.rockets} rockets
- ${data.summary.flights} flights
- ${data.summary.motors} motors
- Telemetry data for ${data.summary.telemetryFlights} flights

You can now use the "Continue as Test User" button on the login page!`);
      } else {
        setStatus('error');
        setMessage(`❌ Error: ${data.error}\n${data.details || ''}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Failed to seed database'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Database Seeding Tool</CardTitle>
          <CardDescription>
            This will populate your database with demo data for the Rocket Flight Logger.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-sm text-yellow-400">
              <strong>⚠️ Warning:</strong> This will DELETE all existing data in your database
              before seeding with demo data. Only use this on a fresh database or when you want
              to reset to demo mode.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">What will be created:</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• <strong className="text-gray-300">1 Demo User:</strong> test@example.com / password123</li>
              <li>• <strong className="text-gray-300">5 Rockets:</strong> Alpha Strike, Beta Racer, Gamma Explorer, Delta Prototype, Epsilon Heavy</li>
              <li>• <strong className="text-gray-300">6 Flights:</strong> Complete flight records with metrics</li>
              <li>• <strong className="text-gray-300">8 Motors:</strong> Various L, M, and N class motors</li>
              <li>• <strong className="text-gray-300">Telemetry Data:</strong> 200 data points for 3 flights</li>
            </ul>
          </div>

          <Button
            onClick={handleSeed}
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Seeding Database...' : 'Seed Database'}
          </Button>

          {message && (
            <div
              className={`p-4 rounded-lg border whitespace-pre-wrap ${
                status === 'success'
                  ? 'bg-green-500/10 border-green-500/20 text-green-400'
                  : status === 'error'
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}
            >
              {message}
            </div>
          )}

          {status === 'success' && (
            <div className="flex justify-center">
              <a
                href="/login"
                className="text-blue-500 hover:text-blue-400 underline"
              >
                Go to Login Page →
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
