import { useState } from 'react';

export default function SearchHistory() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const allTransactions = [
    { id: 1, title: 'Client Alpha - Website', date: 'Oct 24, 2023', amount: '+$2,450.00', type: 'income' },
    { id: 2, title: 'AWS Hosting', date: 'Oct 18, 2023', amount: '-$45.00', type: 'expense' },
    { id: 3, title: 'Logo Design - StartupX', date: 'Oct 15, 2023', amount: '+$850.00', type: 'income' },
    { id: 4, title: 'Adobe Creative Cloud', date: 'Oct 5, 2023', amount: '-$54.99', type: 'expense' },
  ];

  const filtered = allTransactions.filter(t => {
    const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || t.type === filter;
    return matchesQuery && matchesFilter;
  });

  const filters = [
    { id: 'all', label: 'All Types', icon: 'filter_alt' },
    { id: 'income', label: 'Income', icon: 'trending_up' },
    { id: 'expense', label: 'Expense', icon: 'trending_down' },
  ];

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="mb-2">
        <h1 className="text-display-lg font-display-lg text-white mb-1">Search</h1>
        <p className="text-label-sm text-on-surface-variant">Find any transaction, client, or tag</p>
      </header>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-outline text-xl">search</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search transactions, clients, or tags..."
          className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all outline-none placeholder:text-outline/50"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-label-sm font-semibold whitespace-nowrap transition-all ${
              filter === f.id
                ? 'bg-primary-container text-white shadow-[0_0_15px_rgba(46,91,255,0.3)]'
                : 'bg-surface-container-high border border-outline-variant text-on-surface-variant hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-lg">
            {query ? 'Results' : 'Recent Activity'}
          </h2>
          <span className="text-label-sm text-outline">{filtered.length} results</span>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 flex flex-col items-center text-center space-y-4 border-dashed border-2 border-white/5">
            <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-5xl text-primary/40" style={{fontVariationSettings:"'FILL' 1"}}>find_in_page</span>
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">No transactions found</h3>
              <p className="text-sm text-outline mt-2 max-w-xs">Try adjusting the date range or search terms.</p>
            </div>
            <button onClick={() => { setQuery(''); setFilter('all'); }} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-label-sm font-bold text-primary hover:bg-white/10 transition-all active:scale-95">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(tx => (
              <div key={tx.id} className="glass-card p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${tx.type === 'income' ? 'bg-green-500/10 border-green-500/20' : 'bg-error/10 border-error/20'}`}>
                    <span className={`material-symbols-outlined text-[20px] ${tx.type === 'income' ? 'text-green-400' : 'text-error'}`}>
                      {tx.type === 'income' ? 'add_task' : 'remove_circle'}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{tx.title}</p>
                    <p className="text-label-sm text-outline">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-data-mono font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-white'}`}>{tx.amount}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AI Smart Search Tip */}
      <div className="rounded-3xl p-0.5" style={{background: 'linear-gradient(135deg, rgba(119,1,208,0.4), rgba(46,91,255,0.4))'}}>
        <div className="glass-card rounded-[calc(1.5rem-2px)] p-5 flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-secondary-container to-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{fontVariationSettings:"'FILL' 1"}}>auto_awesome</span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white mb-1">AI Smart Search Tips</h4>
            <p className="text-sm text-on-surface-variant/70">Try natural language like <span className="italic text-primary font-medium">"high value incomes from last quarter"</span> to find specific datasets faster.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
