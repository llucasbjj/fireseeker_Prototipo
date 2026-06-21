import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ExecutiveAnalytics from './pages/ExecutiveAnalytics';
import AlertsScreen from './pages/AlertsScreen';
import SimulationScreen from './pages/SimulationScreen';
import AIIntelligence from './pages/AIIntelligence';
import Sidebar from './components/Sidebar';

// App Wrapper to handle route changes and animations
function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {!isLandingPage && <Sidebar />}
      
      <main className="flex-1 relative h-full w-full overflow-y-auto">
        {/* Global Aurora Background */}
        <div className="absolute inset-0 pointer-events-none aurora-bg z-0 opacity-40"></div>
        
        <div className="relative z-10 w-full h-full">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/executive" element={<ExecutiveAnalytics />} />
              <Route path="/alerts" element={<AlertsScreen />} />
              <Route path="/simulation" element={<SimulationScreen />} />
              <Route path="/intelligence" element={<AIIntelligence />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate cinematic loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <AppContent key="app" />
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
