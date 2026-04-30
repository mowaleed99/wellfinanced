import { useState } from 'react';

export default function History() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showTip, setShowTip] = useState(true);

  const filters = [
    { id: 'all', label: 'All Types', icon: 'filter_alt', color: 'text-white' },
    { id: 'income', label: 'Income', icon: 'trending_up', color: 'text-[#4ADE80]' },
    { id: 'expense', label: 'Expense', icon: 'trending_down', color: 'text-[#FCA5A5]' },
  ];

  return (
    <div className="px-container-padding pb-10 pt-6 bg-[#11131C] min-h-full">

      {/* Search Input */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-slate-500 text-[20px]">search</span>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions, clients, or tags..."
          className="w-full bg-[#1A1C29] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]/40 transition-colors"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-8">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full flex items-center gap-1.5 text-[13px] font-bold transition-all ${
              activeFilter === f.id
                ? 'bg-[#3B82F6] text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                : 'border border-white/10 bg-[#1A1C29] text-slate-300 hover:bg-white/5'
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] ${activeFilter === f.id ? 'text-white' : f.color}`}>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-center mb-5 px-1">
        <h2 className="text-[20px] font-bold text-white">Recent Activity</h2>
        <span className="text-[11px] text-slate-500 font-medium">Showing 0 results</span>
      </div>

      {/* Empty State */}
      <div className="rounded-[20px] p-8 bg-[#1A1C29] border border-white/5 flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#11131C] flex items-center justify-center mb-5 border border-white/5">
          <span className="material-symbols-outlined text-slate-500 text-[32px]">manage_search</span>
        </div>
        <h3 className="text-[20px] font-bold text-white mb-2">No transactions found</h3>
        <p className="text-[13px] text-slate-400 leading-relaxed max-w-[240px] mb-6">
          We couldn't find any data matching your current filters. Try adjusting the date range or search terms.
        </p>
        <button
          onClick={() => { setSearch(''); setActiveFilter('all'); }}
          className="px-5 py-2.5 rounded-xl bg-[#11131C] border border-white/10 text-[13px] font-bold text-slate-300 hover:bg-white/5 transition-colors active:scale-95"
        >
          Clear All Filters
        </button>
      </div>

      {/* AI Smart Search Tips */}
      {showTip && (
        <div className="rounded-[20px] p-6 relative bg-gradient-to-br from-[#1E1B4B] to-[#312E81] border border-[#4F46E5]/30 shadow-[0_8px_30px_rgba(49,46,129,0.4)] flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#4F46E5]/30 flex items-center justify-center mb-4 border border-[#6366F1]/30">
            <span className="material-symbols-outlined text-[#A5B4FC] text-[24px]" style={{fontVariationSettings:"'FILL' 1"}}>psychology</span>
          </div>
          <h3 className="text-[18px] font-bold text-white mb-2">AI Smart Search Tips</h3>
          <p className="text-[13px] text-[#A5B4FC] leading-relaxed max-w-[260px]">
            You can type natural language like <span className="text-white font-semibold">"high value incomes from last quarter"</span> to find specific datasets faster.
          </p>
          <button
            onClick={() => setShowTip(false)}
            className="mt-5 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
