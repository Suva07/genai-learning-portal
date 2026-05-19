import { useState, useEffect } from 'react';
import { modules } from '../data/modules';

interface ModulesProps {
  completedLessons: Set<string>;
  onComplete: (lessonId: string) => void;
  jumpTo?: { module: string; lesson: string } | null;
  onJumpComplete?: () => void;
}

const MOD_COLORS = ['#00B4D8', '#F77F00', '#9B5DE5', '#E8A020', '#2EC4B6', '#E05A4E'];
const MOD_LEVELS = ['Beginner', 'Beginner', 'Intermediate', 'Intermediate', 'Advanced', 'Advanced'];

function renderContent(text: string): string {
  return text
    // Triple-tilde code blocks (avoids backtick conflicts in TS template literals)
    .replace(/~~~(\w*)\n([\s\S]*?)~~~/g, (_match, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre class="code-block" data-lang="${lang || 'python'}"><code>${escaped.trimEnd()}</code></pre>`;
    })
    .replace(/^---$/gm, '<hr/>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Blockquotes → teal scenario callout boxes
    .replace(/^> (.+)$/gm, '<div class="scenario-box"><span>$1</span></div>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\| (.+) \|$/gm, (line) => {
      const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim());
      return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>[\s\S]*?<\/tr>\n?)+/g, (tableBody) => {
      const rows = tableBody.trim().split('\n').filter(r => r.includes('<tr>'));
      if (rows.length < 2) return tableBody;
      const header = rows[0].replace(/<td/g, '<th').replace(/<\/td>/g, '</th>');
      const body = rows.slice(2).join('');
      return `<div style="overflow-x:auto;margin:1rem 0"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
    })
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (items) => `<ul>${items}</ul>`)
    .replace(/\n\n([^<])/g, '</p><p>$1')
    .replace(/^([^<\n][^\n]+)$/gm, (m) => m.startsWith('<') ? m : `<p>${m}</p>`);
}

// SVG Diagrams
const RAGDiagram = ({ color }: { color: string }) => (
  <svg viewBox="0 0 640 160" className="w-full my-6 rounded-xl" style={{ maxHeight: 180 }}>
    <defs>
      <linearGradient id="ragGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={color} stopOpacity="0.8"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.3"/>
      </linearGradient>
    </defs>
    <rect width="640" height="160" fill="#0A1628" rx="12"/>
    {/* Boxes */}
    {[
      { x: 20, label: '📄 Documents', sub: 'PDFs, DBs, APIs' },
      { x: 175, label: '⚡ Embed & Index', sub: 'Vector DB' },
      { x: 330, label: '🔍 Retrieve', sub: 'Top-K chunks' },
      { x: 485, label: '🤖 Generate', sub: 'LLM answer' },
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={30} width={135} height={70} rx="8" fill={`${color}12`} stroke={`${color}40`} strokeWidth="1"/>
        <text x={b.x + 67} y={63} textAnchor="middle" fill={color} fontSize="13" fontWeight="600">{b.label}</text>
        <text x={b.x + 67} y={82} textAnchor="middle" fill="rgba(232,228,220,0.4)" fontSize="10">{b.sub}</text>
      </g>
    ))}
    {/* Arrows */}
    {[155, 310, 465].map((x, i) => (
      <g key={i}>
        <line x1={x} y1={65} x2={x + 17} y2={65} stroke={`${color}60`} strokeWidth="1.5" strokeDasharray="3,2"/>
        <polygon points={`${x+17},61 ${x+20},65 ${x+17},69`} fill={`${color}80`}/>
      </g>
    ))}
    {/* Labels */}
    {[
      { x: 97, label: 'Offline Indexing', color: 'rgba(232,228,220,0.3)' },
      { x: 407, label: 'Query Time', color: 'rgba(232,228,220,0.3)' },
    ].map((l, i) => (
      <text key={i} x={l.x} y={130} textAnchor="middle" fill={l.color} fontSize="9" letterSpacing="0.1em">
        {l.label}
      </text>
    ))}
    <line x1={157} y1={118} x2={157} y2={125} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,2"/>
  </svg>
);

const AgentLoopDiagram = ({ color }: { color: string }) => (
  <svg viewBox="0 0 320 300" className="mx-auto my-6 rounded-xl" style={{ maxWidth: 300, display: 'block' }}>
    <rect width="320" height="300" fill="#0A1628" rx="12"/>
    {[
      { x: 160, y: 55, label: 'Perceive', icon: '👁', angle: 0 },
      { x: 265, y: 150, label: 'Plan', icon: '🧠', angle: 90 },
      { x: 160, y: 245, label: 'Act', icon: '⚡', angle: 180 },
      { x: 55, y: 150, label: 'Observe', icon: '📊', angle: 270 },
    ].map((node, i) => (
      <g key={i}>
        <circle cx={node.x} cy={node.y} r={30} fill={`${color}15`} stroke={`${color}50`} strokeWidth="1.5"/>
        <text x={node.x} y={node.y - 7} textAnchor="middle" fontSize="16">{node.icon}</text>
        <text x={node.x} y={node.y + 11} textAnchor="middle" fill={color} fontSize="10" fontWeight="600">{node.label}</text>
      </g>
    ))}
    {/* Curved arrows between nodes */}
    <path d="M 182 75 Q 240 110 245 130" stroke={`${color}50`} strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
    <path d="M 245 170 Q 240 210 185 230" stroke={`${color}50`} strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
    <path d="M 135 230 Q 80 210 75 170" stroke={`${color}50`} strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
    <path d="M 75 130 Q 80 90 138 72" stroke={`${color}50`} strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
    {/* Center label */}
    <circle cx={160} cy={150} r={28} fill={`${color}08`} stroke={`${color}20`} strokeWidth="1"/>
    <text x={160} y={147} textAnchor="middle" fill="rgba(232,228,220,0.6)" fontSize="10">ReAct</text>
    <text x={160} y={160} textAnchor="middle" fill="rgba(232,228,220,0.4)" fontSize="9">Loop</text>
  </svg>
);

const EmbeddingDiagram = (_: { color: string }) => (
  <svg viewBox="0 0 480 180" className="w-full my-6 rounded-xl" style={{ maxHeight: 200 }}>
    <rect width="480" height="180" fill="#0A1628" rx="12"/>
    {/* Word dots in 2D space */}
    {[
      { x: 80, y: 60, word: 'King', group: 0 },
      { x: 120, y: 80, word: 'Queen', group: 0 },
      { x: 100, y: 100, word: 'Prince', group: 0 },
      { x: 220, y: 50, word: 'Paris', group: 1 },
      { x: 260, y: 70, word: 'London', group: 1 },
      { x: 240, y: 90, word: 'Berlin', group: 1 },
      { x: 380, y: 100, word: 'Python', group: 2 },
      { x: 420, y: 80, word: 'Rust', group: 2 },
      { x: 400, y: 120, word: 'Go', group: 2 },
    ].map((d, i) => {
      const cols = ['#F77F00', '#9B5DE5', '#2EC4B6'];
      return (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r="5" fill={cols[d.group]} opacity="0.8"/>
          <text x={d.x + 8} y={d.y + 4} fill="rgba(232,228,220,0.5)" fontSize="9">{d.word}</text>
        </g>
      );
    })}
    {/* Cluster circles */}
    <circle cx={100} cy={80} r={42} fill="none" stroke="rgba(247,127,0,0.2)" strokeWidth="1" strokeDasharray="4,3"/>
    <circle cx={240} cy={70} r={44} fill="none" stroke="rgba(155,93,229,0.2)" strokeWidth="1" strokeDasharray="4,3"/>
    <circle cx={400} cy={100} r={38} fill="none" stroke="rgba(46,196,182,0.2)" strokeWidth="1" strokeDasharray="4,3"/>
    {/* Labels */}
    <text x={100} y={138} textAnchor="middle" fill="rgba(247,127,0,0.5)" fontSize="9">Royalty</text>
    <text x={240} y={128} textAnchor="middle" fill="rgba(155,93,229,0.5)" fontSize="9">Capitals</text>
    <text x={400} y={150} textAnchor="middle" fill="rgba(46,196,182,0.5)" fontSize="9">Languages</text>
    <text x={240} y={168} textAnchor="middle" fill="rgba(232,228,220,0.2)" fontSize="8">Similar concepts cluster together in embedding space</text>
  </svg>
);

const RLHFDiagram = ({ color }: { color: string }) => (
  <svg viewBox="0 0 600 140" className="w-full my-6 rounded-xl" style={{ maxHeight: 160 }}>
    <rect width="600" height="140" fill="#0A1628" rx="12"/>
    {[
      { x: 30, label: '1. Pre-trained LLM', icon: '🧠', sub: 'Base model' },
      { x: 170, label: '2. SFT', icon: '📝', sub: 'Human demos' },
      { x: 310, label: '3. Reward Model', icon: '⭐', sub: 'Human prefs' },
      { x: 450, label: '4. PPO / DPO', icon: '🎯', sub: 'Aligned model' },
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={25} width={120} height={70} rx="8" fill={`${color}10`} stroke={`${color}35`} strokeWidth="1"/>
        <text x={b.x + 60} y={55} textAnchor="middle" fontSize="16">{b.icon}</text>
        <text x={b.x + 60} y={72} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="600">{b.label}</text>
        <text x={b.x + 60} y={86} textAnchor="middle" fill="rgba(232,228,220,0.35)" fontSize="8.5">{b.sub}</text>
      </g>
    ))}
    {[152, 292, 432].map((x, i) => (
      <g key={i}>
        <line x1={x} y1={60} x2={x+15} y2={60} stroke={`${color}50`} strokeWidth="1.5"/>
        <polygon points={`${x+15},56 ${x+18},60 ${x+15},64`} fill={`${color}70`}/>
      </g>
    ))}
    <text x={300} y={128} textAnchor="middle" fill="rgba(232,228,220,0.2)" fontSize="8">Reinforcement Learning from Human Feedback</text>
  </svg>
);

const NeuralNetDiagram = ({ color }: { color: string }) => {
  const layers = [
    { nodes: [60, 110, 160], label: 'Input', sublabel: 'Raw features' },
    { nodes: [40, 83, 127, 170], label: 'Hidden 1', sublabel: '64 neurons' },
    { nodes: [40, 83, 127, 170], label: 'Hidden 2', sublabel: '32 neurons' },
    { nodes: [85, 135], label: 'Output', sublabel: 'Prediction' },
  ];
  const xs = [60, 190, 330, 460];
  return (
    <svg viewBox="0 0 560 230" className="w-full my-6 rounded-xl" style={{ maxHeight: 240 }}>
      <rect width="560" height="230" fill="#0A1628" rx="12"/>
      {/* Connections */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.nodes.flatMap((y1) =>
          layers[li + 1].nodes.map((y2, ni) => (
            <line key={`${li}-${y1}-${ni}`} x1={xs[li] + 18} y1={y1} x2={xs[li+1] - 18} y2={y2}
              stroke={`${color}18`} strokeWidth="1"/>
          ))
        )
      )}
      {/* Highlighted path */}
      {[[xs[0]+18, 110], [xs[1]-18, 83], [xs[2]-18, 127], [xs[3]-18, 85]].map(([x, y], i, arr) =>
        i < arr.length - 1 ? (
          <line key={`h${i}`} x1={x} y1={y} x2={arr[i+1][0]} y2={arr[i+1][1]}
            stroke={color} strokeWidth="2" opacity="0.6"/>
        ) : null
      )}
      {/* Nodes */}
      {layers.map((layer, li) =>
        layer.nodes.map((y, ni) => (
          <circle key={`${li}-${ni}`} cx={xs[li]} cy={y} r={18}
            fill={`${color}18`} stroke={`${color}50`} strokeWidth="1.5"/>
        ))
      )}
      {/* Layer labels */}
      {layers.map((layer, li) => (
        <g key={li}>
          <text x={xs[li]} y={198} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="600">{layer.label}</text>
          <text x={xs[li]} y={212} textAnchor="middle" fill="rgba(232,228,220,0.3)" fontSize="8">{layer.sublabel}</text>
        </g>
      ))}
      <text x={280} y={222} textAnchor="middle" fill="rgba(232,228,220,0.2)" fontSize="8">Weights on each connection adjust during training via backpropagation</text>
    </svg>
  );
};

const TransformerAttentionDiagram = ({ color }: { color: string }) => {
  const words = ['The', 'bank', 'by', 'the', 'river', 'was', 'flooded'];
  const attentions = [0.03, 0.85, 0.05, 0.02, 0.72, 0.15, 0.55]; // attention from "bank" to each word
  const xStart = 30;
  const xStep = 74;
  return (
    <svg viewBox="0 0 570 180" className="w-full my-6 rounded-xl" style={{ maxHeight: 190 }}>
      <rect width="570" height="180" fill="#0A1628" rx="12"/>
      <text x={285} y={22} textAnchor="middle" fill="rgba(232,228,220,0.4)" fontSize="10" letterSpacing="0.08em">SELF-ATTENTION: how much does "bank" attend to each word?</text>
      {words.map((w, i) => {
        const x = xStart + i * xStep;
        const isBank = i === 1;
        const isTarget = i === 1 || i === 4; // bank + river
        return (
          <g key={i}>
            {/* Attention bar */}
            <rect x={x - 22} y={55} width={44} height={Math.max(3, attentions[i] * 50)} rx="3"
              fill={isTarget ? color : `${color}40`} opacity="0.8"/>
            {/* Word box */}
            <rect x={x - 24} y={120} width={48} height={24} rx="5"
              fill={isBank ? `${color}30` : `${color}0A`} stroke={isBank ? color : `${color}30`} strokeWidth={isBank ? 1.5 : 1}/>
            <text x={x} y={136} textAnchor="middle" fill={isBank ? color : 'rgba(232,228,220,0.6)'} fontSize="10.5" fontWeight={isBank ? '700' : '400'}>{w}</text>
            {/* Score label */}
            {attentions[i] > 0.1 && (
              <text x={x} y={50} textAnchor="middle" fill={color} fontSize="9" fontWeight="600">{(attentions[i]*100).toFixed(0)}%</text>
            )}
          </g>
        );
      })}
      <text x={285} y={168} textAnchor="middle" fill="rgba(232,228,220,0.25)" fontSize="8.5">"bank" strongly attends to "river" and itself — disambiguating river bank vs financial bank</text>
    </svg>
  );
};

const TokenizationDiagram = ({ color }: { color: string }) => {
  const tokens = [
    { text: 'un', id: 4309 },
    { text: 'believ', id: 9107 },
    { text: 'able', id: 540 },
  ];
  const nextProbs = [
    { word: 'performance', pct: 34 },
    { word: 'results', pct: 22 },
    { word: 'accuracy', pct: 18 },
    { word: 'outcome', pct: 14 },
  ];
  return (
    <svg viewBox="0 0 580 170" className="w-full my-6 rounded-xl" style={{ maxHeight: 185 }}>
      <rect width="580" height="170" fill="#0A1628" rx="12"/>
      {/* Raw text */}
      <rect x={16} y={28} width={130} height={40} rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <text x={81} y={47} textAnchor="middle" fill="rgba(232,228,220,0.7)" fontSize="13" fontFamily="monospace">"unbelievable"</text>
      <text x={81} y={62} textAnchor="middle" fill="rgba(232,228,220,0.3)" fontSize="9">raw text</text>
      {/* Arrow */}
      <line x1={148} y1={48} x2={168} y2={48} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
      <polygon points="168,44 172,48 168,52" fill="rgba(255,255,255,0.3)"/>
      {/* Tokens */}
      {tokens.map((t, i) => (
        <g key={i}>
          <rect x={178 + i*68} y={28} width={58} height={40} rx="6" fill={`${color}18`} stroke={`${color}45`} strokeWidth="1.5"/>
          <text x={207 + i*68} y={47} textAnchor="middle" fill={color} fontSize="13" fontWeight="600" fontFamily="monospace">"{t.text}"</text>
          <text x={207 + i*68} y={62} textAnchor="middle" fill="rgba(232,228,220,0.3)" fontSize="8">id: {t.id}</text>
        </g>
      ))}
      {/* Arrow */}
      <line x1={390} y1={48} x2={410} y2={48} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
      <polygon points="410,44 414,48 410,52" fill="rgba(255,255,255,0.3)"/>
      {/* Next token probs */}
      <text x={500} y={22} textAnchor="middle" fill="rgba(232,228,220,0.4)" fontSize="9">Next token probabilities</text>
      {nextProbs.map((p, i) => (
        <g key={i}>
          <rect x={420} y={28 + i * 28} width={p.pct * 2.5} height={19} rx="4" fill={`${color}30`}/>
          <text x={425} y={41 + i * 28} fill="rgba(232,228,220,0.6)" fontSize="9">{p.word}</text>
          <text x={555} y={41 + i * 28} textAnchor="end" fill={color} fontSize="9" fontWeight="600">{p.pct}%</text>
        </g>
      ))}
      <text x={290} y={155} textAnchor="middle" fill="rgba(232,228,220,0.2)" fontSize="8">Text → tokens → IDs → embeddings → probability distribution over next token</text>
    </svg>
  );
};

const MLHierarchyDiagram = ({ color }: { color: string }) => (
  <svg viewBox="0 0 440 210" className="w-full my-6 rounded-xl" style={{ maxHeight: 220 }}>
    <rect width="440" height="210" fill="#0A1628" rx="12"/>
    {[
      { rx: 200, ry: 90, label: 'Artificial Intelligence', sub: 'All approaches to machine intelligence', col: 'rgba(100,180,255,0.15)', stroke: 'rgba(100,180,255,0.3)', tc: 'rgba(100,180,255,0.7)', ty: 32 },
      { rx: 158, ry: 72, label: 'Machine Learning', sub: 'Learns from data', col: 'rgba(155,93,229,0.12)', stroke: 'rgba(155,93,229,0.35)', tc: 'rgba(155,93,229,0.8)', ty: 52 },
      { rx: 112, ry: 52, label: 'Deep Learning', sub: 'Neural networks', col: 'rgba(232,160,32,0.12)', stroke: 'rgba(232,160,32,0.35)', tc: 'rgba(232,160,32,0.8)', ty: 72 },
      { rx: 64, ry: 32, label: 'Generative AI', sub: 'Creates new content', col: `${color}20`, stroke: `${color}60`, tc: color, ty: 92 },
    ].map((ring, i) => (
      <g key={i}>
        <ellipse cx={220} cy={110} rx={ring.rx} ry={ring.ry} fill={ring.col} stroke={ring.stroke} strokeWidth="1.5"/>
        <text x={220} y={ring.ty} textAnchor="middle" fill={ring.tc} fontSize="10.5" fontWeight="600">{ring.label}</text>
        <text x={220} y={ring.ty + 13} textAnchor="middle" fill="rgba(232,228,220,0.3)" fontSize="8.5">{ring.sub}</text>
      </g>
    ))}
  </svg>
);

const VectorSearchDiagram = ({ color }: { color: string }) => {
  const points = [
    { x: 80, y: 70, label: 'cat food', g: 0 }, { x: 110, y: 90, label: 'pet care', g: 0 }, { x: 95, y: 120, label: 'kitten', g: 0 },
    { x: 220, y: 60, label: 'Paris', g: 1 }, { x: 255, y: 80, label: 'London', g: 1 }, { x: 240, y: 110, label: 'Berlin', g: 1 },
    { x: 370, y: 80, label: 'Python', g: 2 }, { x: 400, y: 110, label: 'Rust', g: 2 }, { x: 355, y: 120, label: 'Go', g: 2 },
    { x: 90, y: 160, label: 'dog food', g: 0 }, { x: 310, y: 150, label: 'Madrid', g: 1 },
  ];
  const query = { x: 103, y: 100 };
  const nearest = [{ x: 80, y: 70 }, { x: 95, y: 120 }, { x: 90, y: 160 }];
  const colors = ['#F77F00', '#9B5DE5', '#2EC4B6'];
  return (
    <svg viewBox="0 0 480 200" className="w-full my-6 rounded-xl" style={{ maxHeight: 210 }}>
      <rect width="480" height="200" fill="#0A1628" rx="12"/>
      {/* Search radius */}
      <circle cx={query.x} cy={query.y} r={72} fill="none" stroke={`${color}20`} strokeWidth="1.5" strokeDasharray="4,3"/>
      {/* Nearest neighbor lines */}
      {nearest.map((n, i) => (
        <line key={i} x1={query.x} y1={query.y} x2={n.x} y2={n.y} stroke={`${color}50`} strokeWidth="1.5" strokeDasharray="3,2"/>
      ))}
      {/* Regular points */}
      {points.map((p, i) => {
        const isNearest = nearest.some(n => Math.abs(n.x - p.x) < 2 && Math.abs(n.y - p.y) < 2);
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={isNearest ? 7 : 5} fill={isNearest ? colors[p.g] : `${colors[p.g]}60`}
              stroke={isNearest ? colors[p.g] : 'none'} strokeWidth="1.5"/>
            <text x={p.x + 9} y={p.y + 4} fill="rgba(232,228,220,0.4)" fontSize="8.5">{p.label}</text>
          </g>
        );
      })}
      {/* Query point */}
      <circle cx={query.x} cy={query.y} r={9} fill={color} stroke="white" strokeWidth="1.5"/>
      <text x={query.x - 5} y={query.y + 4} fill="#060D1A" fontSize="9" fontWeight="700">Q</text>
      <text x={query.x + 14} y={query.y - 12} fill={color} fontSize="9" fontWeight="600">Query: "feline pets"</text>
      {/* Legend */}
      <text x={340} y={30} fill="rgba(232,228,220,0.35)" fontSize="8.5">Embedding clusters:</text>
      {[['Pets/Animals', '#F77F00'], ['Cities', '#9B5DE5'], ['Languages', '#2EC4B6']].map(([lbl, col], i) => (
        <g key={i}>
          <circle cx={348} cy={44 + i * 15} r={4} fill={col as string}/>
          <text x={356} y={48 + i * 15} fill="rgba(232,228,220,0.4)" fontSize="8.5">{lbl}</text>
        </g>
      ))}
      <text x={240} y={188} textAnchor="middle" fill="rgba(232,228,220,0.2)" fontSize="8">Query "feline pets" lands near cat/dog content — semantic search finds meaning, not keywords</text>
    </svg>
  );
};

export default function Modules({ completedLessons, onComplete, jumpTo, onJumpComplete }: ModulesProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  useEffect(() => {
    if (jumpTo) {
      setActiveModule(jumpTo.module);
      setActiveLesson(jumpTo.lesson);
      onJumpComplete?.();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [jumpTo]);

  if (activeLesson && activeModule) {
    const modIdx = modules.findIndex(m => m.id === activeModule);
    const mod = modules[modIdx];
    const lesson = mod?.lessons.find(l => l.id === activeLesson);
    if (!lesson || !mod) return null;
    const color = MOD_COLORS[modIdx];
    const isDone = completedLessons.has(lesson.id);
    const lessonIdx = mod.lessons.findIndex(l => l.id === activeLesson);

    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={() => setActiveLesson(null)}
          className="flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(232,228,220,0.4)' }}>
          ← {mod.title}
        </button>

        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-[0.15em] mb-3" style={{ color: color + 'AA' }}>
            Module {mod.number} · {mod.title}
          </div>
          <h1 className="font-display font-light text-4xl md:text-5xl mb-4" style={{ color: '#F0EBE0', letterSpacing: '-0.02em' }}>
            {lesson.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono" style={{ color: 'rgba(232,228,220,0.3)' }}>⏱ {lesson.duration}</span>
            {isDone && (
              <span className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>✓ Completed</span>
            )}
          </div>
        </div>

        {/* Inline diagrams for specific lessons */}
        {activeLesson === 'ml-vs-dl-vs-genai' && <MLHierarchyDiagram color={color} />}
        {activeLesson === 'neural-networks' && <NeuralNetDiagram color={color} />}
        {activeLesson === 'what-is-generative' && <TokenizationDiagram color={color} />}
        {activeLesson === 'transformers' && <TransformerAttentionDiagram color={color} />}
        {activeLesson === 'what-are-embeddings' && <EmbeddingDiagram color={color} />}
        {activeLesson === 'vector-databases' && <VectorSearchDiagram color={color} />}
        {activeLesson === 'rag-architecture' && <RAGDiagram color={color} />}
        {activeLesson === 'what-are-agents' && <AgentLoopDiagram color={color} />}
        {activeLesson === 'rlhf-rlaif' && <RLHFDiagram color={color} />}

        <div className="lesson-body rounded-2xl p-6 md:p-8"
          style={{ background: '#0D1F38', border: '1px solid rgba(255,255,255,0.07)' }}
          dangerouslySetInnerHTML={{ __html: renderContent(lesson.content) }}
        />

        <div className="mt-8 flex gap-3 flex-wrap">
          {!isDone && (
            <button onClick={() => onComplete(lesson.id)}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}BB)`, color: '#060D1A' }}>
              ✓ Mark Complete
            </button>
          )}
          {lessonIdx < mod.lessons.length - 1 && (
            <button onClick={() => setActiveLesson(mod.lessons[lessonIdx + 1].id)}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,228,220,0.7)' }}>
              Next Lesson →
            </button>
          )}
        </div>

        {/* Lab notebook link */}
        <div className="mt-6 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ background: 'rgba(46,196,182,0.05)', border: '1px solid rgba(46,196,182,0.15)' }}>
          <div className="flex-1">
            <div className="text-sm font-semibold mb-0.5" style={{ color: '#2EC4B6' }}>🧪 Hands-on Lab</div>
            <div className="text-xs" style={{ color: 'rgba(232,228,220,0.45)' }}>
              Run the companion notebook for this module in Databricks Free Edition or Google Colab.
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a href={`https://colab.research.google.com/github/Suva07/genai-learning-portal/blob/main/notebooks/0${modIdx + 1}-${mod.id}.ipynb`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 flex items-center gap-1.5"
              style={{ background: 'rgba(255,160,0,0.12)', color: '#F5A623', border: '1px solid rgba(255,160,0,0.2)' }}>
              ▶ Open in Colab
            </a>
            <a href={`https://raw.githubusercontent.com/Suva07/genai-learning-portal/main/notebooks/0${modIdx + 1}-${mod.id}.ipynb`}
              download
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 flex items-center gap-1.5"
              style={{ background: 'rgba(46,196,182,0.1)', color: '#2EC4B6', border: '1px solid rgba(46,196,182,0.2)' }}>
              ↓ Download .ipynb
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule) {
    const modIdx = modules.findIndex(m => m.id === activeModule);
    const mod = modules[modIdx];
    if (!mod) return null;
    const color = MOD_COLORS[modIdx];
    const doneCount = mod.lessons.filter(l => completedLessons.has(l.id)).length;
    const pct = Math.round((doneCount / mod.lessons.length) * 100);

    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={() => setActiveModule(null)}
          className="flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(232,228,220,0.4)' }}>
          ← All Modules
        </button>

        {/* Module header */}
        <div className="p-6 rounded-2xl mb-8 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${color}18, ${color}08)`, border: `1px solid ${color}25` }}>
          <div className="aurora-blob" style={{ width: 300, height: 300, top: '-60%', right: '-20%', background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`, animationDelay: '-2s' }} />
          <div className="relative z-10">
            <div className="text-5xl mb-3">{mod.icon}</div>
            <div className="text-xs font-mono uppercase tracking-[0.15em] mb-1" style={{ color: color + '80' }}>Module {mod.number}</div>
            <h1 className="font-display text-3xl font-semibold mb-2" style={{ color: '#F0EBE0' }}>{mod.title}</h1>
            <p className="text-sm mb-4" style={{ color: 'rgba(232,228,220,0.5)' }}>{mod.subtitle}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                {MOD_LEVELS[modIdx]}
              </span>
              <span className="text-sm font-mono" style={{ color: 'rgba(232,228,220,0.35)' }}>{doneCount}/{mod.lessons.length} done</span>
            </div>
            <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div className="h-full rounded-full progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}BB)` }} />
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-3">
          {mod.lessons.map((lesson, i) => {
            const isDone = completedLessons.has(lesson.id);
            return (
              <button key={lesson.id} onClick={() => setActiveLesson(lesson.id)}
                className="w-full text-left p-4 rounded-xl transition-all hover:scale-[1.01] flex gap-4 items-center group"
                style={{ background: isDone ? `${color}0A` : 'rgba(255,255,255,0.02)', border: `1px solid ${isDone ? color + '25' : 'rgba(255,255,255,0.06)'}` }}>
                <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center font-mono text-sm transition-all"
                  style={{ background: isDone ? color : 'rgba(255,255,255,0.04)', color: isDone ? '#060D1A' : color }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm" style={{ color: '#E8E4DC' }}>{lesson.title}</div>
                  <div className="text-xs mt-0.5 font-mono" style={{ color: 'rgba(232,228,220,0.3)' }}>⏱ {lesson.duration}</div>
                </div>
                <span className="text-xs" style={{ color: 'rgba(232,228,220,0.2)' }}>→</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Module grid
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.3))' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(232,160,32,0.5)' }}>Curriculum</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.3), transparent)' }} />
        </div>
        <h2 className="font-display font-light text-5xl mb-3" style={{ color: '#F0EBE0', letterSpacing: '-0.02em' }}>Course Modules</h2>
        <p style={{ color: 'rgba(232,228,220,0.4)' }}>Six deep modules · From first principles to production systems</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((mod, modIdx) => {
          const color = MOD_COLORS[modIdx];
          const doneCount = mod.lessons.filter(l => completedLessons.has(l.id)).length;
          const pct = Math.round((doneCount / mod.lessons.length) * 100);
          const totalMins = mod.lessons.reduce((a, l) => a + parseInt(l.duration), 0);

          return (
            <button key={mod.id} onClick={() => setActiveModule(mod.id)}
              className="module-card text-left p-0 group"
              style={{ '--card-color': color } as React.CSSProperties}>
              <style>{`.module-card:hover::before { background: linear-gradient(90deg, ${color}, ${color}50); }`}</style>

              {/* Color bar */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}30)` }} />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="font-mono text-xs mb-2" style={{ color: color + '80', letterSpacing: '0.1em' }}>MODULE {String(mod.number).padStart(2, '0')}</div>
                    <div className="text-4xl">{mod.icon}</div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full mt-1"
                    style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
                    {MOD_LEVELS[modIdx]}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: '#F0EBE0' }}>{mod.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(232,228,220,0.4)' }}>{mod.subtitle}</p>

                {/* Lessons preview */}
                <div className="space-y-1.5 mb-5">
                  {mod.lessons.slice(0, 3).map(l => (
                    <div key={l.id} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(232,228,220,0.35)' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: completedLessons.has(l.id) ? color : 'rgba(255,255,255,0.15)' }} />
                      {l.title}
                    </div>
                  ))}
                  {mod.lessons.length > 3 && (
                    <div className="text-xs" style={{ color: 'rgba(232,228,220,0.2)' }}>+{mod.lessons.length - 3} more</div>
                  )}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: 'rgba(232,228,220,0.3)' }}>
                    <span>{doneCount}/{mod.lessons.length} lessons</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full progress-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono" style={{ color: 'rgba(232,228,220,0.25)' }}>{totalMins} min</span>
                  <span className="text-sm font-medium transition-all group-hover:translate-x-1" style={{ color }}>Open →</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
