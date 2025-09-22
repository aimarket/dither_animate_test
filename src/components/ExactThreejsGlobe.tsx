"use client";

import { useRef, useEffect } from 'react';

interface ExactThreejsGlobeProps {
  enableDither: boolean;
}

export default function ExactThreejsGlobe({ enableDither }: ExactThreejsGlobeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerClass = enableDither ? "dither" : "";

  useEffect(() => {
    // The iframe will load the exact original implementation
    if (iframeRef.current) {
      iframeRef.current.src = '/threejs-globe/index.html';
    }
  }, []);

  return (
    <div className={`h-screen w-screen ${containerClass}`}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Three.js Globe - Exact Original"
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
        }}
      />
    </div>
  );
}