import { NavLink } from 'react-router-dom';
import { 
  Map, 
  BarChart3, 
  BellRing, 
  Flame, 
  BrainCircuit,
  Settings
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { path: '/dashboard', icon: Map, label: 'Centro de Comando' },
  { path: '/executive', icon: BarChart3, label: 'Analytics Executivo' },
  { path: '/alerts', icon: BellRing, label: 'Alertas ao Vivo' },
  { path: '/simulation', icon: Flame, label: 'Simulações' },
  { path: '/intelligence', icon: BrainCircuit, label: 'Centro de IA' },
];

export default function Sidebar() {
  return (
    <aside className="w-20 lg:w-64 h-full glass-panel flex flex-col border-r border-white/10 z-20 transition-all duration-300 shrink-0">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Flame className="text-primary group-hover:text-white transition-colors" size={28} />
            <div className="absolute inset-0 bg-primary blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
          </div>
          <span className="font-display font-bold text-xl tracking-wider hidden lg:block text-white">
            FIRESEEKER
          </span>
        </NavLink>
      </div>

      <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_#00E5A8]" />
                )}
                <item.icon size={22} className={clsx("shrink-0", isActive && "drop-shadow-[0_0_8px_rgba(0,229,168,0.8)]")} />
                <span className="font-medium hidden lg:block">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-4 px-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all w-full justify-center lg:justify-start">
          <Settings size={22} />
          <span className="font-medium hidden lg:block">Configurações</span>
        </button>
      </div>
    </aside>
  );
}
