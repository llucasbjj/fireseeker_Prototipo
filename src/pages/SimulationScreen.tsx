import { useState, useRef, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Play, Square, FastForward, Info } from 'lucide-react';
import clsx from 'clsx';
import FireMarker from '../components/FireMarker';

const getFirePolygon = (progress: number) => {
  const lon0 = -55.0;
  const lat0 = -15.0;
  // O tamanho base da área afeta
  const baseScale = 0.00025 * progress; 
  const angleRad = (135 * Math.PI) / 180; // Vento soprando para o Sudeste (135 graus)
  
  const points = [];
  
  for (let i = 0; i <= 360; i += 5) {
    const rad = (i * Math.PI) / 180;
    
    // Alongamento na direção do vento (135 graus)
    const forwardFactor = Math.pow((Math.cos(rad - angleRad) + 1.5) / 2.5, 2); 
    
    // Ruído orgânico dinâmico: a borda do fogo muda de forma conforme o tempo (progress) avança
    // Usamos múltiplas ondas senoidais cruzadas com a rotação (rad) e o tempo (progress)
    const noise1 = Math.sin(rad * 5 + progress * 0.1);
    const noise2 = Math.cos(rad * 8 - progress * 0.15);
    const noise3 = Math.sin(rad * 13 + progress * 0.05);
    
    // Multiplicador que varia suavemente entre ~0.8 e 1.2
    const organicJitter = 1 + (noise1 * 0.05) + (noise2 * 0.08) + (noise3 * 0.07);
    
    // Explosões laterais de fogo quando o progresso passa de certos limites
    const burst = progress > 40 && (i > 100 && i < 170) ? Math.sin((progress - 40) * 0.1) * 0.15 : 0;
    const burst2 = progress > 70 && (i > 200 && i < 250) ? Math.cos((progress - 70) * 0.15) * 0.1 : 0;

    const radius = baseScale * forwardFactor * organicJitter * (1 + burst + burst2);

    points.push([
      lon0 + Math.cos(rad) * radius,
      lat0 + Math.sin(rad) * radius
    ]);
  }

  // Garantir que o polígono está perfeitamente fechado
  points[points.length - 1] = points[0];

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [points]
    }
  };
};

export default function SimulationScreen() {
  const mapRef = useRef<MapRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fake fire spread animation using a growing circle radius or polygon
  // For simplicity, we'll animate a GeoJSON circle radius
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => Math.min(p + 2, 100));
      }, 100);
    } else if (progress >= 100) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handleSimulate = () => {
    if (progress >= 100) setProgress(0);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
      
      {/* Map Container */}
      <div className="lg:col-span-8 glass-card overflow-hidden relative rounded-2xl min-h-[500px] border border-primary/20">
        <div className="absolute top-4 left-4 z-20 glass-panel px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-3">
          <div className={clsx("w-2 h-2 rounded-full", isPlaying ? "bg-warning animate-pulse" : "bg-gray-500")}></div>
          SIMULAÇÃO PREDITIVA
        </div>

        <div className="absolute inset-0 saturate-50 brightness-50 contrast-125 z-0 pointer-events-none"></div>

        <Map
          ref={mapRef}
          initialViewState={{
            longitude: -55.0,
            latitude: -15.0,
            zoom: 12,
            pitch: 45,
          }}
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
          {/* Simulated Farm Boundary */}
          <Source id="farm-boundary" type="geojson" data={{
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-55.05, -15.05],
                [-54.95, -15.05],
                [-54.95, -14.95],
                [-55.05, -14.95],
                [-55.05, -15.05]
              ]]
            }
          } as any}>
            <Layer
              id="farm-fill"
              type="fill"
              paint={{
                'fill-color': '#33A1FD',
                'fill-opacity': 0.05
              }}
            />
            <Layer
              id="farm-line"
              type="line"
              paint={{
                'line-color': '#33A1FD',
                'line-width': 2,
                'line-dasharray': [2, 2]
              }}
            />
          </Source>

          {/* Spreading Fire Simulation */}
          {progress > 0 && (
            <Source id="fire-spread" type="geojson" data={getFirePolygon(progress) as any}>
              <Layer
                id="fire-spread-fill"
                type="fill"
                paint={{
                  'fill-color': '#FF3B30',
                  'fill-opacity': Math.max(0.2, 0.8 - (progress / 150))
                }}
              />
              <Layer
                id="fire-spread-line"
                type="line"
                paint={{
                  'line-color': '#FFD166',
                  'line-width': 2,
                  'line-opacity': Math.max(0.4, 1 - (progress / 100))
                }}
              />
            </Source>
          )}

          <FireMarker 
            longitude={-55.0} 
            latitude={-15.0} 
            type="fire" 
            data={{ 
              riskLevel: 'CRÍTICO', 
              temperature: `${Math.floor(400 + progress * 2)}°C`, 
              area: `${(progress * 1.5).toFixed(1)} ha`, 
              aiProbability: '99.8%', 
              timeToSpread: 'Em propagação' 
            }} 
          />
        </Map>

        {/* Playback Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-full px-6 py-3 flex items-center gap-6 z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <button onClick={handleSimulate} className="hover:text-primary transition-colors">
            {isPlaying ? <Square fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
          </button>
          
          <div className="w-64 h-1.5 bg-gray-700 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }}></div>
          </div>
          
          <button className="hover:text-primary transition-colors text-gray-400">
            <FastForward fill="currentColor" size={20} />
          </button>
        </div>
      </div>

      {/* Right Panel - Simulation Data */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        <div className="glass-card p-6 border-t-4 border-warning">
          <h2 className="text-xl font-display font-bold text-white mb-2">Análise de Cenário</h2>
          <p className="text-sm text-gray-400 mb-6">Simulação baseada no vetor de vento atual (NO 45km/h) e umidade extremamente baixa.</p>
          
          <button 
            onClick={handleSimulate}
            className="w-full py-4 bg-primary text-background font-bold rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,168,0.4)] transition-all mb-8 flex items-center justify-center gap-2"
          >
            {isPlaying ? 'Parar Simulação' : progress === 100 ? 'Reiniciar Simulação' : 'Rodar Cenário'}
          </button>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-gray-400">Área Afetada</span>
              <span className="font-mono font-bold text-xl text-danger">{(progress * 1.5).toFixed(1)} ha</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-gray-400">Velocidade Est. de Propagação</span>
              <span className="font-mono font-bold text-xl text-warning">2.4 m/s</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-gray-400">Exposição a Risco Financeiro</span>
              <span className="font-mono font-bold text-xl text-white">R$ {(progress * 4200).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Tempo até a Fronteira</span>
              <span className="font-mono font-bold text-xl text-primary">{Math.max(0, 120 - Math.floor(progress * 1.2))} mins</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 bg-primary/5 border border-primary/20 flex gap-4">
          <Info className="text-primary shrink-0 mt-1" />
          <p className="text-sm text-gray-300 leading-relaxed">
            A IA prevê uma probabilidade de 94% de que este caminho de incêndio interceptará a infraestrutura crítica (Silo 3) se não for contido nos próximos 45 minutos. O envio de suporte aéreo é altamente recomendado.
          </p>
        </div>

      </div>
    </div>
  );
}
