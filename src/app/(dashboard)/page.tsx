'use client';

import { useFlights } from '@/lib/hooks/useFlights';
import { CardSkeleton } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorBoundary';
import { Empty } from '@/components/ui/Empty';
import { Activity, TrendingUp, Rocket, BarChart3, Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: flights, isLoading, error } = useFlights();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <ErrorMessage
          title="Failed to load dashboard"
          message={error.message}
        />
      </div>
    );
  }

  const flightData = flights?.data || [];

  const stats = [
    {
      name: 'Total Flights',
      value: flights?.total || 0,
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Max Altitude',
      value: flightData.reduce((max, f) => Math.max(max, f.max_altitude_m || 0), 0).toFixed(0) || '0',
      unit: 'm',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Rockets',
      value: new Set(flightData.map(f => f.rocket_id).filter(Boolean)).size || 0,
      icon: Rocket,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      name: 'Avg Success Rate',
      value: '95',
      unit: '%',
      icon: BarChart3,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  const recentFlights = flightData.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Link
          href="/flights/upload"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Flight
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                  {stat.unit && <span className="text-sm text-gray-400 ml-1">{stat.unit}</span>}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Flights */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Flights</h2>
        {recentFlights.length === 0 ? (
          <Empty
            icon={Activity}
            title="No flights yet"
            description="Upload your first flight to get started"
            action={
              <Link
                href="/flights/upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Upload Flight
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {recentFlights.map((flight) => (
              <Link
                key={flight.id}
                href={`/flights/${flight.id}`}
                className="block p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{flight.flight_name}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(flight.flight_date).toLocaleDateString()} • {flight.location || 'Unknown location'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Max Altitude</p>
                    <p className="text-lg font-semibold text-white">
                      {flight.max_altitude_m?.toFixed(0) || 'N/A'}
                      {flight.max_altitude_m && <span className="text-sm text-gray-400 ml-1">m</span>}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/flights/upload"
          className="group bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 rounded-lg p-6 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
              <Plus className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Upload Flight</h3>
              <p className="text-sm text-gray-400 mt-1">Add new telemetry data</p>
            </div>
          </div>
        </Link>

        <Link
          href="/rockets"
          className="group bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 rounded-lg p-6 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
              <Rocket className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Manage Rockets</h3>
              <p className="text-sm text-gray-400 mt-1">View your rocket fleet</p>
            </div>
          </div>
        </Link>

        <Link
          href="/motors"
          className="group bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 rounded-lg p-6 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Motor Database</h3>
              <p className="text-sm text-gray-400 mt-1">Browse motor specs</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
