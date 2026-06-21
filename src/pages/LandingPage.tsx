import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Satellite } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background">
      {/* Cinematic Hero Background */}
      <HeroBackground />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center h-full pt-20 pb-20 pointer-events-none">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono mb-6 backdrop-blur-md">
            <Satellite size={16} className="animate-pulse" />
            <span>MONITORAMENTO GLOBAL ATIVO</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white drop-shadow-xl">
            Antecipe Incêndios <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Antes Que Eles Existam.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-300 font-sans mb-10 max-w-xl leading-relaxed">
            Inteligência Artificial e dados espaciais avançados para proteger propriedades rurais em tempo real. Uma plataforma de nível militar para o agronegócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pointer-events-auto">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-primary text-background font-bold rounded-lg hover:bg-white hover:text-background hover:shadow-[0_0_30px_rgba(0,229,168,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Acessar Centro de Comando
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/simulation')}
              className="px-8 py-4 glass-card text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={20} />
              Ver Simulações
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 w-full border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-display font-bold text-white">99.8%</div>
              <div className="text-xs text-gray-400 font-mono mt-1 uppercase">Precisão da IA</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white">2.4M</div>
              <div className="text-xs text-gray-400 font-mono mt-1 uppercase">Hectares Protegidos</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white">&lt; 3s</div>
              <div className="text-xs text-gray-400 font-mono mt-1 uppercase">Latência de Alerta</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative flex justify-center items-center h-full min-h-[400px]"
        >
          {/* O HeroBackground já ocupa tudo com efeitos cinemáticos. Este espaço vazio mantem o grid equilibrado e deixa a Terra e os satélites visíveis. */}
        </motion.div>

      </div>
    </div>
  );
}
