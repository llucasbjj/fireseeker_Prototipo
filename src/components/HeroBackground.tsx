import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#02050f] z-0 pointer-events-none">
      
      {/* CAMADA 1 — TERRA 4K ULTRA HD (CINEMÁTICA) */}
      <motion.div 
        className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
        animate={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        >
          {/* Imagem Ultra HD 4K sem compressão perceptível da Terra à Noite / Órbita */}
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=100&w=3840&auto=format&fit=crop" 
            alt="Earth from Orbit"
            className="w-full h-full object-cover"
            style={{ 
              filter: 'contrast(115%) saturate(110%) brightness(95%)' 
            }}
          />
        </motion.div>
      </motion.div>

      {/* CAMADA 2 — ATMOSFERA E COLOR GRADING CINEMATOGRÁFICO */}
      {/* Color grading azul profundo e highlights ciano */}
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#020817]/90 via-transparent to-primary/20 mix-blend-overlay"></div>
      
      {/* Bloom suave da atmosfera */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent mix-blend-screen"></div>

      {/* Overlay reduzido para manter a TERRA super nítida (removido o blur!) */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ backgroundColor: 'rgba(2,8,23,0.45)' }}
      ></div>

      {/* CAMADA 3 — NEBLINA ESPACIAL E PEQUENAS ESTRELAS */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* CAMADA 4 — GRID TECNOLÓGICO SUTIL (LINHAS HOLOGRÁFICAS) */}
      <motion.div 
        className="absolute inset-[-5%] w-[110%] h-[110%] z-20 opacity-[0.08]"
        animate={{
          x: mousePosition.x * -5,
          y: mousePosition.y * -5,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 168, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 229, 168, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center mix-blend-screen">
          <div className="w-[1200px] h-[1200px] rounded-full border-[0.5px] border-primary/40"></div>
          <div className="absolute w-[900px] h-[900px] rounded-full border-[0.5px] border-primary/30"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full border-[0.5px] border-primary/20"></div>
        </div>
      </motion.div>

      {/* CAMADA 5 — SATÉLITES E SINAIS */}
      <motion.div 
        className="absolute top-[25%] left-[15%] z-30"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 15 }}
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00E5A8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-[0_0_10px_#00E5A8]">
            <path d="M13 2.05v2.96"/><path d="M13 18.99v2.96"/><path d="M4.93 4.93l2.12 2.12"/><path d="M16.95 16.95l2.12 2.12"/><path d="M2.05 11h2.96"/><path d="M18.99 11h2.96"/><path d="M4.93 17.07l2.12-2.12"/><path d="M16.95 7.05l2.12-2.12"/><circle cx="11" cy="11" r="4"/>
          </svg>
          {/* Sinal de transmissão do satélite */}
          <motion.div 
            animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 border border-primary/50 rounded-full"
          />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute top-[65%] right-[20%] z-30 opacity-60"
        animate={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
        transition={{ type: "spring", stiffness: 20, damping: 15 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="relative"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#33A1FD" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-[0_0_8px_#33A1FD]">
            <path d="M13 2.05v2.96"/><path d="M13 18.99v2.96"/><path d="M4.93 4.93l2.12 2.12"/><path d="M16.95 16.95l2.12 2.12"/><path d="M2.05 11h2.96"/><path d="M18.99 11h2.96"/><path d="M4.93 17.07l2.12-2.12"/><path d="M16.95 7.05l2.12-2.12"/><circle cx="11" cy="11" r="4"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* CAMADA 6 — HOTSPOTS AVANÇADOS */}
      <motion.div 
        className="absolute inset-[-5%] w-[110%] h-[110%] z-40"
        animate={{
          x: mousePosition.x * -10,
          y: mousePosition.y * -10,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
      >
        <Hotspot top="35%" left="65%" severity="high" label="INCÊNDIO CRÍTICO DETECTADO" />
        <Hotspot top="45%" left="72%" severity="medium" label="ANOMALIA TÉRMICA (IA)" delay={0.5} />
        <Hotspot top="60%" left="58%" severity="low" label="MONITORAMENTO ATIVO" delay={1.2} />
        <Hotspot top="25%" left="45%" severity="low" label="SISTEMA NOMINAL" delay={2.0} />
      </motion.div>
    </div>
  );
}

function Hotspot({ top, left, severity = "high", label, delay = 0 }: { top: string, left: string, severity?: string, label: string, delay?: number }) {
  const color = severity === "high" ? "#FF3B30" : severity === "medium" ? "#FFD166" : "#00E5A8";
  
  return (
    <div className="absolute" style={{ top, left }}>
      <div className="relative flex items-center justify-center">
        {/* Core do Hotspot */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay }}
          className="w-2.5 h-2.5 rounded-full z-10" 
          style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
        ></motion.div>
        
        {/* Ping/Radar em torno do foco */}
        <motion.div 
          animate={{ scale: [1, 3], opacity: [0.8, 0] }}
          transition={{ duration: severity === "high" ? 1.5 : 3, repeat: Infinity, delay }}
          className="absolute w-12 h-12 rounded-full border-2" 
          style={{ borderColor: color }}
        ></motion.div>
        
        {/* Glow dinâmico */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
          className="absolute w-16 h-16 rounded-full blur-xl" 
          style={{ backgroundColor: color }}
        ></motion.div>

        {/* Linha de Dados (Holográfica) */}
        <div className="absolute top-0 left-4 flex flex-col items-start w-48 overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
            className="h-[1px] opacity-50" 
            style={{ backgroundColor: color }}
          />
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay + 1 }}
            className="text-[9px] font-mono mt-1 tracking-widest uppercase drop-shadow-md"
            style={{ color: "white" }}
          >
            {label}
            {severity === "high" && (
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1.5 h-1.5 ml-2 bg-danger rounded-full"
              />
            )}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
