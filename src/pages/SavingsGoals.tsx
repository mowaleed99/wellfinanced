import { Link } from 'react-router-dom';

export default function SavingsGoals() {
  const goals = [
    { id: 1, name: 'Emergency Fund', sub: '6 Months Coverage', icon: 'health_and_safety', color: 'text-secondary', saved: 12300, target: 15000, eta: 'Oct 2024' },
    { id: 2, name: 'New Laptop', sub: 'MacBook Pro M3 Max', icon: 'laptop_mac', color: 'text-tertiary', saved: 1800, target: 4000, eta: 'Jan 2025' },
  ];

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex justify-between items-end mb-2">
        <div>
          <p className="text-label-sm text-primary uppercase tracking-widest">Financial Progress</p>
          <h1 className="text-display-lg font-display-lg text-white mt-1">Savings Goals</h1>
        </div>
        <button className="bg-primary-container text-white text-label-sm px-4 py-2.5 rounded-xl flex items-center gap-2 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[18px]">add</span> NEW GOAL
        </button>
      </header>

      {/* AI Insight Hero */}
      <section className="rounded-2xl p-6 text-white relative overflow-hidden" style={{background: 'linear-gradient(135deg, #2e5bff 0%, #7701d0 100%)', boxShadow: '0 10px 40px -10px rgba(46,91,255,0.4)'}}>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings:"'FILL' 1"}}>smart_toy</span>
            </div>
            <div>
              <h3 className="font-bold text-xl">AI Savings Insight</h3>
              <p className="text-white/80 text-sm mt-1 leading-relaxed">
                Based on your lower coffee & transit spend, you can accelerate your <span className="font-bold underline decoration-white/40">New Laptop</span> goal by <span className="font-bold">14 days</span> if you auto-transfer $85 today.
              </p>
            </div>
          </div>
          <button className="bg-white text-primary-container px-6 py-3 rounded-xl font-label-sm font-bold hover:shadow-lg transition-all active:scale-95 w-fit">
            OPTIMIZE NOW
          </button>
        </div>
      </section>

      {/* Goal Cards */}
      <section className="space-y-4">
        {goals.map(goal => {
          const progress = Math.round((goal.saved / goal.target) * 100);
          return (
            <div key={goal.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center border border-white/10">
                    <span className={`material-symbols-outlined text-2xl ${goal.color}`}>{goal.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{goal.name}</h4>
                    <p className="text-label-sm text-outline">{goal.sub}</p>
                  </div>
                </div>
                <span className="text-primary font-data-mono font-bold">{progress}%</span>
              </div>

              <div>
                <div className="flex justify-between text-label-sm text-outline mb-2">
                  <span>${goal.saved.toLocaleString()} saved</span>
                  <span>Target: ${goal.target.toLocaleString()}</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                  <div className="h-full bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  <span className="text-label-sm">ETA: {goal.eta}</span>
                </div>
                <button className="text-primary text-label-sm font-bold hover:underline">Add Funds</button>
              </div>
            </div>
          );
        })}

        {/* Tax Goal — Wide card */}
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-secondary-container border border-white/10">
              <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>
            <div>
              <h4 className="font-bold text-white text-xl">Q3 Estimated Tax</h4>
              <p className="text-on-surface-variant text-sm">Keep up with Uncle Sam</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-label-sm text-outline uppercase">Target Date</p>
              <p className="font-bold text-white text-lg">Sep 15</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between font-data-mono text-slate-300 mb-2">
              <span>$6,420.00</span>
              <span className="text-green-400">75% Complete</span>
            </div>
            <div className="h-5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
              <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.3)]" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projected Growth Chart */}
      <section className="glass-card rounded-3xl p-6">
        <h3 className="font-bold text-white text-lg mb-4">Projected Growth</h3>
        <div className="h-32 w-full flex items-end justify-between gap-2">
          {[
            { h: 40, color: 'bg-blue-500/10', label: 'Jun' },
            { h: 55, color: 'bg-blue-500/20', label: 'Jul' },
            { h: 45, color: 'bg-blue-500/30', label: 'Aug' },
            { h: 70, color: 'bg-green-500/40', label: 'Sep' },
            { h: 85, color: 'bg-green-500/50', label: 'Oct' },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full ${bar.color} rounded-t-lg`} style={{ height: `${bar.h}%` }}></div>
              <span className="text-[9px] text-outline uppercase">{bar.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-label-sm text-outline uppercase">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-label-sm text-outline uppercase">Projected</span>
            </div>
          </div>
          <p className="text-sm text-slate-300">Total: <span className="text-white font-bold">$20,520.00</span></p>
        </div>
      </section>
    </div>
  );
}
