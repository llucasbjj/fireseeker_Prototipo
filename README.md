# Fireseeker Premium Prototype

Um protótipo frontend visual focado em impacto, experiência de usuário (UX/UI) e design premium para simular um sistema avançado de IA para prevenção de incêndios.

## Objetivo
Criar uma demonstração de altíssimo nível para bancas avaliadoras e investidores, passando a sensação de um produto de tecnologia espacial/militar (referências: Palantir, SpaceX, Tesla). 

> **Nota:** Este é um protótipo visual. Os dados são simulados ("mockados") para fins de apresentação. Não possui backend, API real ou banco de dados conectado.

## Tecnologias Utilizadas
* **React 18 + TypeScript + Vite**: Base rápida e moderna.
* **Tailwind CSS**: Estilização ágil com design system customizado (Dark Premium, Glassmorphism, Aurora UI).
* **Framer Motion**: Animações cinematográficas fluidas.
* **MapLibre GL JS / React-Map-GL**: Mapas imersivos sem dependência severa de chaves de API restritas.
* **Cobe**: Globo interativo 3D com baixo peso de processamento.
* **Recharts**: Gráficos analíticos renderizados na velocidade da luz.
* **Lucide React**: Ícones consistentes e limpos.

## Estrutura das Telas
1. **Landing Page**: Loading cinematográfico, vídeo espacial imersivo ao fundo e Globo 3D (Cobe).
2. **Dashboard de Comando**: Central de controle com mapa MapLibre escuro, heatmaps falsos, polígonos simulando hotspots e painel lateral de clima e IA.
3. **Analytics Executivo**: Visão de alto impacto para investidores, focada em ROI, CO2 evitado, propriedades protegidas (com contadores animados).
4. **Feed de Alertas**: Visual tipo "radar militar" evidenciando severidade, locais e impactos simulados.
5. **Simulação (War Room)**: Permite ao usuário ver o fogo se espalhando no mapa em tempo real (fake) para prever o tempo de resposta.
6. **Centro de Inteligência Artificial**: Gráficos preditivos futuristas mostrando pontuações de risco e status das "redes neurais".

## Como Rodar Localmente
Basta executar o arquivo `start.bat` no Windows.
Ele irá instalar as dependências e subir o servidor automaticamente na porta 5173.

Ou via terminal:
```bash
npm install
npm run dev
```

## Como Publicar
Consulte o arquivo `PUBLICAR_GRATIS.txt` para instruções de hospedagem na Vercel, Netlify ou GitHub Pages.
