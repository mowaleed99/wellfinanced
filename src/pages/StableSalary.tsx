import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function StableSalary() {
  const [buffer, setBuffer] = useState(15);
  const grossAvg = 7820;
  const taxProvision = Math.round(grossAvg * 0.20);
  const safetyBuffer = Math.round(grossAvg * (buffer / 100));
  const netSalary = grossAvg - taxProvision - safetyBuffer;

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex items-center gap-3 mb-2">
        <Link to="/profile" className="text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-xl font-black text-white uppercase tracking-tight">Stable Salary</h1>
      </header>

      <section className="glass-card rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-primary-container/20 to-transparent">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-3xl rounded-full"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <div>
            <p className="text-label-sm text-primary uppercase tracking-widest">Recommended Monthly Payout</p>
            <h2 className="text-display-lg font-display-lg text-white mt-1">${netSalary.toLocaleString()}<span className="text-primary-container">.00</span></h2>
            <p className="text-on-surface-variant text-sm flex items-center gap-2 mt-2">
              <span className="material-symbols-outlined text-green-400 text-[18px]">verified</span>
              Optimized for long-term stability
            </p>
          </div>
          <button className="w-full bg-primary-container text-white px-6 py-3 rounded-xl font-semibold active:scale-95 transition-all">Update Payout</button>
        </div>
      </section>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">security</span>
            <h3 className="font-bold text-white">Safety Buffer</h3>
          </div>
          <span className="font-data-mono text-primary font-bold">{buffer}%</span>
        </div>
        <input type="range" min="0" max="40" value={buffer} onChange={e => setBuffer(Number(e.target.value))} className="w-full accent-primary" />
        <p className="text-label-sm text-on-surface-variant">Allocating ${safetyBuffer.toLocaleString()} monthly to your "Dry Season" reserve.</p>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-tertiary">history</span>
          <h3 className="font-bold text-white">Income Baseline</h3>
        </div>
        <div className="flex items-end gap-2 h-20">
          {[50, 75, 100, 65, 50, 80].map((h, i) => (
            <div key={i} className={`flex-1 rounded-t-sm ${i === 2 ? 'bg-primary-container/80' : 'bg-surface-container'}`} style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <p className="text-label-sm text-on-surface-variant">Based on your 12-month average of <span className="text-white">${grossAvg.toLocaleString()}</span>.</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-bold text-white mb-4">Salary Calculation</h3>
        <div className="space-y-3">
          {[
            { icon: 'payments', color: 'text-slate-400', label: 'Gross Monthly Average', value: `$${grossAvg.toLocaleString()}.00`, valueColor: 'text-white' },
            { icon: 'account_balance_wallet', color: 'text-error', label: 'Estimated Tax Provision', value: `-$${taxProvision.toLocaleString()}.00`, valueColor: 'text-error' },
            { icon: 'savings', color: 'text-primary', label: `Safety Buffer (${buffer}%)`, value: `-$${safetyBuffer.toLocaleString()}.00`, valueColor: 'text-primary' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${row.color}`}>{row.icon}</span>
                <span className="text-sm text-white">{row.label}</span>
              </div>
              <span className={`font-data-mono ${row.valueColor}`}>{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center py-3 bg-white/5 rounded-lg px-4 mt-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400">check_circle</span>
              <span className="font-bold text-white">Target Net Salary</span>
            </div>
            <span className="font-data-mono text-green-400 font-bold text-xl">${netSalary.toLocaleString()}.00</span>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 border border-green-500/20 bg-green-500/5">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-white">Stability Score</h3>
          <div className="text-green-400 font-bold text-xl">94/100</div>
        </div>
        <div className="mt-3 h-2 bg-surface-container rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-[94%] shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
        </div>
        <p className="mt-2 text-label-sm text-on-surface-variant">Top 5% of freelancers. Your configuration is highly resilient to market fluctuations.</p>
      </div>
    </div>
  );
}
