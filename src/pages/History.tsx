import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { Record } from '../types/records';
import { EmptyState } from '../components/EmptyState';
import { ListSkeleton } from '../components/Skeleton';

export default function History() {
  const { records, linkedAccounts, counterparties, isLoading, error } = useFinance();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterAccountId = queryParams.get('accountId');
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showTip, setShowTip] = useState(true);

  const filters = [
    { id: 'all', label: 'All Types', icon: 'filter_alt', color: 'text-white' },
    { id: 'inflow', label: 'Income', icon: 'trending_up', color: 'text-[#4ADE80]' },
    { id: 'outflow', label: 'Expense', icon: 'trending_down', color: 'text-[#FCA5A5]' },
    { id: 'transfer', label: 'Transfer', icon: 'swap_horiz', color: 'text-blue-400' },
  ];

  const filteredRecords = records.filter((r) => {
    // 1. Account deep-link filter
    if (filterAccountId) {
      if (r.to_account_id !== filterAccountId && r.from_account_id !== filterAccountId) {
        return false;
      }
    }

    // 2. Type filter
    if (activeFilter !== 'all' && r.direction !== activeFilter) return false;

    // 3. Search query filter
    if (search) {
      const q = search.toLowerCase();
      let title = '';
      if (r.direction === 'transfer') {
         title = r.title.toLowerCase();
      } else {
         const cp = counterparties.find(c => c.id === r.counterparty_id);
         title = (r.title || cp?.name || '').toLowerCase();
      }
      return title.includes(q) || r.amount.toString().includes(q);
    }
    return true;
  });

  const getAccountName = (id?: string) => {
    if (!id) return 'Unknown Account';
    return linkedAccounts.find(a => a.id === id)?.name || 'Unknown Account';
  };

  const getCounterpartyName = (record: Record) => {
    if (record.direction === 'transfer') return record.title;
    const cp = counterparties.find(c => c.id === record.counterparty_id);
    return cp?.name || record.title || 'Unknown Source';
  };

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
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-8 pb-2">
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
        <span className="text-[11px] text-slate-500 font-medium">Showing {filteredRecords.length} results</span>
      </div>

      {error && (
        <div className="mb-6">
          <EmptyState 
            icon="error" 
            title="Failed to Load History" 
            message={error} 
            action={{ label: "Retry", onClick: () => window.location.reload() }}
          />
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <ListSkeleton count={5} />
      ) : filteredRecords.length > 0 ? (
        <div className="space-y-3 mb-6">
          {filteredRecords.map((r) => (
            <Link key={r.id} to={`/transaction/${r.id}`} className="block">
              <div className="bg-[#1A1C29] border border-white/5 rounded-[20px] p-4 flex items-center gap-4 hover:bg-white/5 transition-colors active:scale-[0.98]">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  r.direction === 'inflow' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' :
                  r.direction === 'outflow' ? 'bg-[#FCA5A5]/20 text-[#FCA5A5]' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  <span className="material-symbols-outlined">
                    {r.direction === 'inflow' ? 'arrow_downward' : r.direction === 'outflow' ? 'arrow_upward' : 'swap_horiz'}
                  </span>
                </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-[15px] truncate">{getCounterpartyName(r)}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[12px] text-slate-400 truncate max-w-[120px]">
                    {r.direction === 'inflow' ? getAccountName(r.to_account_id) :
                     r.direction === 'outflow' ? getAccountName(r.from_account_id) :
                     `${getAccountName(r.from_account_id)} → ${getAccountName(r.to_account_id)}`}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0"></span>
                  <span className="text-[12px] text-slate-500 capitalize">{r.direction !== 'transfer' ? r.flow_category.replace(/_/g, ' ') : 'Transfer'}</span>
                </div>
              </div>
              
              <div className="text-right shrink-0">
                <div className={`font-data-mono text-[16px] font-bold ${
                  r.direction === 'inflow' ? 'text-[#4ADE80]' : 
                  r.direction === 'outflow' ? 'text-white' : 'text-blue-400'
                }`}>
                  {r.direction === 'inflow' ? '+' : r.direction === 'outflow' ? '-' : ''}${r.amount.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{new Date(r.date).toLocaleDateString()}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      ) : !error && (
        <div className="mb-6">
          <EmptyState 
            icon="manage_search"
            title="No records found"
            message="We couldn't find any data matching your current filters."
            action={{ label: "Clear All Filters", onClick: () => { setSearch(''); setActiveFilter('all'); } }}
          />
        </div>
      )}

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
