import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { Team } from './components/Team';
import { TechStack } from './components/TechStack';
import { AuthModal } from './components/AuthModal';
import { Demo } from './components/Demo';

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-900">
        <Navbar onAuthClick={() => setAuthModalOpen(true)} />
        <Hero
          onAuthClick={() => setAuthModalOpen(true)}
          onDemoClick={() => setDemoOpen(true)}
        />
        <About />
        <Features />
        <Team />
        <TechStack />

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />

        <Demo isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

        <footer className="relative py-12 bg-slate-950 border-t border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  StudySync
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Collaborate. Focus. Learn Together.
              </p>
              <p className="text-gray-500 text-sm">
                © 2025 StudySync. Built with passion for collaborative learning.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
