import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';

export default function LinkedAccounts() {
  const { linkedAccounts, triggerSync } = useFinance();
  const [syncingIds, setSyncingIds] = useState<Record<string, boolean>>({});

  const handleSync = async (id: string) => {
    setSyncingIds(prev => ({ ...prev, [id]: true }));
    await triggerSync(id);
    setSyncingIds(prev => ({ ...prev, [id]: false }));
  };

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-display-lg font-display-lg text-white">Linked Accounts</h1>
        </div>
        <button className="text-primary text-sm font-bold flex items-center gap-1 bg-primary/10 hover:bg-primary/20 transition-colors px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-[16px]">add</span> Link
        </button>
      </header>

      {linkedAccounts.length === 0 ? (
        <div className="text-center py-10 text-slate-400 glass-card rounded-3xl">
          No accounts linked yet.
        </div>
      ) : (
        <div className="space-y-4">
          {linkedAccounts.map(account => {
            const isSyncing = syncingIds[account.id];
            // Check if stale (older than 7 days)
            const isStale = (new Date().getTime() - new Date(account.lastSynced).getTime()) > 86400000 * 7;
            const initial = account.name.charAt(0).toUpperCase();

            let providerIconColor = 'text-blue-600';
            if (account.provider === 'vodafone_cash') providerIconColor = 'text-red-500';
            else if (account.provider === 'paypal') providerIconColor = 'text-blue-400';
            else if (account.provider === 'instapay') providerIconColor = 'text-purple-500';

            return (
              <div key={account.id} className={`glass-card p-5 rounded-3xl relative overflow-hidden transition-all duration-300 ${isStale ? 'border-error/30 opacity-80' : 'border-primary/30'}`}>
                <div className="absolute top-0 right-0 p-3">
                  {isStale ? (
                    <button 
                      onClick={() => handleSync(account.id)}
                      disabled={isSyncing}
                      className="text-[10px] font-bold bg-error/20 text-error px-2 py-0.5 rounded uppercase flex items-center gap-1 hover:bg-error/30 transition-colors"
                    >
                      {isSyncing ? 'Syncing...' : 'Needs Reconnect'}
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span> Synced
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-4 mt-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                      <span className={`${providerIconColor} font-bold text-xl`}>{initial}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{account.name}</h3>
                      <p className="text-xs text-outline">{account.provider.replace('_', ' ').toUpperCase()}</p>
                    </div>
                  </div>
                  {!isStale && (
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
                    <span className="text-[9px] text-outline mt-0.5">Last synced: {new Date(account.lastSynced).toLocaleDateString()}</span>
                  </div>
                  <span className="font-data-mono font-bold text-white text-lg">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
