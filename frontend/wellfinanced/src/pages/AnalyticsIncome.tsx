export default function AnalyticsIncome() {
  return (
    <div className="px-container-padding space-y-stack-lg pb-12">
      {/* Predictive Income Hero Card */}
      <section className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-primary-container to-secondary-container text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <span className="material-symbols-outlined text-[120px]">trending_up</span>
        </div>
        <div className="relative z-10">
          <p className="font-label-sm uppercase tracking-widest text-white/70">Predictive Income Q3</p>
          <h1 className="font-display-lg mt-1">$12,450.00</h1>
          
          <div className="flex items-center gap-2 mt-4 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
            <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            <span className="text-xs font-semibold">+18% vs Last Quarter</span>
          </div>
        </div>
      </section>

      {/* Detailed Earnings Chart */}
      <section className="glass-card rounded-3xl p-6 inner-glow">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline-md text-white">Earnings Forecast</h2>
            <p className="font-label-sm text-outline">Historical vs. AI Prediction</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-[10px] font-bold uppercase text-outline">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary"></div>
              <span className="text-[10px] font-bold uppercase text-outline">Predicted</span>
            </div>
          </div>
        </div>
        
        {/* SVG Chart */}
        <div className="h-48 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 400 150">
            {/* Grid Lines */}
            <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="400" y1="30" y2="30"></line>
            <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="400" y1="75" y2="75"></line>
            <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="400" y1="120" y2="120"></line>
            
            {/* Historical Path */}
            <path d="M0,120 L50,110 L100,130 L150,90 L200,85 L250,75" fill="none" stroke="#b8c3ff" strokeLinecap="round" strokeWidth="3"></path>
            
            {/* Prediction Path (Dashed/Neon) */}
            <path d="M250,75 L300,55 L350,40 L400,20" fill="none" stroke="#ffb59b" strokeDasharray="8,4" strokeLinecap="round" strokeWidth="3"></path>
            
            {/* Glow effect for prediction */}
            <circle className="animate-pulse" cx="250" cy="75" fill="#b8c3ff" r="4"></circle>
          </svg>
          <div className="flex justify-between mt-4 font-label-sm text-outline opacity-50 px-1">
            <span>APR</span>
            <span>MAY</span>
            <span>JUN</span>
            <span>JUL</span>
            <span>AUG</span>
            <span>SEP</span>
          </div>
        </div>
      </section>

      {/* Current Projects Bento Grid */}
      <section className="space-y-stack-md">
        <h2 className="font-headline-md px-1 text-white">Income Sources</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between col-span-2 relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
              <div className="space-y-1">
                <p className="font-label-sm text-outline">SaaS Platform UI</p>
                <p className="font-data-mono text-white">$4,200</p>
              </div>
              <span className="material-symbols-outlined text-primary">web</span>
            </div>
            <div className="mt-4 flex flex-col gap-2 z-10">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-outline">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-3/4 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-9xl">web</span>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between col-span-2 relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
              <div className="space-y-1">
                <p className="font-label-sm text-outline">Brand Identity</p>
                <p className="font-data-mono text-white">$2,800</p>
              </div>
              <span className="material-symbols-outlined text-tertiary">brand_awareness</span>
            </div>
            <div className="mt-4 flex flex-col gap-2 z-10">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-outline">
                <span>Progress</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full w-1/4 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-9xl">brand_awareness</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stable Salary Recommendation */}
      <section className="glass-card rounded-3xl p-6 border-primary/20 neon-glow-blue mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
          </div>
          <div>
            <h2 className="font-headline-md text-white leading-tight">Stable Salary</h2>
            <p className="font-label-sm text-outline">AI Financial Optimizer</p>
          </div>
        </div>
        <p className="font-body-base text-on-surface-variant mb-6 leading-relaxed">
          Based on your pipeline, we recommend a fixed monthly payout of <span className="text-primary font-bold">$6,500</span> to ensure runway during dry periods.
        </p>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-label-sm text-white">Target Monthly Budget</span>
            <span className="font-data-mono text-primary">$6,500</span>
          </div>
          <input className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-container" max="10000" min="3000" type="range" defaultValue="6500"/>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-outline uppercase font-bold mb-1">Emergency Fund</p>
              <p className="font-data-mono text-white text-sm">+$1,200/mo</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-outline uppercase font-bold mb-1">Safety Margin</p>
              <p className="font-data-mono text-white text-sm">4.2 Months</p>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-6 py-4 bg-primary-container text-white font-headline-md text-base rounded-2xl shadow-xl active:scale-95 duration-200 flex items-center justify-center gap-2">
          Apply Smart Budgeting
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </section>
    </div>
  );
}
