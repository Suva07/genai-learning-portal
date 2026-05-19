interface LearningPathProps {
  completedLessons: Set<string>;
  onNavigate: (tab: string) => void;
  onNavigateToLesson: (moduleId: string, lessonId: string) => void;
}

const phases = [
  {
    phase: 'Phase I', title: 'AI Foundations', color: '#00B4D8', moduleId: 'foundations',
    icon: '🧠', totalTime: '37 min',
    outcomes: [
      'Explain the difference between ML, Deep Learning, and Generative AI to a non-technical colleague',
      'Describe how a neural network learns using gradient descent and backpropagation',
      'Place any AI product (ChatGPT, Copilot, Midjourney) in the correct paradigm',
    ],
    skills: ['ML Taxonomy', 'Neural Networks', 'Backpropagation', 'AI History'],
    lessons: [
      { id: 'ai-history', moduleId: 'foundations', icon: '◎', title: 'AI History & Landscape', time: '12 min', desc: 'From Turing to GPT-4o — the 70-year arc of intelligence' },
      { id: 'ml-vs-dl-vs-genai', moduleId: 'foundations', icon: '◑', title: 'ML vs DL vs GenAI', time: '10 min', desc: 'The nested family tree: where every AI paradigm fits' },
      { id: 'neural-networks', moduleId: 'foundations', icon: '⬡', title: 'Neural Networks Deep Dive', time: '15 min', desc: 'Neurons, layers, activation functions, backpropagation' },
    ]
  },
  {
    phase: 'Phase II', title: 'Language Models', color: '#F77F00', moduleId: 'genai-llms',
    icon: '✦', totalTime: '36 min',
    outcomes: [
      'Explain tokenisation, temperature, and sampling to any engineer',
      'Describe the Transformer architecture and why attention changed everything',
      'Compare GPT-4, Claude, Gemini, Llama and choose the right model for a use-case',
    ],
    skills: ['Tokenisation', 'Transformers', 'Attention', 'Prompt Engineering', 'Model Selection'],
    lessons: [
      { id: 'what-is-generative', moduleId: 'genai-llms', icon: '✦', title: 'What is Generative AI?', time: '8 min', desc: 'Tokens, sampling, temperature — the generative loop unpacked' },
      { id: 'transformers', moduleId: 'genai-llms', icon: '⟳', title: 'Transformers & Attention', time: '18 min', desc: 'Self-attention, positional encoding, the architecture behind GPT' },
      { id: 'famous-models', moduleId: 'genai-llms', icon: '★', title: 'The Model Landscape', time: '10 min', desc: 'GPT-4o, Claude 4, Gemini, Llama 3, Mistral — compared honestly' },
    ]
  },
  {
    phase: 'Phase III', title: 'Meaning & Memory', color: '#9B5DE5', moduleId: 'embeddings-vectors',
    icon: '◈', totalTime: '35 min',
    outcomes: [
      'Explain embeddings using a concrete analogy and show Python code to generate them',
      'Build a vector similarity search from scratch using cosine distance',
      'Compare Weaviate, Pinecone, ChromaDB and choose the right one for a production system',
    ],
    skills: ['Embeddings', 'Cosine Similarity', 'Vector DBs', 'Semantic Search', 'HNSW Indexing'],
    lessons: [
      { id: 'what-are-embeddings', moduleId: 'embeddings-vectors', icon: '◈', title: 'Embeddings Explained', time: '15 min', desc: 'Coordinates in a galaxy of meaning — with Python code' },
      { id: 'vector-databases', moduleId: 'embeddings-vectors', icon: '⬡', title: 'Vector Databases', time: '20 min', desc: 'Weaviate 🇳🇱, Pinecone, ChromaDB, Qdrant — architecture & trade-offs' },
    ]
  },
  {
    phase: 'Phase IV', title: 'Retrieval-Augmented Generation', color: '#E8A020', moduleId: 'rag',
    icon: '⬡', totalTime: '65 min',
    outcomes: [
      'Explain why RAG solves hallucinations and knowledge cutoffs — and its limits',
      'Build a complete RAG pipeline: chunk, embed, index, retrieve, generate',
      'Choose the right chunking strategy (fixed, semantic, parent-child) for any document type',
      'Implement hybrid search, cross-encoder re-ranking, and HyDE in production',
      'Measure retrieval quality with Hit Rate, MRR, and NDCG on a golden test set',
    ],
    skills: ['RAG Pipeline', 'Chunking Strategy', 'Hybrid Search', 'Re-ranking', 'HyDE', 'RAGAS Metrics'],
    lessons: [
      { id: 'why-rag', moduleId: 'rag', icon: '◉', title: 'Why RAG Exists', time: '10 min', desc: 'The three problems RAG solves — and one it does not' },
      { id: 'rag-architecture', moduleId: 'rag', icon: '⬡', title: 'RAG Architecture', time: '25 min', desc: 'Index → Retrieve → Generate + HyDE, re-ranking, RAGAS eval' },
      { id: 'chunking-retrieval', moduleId: 'rag', icon: '◈', title: 'Chunking & Retrieval Strategies', time: '30 min', desc: 'Fixed, semantic, parent-child chunking; hybrid search; re-ranking; measuring retrieval quality' },
    ]
  },
  {
    phase: 'Phase V', title: 'Production AI Systems', color: '#2EC4B6', moduleId: 'agents-workflows',
    icon: '⬢', totalTime: '85 min',
    outcomes: [
      'Implement a ReAct agent with tool use using LangChain or the Anthropic SDK',
      'Design a multi-agent workflow and identify common failure modes',
      'Set up LLM observability with Langfuse — trace every token, cost, and tool call',
      'Build an AI Gateway with LiteLLM: model routing, fallbacks, semantic caching, cost control',
      'Evaluate LLM outputs at scale using RAGAS, LLM-as-judge, and human-in-the-loop pipelines',
      'Run continuous evaluation in CI/CD to catch quality regressions before they reach users',
    ],
    skills: ['ReAct Loop', 'Tool Use', 'LangGraph', 'LLMOps', 'AI Gateway', 'LiteLLM', 'Semantic Cache', 'RAGAS', 'LLM Judge', 'HITL Eval'],
    lessons: [
      { id: 'what-are-agents', moduleId: 'agents-workflows', icon: '⬢', title: 'AI Agents & Workflows', time: '25 min', desc: 'ReAct, tools, planning, multi-agent systems & failure modes' },
      { id: 'llmops-gateway', moduleId: 'agents-workflows', icon: '◎', title: 'LLMOps & AI Gateways', time: '30 min', desc: 'Observability, LiteLLM routing, semantic caching, cost control & prompt versioning' },
      { id: 'evaluation-metrics', moduleId: 'agents-workflows', icon: '⚖', title: 'Evaluation, Metrics & LLM Judges', time: '30 min', desc: 'RAGAS pipeline, LLM-as-judge, human-in-the-loop, continuous eval in CI/CD' },
    ]
  },
  {
    phase: 'Phase VI', title: 'Alignment & Safety', color: '#E05A4E', moduleId: 'alignment',
    icon: '◉', totalTime: '37 min',
    outcomes: [
      'Explain the alignment problem and why it matters for production AI systems',
      'Describe RLHF, RLAIF, Constitutional AI, and DPO with Python code examples',
      'Apply DPO fine-tuning to a custom model using the TRL library',
    ],
    skills: ['RLHF', 'RLAIF', 'Constitutional AI', 'DPO', 'Red-teaming', 'Responsible AI'],
    lessons: [
      { id: 'why-alignment', moduleId: 'alignment', icon: '⚠', title: 'Why Alignment Matters', time: '12 min', desc: 'Paperclip maximisers, Goodhart\'s Law, real-world failures' },
      { id: 'rlhf-rlaif', moduleId: 'alignment', icon: '⚖', title: 'RLHF, RLAIF, CAI & DPO', time: '25 min', desc: 'Teaching models to be helpful, harmless, honest — with code' },
    ]
  },
];

const totalLessonsCount = phases.reduce((a, p) => a + p.lessons.length, 0);

export default function LearningPath({ completedLessons, onNavigate, onNavigateToLesson }: LearningPathProps) {
  const done = phases.reduce((a, p) => a + p.lessons.filter(l => completedLessons.has(l.id)).length, 0);
  const pct = Math.round((done / totalLessonsCount) * 100);
  const totalMinutes = phases.reduce((a, p) => a + parseInt(p.totalTime), 0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* ── Header ─────────────────────────────── */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.3))' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(232,160,32,0.5)' }}>Curriculum</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.3), transparent)' }} />
        </div>
        <h2 className="font-display font-light text-5xl mb-3" style={{ color: '#F0EBE0', letterSpacing: '-0.02em' }}>
          Learning Path
        </h2>
        <p className="text-base" style={{ color: 'rgba(232,228,220,0.45)' }}>
          Six phases. First principles to production-ready. Built for a Data + AI engineering role in the Netherlands.
        </p>
      </div>

      {/* ── Course at-a-glance card ──────────────── */}
      <div className="rounded-2xl mb-14 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1F38, #111E35)', border: '1px solid rgba(232,160,32,0.18)' }}>
        {/* Gold top strip */}
        <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #E8A020, #F5C842, #E8A020)' }} />
        <div className="p-7">
          <div className="flex flex-wrap gap-6 mb-7">
            {[
              { value: String(totalLessonsCount), label: 'In-depth Lessons', icon: '◈' },
              { value: '6', label: 'Modules', icon: '⬡' },
              { value: `${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m`, label: 'Total Content', icon: '⏱' },
              { value: 'Certificate', label: 'On completion', icon: '✦' },
            ].map(s => (
              <div key={s.label} className="flex-1 min-w-[110px]">
                <div className="text-xs mb-1" style={{ color: 'rgba(232,160,32,0.5)' }}>{s.icon}</div>
                <div className="font-display text-3xl font-bold text-gold-gradient leading-none mb-1">{s.value}</div>
                <div className="text-xs" style={{ color: 'rgba(232,228,220,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium" style={{ color: 'rgba(232,228,220,0.45)' }}>Your progress</span>
            <span className="font-mono text-sm font-bold text-gold-gradient">{done}/{totalLessonsCount} lessons · {pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full progress-fill"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #E8A020, #F5C842)' }} />
          </div>

          {pct === 0 && (
            <p className="mt-3 text-xs" style={{ color: 'rgba(232,228,220,0.25)' }}>
              Click any lesson below to begin. Your progress is saved automatically.
            </p>
          )}
          {pct > 0 && pct < 100 && (
            <p className="mt-3 text-xs" style={{ color: 'rgba(232,228,220,0.3)' }}>
              {totalLessonsCount - done} lessons remaining to complete the course.
            </p>
          )}
          {pct === 100 && (
            <p className="mt-3 text-xs font-semibold" style={{ color: '#E8A020' }}>
              ✦ Course complete — certificate unlocked!
            </p>
          )}
        </div>
      </div>

      {/* ── Timeline ────────────────────────────── */}
      <div className="relative">
        {/* Vertical thread */}
        <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, rgba(232,160,32,0.25), rgba(232,160,32,0.04))' }} />

        <div className="space-y-12">
          {phases.map((phase, pi) => {
            const phaseDone = phase.lessons.filter(l => completedLessons.has(l.id)).length;
            const phaseComplete = phaseDone === phase.lessons.length;

            return (
              <div key={pi} className="relative pl-14">
                {/* Phase node */}
                <div className="absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: phaseComplete ? `${phase.color}25` : 'rgba(13,31,56,0.9)',
                    border: `1.5px solid ${phaseComplete ? phase.color : phase.color + '35'}`,
                    color: phase.color,
                    boxShadow: phaseComplete ? `0 0 16px ${phase.color}30` : 'none',
                  }}>
                  {phaseComplete ? '✓' : pi + 1}
                </div>

                {/* Phase header */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="text-xs font-mono" style={{ color: 'rgba(232,228,220,0.25)', letterSpacing: '0.1em' }}>{phase.phase}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${phase.color}12`, color: phase.color + 'AA', border: `1px solid ${phase.color}25` }}>
                      {phase.lessons.length} lesson{phase.lessons.length > 1 ? 's' : ''} · {phase.totalTime}
                    </span>
                    {phaseDone > 0 && !phaseComplete && (
                      <span className="text-xs font-mono" style={{ color: phase.color + '70' }}>{phaseDone}/{phase.lessons.length} done</span>
                    )}
                    {phaseComplete && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${phase.color}15`, color: phase.color }}>✓ Complete</span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: phase.color }}>{phase.title}</h3>

                  {/* Learning outcomes */}
                  <div className="mb-4 pl-4 border-l-2 space-y-1.5" style={{ borderColor: `${phase.color}25` }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: `${phase.color}70` }}>After this phase you will be able to</p>
                    {phase.outcomes.map((outcome, oi) => (
                      <div key={oi} className="flex items-start gap-2.5">
                        <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: phase.color }}>▸</span>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(232,228,220,0.5)' }}>{outcome}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {phase.skills.map(skill => (
                      <span key={skill} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${phase.color}08`, color: `${phase.color}90`, border: `1px solid ${phase.color}20` }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lesson cards */}
                <div className="space-y-2.5">
                  {phase.lessons.map((lesson, li) => {
                    const isDone = completedLessons.has(lesson.id);
                    const isNext = !isDone && phase.lessons.slice(0, li).every(l => completedLessons.has(l.id));

                    return (
                      <button key={lesson.id}
                        onClick={() => onNavigateToLesson(lesson.moduleId, lesson.id)}
                        className="w-full text-left p-4 rounded-xl transition-all flex items-center gap-4 group"
                        style={{
                          background: isDone ? `${phase.color}0C` : isNext ? `${phase.color}06` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${isDone ? phase.color + '35' : isNext ? phase.color + '20' : 'rgba(255,255,255,0.06)'}`,
                          boxShadow: isNext ? `0 0 0 1px ${phase.color}10` : 'none',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.25), 0 0 0 1px ${phase.color}20`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.transform = '';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = isNext ? `0 0 0 1px ${phase.color}10` : 'none';
                        }}>

                        {/* Status icon */}
                        <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-sm transition-all"
                          style={{
                            background: isDone ? phase.color : isNext ? `${phase.color}15` : 'rgba(255,255,255,0.04)',
                            color: isDone ? '#060D1A' : phase.color,
                            border: isNext ? `1px solid ${phase.color}30` : 'none',
                          }}>
                          {isDone ? '✓' : lesson.icon}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm" style={{ color: isDone ? 'rgba(232,228,220,0.6)' : '#E8E4DC' }}>
                              {lesson.title}
                            </span>
                            {isNext && (
                              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                style={{ background: `${phase.color}18`, color: phase.color, border: `1px solid ${phase.color}30` }}>
                                Up next
                              </span>
                            )}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: 'rgba(232,228,220,0.3)' }}>{lesson.desc}</div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-mono px-2 py-1 rounded-lg"
                            style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(232,228,220,0.3)' }}>
                            {lesson.time}
                          </span>
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: phase.color }}>→</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Connector to next phase */}
                {pi < phases.length - 1 && (
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${phase.color}20, transparent)` }} />
                    <span className="text-xs font-mono" style={{ color: 'rgba(232,228,220,0.15)' }}>↓</span>
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${phases[pi + 1].color}20)` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── What you'll build section ────────────── */}
      <div className="mt-16 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06))' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(232,228,220,0.2)' }}>Practical Labs</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), transparent)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '🔬', title: 'Wafer Defect Classifier', desc: 'sklearn + PyTorch on ASML-style sensor data', tag: 'Lab 01' },
            { icon: '🔍', title: 'Semantic CV Search', desc: 'Embed & rank CVs with sentence-transformers', tag: 'Lab 03' },
            { icon: '🤖', title: 'ReAct Agent', desc: 'Tool-using agent with LangGraph + Weaviate', tag: 'Lab 05' },
          ].map(lab => (
            <button key={lab.title} onClick={() => onNavigate('labs')}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(46,196,182,0.04)', border: '1px solid rgba(46,196,182,0.12)' }}>
              <div className="text-2xl mb-2">{lab.icon}</div>
              <div className="text-xs font-mono mb-1.5" style={{ color: '#2EC4B6AA' }}>{lab.tag}</div>
              <div className="text-sm font-medium mb-1" style={{ color: 'rgba(232,228,220,0.8)' }}>{lab.title}</div>
              <div className="text-xs" style={{ color: 'rgba(232,228,220,0.3)' }}>{lab.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Career CTA ──────────────────────────── */}
      <div className="p-8 rounded-2xl text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D1F38, #12294A)', border: '1px solid rgba(232,160,32,0.15)' }}>
        <div className="aurora-blob" style={{ width: 300, height: 300, top: '-50%', right: '-20%', background: 'radial-gradient(circle, rgba(232,160,32,0.08) 0%, transparent 70%)', animationDelay: '-3s' }} />
        <div className="relative z-10">
          <div className="text-4xl mb-3">🇳🇱</div>
          <h3 className="font-display text-3xl font-semibold mb-2" style={{ color: '#F0EBE0' }}>Ready for the Job Market?</h3>
          <p className="text-sm mb-2" style={{ color: 'rgba(232,228,220,0.45)' }}>
            Netherlands salary benchmarks, per-company pay ranges, 20+ interview Q&As, and live job openings at Booking.com, ING, ASML, Adyen, and more.
          </p>
          <p className="text-xs mb-7" style={{ color: 'rgba(232,228,220,0.25)' }}>
            Data Engineer · ML Engineer · AI Engineer · Senior / Staff
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
