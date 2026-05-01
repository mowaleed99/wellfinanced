import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { EmptyState } from '../components/EmptyState';
import { CardSkeleton } from '../components/Skeleton';

export default function InstallmentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { installments, linkedAccounts, isLoading, error } = useFinance();

  if (isLoading) {
    return (
      <div className="px-container-padding space-y-stack-lg pb-24 pt-4 bg-[#11131C] min-h-screen">
        <CardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-container-padding pt-24 min-h-screen bg-[#11131C]">
        <EmptyState icon="error" title="Error" message={error} />
      </div>
    );
  }

  const inst = installments.find(i => i.id === id);

  if (!inst) {
    return (
      <div className="px-container-padding pt-24 min-h-screen bg-[#11131C]">
        <EmptyState 
          icon="event_busy" 
          title="Installment Not Found" 
          message="This installment does not exist or was removed."
          action={{ label: "Back to Installments", onClick: () => navigate('/installments') }}
        />
      </div>
    );
  }

  // Assuming installments might be linked to accounts if not currently explicitly mapped
  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4 bg-[#11131C] min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-display-lg font-display-lg text-white">Installment Details</h1>
        </div>
      </header>

      <div className="glass-card p-6 rounded-3xl relative overflow-hidden bg-[#1A1C29] border-white/5 shadow-lg mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center border ${inst.direction === 'inflow' ? 'bg-[#4ADE80]/10 border-[#4ADE80]/30 text-[#4ADE80]' : 'bg-[#FCA5A5]/10 border-[#FCA5A5]/30 text-[#FCA5A5]'}`}>
            <span className="material-symbols-outlined text-[24px]">
              {inst.direction === 'inflow' ? 'download' : 'upload'}
            </span>
          </div>
          <div>
            <h2 className="text-white font-bold text-xl uppercase tracking-wider">{inst.financial_flow_id.replace(/_/g, ' ')}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${inst.status === 'completed' ? 'bg-green-500/20 text-green-400' : inst.status === 'missed' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {inst.status}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Amount</p>
          <p className={`text-3xl font-bold font-data-mono ${inst.direction === 'inflow' ? 'text-[#4ADE80]' : 'text-white'}`}>
            {inst.direction === 'inflow' ? '+' : '-'}${inst.amount.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            Pending Schedule API
          </p>
        </div>

        <Link 
          to={`/notifications`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          View Notifications
        </Link>
      </div>
    </div>
  );
}
