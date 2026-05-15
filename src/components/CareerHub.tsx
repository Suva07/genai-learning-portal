import { useState } from 'react';

const interviewQAs = [
  {
    category: 'Fundamentals', color: '#00B4D8', icon: '🧠',
    questions: [
      { q: 'Explain the difference between a base LLM and an instruction-tuned model.', a: 'A base LLM is trained purely on next-token prediction. It can complete text but has no concept of "assistant". An instruction-tuned model goes through SFT and RLHF on (instruction, ideal response) pairs, teaching it to follow directives. Base models are research tools; instruction-tuned models power products like ChatGPT or Claude.' },
      { q: 'What is tokenization and why does it matter?', a: 'Tokenization splits text into sub-word units the model processes. Roughly 4 characters per token on average. It matters for: cost (APIs charge per token), context limits (token-based), and quality (rare words split into many tokens degrade model understanding of specialised domains).' },
      { q: 'Fine-tuning vs RAG: when would you choose each?', a: 'RAG when: data changes frequently, you need citations, data is sensitive, or you need quick deployment. Fine-tune when: you need a specific output style, domain terminology is unique, or consistent structured output matters. Best systems often combine both: fine-tune for style, RAG for current knowledge.' },
      { q: 'Explain temperature and when to set it to 0.', a: 'Temperature controls the vocabulary probability distribution at each token step. At 0, you get greedy decoding: fully deterministic. Higher values produce more creative but riskier outputs. Set to 0 for extraction, structured output, and factual Q&A where reproducibility matters. Use higher values for brainstorming or creative writing.' },
      { q: 'What happens when you exceed the context window?', a: 'Content outside the window is invisible. LLMs have no long-term memory beyond context. Strategies: truncation (risky, may lose key info), chunking across multiple calls, sliding window, summarisation, or models with large context (Gemini 1.5 Pro: 2M tokens). Always know your context limits before architecture decisions.' },
    ]
  },
  {
    category: 'RAG & Vector DBs', color: '#E8A020', icon: '🔍',
    questions: [
      { q: 'Walk me through the architecture of a production RAG system.', a: 'Offline: (1) Load docs via loaders; (2) Chunk with overlap (512 tokens, 10% overlap); (3) Embed (text-embedding-3-large); (4) Store vectors and metadata in Weaviate/Qdrant. Online: (1) Embed query; (2) Hybrid search (BM25 and vector, RRF fusion); (3) Rerank with cross-encoder; (4) Build prompt (system and chunks and query); (5) Generate with LLM. Add RAGAS evaluation.' },
      { q: 'What chunking strategy for legal documents and why?', a: 'Hierarchical chunking: create parent chunks (full article) and child chunks (paragraphs). Retrieve by child (precision) but return parent to LLM (context). Legal meaning shifts drastically without surrounding context. Add 15% overlap and semantic chunking at topic boundaries. Never fixed-size split legal text as you will cut mid-clause and destroy meaning.' },
      { q: 'Why does hybrid search beat pure vector search?', a: 'Pure vector search misses exact keyword matches. "GDPR Article 17" needs BM25 for the exact article reference. BM25 misses semantic similarity: "right to erasure" vs "right to be forgotten". Hybrid (BM25 and vector, RRF fusion) captures both. Standard in production at ING, Booking.com, ASML.' },
      { q: 'How would you evaluate a RAG system?', a: 'RAGAS Triad: (1) Faithfulness: does the answer contradict retrieved sources? (2) Answer Relevance: does it address the question? (3) Context Precision: were retrieved chunks useful? Also: Context Recall, latency P95, user feedback. Build an offline eval set of 50-100 (question, ground-truth) pairs for regression testing on each release.' },
      { q: 'What is HyDE and when do you use it?', a: 'HyDE generates a hypothetical answer first, then embeds that instead of the raw query. Embedding space is trained on documents, so a hypothetical answer is closer to real docs than a sparse question. Use when queries are short/ambiguous or standard retrieval recall is poor. Downside: one extra LLM call means higher latency and cost.' },
    ]
  },
  {
    category: 'Agents & LLMs', color: '#9B5DE5', icon: '🤖',
    questions: [
      { q: 'Explain the ReAct framework. How does it differ from a chain?', a: 'ReAct interleaves Thought, Action, and Observation in a loop until done. Unlike a fixed chain (A to B to C), ReAct is dynamic: the model decides each next step based on observations. It can call different tools, backtrack, retry, and adapt. LangGraph implements stateful ReAct with explicit cycles. The model decides when to stop via a "Final Answer" action.' },
      { q: 'What are the main agent failure modes and mitigations?', a: '(1) Hallucination chains: one wrong fact propagates, so ground with verification steps; (2) Infinite loops: add max iteration limits and exponential backoff; (3) Tool misuse: strict schema validation; (4) Scope creep: minimal permissions, human-in-loop for destructive actions; (5) Context overflow: memory management and intermediate summarisation.' },
      { q: 'Design a multi-agent system for monthly data quality reports.', a: 'Orchestrator coordinates: (1) Data Agent: SQL quality checks (nulls, dupes, schema drift); (2) Analysis Agent: Python/pandas anomaly detection, visualisations; (3) Context Agent: RAG retrieves historical reports; (4) Writer Agent: drafts narrative; (5) Critic Agent: fact-checks. Use LangGraph for stateful coordination with conditional routing between agents.' },
      { q: 'How do you handle long-term memory in agents?', a: 'Memory tiers: (1) In-context: current conversation (ephemeral); (2) Semantic memory: embed past interactions into vector DB, retrieve by similarity; (3) Episodic: structured records of past runs in a DB; (4) Procedural: fine-tune on successful trajectories. In practice: Redis/vector DB for fast retrieval, summarise long histories, set relevance thresholds to avoid injecting stale memories.' },
      { q: 'LangChain vs LangGraph vs LlamaIndex: key differences?', a: 'LangChain provides building blocks (chains, agents, tools, loaders) and is good for linear pipelines. LangGraph extends LangChain with graph-based stateful agents with cycles: each node is a function, edges define transitions. Perfect for complex agents with loops, branches, and human-in-loop. LlamaIndex is purpose-built for data ingestion and RAG with excellent chunking, indexing, and retrieval abstractions. Many teams combine LlamaIndex for RAG with LangGraph for agent orchestration.' },
    ]
  },
  {
    category: 'System Design', color: '#2EC4B6', icon: '🏗️',
    questions: [
      { q: 'Design a customer support AI for a Dutch e-commerce (100K tickets/month).', a: 'Stack: (1) Ingest product catalogue, FAQs, past tickets, chunk, embed, store in Weaviate; (2) Classify with GPT-3.5: routes to return/payment/product/escalate; (3) RAG Response: top-5 docs and ticket history fed into Claude Sonnet; (4) Human escalation: low-confidence tickets go to human agent with AI-drafted reply; (5) Feedback loop: corrections feed reward model improvement. FastAPI and Redis caching and MLflow and Grafana monitoring.' },
      { q: 'How do you keep a RAG knowledge base fresh?', a: 'Incremental refresh: (1) Structured sources: CDC (Debezium) to Kafka to re-embed and upsert; (2) Unstructured: daily scrape, change detection via content hash, re-embed deltas only; (3) Version tracking: store embedding model version and chunk hash and timestamp as metadata; (4) Staleness: add "last_updated" filter to deprioritise old docs; (5) Testing: run RAGAS on eval set on each pipeline run.' },
      { q: 'RAG system has poor answer quality. How do you diagnose it?', a: 'Systematic approach: (1) Check retrieval first: manually inspect top-5 for sample queries. If bad, try a better embedding model, adjust chunk size, add reranking, switch to hybrid search; (2) Check context quality: too small means lost context, too large means diluted relevance; (3) Check generation: if retrieval is good, strengthen grounding in system prompt; (4) Use RAGAS: low Faithfulness signals hallucination; low Answer Relevance signals a prompt issue; low Context Precision signals a retrieval issue. Let metrics guide experiments.' },
    ]
  },
  {
    category: 'Behavioural', color: '#E05A4E', icon: '💬',
    questions: [
      { q: 'Tell me about a time you delivered a data pipeline under tight constraints.', a: 'Use STAR format. Be direct and own your contribution clearly: say "I" not "the team". Include concrete numbers: "reduced pipeline runtime by 40%", "processed 2M records daily". Show initiative: describe a decision you made proactively. State achievements without hedging. Numbers and specifics are what interviewers remember.' },
      { q: 'How do you stay current with the AI/ML landscape?', a: 'Show active engagement: arXiv (Papers with Code), Lilian Weng / Sebastian Raschka blogs, Anthropic / OpenAI research pages, Latent Space / TWIML podcasts, building side projects on GitHub. Strong signal: mention a talk you gave, article you wrote, or open-source contribution. Companies value engineers who learn in public.' },
      { q: 'How do you handle disagreement with a tech lead on architecture?', a: 'The strongest approach: address it directly, frame with data (benchmarks, prototypes), listen and update if their argument is stronger, document the decision regardless of outcome. Avoid: "I just went along with it" (too passive) or "I pushed until I won" (too aggressive). Show intellectual honesty and the ability to change your mind with evidence.' },
    ]
  },
];

const companies = [
  {
    name: 'Booking.com',
    city: 'Amsterdam', cityColor: '#00B4D8',
    sector: 'Travel Technology',
    focus: 'Personalisation engines, demand forecasting, LLM-powered search and review summarisation at 1M+ property listings. One of the largest ML engineering teams in Europe.',
    stack: ['Python', 'PyTorch', 'Spark', 'Kafka', 'Airflow', 'LangChain'],
    roles: [
      { title: 'Senior ML Engineer', salary: '€95K – €130K' },
      { title: 'Data Engineer', salary: '€70K – €90K' },
      { title: 'AI Research Scientist', salary: '€100K – €140K' },
    ],
    signal: '500+ ML engineers. Ships models to 150M+ users daily.',
    color: '#00B4D8',
  },
  {
    name: 'ASML',
    city: 'Eindhoven', cityColor: '#9B5DE5',
    sector: 'Semiconductor Equipment',
    focus: 'Predictive maintenance, computer vision for chip defect detection at nanometre precision, yield optimisation AI. The global monopoly on EUV lithography machines.',
    stack: ['Python', 'TensorFlow', 'C++', 'Azure ML', 'MLflow', 'Docker'],
    roles: [
      { title: 'AI / ML Engineer', salary: '€80K – €110K' },
      { title: 'Data Scientist', salary: '€75K – €100K' },
      { title: 'Senior Data Engineer', salary: '€90K – €120K' },
    ],
    signal: 'Only company that manufactures EUV machines. Irreplaceable in the global chip supply chain.',
    color: '#9B5DE5',
  },
  {
    name: 'Adyen',
    city: 'Amsterdam', cityColor: '#00B4D8',
    sector: 'Fintech / Payments',
    focus: 'Real-time fraud detection processing billions of transactions, transaction ML, and LLM-assisted merchant analytics. Extremely high engineering bar with a flat, ownership-driven culture.',
    stack: ['Python', 'Java', 'Flink', 'Spark', 'Snowflake', 'Scikit-learn'],
    roles: [
      { title: 'Senior Data Engineer', salary: '€85K – €115K' },
      { title: 'ML Engineer (Fraud)', salary: '€90K – €120K' },
      { title: 'Staff Engineer', salary: '€120K – €150K' },
    ],
    signal: 'Processes €1 trillion in transactions annually. Public company, strong equity packages.',
    color: '#E8A020',
  },
  {
    name: 'Weaviate',
    city: 'Amsterdam', cityColor: '#00B4D8',
    sector: 'AI Infrastructure',
    focus: 'The team builds the vector database platform used by thousands of AI engineers globally. Deep technical work on indexing algorithms (HNSW), multimodal search, and distributed systems.',
    stack: ['Go', 'Python', 'GraphQL', 'gRPC', 'HNSW', 'Kubernetes'],
    roles: [
      { title: 'AI Engineer', salary: '€90K – €125K' },
      { title: 'Developer Advocate', salary: '€80K – €110K' },
      { title: 'Solutions Engineer', salary: '€85K – €115K' },
    ],
    signal: 'Dutch AI unicorn. 25M+ Docker pulls. $67M raised. Knowing Weaviate is a genuine differentiator in NL job applications.',
    color: '#2EC4B6',
  },
  {
    name: 'ING',
    city: 'Amsterdam', cityColor: '#00B4D8',
    sector: 'Banking',
    focus: 'AI-powered credit scoring, anti-money laundering detection at scale, RAG for regulatory Q&A, GenAI customer service automation. One of the most active ML banking teams in Europe.',
    stack: ['Python', 'Spark', 'dbt', 'Snowflake', 'Airflow', 'LangChain'],
    roles: [
      { title: 'Data Engineer', salary: '€65K – €85K' },
      { title: 'ML Engineer', salary: '€75K – €100K' },
      { title: 'AI Architect', salary: '€110K – €145K' },
    ],
    signal: 'One of the largest banks in Europe. Massive scale, clear career path, strong internal mobility.',
    color: '#F77F00',
  },
  {
    name: 'Philips',
    city: 'Eindhoven', cityColor: '#9B5DE5',
    sector: 'Health Technology',
    focus: 'Medical imaging AI, clinical decision support systems, federated learning for patient data privacy compliance. Meaningful work with direct impact on patient outcomes.',
    stack: ['Python', 'PyTorch', 'DICOM', 'Azure ML', 'ONNX', 'FastAPI'],
    roles: [
      { title: 'AI Research Scientist', salary: '€80K – €110K' },
      { title: 'ML Engineer (MedAI)', salary: '€85K – €115K' },
      { title: 'Senior Data Engineer', salary: '€80K – €105K' },
    ],
    signal: 'Global leader in medical AI. High-impact domain where accuracy is life-critical.',
    color: '#00B4D8',
  },
];

export default function CareerHub() {
  const [openQ, setOpenQ] = useState<string | null>(null);
  const [tab, setTab] = useState<'overview' | 'interview' | 'companies'>('overview');

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.3))' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(232,160,32,0.5)' }}>Netherlands</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.3), transparent)' }} />
        </div>
        <h2 className="font-display font-light text-5xl mb-3" style={{ color: '#F0EBE0', letterSpacing: '-0.02em' }}>
          Land Your <span className="italic text-gold-gradient">Data + AI Role</span>
        </h2>
        <p style={{ color: 'rgba(232,228,220,0.4)' }}>Market intelligence, salary benchmarks, and interview preparation for the Netherlands</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-10 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {([['overview','📊 Market'], ['interview','🎤 Interview Prep'], ['companies','🏢 Top Companies']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={tab === id
              ? { background: '#0D1F38', color: '#E8E4DC', border: '1px solid rgba(255,255,255,0.1)' }
              : { color: 'rgba(232,228,220,0.4)' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-8">
          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '15%', label: 'Annual sector growth', icon: '📈', color: '#2EC4B6' },
              { value: '257+', label: 'AI openings (Q1 2026)', icon: '💼', color: '#E8A020' },
              { value: '€55K – €160K', label: 'AI Engineer salary band', icon: '💶', color: '#9B5DE5' },
              { value: 'Top 3', label: 'EU tech hub ranking', icon: '🏆', color: '#00B4D8' },
            ].map(s => (
              <div key={s.label} className="p-5 rounded-2xl text-center"
                style={{ background: '#0D1F38', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-display text-xl font-bold mb-1 leading-tight" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: 'rgba(232,228,220,0.35)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Salary chart with company examples */}
          <div className="p-6 rounded-2xl" style={{ background: '#0D1F38', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: '#F0EBE0' }}>💶 Salary Benchmarks (Netherlands 2026)</h3>
            <p className="text-xs mb-6" style={{ color: 'rgba(232,228,220,0.3)' }}>Total cash compensation. Source: Glassdoor NL, LinkedIn Salary Insights, direct recruiter data.</p>
            <div className="space-y-6">
              {[
                {
                  role: 'Data Engineer',
                  range: '€55K – €80K',
                  bar: 38,
                  color: '#00B4D8',
                  companies: ['ING', 'bol.com', 'Coolblue', 'NXP'],
                },
                {
                  role: 'ML / AI Engineer',
                  range: '€70K – €100K',
                  bar: 56,
                  color: '#9B5DE5',
                  companies: ['TomTom', 'Philips', 'Booking.com', 'ASML'],
                },
                {
                  role: 'Senior AI Engineer',
                  range: '€90K – €130K',
                  bar: 76,
                  color: '#E8A020',
                  companies: ['Adyen', 'Weaviate', 'Uber NL', 'Shell'],
                },
                {
                  role: 'Staff / Principal / Lead AI',
                  range: '€120K – €160K+',
                  bar: 96,
                  color: '#E05A4E',
                  companies: ['Booking.com', 'Netflix NL', 'ASML', 'Adyen'],
                },
              ].map(item => (
                <div key={item.role}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: '#E8E4DC' }}>{item.role}</span>
                    <span className="text-sm font-mono font-semibold" style={{ color: item.color }}>{item.range}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full rounded-full progress-fill"
                      style={{ width: `${item.bar}%`, background: `linear-gradient(90deg, ${item.color}80, ${item.color})` }} />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.companies.map(c => (
                      <span key={c} className="text-xs px-2 py-0.5 rounded-full font-mono"
                        style={{ background: `${item.color}10`, color: `${item.color}BB`, border: `1px solid ${item.color}20` }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { city: 'Amsterdam', icon: '🏙️', color: '#00B4D8', desc: 'Tech and scale-up capital', companies: ['Booking.com', 'Adyen', 'TomTom', 'Uber', 'Netflix', 'Weaviate'] },
              { city: 'Eindhoven', icon: '🔬', color: '#9B5DE5', desc: 'Deep tech and industrial AI', companies: ['ASML', 'Philips', 'NXP', 'DAF', 'IMEC'] },
              { city: 'Rotterdam', icon: '🚢', color: '#E8A020', desc: 'Logistics, fintech and e-commerce', companies: ['ING', 'Coolblue', 'bol.com', 'Maersk', 'Shell'] },
            ].map(city => (
              <div key={city.city} className="p-5 rounded-2xl" style={{ background: '#0D1F38', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-3xl mb-3">{city.icon}</div>
                <h4 className="font-display text-xl font-semibold mb-1" style={{ color: city.color }}>{city.city}</h4>
                <p className="text-xs mb-4" style={{ color: 'rgba(232,228,220,0.4)' }}>{city.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {city.companies.map(c => (
                    <span key={c} className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: `${city.color}12`, color: city.color, border: `1px solid ${city.color}25` }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skills matrix */}
          <div className="p-6 rounded-2xl" style={{ background: '#0D1F38', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: '#F0EBE0' }}>🛠️ Skills That Get You Hired</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Data Engineer Stack', color: '#00B4D8', skills: [
                  { skill: 'Python', pct: 98 }, { skill: 'SQL / dbt', pct: 95 },
                  { skill: 'Apache Spark', pct: 82 }, { skill: 'Airflow / Prefect', pct: 78 },
                  { skill: 'Snowflake / BigQuery', pct: 75 }, { skill: 'Kafka (streaming)', pct: 65 },
                ]},
                { title: 'AI Engineer Stack', color: '#E8A020', skills: [
                  { skill: 'Python + PyTorch', pct: 95 }, { skill: 'LLM APIs (Claude/OpenAI)', pct: 90 },
                  { skill: 'LangChain / LangGraph', pct: 85 }, { skill: 'RAG systems', pct: 85 },
                  { skill: 'Vector DBs (Weaviate 🇳🇱)', pct: 80 }, { skill: 'MLflow / Evaluation', pct: 70 },
                ]},
              ].map(col => (
                <div key={col.title}>
                  <h4 className="font-semibold text-sm mb-4" style={{ color: col.color }}>{col.title}</h4>
                  {col.skills.map(s => (
                    <div key={s.skill} className="flex items-center gap-3 mb-3">
                      <span className="text-xs w-32 flex-shrink-0" style={{ color: 'rgba(232,228,220,0.55)' }}>{s.skill}</span>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: col.color }} />
                      </div>
                      <span className="text-xs font-mono w-7 text-right" style={{ color: 'rgba(232,228,220,0.25)' }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Where to find jobs */}
          <div className="p-6 rounded-2xl" style={{ background: '#0D1F38', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="font-display text-2xl font-semibold mb-5" style={{ color: '#F0EBE0' }}>🔍 Where to Find Jobs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'LinkedIn', desc: 'Primary platform. Most Dutch tech companies post here first and use it as an inbound signal.' },
                { name: 'TechLeap.nl', desc: 'Dutch startup and scale-up ecosystem jobs. Strong for growth-stage companies.' },
                { name: 'Glassdoor NL', desc: 'Salary benchmarks, interview reviews, and company culture insights before you apply.' },
              ].map(p => (
                <div key={p.name} className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="font-semibold text-sm mb-2" style={{ color: '#E8E4DC' }}>{p.name}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(232,228,220,0.35)' }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'interview' && (
        <div className="space-y-10">
          <p className="text-sm" style={{ color: 'rgba(232,228,220,0.4)' }}>
            Real questions from Dutch companies: Booking.com, ING, ASML, Adyen, bol.com. Expand each for a full model answer.
          </p>
          {interviewQAs.map(section => (
            <div key={section.category}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                  style={{ background: `${section.color}15`, border: `1px solid ${section.color}30` }}>
                  {section.icon}
                </div>
                <h3 className="font-display text-2xl font-semibold" style={{ color: '#F0EBE0' }}>{section.category}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full ml-auto"
                  style={{ background: `${section.color}10`, color: section.color }}>
                  {section.questions.length} Q
                </span>
              </div>
              <div className="space-y-2.5">
                {section.questions.map((qa, i) => {
                  const key = `${section.category}-${i}`;
                  const open = openQ === key;
                  return (
                    <div key={i} className="rounded-xl overflow-hidden transition-all"
                      style={{ background: '#0D1F38', border: `1px solid ${open ? section.color + '30' : 'rgba(255,255,255,0.07)'}` }}>
                      <button onClick={() => setOpenQ(open ? null : key)}
                        className="w-full text-left p-4 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{ background: `${section.color}20`, color: section.color }}>{i + 1}</span>
                        <span className="flex-1 text-sm font-medium" style={{ color: '#E8E4DC' }}>{qa.q}</span>
                        <span className="flex-shrink-0 text-xs mt-1" style={{ color: 'rgba(232,228,220,0.3)' }}>{open ? '▲' : '▼'}</span>
                      </button>
                      {open && (
                        <div className="px-5 pb-5 accordion-open">
                          <div className="ml-9 p-4 rounded-xl text-sm leading-relaxed"
                            style={{ background: `${section.color}08`, borderLeft: `2px solid ${section.color}50`, color: 'rgba(232,228,220,0.7)' }}>
                            {qa.a}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'companies' && (
        <div className="space-y-5">
          <p className="text-sm mb-8" style={{ color: 'rgba(232,228,220,0.4)' }}>
            Six companies actively hiring Data and AI engineers in the Netherlands. Role-level salary data, tech stacks, and what they are actually building.
          </p>
          {companies.map(co => (
            <div key={co.name} className="rounded-2xl overflow-hidden"
              style={{ background: '#0D1F38', border: `1px solid ${co.color}20` }}>
              {/* Top bar */}
              <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${co.color}, ${co.color}20)` }} />

              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-2xl font-semibold" style={{ color: '#F0EBE0' }}>{co.name}</h3>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: `${co.cityColor}15`, color: co.cityColor, border: `1px solid ${co.cityColor}25` }}>
                        📍 {co.city}
                      </span>
                    </div>
                    <div className="text-xs font-mono" style={{ color: 'rgba(232,228,220,0.3)' }}>{co.sector}</div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(232,228,220,0.55)' }}>{co.focus}</p>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Roles + salaries */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: 'rgba(232,228,220,0.3)' }}>Open Roles</div>
                    <div className="space-y-2">
                      {co.roles.map(r => (
                        <div key={r.title} className="flex items-center justify-between p-3 rounded-xl"
                          style={{ background: `${co.color}08`, border: `1px solid ${co.color}15` }}>
                          <span className="text-sm font-medium" style={{ color: 'rgba(232,228,220,0.8)' }}>{r.title}</span>
                          <span className="text-sm font-mono font-semibold ml-4 flex-shrink-0" style={{ color: co.color }}>{r.salary}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stack */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: 'rgba(232,228,220,0.3)' }}>Tech Stack</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {co.stack.map(s => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-lg font-mono"
                          style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(232,228,220,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                    {/* Signal */}
                    <div className="p-3 rounded-xl" style={{ background: `${co.color}08`, border: `1px solid ${co.color}15` }}>
                      <div className="text-xs font-semibold uppercase tracking-[0.1em] mb-1" style={{ color: co.color + '80' }}>Signal</div>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(232,228,220,0.55)' }}>{co.signal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
