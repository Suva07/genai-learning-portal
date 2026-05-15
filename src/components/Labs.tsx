import { useState } from 'react';

const labs = [
  {
    num: '01', id: 'foundations', color: '#00B4D8',
    title: 'AI Foundations',
    subtitle: 'ML vs Deep Learning vs GenAI — hands-on comparison',
    duration: '45 min',
    level: 'Beginner',
    skills: ['scikit-learn', 'PyTorch', 'matplotlib', 'NumPy'],
    exercises: [
      'Train a decision tree and a neural network on the same dataset',
      'Visualise how a neural network learns over epochs',
      'Compare accuracy vs interpretability trade-offs',
    ],
    scenario: 'ASML: detecting wafer defects with CNNs at nanometre precision',
  },
  {
    num: '02', id: 'genai-llms', color: '#F77F00',
    title: 'Generative AI & LLMs',
    subtitle: 'Tokenization, sampling, and prompt engineering in Python',
    duration: '50 min',
    level: 'Beginner',
    skills: ['HuggingFace Transformers', 'Tokenizers', 'GPT-2', 'Sampling'],
    exercises: [
      'See how GPT-2 tokenises text and compare to human intuition',
      'Vary temperature from 0 to 1.5 and compare outputs',
      'A/B test zero-shot vs few-shot vs chain-of-thought prompts',
    ],
    scenario: 'Booking.com: summarising 500M+ reviews with LLMs at scale',
  },
  {
    num: '03', id: 'embeddings-vectors', color: '#9B5DE5',
    title: 'Embeddings & Vectors',
    subtitle: 'Build a semantic search engine from scratch',
    duration: '55 min',
    level: 'Intermediate',
    skills: ['sentence-transformers', 'NumPy', 'sklearn', 'Matplotlib'],
    exercises: [
      'Embed 100 sentences and visualise clusters with t-SNE',
      'Build a semantic FAQ search (beats keyword search on every test)',
      'Measure the Word2Vec arithmetic: king - man + woman',
    ],
    scenario: 'TomTom: matching user navigation queries to map descriptions semantically',
  },
  {
    num: '04', id: 'rag', color: '#E8A020',
    title: 'RAG Pipeline',
    subtitle: 'End-to-end retrieval-augmented generation with ChromaDB',
    duration: '70 min',
    level: 'Intermediate',
    skills: ['ChromaDB', 'sentence-transformers', 'LangChain', 'RAGAS'],
    exercises: [
      'Index a knowledge base: chunk, embed, and store in ChromaDB',
      'Query pipeline: embed question, retrieve top-5, measure precision@k',
      'Full RAG: assemble context + question, generate grounded answer',
      'Evaluate with Faithfulness and Answer Relevance metrics',
    ],
    scenario: 'ING: compliance officers querying 10,000+ regulatory documents in natural language',
  },
  {
    num: '05', id: 'agents-workflows', color: '#2EC4B6',
    title: 'AI Agents',
    subtitle: 'Build a ReAct agent with tools, memory, and LangGraph',
    duration: '65 min',
    level: 'Advanced',
    skills: ['LangChain', 'LangGraph', 'Tool Use', 'ReAct'],
    exercises: [
      'Build ReAct from scratch (no framework) to understand the loop',
      'Add tools: calculator, date lookup, Wikipedia search',
      'Implement short-term memory across agent steps',
      'Build a multi-step LangGraph agent with conditional routing',
    ],
    scenario: 'Adyen: multi-step fraud reasoning agent evaluating transaction context',
  },
  {
    num: '06', id: 'alignment', color: '#E05A4E',
    title: 'Alignment',
    subtitle: 'RLHF data pipelines, DPO format, and Constitutional AI',
    duration: '60 min',
    level: 'Advanced',
    skills: ['HuggingFace Datasets', 'TRL', 'DPO format', 'Constitutional AI'],
    exercises: [
      'Build a preference dataset: write chosen/rejected pairs for 20 prompts',
      'Format data for DPO training (ready to use with TRL library)',
      'Implement Constitutional AI critique-revision loop',
      'Compare outputs: base model vs SFT vs aligned model',
    ],
    scenario: "Anthropic's Constitutional AI: how Claude's values are baked in through self-critique",
  },
];

const DEPS: Record<string, string[]> = {
  '01': ['numpy', 'scikit-learn', 'matplotlib', 'torch', 'torchvision'],
  '02': ['transformers', 'tokenizers', 'torch'],
  '03': ['sentence-transformers', 'numpy', 'scikit-learn', 'matplotlib', 'umap-learn'],
  '04': ['sentence-transformers', 'chromadb', 'langchain', 'langchain-community', 'ragas'],
  '05': ['langchain', 'langchain-community', 'langgraph', 'wikipedia'],
  '06': ['transformers', 'datasets', 'trl', 'torch'],
};

export default function Labs() {
  const [showSetup, setShowSetup] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyRaw = (id: string, num: string) => {
    const url = `https://raw.githubusercontent.com/Suva07/genai-learning-portal/main/notebooks/${num}-${id}.ipynb`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(46,196,182,0.4))' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(46,196,182,0.6)' }}>Hands-on</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(46,196,182,0.4), transparent)' }} />
        </div>
        <h2 className="font-display font-light text-5xl mb-3" style={{ color: '#F0EBE0', letterSpacing: '-0.02em' }}>
          Lab <span className="italic" style={{ color: '#2EC4B6' }}>Notebooks</span>
        </h2>
        <p style={{ color: 'rgba(232,228,220,0.4)' }}>
          Six hands-on notebooks. Real code, real data, real scenarios from Dutch companies.
          Run in Databricks Free Edition or Google Colab — no setup required.
        </p>
      </div>

      {/* Setup instructions */}
      <div className="mb-8 rounded-2xl overflow-hidden" style={{ background: '#0D1F38', border: '1px solid rgba(46,196,182,0.15)' }}>
        <button
          onClick={() => setShowSetup(!showSetup)}
          className="w-full flex items-center justify-between p-5 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🚀</span>
            <div>
              <div className="font-semibold text-sm" style={{ color: '#E8E4DC' }}>How to run these notebooks</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(232,228,220,0.4)' }}>Databricks Free Edition or Google Colab — click to expand</div>
            </div>
          </div>
          <span className="text-xs" style={{ color: 'rgba(232,228,220,0.3)' }}>{showSetup ? '▲' : '▼'}</span>
        </button>

        {showSetup && (
          <div className="px-5 pb-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(232,160,32,0.06)', border: '1px solid rgba(232,160,32,0.15)' }}>
                <div className="font-semibold text-sm mb-3" style={{ color: '#F5A623' }}>▶ Option A: Google Colab (Easiest)</div>
                <ol className="space-y-2 text-xs" style={{ color: 'rgba(232,228,220,0.6)' }}>
                  <li className="flex gap-2"><span style={{ color: '#F5A623' }}>1.</span> Click "Open in Colab" on any lab card below</li>
                  <li className="flex gap-2"><span style={{ color: '#F5A623' }}>2.</span> Sign in with your Google account</li>
                  <li className="flex gap-2"><span style={{ color: '#F5A623' }}>3.</span> Click Runtime → Run all (or run cells one by one)</li>
                  <li className="flex gap-2"><span style={{ color: '#F5A623' }}>4.</span> Free GPU available — ideal for embeddings and model labs</li>
                </ol>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(46,196,182,0.06)', border: '1px solid rgba(46,196,182,0.15)' }}>
                <div className="font-semibold text-sm mb-3" style={{ color: '#2EC4B6' }}>⬡ Option B: Databricks Free Edition</div>
                <ol className="space-y-2 text-xs" style={{ color: 'rgba(232,228,220,0.6)' }}>
                  <li className="flex gap-2"><span style={{ color: '#2EC4B6' }}>1.</span> Sign up at <span style={{ color: '#2EC4B6' }}>databricks.com/learn/free-edition</span></li>
                  <li className="flex gap-2"><span style={{ color: '#2EC4B6' }}>2.</span> Click "Copy import URL" on any lab below</li>
                  <li className="flex gap-2"><span style={{ color: '#2EC4B6' }}>3.</span> In Databricks: Workspace → (⋮) → Import → URL → paste</li>
                  <li className="flex gap-2"><span style={{ color: '#2EC4B6' }}>4.</span> Attach to a cluster and run — all deps install via %pip</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lab cards */}
      <div className="space-y-4">
        {labs.map((lab) => (
          <div key={lab.id} className="rounded-2xl overflow-hidden"
            style={{ background: '#0D1F38', border: `1px solid ${lab.color}18` }}>
            <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${lab.color}, ${lab.color}20)` }} />

            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-mono text-sm font-bold"
                    style={{ background: `${lab.color}15`, color: lab.color, border: `1px solid ${lab.color}30` }}>
                    {lab.num}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold" style={{ color: '#F0EBE0' }}>{lab.title}</h3>
                    <p className="text-sm mt-0.5" style={{ color: 'rgba(232,228,220,0.45)' }}>{lab.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full"
                        style={{ background: `${lab.color}12`, color: lab.color, border: `1px solid ${lab.color}25` }}>
                        {lab.level}
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'rgba(232,228,220,0.3)' }}>⏱ {lab.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 flex-shrink-0 flex-wrap">
                  <a href={`https://colab.research.google.com/github/Suva07/genai-learning-portal/blob/main/notebooks/${lab.num}-${lab.id}.ipynb`}
                    target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 flex items-center gap-1.5"
                    style={{ background: 'rgba(255,160,0,0.1)', color: '#F5A623', border: '1px solid rgba(255,160,0,0.2)' }}>
                    ▶ Open in Colab
                  </a>
                  <button
                    onClick={() => copyRaw(lab.id, lab.num)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 flex items-center gap-1.5"
                    style={{ background: 'rgba(46,196,182,0.08)', color: '#2EC4B6', border: '1px solid rgba(46,196,182,0.2)' }}>
                    {copiedId === lab.id ? '✓ Copied!' : '📋 Copy Databricks URL'}
                  </button>
                  <a href={`https://raw.githubusercontent.com/Suva07/genai-learning-portal/main/notebooks/${lab.num}-${lab.id}.ipynb`}
                    download={`${lab.num}-${lab.id}.ipynb`}
                    className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 flex items-center gap-1.5"
                    style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(232,228,220,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    ↓ .ipynb
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                {/* Exercises */}
                <div className="md:col-span-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.1em] mb-2.5" style={{ color: 'rgba(232,228,220,0.3)' }}>
                    What you will build
                  </div>
                  <ul className="space-y-1.5">
                    {lab.exercises.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(232,228,220,0.55)' }}>
                        <span className="flex-shrink-0 mt-0.5" style={{ color: lab.color }}>▸</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack + scenario */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(232,228,220,0.3)' }}>
                      Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lab.skills.map(s => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-lg font-mono"
                          style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(232,228,220,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl text-xs leading-relaxed"
                    style={{ background: `${lab.color}08`, border: `1px solid ${lab.color}15`, color: 'rgba(232,228,220,0.5)' }}>
                    <span style={{ color: lab.color }}>📍 Real scenario: </span>{lab.scenario}
                  </div>
                  <div className="p-2.5 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="text-xs font-mono mb-1" style={{ color: 'rgba(232,228,220,0.25)' }}>pip install</div>
                    <div className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(232,228,220,0.4)' }}>
                      {DEPS[lab.num].join(' ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 p-5 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-sm" style={{ color: 'rgba(232,228,220,0.35)' }}>
          All notebooks run on Databricks Free Edition single-node clusters and Google Colab free tier.
          No GPU required for most labs. Dependencies install via <code style={{ color: 'rgba(232,160,32,0.7)', background: 'rgba(232,160,32,0.08)', padding: '1px 6px', borderRadius: 4 }}>%pip install</code> in the first cell.
        </p>
      </div>
    </div>
  );
}
