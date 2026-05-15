import { useState, useEffect } from 'react';
import './index.css';
import Hero from './components/Hero';
import LearningPath from './components/LearningPath';
import Modules from './components/Modules';
import CareerHub from './components/CareerHub';
import Glossary from './components/Glossary';
import Labs from './components/Labs';

type Tab = 'home' | 'path' | 'modules' | 'labs' | 'career' | 'glossary';
const STORAGE_KEY = 'genai_portal_v2_progress';

const NAV = [
  { id: 'home' as Tab, label: 'Home', icon: '⌂' },
  { id: 'path' as Tab, label: 'Path', icon: '◎' },
  { id: 'modules' as Tab, label: 'Modules', icon: '◈' },
  { id: 'labs' as Tab, label: 'Labs', icon: '⬡' },
  { id: 'career' as Tab, label: 'Career', icon: '◉' },
  { id: 'glossary' as Tab, label: 'Glossary', icon: '▤' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? new Set(JSON.parse(s)) : new Set(); }
    catch { return new Set(); }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedLessons])); }
    catch {}
  }, [completedLessons]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (t: string) => {
    setTab(t as Tab);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navBg = tab === 'home'
    ? scrolled ? 'rgba(6,13,26,0.85)' : 'transparent'
    : 'rgba(6,13,26,0.95)';

  return (
    <div style={{ background: '#060D1A', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: scrolled || tab !== 'home' ? 'blur(20px)' : 'none',
          borderBottom: scrolled || tab !== 'home' ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono"
              style={{ background: 'linear-gradient(135deg, #E8A020, #F5C842)', color: '#060D1A' }}>AI</div>
            <span className="font-display font-semibold text-sm hidden sm:block" style={{ color: '#E8E4DC' }}>GenAI Academy</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.filter(n => n.id !== 'home').map(n => (
              <button key={n.id} onClick={() => navigate(n.id)}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={tab === n.id
                  ? { color: '#E8A020', background: 'rgba(232,160,32,0.08)' }
                  : { color: 'rgba(232,228,220,0.45)' }}>
                {tab === n.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#E8A020' }} />
                )}
                {n.label}
              </button>
            ))}
          </div>

          {/* Progress chip */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(232,160,32,0.08)', border: '1px solid rgba(232,160,32,0.15)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E8A020' }} />
            <span className="text-xs font-mono" style={{ color: 'rgba(232,160,32,0.7)' }}>
              {completedLessons.size}/11 done
            </span>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'rgba(232,228,220,0.6)', background: mobileOpen ? 'rgba(255,255,255,0.06)' : 'transparent' }}
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 space-y-1"
            style={{ background: 'rgba(6,13,26,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)}
                className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={tab === n.id
                  ? { color: '#E8A020', background: 'rgba(232,160,32,0.08)' }
                  : { color: 'rgba(232,228,220,0.5)' }}>
                <span>{n.icon}</span>{n.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Page */}
      <main style={{ paddingTop: tab === 'home' ? 0 : 56 }}>
        {tab === 'home' && <Hero onNavigate={navigate} />}
        {tab === 'path' && <LearningPath completedLessons={completedLessons} onNavigate={navigate} />}
        {tab === 'modules' && <Modules completedLessons={completedLessons} onComplete={(id) => setCompletedLessons(p => new Set([...p, id]))} />}
        {tab === 'labs' && <Labs />}
        {tab === 'career' && <CareerHub />}
        {tab === 'glossary' && <Glossary />}
      </main>

      {/* Mobile bottom nav */}
      {tab !== 'home' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 flex"
          style={{ background: 'rgba(6,13,26,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => navigate(n.id)}
              className="flex-1 flex flex-col items-center py-2.5 gap-0.5 text-xs font-medium transition-colors"
              style={tab === n.id ? { color: '#E8A020' } : { color: 'rgba(232,228,220,0.3)' }}>
              <span className="text-lg leading-none">{n.icon}</span>
              <span className="text-[0.6rem] tracking-wide">{n.label}</span>
            </button>
          ))}
        </nav>
      )}
      {tab !== 'home' && <div className="h-16 md:h-0" />}
    </div>
  );
}
