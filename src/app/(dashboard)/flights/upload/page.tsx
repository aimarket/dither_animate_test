'use client';

import { FlightUploader } from '@/components/flight/FlightUploader';

export default function FlightUploadPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Upload Flight Data</h1>
        <p className="text-gray-400 mt-2">
          Upload your telemetry files (.rkt format) to analyze flight performance
        </p>
      </div>

      <FlightUploader />

      {/* Instructions */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-3">File Format</h2>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Supported formats: .rkt (binary telemetry)</li>
          <li>• Maximum file size: 10 MB</li>
          <li>• Files should contain GPS, IMU, and barometer data</li>
          <li>• Data will be automatically processed and analyzed</li>
        </ul>
      </div>
    </div>
  );
}
