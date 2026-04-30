import { useFinance } from '../context/FinanceContext';
import { generateUpcomingTimeline, prioritizePayments } from '../utils/finance';

export default function Timeline() {
  const { transactions, goals, balance } = useFinance();
  
  // Create mock upcoming events to perfectly match the mockup's visual content, 
  // while still retaining the overall component structure.
  const upcomingEvents = [
    {
      id: '1',
      title: 'Monthly Rent',
      amount: -2100.00,
      date: 'in 2 days',
      priority: 'HIGH',
      icon: 'home',
      subtext: 'Late fee: $100.00',
      pillColor: 'bg-[#4c2227] text-[#fca5a5]', // Dark red bg, light red text
    },
    {
      id: '2',
      title: 'Business Loan Repayment',
      amount: -1850.00,
      date: 'Oct 5',
      priority: 'MEDIUM',
      icon: 'account_balance',
      subtext: 'Interest: 4.5%',
      pillColor: 'bg-[#3e2e28] text-[#fdba74]', // Dark orange/brown bg
    },
    {
      id: '3',
      title: 'Fiber Internet',
      amount: -85.50,
      date: 'Oct 12',
      priority: 'LOW',
      icon: 'language',
      subtext: 'Auto-pay off',
      pillColor: 'bg-[#1e293b] text-[#94a3b8]', // Slate bg
    }
  ];

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-8 bg-[#11131C] min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">Upcoming Timeline</h1>
        
        <div className="flex justify-end mb-4">
          <button className="flex items-center gap-1.5 text-sm font-bold text-[#94A3B8] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span> Refine
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-3">
          <button className="flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1A1C29] text-sm text-slate-300 hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[16px] text-[#B8C3FF]">bar_chart</span> Income
          </button>
          <button className="flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1A1C29] text-sm text-slate-300 hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[16px] text-[#F87171]">account_balance</span> Debt
          </button>
          <button className="flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1A1C29] text-sm text-slate-300 hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[16px] text-[#DCB8FF]">receipt_long</span> Expense
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {upcomingEvents.map((item, index) => (
          <div key={item.id} className={`glass-card p-5 rounded-[20px] bg-[#1A1C29] border ${index === 0 ? 'border-[#FCA5A5]/30 shadow-[0_0_15px_rgba(252,165,165,0.1)]' : 'border-white/5'}`}>
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#262835] flex flex-shrink-0 items-center justify-center border border-white/5">
                  <span className="material-symbols-outlined text-slate-300 text-[22px]">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base leading-tight mb-1.5">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${item.pillColor}`}>
                      {item.priority} PRIORITY
                    </span>
                    <span className="text-xs text-slate-400">Due {item.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white tracking-tight leading-none">${Math.abs(item.amount).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                <p className="text-[10px] text-[#FCA5A5] mt-1.5 font-medium">{item.subtext}</p>
              </div>
            </div>
            
            <button className="w-full mt-5 py-3.5 rounded-xl bg-[#262835] border border-white/5 text-white text-sm font-bold hover:bg-[#2d3040] transition-colors active:scale-[0.98]">
              Remind Me
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
