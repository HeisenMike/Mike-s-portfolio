import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonial from './components/Testimonial';
import About from './components/About';
import Footer from './components/Footer';
import { config } from './config';
import { Clock, CheckCircle, Users } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Testimonial />
        <About />
      </main>
      <Footer />

      {/* Trust Bar - Desktop only, subtle */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 px-6 pb-4 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-8 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-card)]/80 backdrop-blur-sm border border-[var(--border-primary)] rounded-full px-6 py-3 shadow-lg w-fit mx-auto pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <CheckCircle size={14} className="text-[var(--accent-emerald)]" />
            <span>5 production n8n workflows</span>
          </div>
          <div className="w-px h-6 bg-[var(--border-primary)]" />
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[var(--accent-amber)]" />
            <span>120+ hrs/mo saved for clients</span>
          </div>
          <div className="w-px h-6 bg-[var(--border-primary)]" />
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-[var(--accent-violet)]" />
            <span>2 long-term clients (repeat work)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;