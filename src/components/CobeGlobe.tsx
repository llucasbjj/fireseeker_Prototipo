import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.08, 0.15], // Dark background matching theme
      markerColor: [255 / 255, 77 / 255, 77 / 255], // Danger red for markers
      glowColor: [0 / 255, 229 / 255, 168 / 255], // Primary green glow
      markers: [
        // Fake fire hotspots
        { location: [-15.7801, -47.9292], size: 0.1 }, // Brazil
        { location: [34.0522, -118.2437], size: 0.08 }, // California
        { location: [-33.8688, 151.2093], size: 0.05 }, // Australia
        { location: [40.7128, -74.0060], size: 0.04 }, // NY
      ],
      onRender: (state: any) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.005;
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-[800px] aspect-square relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: 1,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
}
