import { BrainCircuit, Cpu, Network, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const predictionData = [
  { time: '00:00', risk: 20 },
  { time: '04:00', risk: 15 },
  { time: '08:00', risk: 45 },
  { time: '12:00', risk: 85 },
  { time: '16:00', risk: 92 },
  { time: '20:00', risk: 60 },
  { time: '24:00', risk: 30 },
];

export default function AIIntelligence() {
  return (
    <div className="w-full h-full p-6 lg:p-10">
      
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide flex items-center gap-3">
            <BrainCircuit className="text-accent" />
            Núcleo Neural
          </h1>
          <p className="text-gray-400 font-mono text-sm mt-2">Motor de Inferência Deep Learning v4.2</p>
        </div>
        
        <div className="glass-card px-4 py-2 border-accent/30 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#33A1FD] animate-pulse"></div>
          <span className="text-sm font-mono text-accent">MOTOR ONLINE</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Main Status */}
        <div className="lg:col-span-2 glass-card p-8 border-l-4 border-accent relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent z-0"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">Status de Inferência</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                A rede neural está atualmente analisando 4.2TB de dados espaciais, combinando 
                padrões históricos de queimadas, imagens multiespectrais Sentinel-2 ao vivo e telemetria local de estações meteorológicas IoT.
              </p>
              <div className="flex gap-4">
                <div className="bg-black/30 border border-white/5 rounded-lg p-3 w-1/2">
                  <span className="text-xs text-gray-500 font-mono block mb-1">Confiança do Modelo</span>
                  <span className="text-2xl font-bold text-primary">99.8%</span>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-lg p-3 w-1/2">
                  <span className="text-xs text-gray-500 font-mono block mb-1">Latência de Processamento</span>
                  <span className="text-2xl font-bold text-white">124ms</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center border-l border-white/10 pl-8">
               <div className="relative w-32 h-32 flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border border-dashed border-accent animate-spin" style={{ animationDuration: '8s' }}></div>
                 <div className="absolute inset-2 rounded-full border border-accent/50 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
                 <Cpu size={40} className="text-accent" />
               </div>
            </div>
          </div>
        </div>

        {/* Active Models */}
        <div className="glass-card p-6">
          <h3 className="text-sm text-gray-400 font-mono mb-6 uppercase">Pipelines Ativos</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Network size={16} className="text-primary" />
                <span className="text-sm font-medium">Visão Computacional</span>
              </div>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono">ATIVO</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap size={16} className="text-accent" />
                <span className="text-sm font-medium">Climatologia Preditiva</span>
              </div>
              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded font-mono">ATIVO</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrainCircuit size={16} className="text-warning" />
                <span className="text-sm font-medium">Pontuação de Risco</span>
              </div>
              <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded font-mono">ATIVO</span>
            </div>
          </div>
        </div>

      </div>

      {/* Prediction Chart */}
      <div className="glass-card p-6 h-[400px]">
        <h3 className="text-lg font-display mb-6">Previsão de Risco 24 Horas</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="time" stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
            <YAxis stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#0D1326', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#FF4D4D' }}
            />
            <Line 
              type="monotone" 
              dataKey="risk" 
              stroke="#FF4D4D" 
              strokeWidth={4}
              dot={{ fill: '#0D1326', stroke: '#FF4D4D', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#FF4D4D' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
