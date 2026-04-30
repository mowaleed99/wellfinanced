import { useState } from 'react';

export default function GoalSettings() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="px-container-padding space-y-stack-lg pb-12">
      {/* Header section */}
      <section className="pt-2">
        <h1 className="text-display-lg font-display-lg text-white tracking-tight mb-2">Financial Goals</h1>
        <p className="font-body-base text-on-surface-variant">Track your progress and set new targets.</p>
      </section>

      {/* Tabs */}
      <div className="flex bg-surface-container-low p-1 rounded-2xl border border-white/5">
        <button 
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2.5 rounded-xl font-label-sm uppercase tracking-wider transition-all duration-300 ${activeTab === 'active' ? 'bg-primary-container text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          Active Goals
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2.5 rounded-xl font-label-sm uppercase tracking-wider transition-all duration-300 ${activeTab === 'completed' ? 'bg-primary-container text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          Completed
        </button>
      </div>

      {/* Goal Cards */}
      <div className="space-y-stack-md">
        
        {/* Goal 1: Emergency Fund */}
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden group border-primary/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center border border-primary/20 text-primary">
                  <span className="material-symbols-outlined">health_and_safety</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-white">Emergency Fund</h3>
                  <p className="font-label-sm text-outline uppercase tracking-wider mt-0.5">3 Months Runway</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-white p-2">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <p className="font-data-mono text-xl text-white font-medium">$8,450 <span className="text-sm text-slate-500 font-normal">/ $12,000</span></p>
                <span className="font-label-sm text-primary font-bold">70%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(46,91,255,0.5)]" style={{width: '70%'}}></div>
              </div>
              <p className="text-xs text-slate-400">Est. completion: <span className="text-white">Oct 2024</span> (AI prediction based on current cashflow)</p>
            </div>
          </div>
        </div>

        {/* Goal 2: New Workstation */}
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden group border-tertiary/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container/20 flex items-center justify-center border border-secondary/20 text-secondary">
                  <span className="material-symbols-outlined">computer</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-white">New Workstation</h3>
                  <p className="font-label-sm text-outline uppercase tracking-wider mt-0.5">Equipment Upgrade</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-white p-2">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <p className="font-data-mono text-xl text-white font-medium">$1,200 <span className="text-sm text-slate-500 font-normal">/ $3,500</span></p>
                <span className="font-label-sm text-secondary font-bold">34%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(220,184,255,0.5)]" style={{width: '34%'}}></div>
              </div>
              <p className="text-xs text-slate-400">Est. completion: <span className="text-white">Jan 2025</span></p>
            </div>
          </div>
        </div>

      </div>

      {/* FAB - Add new goal */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-tr from-primary to-primary-container rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(46,91,255,0.4)] active:scale-90 transition-transform z-40">
        <span className="material-symbols-outlined text-white text-3xl font-light">add</span>
      </button>
    </div>
  );
}
