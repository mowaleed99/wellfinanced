import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { validateTransaction, TransactionCategory } from '../utils/finance';

export default function FinancialEntry() {
  const navigate = useNavigate();
  const { addTransaction } = useFinance();
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<TransactionCategory>('other');
  const [error, setError] = useState('');

  const handleSave = () => {
    setError('');
    
    const parsedAmount = type === 'income' ? parseFloat(amount) : -parseFloat(amount);
    
    const validation = validateTransaction(title, parsedAmount, date);
    if (!validation.valid) {
      setError(validation.error || 'Invalid transaction');
      return;
    }
    
    addTransaction({
      title,
      amount: parsedAmount,
      type,
      date,
      category,
      status: 'cleared',
    });
    
    navigate('/history');
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
        <form className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm font-bold">
              {error}
            </div>
          )}
          
          <div>
            <label className="text-xs uppercase text-outline font-bold">Type</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button 
                type="button" 
                onClick={() => setType('income')}
                className={`py-3 rounded-xl font-bold transition-colors ${type === 'income' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-surface-container text-white border border-white/5'}`}
              >
                Income
              </button>
              <button 
                type="button" 
                onClick={() => setType('expense')}
                className={`py-3 rounded-xl font-bold transition-colors ${type === 'expense' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-surface-container text-white border border-white/5'}`}
              >
                Expense
              </button>
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

          <div className="space-y-1">
            <label className="text-xs uppercase text-outline font-bold">Source / Name</label>
            <input 
              type="text" 
              placeholder="e.g. Freelance Project" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase text-outline font-bold">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as TransactionCategory)}
              className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none"
            >
              <option value="freelance">Freelance</option>
              <option value="software">Software</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="transport">Transport</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase text-outline font-bold">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none" 
            />
          </div>

          <button 
            type="button" 
            onClick={handleSave}
            className="w-full py-4 mt-4 bg-primary-container text-white rounded-xl font-bold hover:bg-inverse-primary active:scale-95 transition-all"
          >
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
}
