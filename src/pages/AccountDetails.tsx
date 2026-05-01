import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { EmptyState } from '../components/EmptyState';
import { CardSkeleton } from '../components/Skeleton';

export default function AccountDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { linkedAccounts, isLoading, error } = useFinance();

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

  const account = linkedAccounts.find(a => a.id === id);

  if (!account) {
    return (
      <div className="px-container-padding pt-24 min-h-screen bg-[#11131C]">
        <EmptyState 
          icon="account_balance_wallet" 
          title="Account Not Found" 
          message="The account you're looking for does not exist or was removed."
          action={{ label: "Back to Accounts", onClick: () => navigate('/linked-accounts') }}
        />
      </div>
    );
  }

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4 bg-[#11131C] min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-display-lg font-display-lg text-white">Account Details</h1>
        </div>
      </header>

      <div className="glass-card p-6 rounded-3xl relative overflow-hidden bg-[#1A1C29] border-white/5 shadow-lg mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
            <span className="font-bold text-2xl text-white">{account.name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">{account.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                {account.category || 'Standard'}
              </span>
              <span className="text-[10px] text-slate-500 uppercase">{account.institution}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Available Balance</p>
          <p className="text-3xl font-bold text-white font-data-mono">
            {account.currency} {account.current_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[10px] text-slate-500 mt-2">
            Status: <span className={account.status === 'active' ? 'text-green-400' : 'text-yellow-400'}>{account.status.toUpperCase()}</span>
          </p>
        </div>

        <Link 
          to={`/history?accountId=${account.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          View Transactions
        </Link>
      </div>
    </div>
  );
}
