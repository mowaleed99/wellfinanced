import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SavingsHub() {
  const buckets = [
    { id: 1, name: 'Emergency Fund', amount: 18000, target: 20000, progress: 90, icon: 'emergency', color: 'text-error' },
    { id: 2, name: 'Tax Reserve', amount: 12450, target: 14000, progress: 82, icon: 'account_balance_wallet', color: 'text-secondary' },
    { id: 3, name: 'General Savings', amount: 12130, target: null, progress: 60, icon: 'savings', color: 'text-tertiary' },
  ];

  const activity = [
    { id: 1, label: 'Monthly Transfer', sub: 'Aug 24 • To Emergency Fund', amount: '+$1,500', color: 'text-primary', icon: 'keyboard_double_arrow_right' },
    { id: 2, label: 'AI Auto-Save', sub: 'Aug 22 • Round-ups', amount: '+$42.50', color: 'text-secondary', icon: 'auto_awesome' },
  ];

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      {/* Hero Card */}
      <section className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-primary-container to-secondary-container shadow-[0_0_20px_rgba(46,91,255,0.15)]">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 blur-3xl rounded-full"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <span className="text-label-sm font-label-sm uppercase tracking-widest text-on-primary-container/70">Total Savings Balance</span>
          <h2 className="text-[40px] font-display-lg font-extrabold text-white tracking-tight">$42,580.00</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="material-symbols-outlined text-white text-sm">trending_up</span>
            <span className="text-label-sm text-white/80">+12.4% this month</span>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Link to="/goals" className="bg-white/20 hover:bg-white/30 transition-all text-white px-4 py-2 rounded-xl text-label-sm font-label-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span> New Saving Goal
          </Link>
        </div>
      </section>

      {/* AI Recommendation */}
      <section className="glass-card rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-secondary-container to-primary-container flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white" style={{fontVariationSettings:"'FILL' 1"}}>psychology</span>
          </div>
          <div>
            <h3 className="text-primary font-bold text-lg">AI Recommendation</h3>
            <p className="text-sm text-on-surface-variant mt-1">Based on your recent $8.4k gig income, we suggest increasing your savings rate to <span className="text-primary font-bold">25%</span> this month.</p>
          </div>
        </div>
        <div className="mt-4 bg-surface-container-low rounded-xl p-4 flex items-center justify-between border border-white/5">
          <div>
            <span className="text-label-sm text-on-surface-variant block">Potential Growth</span>
            <span className="font-data-mono text-tertiary text-lg font-bold">+$2,100.00</span>
          </div>
          <button className="bg-primary hover:bg-primary-fixed-dim transition-colors text-on-primary px-6 py-2 rounded-lg text-label-sm font-bold">
            Apply Now
          </button>
        </div>
      </section>

      {/* Savings Buckets */}
      <section className="grid grid-cols-1 gap-4">
        {buckets.map(bucket => (
          <div key={bucket.id} className="glass-card rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined ${bucket.color} text-[20px]`}>{bucket.icon}</span>
                <h4 className="font-bold text-white">{bucket.name}</h4>
              </div>
              <span className="font-data-mono text-white font-bold">${bucket.amount.toLocaleString()}.00</span>
            </div>
            {bucket.target && <p className="text-[10px] text-on-surface-variant">Target: ${bucket.target.toLocaleString()}</p>}
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full" style={{ width: `${bucket.progress}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-outline uppercase font-bold">
              <span>Progress</span><span>{bucket.progress}%</span>
            </div>
          </div>
        ))}
      </section>

      {/* Savings Activity */}
      <section className="glass-card rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white text-lg">Savings Activity</h3>
          <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
        </div>
        <div className="space-y-4">
          {activity.map(item => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.label}</p>
                  <p className="text-label-sm text-on-surface-variant">{item.sub}</p>
                </div>
              </div>
              <span className={`font-data-mono font-bold text-sm ${item.color}`}>{item.amount}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
