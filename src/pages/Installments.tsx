import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { Installment, Schedule } from '../types/schedule';
import { FinancialFlowCategory } from '../types/records';
import { EmptyState } from '../components/EmptyState';
import { Skeleton, ListSkeleton, CardSkeleton } from '../components/Skeleton';

export default function Installments() {
  const { installments, linkedAccounts, counterparties, isLoading, error } = useFinance();
  
  const [showCreate, setShowCreate] = useState(false);
  
  // Create form state
  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState<'inflow' | 'outflow'>('outflow');
  const [category, setCategory] = useState<FinancialFlowCategory>('tax_payment_zakat');
  const [accountId, setAccountId] = useState(linkedAccounts[0]?.id || '');
  const [counterpartyId, setCounterpartyId] = useState('');
  const [frequency, setFrequency] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const handleCreate = async () => {
    // Feature disabled until backend supports Schedule & Flow creation API
    console.warn('Installment creation is disabled: Schedule & Flow APIs are missing.');
  };

  const getScheduleText = (schId?: string) => {
    return 'Schedule Pending Backend API';
  };

  const getNextDueDate = (schId?: string) => {
    return 'Pending Schedule API';
  };

  const getReminderStatus = (instId: string) => {
    return { type: 'upcoming', text: 'Reminders coming soon from backend' };
  };

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4 min-h-screen bg-[#11131C]">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-display-lg font-display-lg text-white">Schedules</h1>
        </div>
        <button 
          onClick={() => setShowCreate(!showCreate)}
          className="text-primary text-sm font-bold flex items-center gap-1 bg-primary/10 hover:bg-primary/20 transition-colors px-3 py-1.5 rounded-lg"
        >
          <span className="material-symbols-outlined text-[16px]">{showCreate ? 'close' : 'add'}</span> 
          {showCreate ? 'Cancel' : 'New'}
        </button>
      </header>

      {error && (
        <div className="mb-6">
          <EmptyState 
            icon="error" 
            title="Failed to Load Installments" 
            message={error} 
            action={{ label: "Retry", onClick: () => window.location.reload() }}
          />
        </div>
      )}

      {showCreate && (
        <div className="glass-card p-5 rounded-3xl mb-6 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Create Installment</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-outline font-bold">Direction</label>
                <select value={direction} onChange={e => setDirection(e.target.value as any)} className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-3 py-2 text-white outline-none text-sm">
                  <option value="outflow">Outflow (Pay)</option>
                  <option value="inflow">Inflow (Receive)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-outline font-bold">Amount</label>
                <input type="number" placeholder="$0.00" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-3 py-2 text-white outline-none text-sm font-data-mono" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-outline font-bold">Account</label>
              <select value={accountId} onChange={e => setAccountId(e.target.value)} className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-3 py-2 text-white outline-none text-sm">
                <option value="" disabled>Select Account</option>
                {linkedAccounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-outline font-bold">Counterparty</label>
              <select value={counterpartyId} onChange={e => setCounterpartyId(e.target.value)} className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-3 py-2 text-white outline-none text-sm">
                <option value="">None / Unknown</option>
                {counterparties.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-outline font-bold text-slate-500">Schedule (Missing API)</label>
              <div className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-3 py-2 text-slate-500 text-sm cursor-not-allowed flex items-center justify-between" title="Not available yet">
                Select Schedule
                <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded uppercase">Offline</span>
              </div>
            </div>

            <button disabled className="w-full py-3 mt-2 bg-slate-800 text-slate-500 rounded-xl font-bold cursor-not-allowed transition-all text-sm" title="Backend APIs required">
              Save Installment (Coming Soon)
            </button>
          </div>
        </div>
      )}

      {/* Timeline / Upcoming Payments */}
      <section className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 pl-1">Upcoming (Next 30 Days)</h3>
        {isLoading ? (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            <Skeleton className="min-w-[140px] h-32 rounded-2xl" />
            <Skeleton className="min-w-[140px] h-32 rounded-2xl" />
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {installments.filter(i => i.status === 'pending').map((inst, idx) => (
              <div key={idx} className="min-w-[140px] bg-gradient-to-br from-[#1E1B4B] to-[#312E81] border border-[#4F46E5]/30 rounded-2xl p-4 shadow-lg flex-shrink-0">
                <div className="flex justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-[#A5B4FC] text-[20px]">calendar_today</span>
                  <span className="text-[10px] font-bold bg-[#4F46E5]/50 text-white px-2 py-0.5 rounded uppercase">Due Soon</span>
                </div>
                <p className="text-xl font-bold text-white font-data-mono mb-1">${inst.amount}</p>
                <p className="text-xs text-[#A5B4FC] truncate">{getNextDueDate(inst.schedule_id)}</p>
              </div>
            ))}
            {installments.filter(i => i.status === 'pending').length === 0 && !error && (
              <div className="text-xs text-slate-500 py-4 pl-2">No upcoming installments.</div>
            )}
          </div>
        )}
      </section>

      {/* Installments List */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 pl-1">All Installments</h3>
        <div className="space-y-4">
          {isLoading ? (
            <ListSkeleton count={4} />
          ) : installments.length === 0 && !error ? (
            <EmptyState 
              icon="event_repeat"
              title="No Installments"
              message="You have no active installments. Create one to start tracking recurring payments."
            />
          ) : (
            installments.map(inst => {
              const reminder = getReminderStatus(inst.id);
              return (
                <Link key={inst.id} to={`/installments/${inst.id}`} className="block">
                  <div className="glass-card p-4 rounded-2xl border border-white/5 relative overflow-hidden hover:bg-white/5 transition-colors active:scale-[0.98]">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 ${inst.direction === 'inflow' ? 'bg-[#4ADE80]/10 border-[#4ADE80]/30 text-[#4ADE80]' : 'bg-[#FCA5A5]/10 border-[#FCA5A5]/30 text-[#FCA5A5]'}`}>
                          <span className="material-symbols-outlined text-[18px]">
                            {inst.direction === 'inflow' ? 'download' : 'upload'}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white uppercase tracking-wider truncate">{inst.financial_flow_id.replace(/_/g, ' ')}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-0.5 rounded uppercase font-bold tracking-wider whitespace-nowrap">
                              {getScheduleText(inst.schedule_id)}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${inst.status === 'completed' ? 'bg-green-500/20 text-green-400' : inst.status === 'missed' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {inst.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-lg font-bold font-data-mono ${inst.direction === 'inflow' ? 'text-[#4ADE80]' : 'text-white'}`}>
                          {inst.direction === 'inflow' ? '+' : '-'}${inst.amount.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">Next: {getNextDueDate(inst.schedule_id)}</p>
                      </div>
                    </div>

                    {reminder && (
                      <div className={`mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-bold ${reminder.type === 'overdue' ? 'text-red-400' : 'text-blue-400'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {reminder.type === 'overdue' ? 'warning' : 'notifications_active'}
                        </span>
                        {reminder.text}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
