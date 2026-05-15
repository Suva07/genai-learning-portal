interface LearningPathProps {
  completedLessons: Set<string>;
  onNavigate: (tab: string) => void;
}

const phases = [
  {
    phase: 'Phase I', title: 'Foundation', color: '#00B4D8',
    lessons: [
      { id: 'ai-history', icon: '◎', title: 'AI History & Landscape', time: '12 min', desc: 'From Turing to GPT-4o: the arc of intelligence' },
      { id: 'ml-vs-dl-vs-genai', icon: '◑', title: 'ML vs DL vs GenAI', time: '10 min', desc: 'The nested family tree of AI paradigms' },
      { id: 'neural-networks', icon: '⬡', title: 'Neural Networks', time: '15 min', desc: 'The city road network analogy' },
    ]
  },
  {
    phase: 'Phase II', title: 'Language Models', color: '#F77F00',
    lessons: [
      { id: 'what-is-generative', icon: '✦', title: 'What is Generative AI?', time: '8 min', desc: 'Tokens, sampling, and the generative loop' },
      { id: 'transformers', icon: '⟳', title: 'Transformers & Attention', time: '18 min', desc: 'The detective analogy: reading every word at once' },
      { id: 'famous-models', icon: '★', title: 'The Model Landscape', time: '10 min', desc: 'GPT-4, Claude 4, Gemini, Llama, Mistral compared' },
    ]
  },
  {
    phase: 'Phase III', title: 'Meaning & Memory', color: '#9B5DE5',
    lessons: [
      { id: 'what-are-embeddings', icon: '◈', title: 'Embeddings', time: '15 min', desc: 'Coordinates in a galaxy of meaning' },
      { id: 'vector-databases', icon: '⬡', title: 'Vector Databases', time: '20 min', desc: 'Pinecone, Weaviate 🇳🇱, Chroma, Qdrant' },
    ]
  },
  {
    phase: 'Phase IV', title: 'Retrieval', color: '#E8A020',
    lessons: [
      { id: 'why-rag', icon: '◉', title: 'Why RAG Exists', time: '10 min', desc: 'Solving hallucinations & knowledge cutoffs' },
      { id: 'rag-architecture', icon: '⬡', title: 'RAG Architecture', time: '25 min', desc: 'Index → Retrieve → Generate + advanced techniques' },
    ]
  },
  {
    phase: 'Phase V', title: 'Autonomy', color: '#2EC4B6',
    lessons: [
      { id: 'what-are-agents', icon: '⬢', title: 'AI Agents & Workflows', time: '25 min', desc: 'ReAct, tools, multi-agent systems, failure modes' },
    ]
  },
  {
    phase: 'Phase VI', title: 'Alignment', color: '#E05A4E',
    lessons: [
      { id: 'why-alignment', icon: '⚠', title: 'Why Alignment Matters', time: '12 min', desc: 'Paperclip maximisers & Goodhart\'s Law' },
      { id: 'rlhf-rlaif', icon: '⚖', title: 'RLHF, RLAIF, CAI & DPO', time: '25 min', desc: 'Teaching models to be helpful, harmless, honest' },
    ]
  },
];

export default function LearningPath({ completedLessons, onNavigate }: LearningPathProps) {
  const totalLessons = phases.reduce((a, p) => a + p.lessons.length, 0);
  const done = phases.reduce((a, p) => a + p.lessons.filter(l => completedLessons.has(l.id)).length, 0);
  const pct = Math.round((done / totalLessons) * 100);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.3))' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(232,160,32,0.5)' }}>Roadmap</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.3), transparent)' }} />
        </div>
        <h2 className="font-display font-light text-5xl mb-3" style={{ color: '#F0EBE0', letterSpacing: '-0.02em' }}>
          Learning Path
        </h2>
        <p style={{ color: 'rgba(232,228,220,0.45)' }}>Six phases. From first principles to job-ready.</p>

        {/* Progress */}
        <div className="mt-8 p-5 rounded-2xl" style={{ background: '#0D1F38', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium" style={{ color: 'rgba(232,228,220,0.6)' }}>Overall Progress</span>
            <span className="font-display text-2xl font-bold text-gold-gradient">{done}/{totalLessons}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full progress-fill"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #E8A020, #F5C842)' }} />
          </div>
          <p className="text-xs mt-2" style={{ color: 'rgba(232,228,220,0.25)' }}>{pct}% complete</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, rgba(232,160,32,0.3), rgba(232,160,32,0.05))' }} />

        <div className="space-y-10">
          {phases.map((phase, pi) => (
            <div key={pi} className="relative pl-14">
              {/* Phase node */}
              <div className="absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: `${phase.color}15`, border: `1px solid ${phase.color}40`, color: phase.color }}>
                {pi + 1}
              </div>

              {/* Phase label */}
              <div className="mb-4">
                <div className="text-xs font-mono mb-0.5" style={{ color: 'rgba(232,228,220,0.3)', letterSpacing: '0.1em' }}>{phase.phase}</div>
                <h3 className="font-display text-2xl font-semibold" style={{ color: phase.color }}>{phase.title}</h3>
              </div>

              {/* Lessons */}
              <div className="space-y-2">
                {phase.lessons.map((lesson) => {
                  const isDone = completedLessons.has(lesson.id);
                  return (
                    <button key={lesson.id} onClick={() => onNavigate('modules')}
                      className="w-full text-left p-4 rounded-xl transition-all hover:scale-[1.01] flex items-center gap-4 group"
                      style={{
                        background: isDone ? `${phase.color}0A` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isDone ? phase.color + '30' : 'rgba(255,255,255,0.06)'}`,
                      }}>
                      <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-sm transition-all"
                        style={{ background: isDone ? phase.color : 'rgba(255,255,255,0.04)', color: isDone ? '#060D1A' : phase.color }}>
                        {isDone ? '✓' : lesson.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm" style={{ color: '#E8E4DC' }}>{lesson.title}</div>
                        <div className="text-xs mt-0.5 truncate" style={{ color: 'rgba(232,228,220,0.35)' }}>{lesson.desc}</div>
                      </div>
                      <span className="text-xs font-mono flex-shrink-0 px-2 py-1 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(232,228,220,0.3)' }}>
                        {lesson.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career CTA */}
      <div className="mt-16 p-8 rounded-2xl text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D1F38, #12294A)', border: '1px solid rgba(232,160,32,0.15)' }}>
        <div className="aurora-blob" style={{ width: 300, height: 300, top: '-50%', right: '-20%', background: 'radial-gradient(circle, rgba(232,160,32,0.08) 0%, transparent 70%)', animationDelay: '-3s' }} />
        <div className="relative z-10">
          <div className="text-4xl mb-3">🇳🇱</div>
          <h3 className="font-display text-3xl font-semibold mb-2" style={{ color: '#F0EBE0' }}>Ready for the Job Market?</h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(232,228,220,0.45)' }}>
            Netherlands salary data, top companies, and 20+ real interview Q&As
          </p>
          <button onClick={() => onNavigate('career')}
            className="px-7 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #E8A020, #F5C842)', color: '#060D1A' }}>
            Go to Career Hub →
          </button>
        </div>
      </div>
    </div>
  );
}
