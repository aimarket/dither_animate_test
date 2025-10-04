"use client";

import { useRef, useEffect } from 'react';

export default function ExactThreejsGlobe() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // The iframe will load the exact original implementation
    if (iframeRef.current) {
      iframeRef.current.src = '/threejs-globe/index.html';
    }
  }, []);

  return (
    <div className="h-screen w-screen">
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