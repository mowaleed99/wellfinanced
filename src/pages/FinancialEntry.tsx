import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { FinancialFlowCategory } from '../types/records';

const INFLOW_CATEGORIES: { label: string, value: FinancialFlowCategory }[] = [
  { label: 'Salary & Wages', value: 'salary_wages' },
  { label: 'Business Revenue', value: 'business_revenue' },
  { label: 'Freelance / Contract', value: 'freelance_contract_payment' },
  { label: 'Investment Dividend', value: 'investment_dividend' },
  { label: 'Property Rent', value: 'property_rent' },
];

const OUTFLOW_CATEGORIES: { label: string, value: FinancialFlowCategory }[] = [
  { label: 'Tax / Zakat', value: 'tax_payment_zakat' },
  { label: 'Debt Repayment', value: 'debt' },
  { label: 'Consumables / Groceries', value: 'sell_assets_cash_out_investments' }, // Adjust as needed
  { label: 'Savings Goal', value: 'saving_goal' },
];

export default function FinancialEntry() {
  const navigate = useNavigate();
  const { addRecord, linkedAccounts, counterparties } = useFinance();
  
  const [direction, setDirection] = useState<'inflow' | 'outflow' | 'transfer'>('inflow');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [flowCategory, setFlowCategory] = useState<FinancialFlowCategory>('salary_wages');
  
  // Account selection
  const [toAccountId, setToAccountId] = useState(linkedAccounts[0]?.id || '');
  const [fromAccountId, setFromAccountId] = useState(linkedAccounts[0]?.id || '');
  
  // Counterparty UX
  const [isNewCounterparty, setIsNewCounterparty] = useState(false);
  const [selectedCounterpartyId, setSelectedCounterpartyId] = useState('');
  const [newCounterpartyName, setNewCounterpartyName] = useState('');
  const [newCounterpartyCategory, setNewCounterpartyCategory] = useState<'person' | 'business'>('business');
  
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    if (direction === 'transfer' && fromAccountId === toAccountId) {
      setError('Source and destination accounts cannot be the same');
      return;
    }

    let cpName = '';
    let cpId = selectedCounterpartyId;

    if (direction !== 'transfer') {
      if (isNewCounterparty && !newCounterpartyName.trim()) {
        setError('Please enter a counterparty name');
        return;
      }
      
      if (isNewCounterparty) {
        // Here we'd ideally call an API to create the counterparty.
        // For the scope of this UI refactor, we just capture the name for the title.
        cpName = newCounterpartyName;
        cpId = crypto.randomUUID(); // Mocking creation
      } else {
        const cp = counterparties.find(c => c.id === selectedCounterpartyId);
        cpName = cp?.name || 'Unknown Counterparty';
      }
      
      if (!isNewCounterparty && !selectedCounterpartyId) {
          setError('Please select or create a counterparty');
          return;
      }
    }

    try {
      if (direction === 'inflow') {
        await addRecord({
          direction: 'inflow',
          currency: 'USD',
          amount: parsedAmount,
          date,
          category: 'income',
          flow_category: flowCategory,
          to_account_id: toAccountId,
          counterparty_id: cpId,
          title: cpName,
          status: 'received'
        });
      } else if (direction === 'outflow') {
        await addRecord({
          direction: 'outflow',
          currency: 'USD',
          amount: parsedAmount,
          date,
          category: 'payment',
          flow_category: flowCategory,
          from_account_id: fromAccountId,
          counterparty_id: cpId,
          title: cpName,
          status: 'cleared'
        });
      } else if (direction === 'transfer') {
        await addRecord({
          direction: 'transfer',
          currency: 'USD',
          amount: parsedAmount,
          date,
          from_account_id: fromAccountId,
          to_account_id: toAccountId,
          title: `Transfer to ${linkedAccounts.find(a => a.id === toAccountId)?.name || 'Account'}`,
          status: 'cleared'
        });
      }
      navigate('/history');
    } catch (err) {
      setError('Failed to save record');
    }
  };

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex items-center gap-3 mb-6">
        <Link to="/history" className="text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-display-lg font-display-lg text-white">Log Entry</h1>
      </header>

      <div className="glass-card p-6 rounded-3xl">
        <form className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm font-bold">
              {error}
            </div>
          )}
          
          {/* Segmented Controls for Direction */}
          <div>
            <div className="flex bg-surface-container rounded-xl p-1">
              {(['inflow', 'outflow', 'transfer'] as const).map(d => (
                <button 
                  key={d}
                  type="button" 
                  onClick={() => setDirection(d)}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm capitalize ${
                    direction === d 
                      ? 'bg-primary text-on-primary shadow-sm' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs uppercase text-outline font-bold">Amount</label>
            <input 
              type="number" 
              placeholder="$0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white font-data-mono text-xl focus:border-primary/50 outline-none" 
            />
          </div>

          {/* Accounts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(direction === 'outflow' || direction === 'transfer') && (
              <div className="space-y-1">
                <label className="text-xs uppercase text-outline font-bold">From Account</label>
                <select 
                  value={fromAccountId}
                  onChange={(e) => setFromAccountId(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none"
                >
                  <option value="" disabled>Select Account</option>
                  {linkedAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name} ({acc.currency})</option>
                  ))}
                </select>
              </div>
            )}

            {(direction === 'inflow' || direction === 'transfer') && (
              <div className="space-y-1">
                <label className="text-xs uppercase text-outline font-bold">To Account</label>
                <select 
                  value={toAccountId}
                  onChange={(e) => setToAccountId(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none"
                >
                  <option value="" disabled>Select Account</option>
                  {linkedAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name} ({acc.currency})</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Counterparty & Category for Inflow/Outflow */}
          {direction !== 'transfer' && (
            <>
              <div className="space-y-3 bg-surface-container p-4 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase text-outline font-bold">Counterparty</label>
                  <button 
                    type="button" 
                    onClick={() => setIsNewCounterparty(!isNewCounterparty)}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    {isNewCounterparty ? 'Select Existing' : '+ Create New'}
                  </button>
                </div>

                {!isNewCounterparty ? (
                  <select 
                    value={selectedCounterpartyId}
                    onChange={(e) => setSelectedCounterpartyId(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none"
                  >
                    <option value="" disabled>Select Counterparty</option>
                    {counterparties.map(cp => (
                      <option key={cp.id} value={cp.id}>{cp.name} ({cp.category})</option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="e.g. Acme Corp or John Doe" 
                      value={newCounterpartyName}
                      onChange={(e) => setNewCounterpartyName(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none" 
                    />
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setNewCounterpartyCategory('business')} className={`flex-1 py-2 text-sm rounded-lg font-bold border transition-colors ${newCounterpartyCategory === 'business' ? 'bg-primary/20 text-primary border-primary/30' : 'border-white/10 text-white/60'}`}>Business</button>
                      <button type="button" onClick={() => setNewCounterpartyCategory('person')} className={`flex-1 py-2 text-sm rounded-lg font-bold border transition-colors ${newCounterpartyCategory === 'person' ? 'bg-primary/20 text-primary border-primary/30' : 'border-white/10 text-white/60'}`}>Person</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase text-outline font-bold">Category</label>
                <select 
                  value={flowCategory}
                  onChange={(e) => setFlowCategory(e.target.value as FinancialFlowCategory)}
                  className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none"
                >
                  {(direction === 'inflow' ? INFLOW_CATEGORIES : OUTFLOW_CATEGORIES).map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs uppercase text-outline font-bold">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none block" 
            />
          </div>

          <button 
            type="button" 
            onClick={handleSave}
            className="w-full py-4 mt-6 bg-primary-container text-white rounded-xl font-bold hover:bg-inverse-primary active:scale-95 transition-all text-lg"
          >
            Save {direction === 'transfer' ? 'Transfer' : 'Record'}
          </button>
        </form>
      </div>
    </div>
  );
}

