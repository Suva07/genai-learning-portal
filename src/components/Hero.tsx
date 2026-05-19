import { useEffect, useRef } from 'react';

interface HeroProps { onNavigate: (tab: string) => void; }

const moduleCards = [
  { n: '01', title: 'AI Foundations', icon: '🧠', color: '#00B4D8', level: 'Beginner' },
  { n: '02', title: 'GenAI & LLMs', icon: '✦', color: '#F77F00', level: 'Beginner' },
  { n: '03', title: 'Embeddings', icon: '◈', color: '#9B5DE5', level: 'Intermediate' },
  { n: '04', title: 'RAG', icon: '⬡', color: '#E8A020', level: 'Intermediate' },
  { n: '05', title: 'AI Agents', icon: '⬢', color: '#2EC4B6', level: 'Advanced' },
  { n: '06', title: 'Alignment', icon: '◉', color: '#E05A4E', level: 'Advanced' },
];

export default function Hero({ onNavigate }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const colors = ['#E8A020', '#00B4D8', '#9B5DE5', '#2EC4B6', '#F77F00'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232,160,32,${0.06 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #040A14 0%, #060D1A 40%, #08102A 100%)' }}>
      {/* Animated canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />

      {/* Aurora blobs */}
      <div className="aurora-blob" style={{ width: 600, height: 600, top: '-15%', left: '-10%', background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%)', animationDelay: '0s' }} />
      <div className="aurora-blob" style={{ width: 500, height: 500, top: '10%', right: '-5%', background: 'radial-gradient(circle, rgba(155,93,229,0.1) 0%, transparent 70%)', animationDelay: '-4s' }} />
      <div className="aurora-blob" style={{ width: 700, height: 400, bottom: '20%', left: '30%', background: 'radial-gradient(circle, rgba(232,160,32,0.07) 0%, transparent 70%)', animationDelay: '-8s' }} />

      {/* Noise overlay */}
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`, opacity: 0.4, pointerEvents: 'none' }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-28 pb-16 text-center">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.5))' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(232,160,32,0.7)' }}>
            Your Personal AI Academy
          </span>
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.5), transparent)' }} />
        </div>

        {/* Headline */}
        <h1 className="font-display font-light mb-6 leading-none" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', letterSpacing: '-0.02em', color: '#F0EBE0' }}>
          Master{' '}
          <span className="italic text-gold-gradient">Generative AI</span>
          <br />
          <span style={{ color: 'rgba(240,235,224,0.55)', fontWeight: 300, fontSize: '0.72em' }}>from first principles</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-xl mb-10 text-lg leading-relaxed" style={{ color: 'rgba(232,228,220,0.55)' }}>
          A complete, self-paced journey through Embeddings, RAG, Agents, and Alignment.
          Everything you need to land a{' '}
          <span style={{ color: '#E8A020', fontWeight: 500 }}>Data + AI Engineer role in the Netherlands</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button onClick={() => onNavigate('path')}
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-sm overflow-hidden transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #E8A020, #F5C842)', color: '#060D1A', boxShadow: '0 0 0 1px rgba(232,160,32,0.3), 0 8px 32px rgba(232,160,32,0.25)' }}>
            <span className="relative z-10">Begin the Journey →</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #F5C842, #E8A020)' }} />
          </button>
          <button onClick={() => onNavigate('career')}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:border-opacity-30"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(232,228,220,0.8)', backdropFilter: 'blur(8px)' }}>
            🇳🇱 Netherlands Career Hub
          </button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {[
            { value: '6', label: 'Deep Modules', color: '#00B4D8' },
            { value: '13', label: 'In-depth Lessons', color: '#9B5DE5' },
            { value: '20+', label: 'Interview Q&As', color: '#E8A020' },
            { value: '35+', label: 'Glossary Terms', color: '#2EC4B6' },
          ].map(s => (
            <div key={s.label} className="glass-light rounded-xl px-5 py-3 text-center" style={{ minWidth: 100 }}>
              <div className="font-display font-bold text-3xl" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(232,228,220,0.45)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Module grid */}
        <div className="w-full max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: 'rgba(232,228,220,0.25)' }}>Six modules, zero fluff</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {moduleCards.map(m => (
              <button key={m.n} onClick={() => onNavigate('modules')}
                className="group glass-light rounded-xl p-3 text-center transition-all hover:scale-105 cursor-pointer"
                style={{ border: `1px solid ${m.color}20` }}>
                <div className="text-xl mb-1" style={{ color: m.color }}>{m.icon}</div>
                <div className="font-mono text-xs mb-0.5" style={{ color: 'rgba(232,228,220,0.25)' }}>{m.n}</div>
                <div className="text-xs font-medium" style={{ color: 'rgba(232,228,220,0.7)' }}>{m.title}</div>
                <div className="mt-1.5 text-xs px-1.5 py-0.5 rounded-full inline-block"
                  style={{ background: `${m.color}15`, color: m.color, fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                  {m.level}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center pb-8 gap-1" style={{ color: 'rgba(232,228,220,0.2)' }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, rgba(232,228,220,0.2), transparent)' }} />
      </div>
    </div>
  );
}
