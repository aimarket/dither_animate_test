"use client";

import { useState } from "react";
import ExactThreejsGlobe from "@/components/ExactThreejsGlobe";
import DitherToggle from "@/components/DitherToggle";

export default function Home() {
  const [originalGlobeDitherEnabled, setOriginalGlobeDitherEnabled] = useState(false);

  return (
    <div className="h-screen w-screen relative">
      {/* Floating controls */}
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-2">Original Three.js Globe</h2>
        <DitherToggle enabled={originalGlobeDitherEnabled} onToggle={setOriginalGlobeDitherEnabled} />
      </div>

      {/* Full screen globe */}
      <ExactThreejsGlobe enableDither={originalGlobeDitherEnabled} />
    </div>
  );
}
