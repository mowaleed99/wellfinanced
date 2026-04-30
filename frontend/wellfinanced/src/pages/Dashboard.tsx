import { Link } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';

export default function Dashboard() {
  const { balance, incomeThisMonth, expensesThisMonth, transactions } = useFinance();

  // Calculate percentages for the bars
  const totalThisMonth = incomeThisMonth + expensesThisMonth;
  const incomePercent = totalThisMonth === 0 ? 0 : (incomeThisMonth / totalThisMonth) * 100;
  const expensesPercent = totalThisMonth === 0 ? 0 : (expensesThisMonth / totalThisMonth) * 100;

  // Mock debt value for now
  const debt = 1450;
  const debtPercent = 30; // Mock percentage

  // Recent activity (last 2 transactions)
  const recentActivity = transactions.slice(0, 2);

  // Mock forecast values
  const estLow = 7200;
  const estHigh = 9850;

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

      {/* Main Net Cashflow Card */}
      <Link to="/analytics" className="block glass-card rounded-2xl p-6 relative overflow-hidden bg-[#1A1C29] border-white/5 shadow-lg hover:border-[#B8C3FF]/20 transition-colors active:scale-[0.99] cursor-pointer">
        <div className="relative z-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            Net Cashflow Balance
            <span className="material-symbols-outlined text-[12px] text-slate-500">open_in_new</span>
          </h2>
          <div className="flex items-end gap-3 mt-1">
            <span className="text-[32px] leading-none font-bold text-white tracking-tight">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-xs font-bold text-[#4ADE80] mb-1">+12.4% vs last mo</span>
          </div>
          
          <div className="h-24 w-full mt-4 relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path d="M0 80 Q 25 80, 40 85 T 80 85 T 120 40 T 160 50 T 200 10" fill="none" stroke="#B8C3FF" strokeWidth="2"></path>
              <path d="M0 80 Q 25 80, 40 85 T 80 85 T 120 40 T 160 50 T 200 10 V 100 H 0 Z" fill="url(#grad1)"></path>
              <defs>
                <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:'rgba(184, 195, 255, 0.15)', stopOpacity:1}}></stop>
                  <stop offset="100%" style={{stopColor:'rgba(184, 195, 255, 0)', stopOpacity:1}}></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </Link>

      {/* Grid Cards */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Income */}
        <div className="glass-card rounded-2xl p-4 bg-[#1A1C29] border-white/5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-[#4ADE80] text-sm">arrow_upward</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Income</span>
          </div>
          <p className="text-xl font-bold text-white tracking-tight">${incomeThisMonth.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#4ADE80] h-full rounded-full shadow-[0_0_8px_rgba(74,222,128,0.3)]" style={{ width: '60%' }}></div>
          </div>
        </div>
        
        {/* Expenses */}
        <div className="glass-card rounded-2xl p-4 bg-[#1A1C29] border-white/5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-[#F87171] text-sm">arrow_downward</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expenses</span>
          </div>
          <p className="text-xl font-bold text-white tracking-tight">${expensesThisMonth.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#F87171] h-full rounded-full shadow-[0_0_8px_rgba(248,113,113,0.3)]" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Debt Card */}
      <div className="glass-card rounded-2xl p-4 mt-4 bg-[#1A1C29] border-white/5">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="material-symbols-outlined text-[#FB923C] text-sm">credit_card</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Debt</span>
        </div>
        <p className="text-xl font-bold text-white tracking-tight">${debt.toLocaleString('en-US')}</p>
        <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="bg-[#FB923C] h-full rounded-full shadow-[0_0_8px_rgba(251,146,60,0.3)]" style={{ width: '25%' }}></div>
        </div>
      </div>

      {/* AI Forecast Section */}
      <section className="mt-8 space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-[#DCB8FF]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            AI Forecast
          </h3>
          <span className="text-[9px] font-bold px-2 py-1 bg-white/5 border border-white/10 rounded text-slate-400 uppercase tracking-widest">Medium Confidence</span>
        </div>
        
        <div className="glass-card rounded-2xl p-0 overflow-hidden bg-[#1A1C29] border-[#DCB8FF]/20 relative">
          <div className="absolute inset-0 bg-[#DCB8FF]/5 pointer-events-none"></div>
          
          <div className="p-5 relative z-10">
            <p className="text-[10px] font-bold text-[#DCB8FF] uppercase tracking-wider">30-Day Predicted Range</p>
            
            <div className="mt-3 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Est. Low</p>
                <p className="text-2xl font-normal tracking-tight text-white">${estLow.toLocaleString('en-US')}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Est. High</p>
                <p className="text-2xl font-normal tracking-tight text-[#DCB8FF]">${estHigh.toLocaleString('en-US')}</p>
              </div>
            </div>
            
            {/* Gradient Bar */}
            <div className="mt-4 relative h-3 bg-white/5 rounded-full overflow-hidden flex">
              <div className="w-[30%]"></div>
              <div className="w-[50%] bg-gradient-to-r from-[#2D1B69] via-[#7701D0] to-[#2D1B69]"></div>
              <div className="w-[20%]"></div>
              {/* Indicator line */}
              <div className="absolute left-[55%] top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_white]"></div>
            </div>
            
            <p className="text-xs text-slate-400 mt-4 italic font-medium leading-relaxed">
              "I'm detecting 3 pending invoices that typically pay within 12 days. Expect a surge between week 2 and 3."
            </p>
          </div>
          
          <div className="border-t border-white/5 bg-[#151722] p-5 relative z-10">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#7701D0] flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_rgba(119,1,208,0.5)]">
                <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>lightbulb</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Smart Tax Savings</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">Found $420 in potential write-offs from last month's travel expenses.</p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-2.5 rounded-lg border border-white/10 text-xs font-bold text-slate-300 uppercase tracking-wider hover:bg-white/5 transition-colors">
                Dismiss
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-[#DCB8FF] text-[#11131C] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,184,255,0.3)] hover:brightness-110 transition-all">
                Analyze
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Activity */}
      <section className="mt-8 space-y-4">
        <h3 className="text-xl font-bold text-white px-1">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((tx, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-4 bg-[#1A1C29] border-white/5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center border ${tx.type === 'income' ? 'bg-[#1e293b] border-blue-500/20' : 'bg-[#1e293b] border-purple-500/20'}`}>
                <span className="material-symbols-outlined text-slate-400 text-[18px]">
                  {tx.type === 'income' ? 'palette' : 'cloud'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{tx.title}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5 truncate">
                  {tx.category} • {tx.type === 'income' ? '2h ago' : '1d ago'}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-base font-medium ${tx.type === 'income' ? 'text-[#4ADE80]' : 'text-white'}`}>
                  {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', {minimumFractionDigits: 2})}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
