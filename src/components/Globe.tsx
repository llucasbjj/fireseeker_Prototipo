import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000, // 500 * 2
      height: 1000,
      phi: 0,
      theta: -0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.2], // Lighter blue/gray for water
      markerColor: [1, 0.2, 0.2], // Red for fires
      glowColor: [0.0, 0.9, 0.6], // Primary color glow
      markers: [
        { location: [-15.8, -47.9], size: 0.1 }, 
        { location: [-12.0, -52.0], size: 0.12 },
        { location: [-22.0, -48.0], size: 0.08 },
        { location: [-3.4, -62.2], size: 0.05 },
        { location: [34.0, -118.2], size: 0.06 }, // California
        { location: [-33.8, 151.2], size: 0.07 }, // Australia
      ],
      onRender: (state: any) => {
        state.phi = phi;
        phi += 0.005; // Slightly faster rotation
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative z-10 cursor-move">
      <canvas
        ref={canvasRef}
        style={{
          width: 500,
          height: 500,
          maxWidth: "100%",
          aspectRatio: "1 / 1"
        }}
      />
    </div>
  );
}
