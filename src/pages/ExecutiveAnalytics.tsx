import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, Trees, Flame, CloudOff } from 'lucide-react';

const mockChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const mockRoiData = [
  { name: 'T1', investment: 4000, saved: 24000 },
  { name: 'T2', investment: 3000, saved: 13980 },
  { name: 'T3', investment: 2000, saved: 38000 },
  { name: 'T4', investment: 2780, saved: 39080 },
];

function AnimatedCounter({ end, prefix = "", suffix = "" }: { end: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function ExecutiveAnalytics() {
  return (
    <div className="w-full h-full p-6 lg:p-10 overflow-y-auto custom-scrollbar">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white tracking-wide">Visão Executiva</h1>
        <p className="text-gray-400 font-mono text-sm mt-2">Análise de Impacto e ROI</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        <div className="glass-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 font-mono mb-1">Incêndios Evitados</p>
              <h2 className="text-4xl font-bold text-white">
                <AnimatedCounter end={142} />
              </h2>
              <span className="text-primary text-xs mt-2 inline-block bg-primary/10 px-2 py-1 rounded">+12% vs ano passado</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <Flame className="text-primary" size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 font-mono mb-1">Área Protegida</p>
              <h2 className="text-4xl font-bold text-white">
                <AnimatedCounter end={2450} suffix=" ha" />
              </h2>
              <span className="text-accent text-xs mt-2 inline-block bg-accent/10 px-2 py-1 rounded">100% Cobertura</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <Trees className="text-accent" size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-full blur-3xl group-hover:bg-warning/20 transition-all"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 font-mono mb-1">Capital Salvo</p>
              <h2 className="text-4xl font-bold text-white">
                <AnimatedCounter end={4200} prefix="$" suffix="k" />
              </h2>
              <span className="text-warning text-xs mt-2 inline-block bg-warning/10 px-2 py-1 rounded">Valor de Ativos Est.</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <DollarSign className="text-warning" size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 font-mono mb-1">CO₂ Evitado</p>
              <h2 className="text-4xl font-bold text-white">
                <AnimatedCounter end={850} suffix=" ton" />
              </h2>
              <span className="text-green-400 text-xs mt-2 inline-block bg-green-500/10 px-2 py-1 rounded">Eq. Crédito de Carbono</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <CloudOff className="text-green-400" size={24} />
            </div>
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10">
        
        <div className="glass-card p-6 border-t-4 border-t-primary">
          <h3 className="font-display text-lg mb-6">Linha do Tempo de Risco (YTD)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5A8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00E5A8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D1326', borderColor: '#333', borderRadius: '8px' }}
                  itemStyle={{ color: '#00E5A8' }}
                />
                <Area type="monotone" dataKey="value" stroke="#00E5A8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-accent">
          <h3 className="font-display text-lg mb-6">ROI: Investimento vs Ativos Salvos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRoiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#ffffff10'}}
                  contentStyle={{ backgroundColor: '#0D1326', borderColor: '#333', borderRadius: '8px' }}
                />
                <Bar dataKey="investment" fill="#33A1FD" radius={[4, 4, 0, 0]} name="Investimento em Tech" />
                <Bar dataKey="saved" fill="#00E5A8" radius={[4, 4, 0, 0]} name="Ativos Salvos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
