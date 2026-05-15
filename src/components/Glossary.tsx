import { useState } from 'react';
import { glossaryTerms } from '../data/glossary';

const categoryColors: Record<string, string> = {
  'LLM Basics': '#F77F00', 'Vectors': '#9B5DE5', 'Architecture': '#00B4D8',
  'Training': '#2EC4B6', 'Retrieval': '#E8A020', 'Agents': '#2EC4B6',
  'Alignment': '#E05A4E', 'Techniques': '#00B4D8', 'Frameworks': '#9B5DE5',
};

const allCats = ['All', ...Array.from(new Set(glossaryTerms.map(t => t.category)))];

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = glossaryTerms.filter(t =>
    (cat === 'All' || t.category === cat) &&
    (!search || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.3))' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(232,160,32,0.5)' }}>Reference</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(232,160,32,0.3), transparent)' }} />
        </div>
        <h2 className="font-display font-light text-5xl mb-3" style={{ color: '#F0EBE0', letterSpacing: '-0.02em' }}>AI Glossary</h2>
        <p style={{ color: 'rgba(232,228,220,0.4)' }}>Every key term explained in plain language. No jargon.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(232,228,220,0.3)' }}>⌕</span>
        <input
          type="text"
          placeholder="Search terms or definitions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-3.5 rounded-xl outline-none text-sm transition-all"
          style={{
            background: '#0D1F38',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#E8E4DC',
          }}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: 'rgba(232,228,220,0.3)' }}>✕</button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCats.map(c => {
          const col = c === 'All' ? '#E8A020' : categoryColors[c] || '#E8A020';
          const active = cat === c;
          return (
            <button key={c} onClick={() => setCat(c)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
              style={active
                ? { background: `${col}20`, color: col, border: `1px solid ${col}40` }
                : { background: 'rgba(255,255,255,0.03)', color: 'rgba(232,228,220,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {c}{c !== 'All' && <span className="ml-1 opacity-50">{glossaryTerms.filter(t => t.category === c).length}</span>}
            </button>
          );
        })}
      </div>

      <p className="text-xs font-mono mb-6" style={{ color: 'rgba(232,228,220,0.2)' }}>{filtered.length} terms</p>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map(term => {
          const col = categoryColors[term.category] || '#E8A020';
          return (
            <div key={term.term} className="p-5 rounded-xl transition-all hover:border-opacity-30"
              style={{ background: '#0D1F38', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-display text-lg font-semibold" style={{ color: '#F0EBE0' }}>{term.term}</h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 mt-1"
                  style={{ background: `${col}12`, color: col, border: `1px solid ${col}25` }}>
                  {term.category}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,228,220,0.5)' }}>{term.definition}</p>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <div className="text-4xl mb-4">◎</div>
          <p className="text-sm" style={{ color: 'rgba(232,228,220,0.3)' }}>No terms found for "{search}"</p>
          <button onClick={() => { setSearch(''); setCat('All'); }}
            className="mt-3 text-sm" style={{ color: '#E8A020' }}>Clear filters</button>
        </div>
      )}
    </div>
  );
}
