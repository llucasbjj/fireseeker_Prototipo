import { useState } from 'react';
import { Marker } from 'react-map-gl/maplibre';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, AlertTriangle, Satellite, MapPin, Thermometer, Maximize, Brain, Clock } from 'lucide-react';
import clsx from 'clsx';

interface FireMarkerProps {
  longitude: number;
  latitude: number;
  type: 'fire' | 'risk' | 'monitor';
  data: {
    riskLevel: string;
    temperature: string;
    area: string;
    aiProbability: string;
    timeToSpread: string;
  };
}

export default function FireMarker({ longitude, latitude, type, data }: FireMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isFire = type === 'fire';
  const isRisk = type === 'risk';
  const isMonitor = type === 'monitor';

  const coreColor = isFire ? 'bg-[#FF3B30]' : isRisk ? 'bg-[#FFD166]' : 'bg-[#33A1FD]';
  const glowColor = isFire ? 'shadow-[0_0_30px_#FF3B30]' : isRisk ? 'shadow-[0_0_20px_#FFD166]' : 'shadow-[0_0_15px_#33A1FD]';
  const ringBorder = isFire ? 'border-[#FF3B30]' : isRisk ? 'border-[#FFD166]' : 'border-[#33A1FD]';
  
  // Particles for fire
  const particles = Array.from({ length: 6 });

  return (
    <Marker 
      longitude={longitude} 
      latitude={latitude} 
      anchor="center"
      style={{ zIndex: isHovered ? 50 : isFire ? 40 : 30 }}
    >
      <div 
        className="relative flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Layer 3: Pulsing Ring */}
        <div className={clsx("absolute inset-[-20px] rounded-full border-2 opacity-0", ringBorder, 
          isFire ? 'animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]' : 
          isRisk ? 'animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]' : 
          'animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]'
        )}></div>

        {/* Layer 2: Hot Halo */}
        <div className={clsx(
          "absolute inset-[-10px] rounded-full blur-md mix-blend-screen transition-all duration-300",
          isFire ? 'bg-gradient-to-tr from-[#FF3B30] via-[#FF6A00] to-[#FFD166] opacity-60 animate-pulse' :
          isRisk ? 'bg-[#FFD166] opacity-40' :
          'bg-[#33A1FD] opacity-30'
        )}></div>

        {/* Layer 1: Bright Core */}
        <div className={clsx(
          "relative z-10 w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-300",
          coreColor, glowColor,
          isHovered ? 'scale-150' : 'scale-100',
          isFire && 'animate-[pulse_0.5s_ease-in-out_infinite]'
        )}>
          {isFire && <Flame size={10} className="text-white" />}
          {isRisk && <AlertTriangle size={8} className="text-gray-900" />}
          {isMonitor && <Satellite size={8} className="text-white" />}
        </div>

        {/* Layer 4: Particles (Only for Fire) */}
        {isFire && (
          <div className="absolute inset-[-30px] pointer-events-none">
            {particles.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#FFD166] rounded-full"
                initial={{ opacity: 0, x: '50%', y: '50%', scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  x: `${50 + (Math.random() * 40 - 20)}%`,
                  y: `${50 - (Math.random() * 40 + 10)}%`,
                  scale: [0, 1.5, 0]
                }}
                transition={{ 
                  duration: 1 + Math.random(), 
                  repeat: Infinity, 
                  delay: Math.random() * 2 
                }}
                style={{ left: '50%', top: '50%' }}
              />
            ))}
          </div>
        )}

        {/* Layer 5: Severity Tooltip Hover Card */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 glass-card p-4 border border-white/20 shadow-2xl z-50 pointer-events-none"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
                <div className={clsx("p-2 rounded-lg", 
                  isFire ? 'bg-danger/20 text-danger' : 
                  isRisk ? 'bg-warning/20 text-warning' : 
                  'bg-primary/20 text-primary'
                )}>
                  {isFire ? <Flame size={18} /> : isRisk ? <AlertTriangle size={18} /> : <Satellite size={18} />}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {isFire ? 'INCÊNDIO DETECTADO' : isRisk ? 'RISCO ALTO (IA)' : 'MONITORAMENTO'}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mt-0.5">
                    <MapPin size={10} />
                    {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 flex items-center gap-1"><AlertTriangle size={10} /> Risco</span>
                  <span className={clsx("font-bold", isFire ? 'text-danger' : isRisk ? 'text-warning' : 'text-primary')}>{data.riskLevel}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 flex items-center gap-1"><Thermometer size={10} /> Temp Simulada</span>
                  <span className="font-bold text-white">{data.temperature}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 flex items-center gap-1"><Maximize size={10} /> Área Afetada</span>
                  <span className="font-bold text-white">{data.area}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 flex items-center gap-1"><Brain size={10} /> Confiança IA</span>
                  <span className="font-bold text-white">{data.aiProbability}</span>
                </div>
                {isFire && (
                  <div className="col-span-2 flex flex-col gap-1 mt-1 border-t border-white/5 pt-2">
                    <span className="text-gray-500 flex items-center gap-1"><Clock size={10} /> Est. de Propagação</span>
                    <span className="font-bold text-warning">{data.timeToSpread}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Marker>
  );
}
