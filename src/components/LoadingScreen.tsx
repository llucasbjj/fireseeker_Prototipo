import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

const LOADING_STEPS = [
  "INICIALIZANDO REDE DE SATÉLITES...",
  "CONECTANDO COM A API DO INPE...",
  "CONECTANDO COM NASA FIRMS...",
  "CARREGANDO MOTOR DE PREVISÃO DE IA...",
  "CALIBRANDO SENSORES ESPACIAIS...",
  "SISTEMA PRONTO."
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < LOADING_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500); // 500ms per step, ~3 seconds total
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-primary font-mono"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="absolute inset-0 aurora-bg opacity-20 pointer-events-none"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center z-10"
      >
        <div className="relative mb-8">
          <ShieldAlert size={80} className="text-primary animate-pulse" />
          <div className="absolute inset-0 bg-primary blur-2xl opacity-40 rounded-full animate-pulse-slow"></div>
        </div>

        <h1 className="text-4xl font-display font-bold tracking-[0.2em] mb-12 text-white text-glow-primary">
          FIRESEEKER
        </h1>

        <div className="w-80 h-1 bg-surface rounded-full overflow-hidden mb-6 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / LOADING_STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="h-8 flex items-center justify-center">
          <motion.p 
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm tracking-widest uppercase opacity-80"
          >
            {LOADING_STEPS[currentStep]}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
