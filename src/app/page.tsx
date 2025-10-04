"use client";

import ExactThreejsGlobe from "@/components/ExactThreejsGlobe";
import Link from "next/link";
import { Rocket, LineChart, Globe, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Full screen globe background */}
      <div className="absolute inset-0 z-0">
        <ExactThreejsGlobe />
      </div>

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold">Flight Logger</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Professional Rocket
            <br />
            Flight Analysis
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Upload telemetry, visualize trajectories in 3D, and analyze flight
            metrics with real-time data streaming for your high-power rocketry
            projects.
          </p>

          <div className="flex flex-wrap gap-6 justify-center mb-16">
            <Link
              href="/flights/upload"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition transform hover:scale-105"
            >
              Upload Flight Data
            </Link>
            <Link
              href="/flights"
              className="px-8 py-4 border-2 border-white/30 hover:bg-white/10 rounded-lg text-lg font-semibold transition"
            >
              View Flights
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
              <Globe className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">3D Visualization</h3>
              <p className="text-gray-400">
                Interactive flight path rendering with GPS trajectory mapping
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
              <LineChart className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-gray-400">
                Live telemetry streaming with D3.js powered charts
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
              <Zap className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Advanced Metrics</h3>
              <p className="text-gray-400">
                Sensor fusion, apogee detection, and flight phase analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
