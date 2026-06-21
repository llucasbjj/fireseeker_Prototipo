import { motion } from 'framer-motion';
import { Target, Clock, MapPin, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const ALERTS = [
  { id: 1, severity: 'CRÍTICO', time: 'Agora mesmo', location: 'Setor 4 - Alpha', impact: 'Alta Probabilidade de Propagação', coordinates: 'LAT: -15.823 LON: -47.921', pulse: true },
  { id: 2, severity: 'ELEVADO', time: '14 mins atrás', location: 'Fronteira Norte', impact: 'Anomalia de Temperatura Crescente', coordinates: 'LAT: -15.811 LON: -47.889', pulse: false },
  { id: 3, severity: 'ELEVADO', time: '1 hr atrás', location: 'Lado do Rio', impact: 'Vegetação Seca Detectada', coordinates: 'LAT: -15.790 LON: -47.855', pulse: false },
  { id: 4, severity: 'MODERADO', time: '3 hrs atrás', location: 'Pátio de Equipamentos', impact: 'Calor de Escapamento de Veículo', coordinates: 'LAT: -15.765 LON: -47.832', pulse: false },
];

export default function AlertsScreen() {
  return (
    <div className="w-full h-full p-6 lg:p-10 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <header className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white tracking-wide flex items-center gap-3">
              <Target className="text-danger" />
              Feed de Alertas ao Vivo
            </h1>
            <p className="text-gray-400 font-mono text-sm mt-2">Detecção de ameaças nível militar</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-danger rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
            <span className="font-mono text-danger font-bold tracking-widest text-sm">MONITORAMENTO AO VIVO</span>
          </div>
        </header>

        <div className="space-y-4">
          {ALERTS.map((alert, index) => {
            const isCritical = alert.severity === 'CRÍTICO';
            
            return (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={clsx(
                  "glass-card p-6 border-l-4 relative overflow-hidden group",
                  isCritical ? "border-l-danger" : alert.severity === 'ELEVADO' ? "border-l-warning" : "border-l-primary"
                )}
              >
                {/* Background Pulse for Critical */}
                {alert.pulse && (
                  <div className="absolute inset-0 bg-danger/5 animate-pulse pointer-events-none"></div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  
                  {/* Left info */}
                  <div className="flex items-start gap-4">
                    <div className={clsx(
                      "p-3 rounded-xl border backdrop-blur-md",
                      isCritical ? "bg-danger/10 border-danger/30 text-danger shadow-[0_0_15px_rgba(255,77,77,0.3)]" : 
                      alert.severity === 'ELEVADO' ? "bg-warning/10 border-warning/30 text-warning" : 
                      "bg-primary/10 border-primary/30 text-primary"
                    )}>
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={clsx("font-mono text-sm font-bold tracking-wider", 
                          isCritical ? "text-danger" : alert.severity === 'ELEVADO' ? "text-warning" : "text-primary"
                        )}>
                          {alert.severity}
                        </span>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <Clock size={12} /> {alert.time}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{alert.location}</h3>
                      <p className="text-gray-400 text-sm">{alert.impact}</p>
                    </div>
                  </div>

                  {/* Right Info */}
                  <div className="flex flex-col md:items-end gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/40 px-3 py-1.5 rounded-md border border-white/5">
                      <MapPin size={12} className="text-accent" />
                      {alert.coordinates}
                    </div>
                    <button className={clsx(
                      "mt-2 px-6 py-2 text-sm font-bold rounded hover:opacity-90 transition-opacity",
                      isCritical ? "bg-danger text-white shadow-[0_0_15px_rgba(255,77,77,0.4)]" : "bg-white/10 text-white hover:bg-white/20"
                    )}>
                      {isCritical ? 'DESPACHAR EQUIPE' : 'VER DETALHES'}
                    </button>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
}
