import clsx from 'clsx';

interface RiskRadarProps {
  riskLevel: number; // 0 to 100
  className?: string;
}

export default function RiskRadar({ riskLevel, className }: RiskRadarProps) {
  const isHighRisk = riskLevel >= 80;
  const isMediumRisk = riskLevel >= 40 && riskLevel < 80;
  
  const colorClass = isHighRisk 
    ? 'text-danger' 
    : isMediumRisk 
      ? 'text-warning' 
      : 'text-primary';

  const glowClass = isHighRisk 
    ? 'shadow-[0_0_30px_rgba(255,77,77,0.4)] border-danger/50' 
    : isMediumRisk 
      ? 'shadow-[0_0_20px_rgba(255,200,87,0.3)] border-warning/50' 
      : 'shadow-[0_0_20px_rgba(0,229,168,0.2)] border-primary/30';

  return (
    <div className={clsx("relative flex items-center justify-center", className)}>
      {/* Outer Glow Ring */}
      <div className={clsx("absolute inset-0 rounded-full border-2", glowClass, isHighRisk && "animate-pulse")}></div>
      
      {/* Radar Sweep */}
      <div className="absolute inset-2 rounded-full border border-white/10 overflow-hidden bg-surface/50 backdrop-blur-sm">
        <div className="absolute inset-0 border-t border-l border-white/5 rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)' }}></div>
        {/* Radar Line */}
        <div className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left animate-radar">
          <div className={clsx("w-full h-full border-r-2 opacity-80", isHighRisk ? "border-danger bg-gradient-to-l from-danger/30 to-transparent" : "border-primary bg-gradient-to-l from-primary/20 to-transparent")}></div>
        </div>
        {/* Concentric Circles */}
        <div className="absolute inset-[25%] rounded-full border border-white/10"></div>
        <div className="absolute inset-[50%] rounded-full border border-white/10"></div>
        
        {/* Crosshairs */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10"></div>
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10"></div>
      </div>

      {/* Center Value */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className={clsx("text-4xl font-display font-bold drop-shadow-md", colorClass)}>
          {riskLevel}%
        </span>
        <span className="text-xs uppercase tracking-widest text-gray-400 font-mono mt-1">
          {isHighRisk ? 'CRITICAL RISK' : isMediumRisk ? 'ELEVATED' : 'STABLE'}
        </span>
      </div>

      {/* Blips (Fake targets) */}
      {isHighRisk && (
        <>
          <div className="absolute top-[30%] left-[60%] w-2 h-2 bg-danger rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
          <div className="absolute top-[60%] left-[20%] w-1.5 h-1.5 bg-danger rounded-full animate-pulse shadow-[0_0_8px_red]" style={{ animationDelay: '0.5s' }}></div>
        </>
      )}
    </div>
  );
}
