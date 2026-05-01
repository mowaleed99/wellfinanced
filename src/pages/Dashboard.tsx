import { Link } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { Record } from '../types/records';
import { Skeleton, CardSkeleton, ListSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';

export default function Dashboard() {
  const { records, linkedAccounts, counterparties, incomeThisMonth, expensesThisMonth, isLoading, error } = useFinance();

  // Financial Summary
  const totalBalance = linkedAccounts.reduce((sum, acc) => sum + acc.current_balance, 0);

  // Recent activity (last 3 records)
  const recentRecords = records.slice(0, 3);

  // Insights: Spending by category (outflow only)
  const outflowRecords = records.filter(r => r.direction === 'outflow');
  const spendingByCategory = outflowRecords.reduce((acc, r) => {
    acc[r.flow_category] = (acc[r.flow_category] || 0) + r.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(spendingByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const getAccountName = (id?: string) => {
    if (!id) return 'Unknown';
    return linkedAccounts.find(a => a.id === id)?.name || 'Unknown';
  };

  const getCounterpartyName = (record: Record) => {
    if (record.direction === 'transfer') return record.title;
    const cp = counterparties.find(c => c.id === record.counterparty_id);
    return cp?.name || record.title || 'Unknown';
  };

  if (error) {
    return (
      <div className="px-container-padding pt-24 min-h-screen bg-[#11131C]">
        <EmptyState 
          icon="error" 
          title="Failed to Load Data" 
          message={error} 
          action={{ label: "Retry", onClick: () => window.location.reload() }}
        />
      </div>
    );
  }

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4 bg-[#11131C] min-h-screen">
      {/* Welcome Section */}
      <section className="flex justify-between items-end mb-4">
        <div>
          <p className="text-label-sm font-label-sm text-slate-400 uppercase tracking-widest">Dashboard Overview</p>
          <h1 className="text-display-lg font-display-lg mt-1 text-white">Good Evening,<br/>Wafaa</h1>
        </div>
        <div className="flex flex-col items-end">
          <div className="px-3 py-1.5 bg-[#2D1B69] rounded-full border border-purple-500/20">
            <span className="text-[10px] font-bold text-[#E2B5FF] uppercase tracking-tighter">AI Assistant<br/>Active</span>
          </div>
        </div>
      </section>

      {/* Main Net Balance Card */}
      <div className="block glass-card rounded-2xl p-6 relative overflow-hidden bg-[#1A1C29] border-white/5 shadow-lg">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-48" />
            <div className="flex gap-2 mt-4 overflow-hidden">
              <Skeleton className="h-16 w-24 rounded-xl" />
              <Skeleton className="h-16 w-24 rounded-xl" />
              <Skeleton className="h-16 w-24 rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              Total Balance (All Accounts)
            </h2>
            <div className="flex items-end gap-3 mt-1">
              <span className="text-[32px] leading-none font-bold text-white tracking-tight">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            
            {/* Account Breakdown inline */}
            <div className="mt-6 flex gap-2 overflow-x-auto hide-scrollbar pb-2">
              {linkedAccounts.map(acc => (
                <Link key={acc.id} to={`/accounts/${acc.id}`} className="bg-white/5 border border-white/10 rounded-xl p-3 min-w-[120px] block hover:bg-white/10 transition-colors active:scale-95">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">{acc.name}</p>
                  <p className="text-sm font-bold text-white mt-1">${acc.current_balance.toLocaleString('en-US')}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid Cards for Cashflow */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            {/* Income */}
            <div className="glass-card rounded-2xl p-4 bg-[#1A1C29] border-white/5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="material-symbols-outlined text-[#4ADE80] text-sm">arrow_downward</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inflow (Month)</span>
              </div>
              <p className="text-xl font-bold text-white tracking-tight">${incomeThisMonth.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
            
            {/* Expenses */}
            <div className="glass-card rounded-2xl p-4 bg-[#1A1C29] border-white/5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="material-symbols-outlined text-[#F87171] text-sm">arrow_upward</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outflow (Month)</span>
              </div>
              <p className="text-xl font-bold text-white tracking-tight">${expensesThisMonth.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
          </>
        )}
      </div>

      {/* Insights Section */}
      <section className="mt-8 space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-[#DCB8FF]" style={{fontVariationSettings: "'FILL' 1"}}>insights</span>
            Spending Insights
          </h3>
        </div>
        
        <div className="glass-card rounded-2xl p-5 bg-[#1A1C29] border-white/5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Top Categories (All Time)</p>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/6" />
            </div>
          ) : topCategories.length > 0 ? (
            <div className="space-y-4">
              {topCategories.map(([category, amount], idx) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white capitalize">{category.replace(/_/g, ' ')}</span>
                    <span className="font-bold text-slate-300">${amount.toLocaleString('en-US', {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#7701D0] h-full rounded-full" style={{ width: `${Math.max(10, 100 - idx * 20)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon="pie_chart"
              title="No Insights Yet"
              message="Add outflow records to see your spending broken down by category."
            />
          )}
        </div>
      </section>
      
      {/* Recent Activity Feed */}
      <section className="mt-8 space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold text-white">Recent Activity</h3>
          <Link to="/history" className="text-xs text-primary font-bold hover:underline">View All</Link>
        </div>
        
        <div className="space-y-3">
          {isLoading ? (
            <ListSkeleton count={3} />
          ) : recentRecords.length > 0 ? (
            recentRecords.map((r) => (
              <Link key={r.id} to={`/transaction/${r.id}`} className="glass-card rounded-2xl p-4 bg-[#1A1C29] border-white/5 flex items-center gap-4 hover:bg-white/5 transition-colors active:scale-[0.98] block">
                <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center border ${
                  r.direction === 'inflow' ? 'bg-[#1e293b] border-[#4ADE80]/30 text-[#4ADE80]' : 
                  r.direction === 'outflow' ? 'bg-[#1e293b] border-[#F87171]/30 text-[#F87171]' : 
                  'bg-[#1e293b] border-blue-500/30 text-blue-400'
                }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {r.direction === 'inflow' ? 'arrow_downward' : r.direction === 'outflow' ? 'arrow_upward' : 'swap_horiz'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{getCounterpartyName(r)}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5 truncate">
                    {r.direction === 'inflow' ? `To ${getAccountName(r.to_account_id)}` :
                     r.direction === 'outflow' ? `From ${getAccountName(r.from_account_id)}` :
                     `${getAccountName(r.from_account_id)} → ${getAccountName(r.to_account_id)}`}
                     {' • '}{r.direction !== 'transfer' ? r.flow_category.replace(/_/g, ' ') : 'Transfer'}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-base font-bold ${
                    r.direction === 'inflow' ? 'text-[#4ADE80]' : 
                    r.direction === 'outflow' ? 'text-white' : 'text-blue-400'
                  }`}>
                    {r.direction === 'inflow' ? '+' : r.direction === 'outflow' ? '-' : ''}${r.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <EmptyState 
              icon="receipt_long"
              title="No Recent Activity"
              message="Your recent transactions and transfers will appear here once you create them."
            />
          )}
        </div>
      </section>

    </div>
  );
}
