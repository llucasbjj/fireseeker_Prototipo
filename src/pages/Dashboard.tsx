import { useRef, useState } from 'react';
import Map from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import RiskRadar from '../components/RiskRadar';
import { CloudRain, Wind, ThermometerSun, AlertTriangle } from 'lucide-react';
import FireMarker from '../components/FireMarker';

export default function Dashboard() {
  const mapRef = useRef<MapRef>(null);
  const [viewport] = useState({
    longitude: -52.0,
    latitude: -15.0,
    zoom: 4,
  });

  const fireData = [
    { id: 1, type: 'fire' as const, lng: -52.0, lat: -12.0, data: { riskLevel: 'CRÍTICO', temperature: '412°C', area: '12.4 ha', aiProbability: '99.8%', timeToSpread: '12 min' } },
    { id: 2, type: 'fire' as const, lng: -48.0, lat: -22.0, data: { riskLevel: 'CRÍTICO', temperature: '380°C', area: '8.1 ha', aiProbability: '97.2%', timeToSpread: '25 min' } },
    { id: 3, type: 'risk' as const, lng: -56.0, lat: -18.0, data: { riskLevel: 'ALTO', temperature: '45°C', area: 'N/A', aiProbability: '88.5%', timeToSpread: 'N/A' } },
    { id: 4, type: 'monitor' as const, lng: -45.0, lat: -10.0, data: { riskLevel: 'MÉDIO', temperature: '38°C', area: 'N/A', aiProbability: '42.1%', timeToSpread: 'N/A' } },
  ];

  return (
    <div className="w-full h-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
      
      {/* Left Panel - Status & Weather */}
      <div className="lg:col-span-3 flex flex-col gap-6 z-10 h-full">
        <div className="glass-card p-6 flex-shrink-0">
          <h2 className="text-sm text-gray-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            Status do Sistema
          </h2>
          <RiskRadar riskLevel={87} className="w-40 h-40 mx-auto my-6" />
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-sm">
            <span className="text-gray-400">Satélites Conectados</span>
            <span className="font-bold text-white">24/24</span>
          </div>
        </div>

        <div className="glass-card p-6 flex-1 flex flex-col">
          <h2 className="text-sm text-gray-400 uppercase tracking-widest font-mono mb-4">Micro-dados Climáticos</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <ThermometerSun className="text-warning" size={20} />
                <span className="text-sm font-medium">Temperatura</span>
              </div>
              <span className="font-bold text-xl text-white">38°C</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Wind className="text-accent" size={20} />
                <span className="text-sm font-medium">Velocidade do Vento</span>
              </div>
              <span className="font-bold text-xl text-white">45 km/h</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <CloudRain className="text-primary" size={20} />
                <span className="text-sm font-medium">Umidade</span>
              </div>
              <span className="font-bold text-xl text-white">12%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center - MapLibre */}
      <div className="lg:col-span-6 glass-card overflow-hidden relative rounded-2xl min-h-[500px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Map Overlay UI */}
        <div className="absolute top-4 left-4 z-20 glass-panel px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-3">
          <div className="w-2 h-2 bg-danger rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
          FEED DE SATÉLITE AO VIVO
        </div>

        <div className="absolute inset-0 saturate-50 brightness-50 contrast-125 z-0 pointer-events-none"></div>

        <Map
          ref={mapRef}
          initialViewState={viewport}
          mapStyle={{
            version: 8,
            sources: {
              'esri-satellite': {
                type: 'raster',
                tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
                tileSize: 256
              }
            },
            layers: [{
              id: 'satellite',
              type: 'raster',
              source: 'esri-satellite',
              minzoom: 0,
              maxzoom: 22
            }]
          }}
          interactive={true}
          style={{ width: '100%', height: '100%', background: '#050816' }}
        >
          {fireData.map(f => (
            <FireMarker 
              key={f.id} 
              longitude={f.lng} 
              latitude={f.lat} 
              type={f.type} 
              data={f.data} 
            />
          ))}
        </Map>
      </div>

      {/* Right Panel - AI Insights */}
      <div className="lg:col-span-3 flex flex-col gap-6 z-10 h-full">
        <div className="glass-card p-6 h-full flex flex-col">
          <h2 className="text-sm text-gray-400 uppercase tracking-widest font-mono mb-4 flex items-center justify-between">
            Insights da IA
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">V 4.2</span>
          </h2>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Alert Card */}
            <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 relative overflow-hidden group hover:bg-danger/20 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-danger/20 rounded-full blur-2xl group-hover:bg-danger/40 transition-colors"></div>
              <div className="flex items-start gap-3 relative z-10">
                <AlertTriangle className="text-danger shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-white text-sm">Risco Crítico de Ignição</h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2">Ventos fortes e baixa umidade no Setor Sul geram 94% de probabilidade de fogo em 2 horas.</p>
                  <span className="text-[10px] font-mono text-danger mt-2 block">HÁ 12 MINS</span>
                </div>
              </div>
            </div>

            {/* Insight Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warning shrink-0 mt-1.5 shadow-[0_0_8px_orange]"></div>
                <div>
                  <h3 className="font-bold text-white text-sm">Padrão de Seca Detectado</h3>
                  <p className="text-xs text-gray-400 mt-1">Umidade do solo no nível mais baixo em 4 anos. Recomendada irrigação preventiva na Zona B.</p>
                </div>
              </div>
            </div>

             {/* Insight Card */}
             <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5 shadow-[0_0_8px_green]"></div>
                <div>
                  <h3 className="font-bold text-white text-sm">Perímetro Seguro</h3>
                  <p className="text-xs text-gray-400 mt-1">O setor norte permanece estável. O índice de vegetação é saudável.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
