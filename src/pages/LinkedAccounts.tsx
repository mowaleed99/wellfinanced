import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { AccountCategory, LinkedAccount } from '../types/account';
import { EmptyState } from '../components/EmptyState';
import { CardSkeleton } from '../components/Skeleton';

export default function LinkedAccounts() {
  const { linkedAccounts, triggerSync, isLoading, error } = useFinance();
  const [syncingIds, setSyncingIds] = useState<Record<string, boolean>>({});

  const handleSync = async (id: string) => {
    setSyncingIds(prev => ({ ...prev, [id]: true }));
    await triggerSync(id);
    setSyncingIds(prev => ({ ...prev, [id]: false }));
  };

  const groupedAccounts = linkedAccounts.reduce((acc, account) => {
    const category = account.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(account);
    return acc;
  }, {} as Record<string, LinkedAccount[]>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'frozen': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'closed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'archived_inactive': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wallet': return 'bg-purple-500/20 text-purple-400';
      case 'savings': return 'bg-emerald-500/20 text-emerald-400';
      case 'checking': return 'bg-blue-500/20 text-blue-400';
      case 'investment': return 'bg-orange-500/20 text-orange-400';
      case 'cash': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-display-lg font-display-lg text-white">Accounts</h1>
        </div>
        <button className="text-primary text-sm font-bold flex items-center gap-1 bg-primary/10 hover:bg-primary/20 transition-colors px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-[16px]">add</span> Link
        </button>
      </header>

      {error && (
        <div className="mb-6">
          <EmptyState 
            icon="error" 
            title="Failed to Load Accounts" 
            message={error} 
            action={{ label: "Retry", onClick: () => window.location.reload() }}
          />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : linkedAccounts.length === 0 && !error ? (
        <EmptyState 
          icon="account_balance"
          title="No Accounts Linked"
          message="You haven't linked any bank accounts or wallets yet."
        />
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedAccounts).map(([category, accounts]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">
                {category.replace('_', ' ')}
              </h2>
              <div className="space-y-4">
                {accounts.map(account => {
                  const isSyncing = syncingIds[account.id];
                  const isStale = account.lastSynced ? (new Date().getTime() - new Date(account.lastSynced).getTime()) > 86400000 * 7 : false;
                  const initial = account.name.charAt(0).toUpperCase();
                  const isInactive = ['frozen', 'closed', 'archived_inactive'].includes(account.status);

                  return (
                    <div key={account.id} className={`glass-card p-5 rounded-3xl relative overflow-hidden transition-all duration-300 ${isStale ? 'border-error/30' : 'border-white/5'} ${isInactive ? 'opacity-60 grayscale-[50%]' : ''}`}>
                      <div className="absolute top-0 right-0 p-3 flex gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getStatusColor(account.status)}`}>
                          {account.status.replace('_', ' ')}
                        </span>
                        {isStale && account.status === 'active' && (
                          <button 
                            onClick={() => handleSync(account.id)}
                            disabled={isSyncing}
                            className="text-[10px] font-bold bg-error/20 text-error px-2 py-0.5 rounded uppercase flex items-center gap-1 hover:bg-error/30 transition-colors"
                          >
                            {isSyncing ? 'Syncing...' : 'Needs Reconnect'}
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-4 mt-2">
                        <div className="flex items-center gap-4">
                          <Link to={`/accounts/${account.id}`} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                              <span className="font-bold text-xl text-white">{initial}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-white font-bold text-lg hover:text-primary transition-colors">{account.name}</h3>
                                {account.institution && (
                                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full shrink-0">
                                    {account.institution}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getCategoryColor(account.category)}`}>
                                  {account.category}
                                </span>
                                {account.label && <span className="text-xs text-outline">{account.label}</span>}
                              </div>
                            </div>
                          </Link>
                        </div>
                        {!isStale && !isInactive && (
                          <button 
                            onClick={() => handleSync(account.id)}
                            disabled={isSyncing}
                            className={`w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-slate-400 hover:text-primary transition-colors ${isSyncing ? 'animate-spin' : ''}`}
                          >
                            <span className="material-symbols-outlined text-[18px]">sync</span>
                          </button>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-end border-t border-white/10 pt-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-on-surface-variant">Available Balance</span>
                          {account.lastSynced && (
                            <span className="text-[9px] text-outline mt-0.5">Last synced: {new Date(account.lastSynced).toLocaleDateString()}</span>
                          )}
                        </div>
                        <span className="font-data-mono font-bold text-white text-lg">
                          {account.currency} {account.current_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
