import { Link } from 'react-router-dom';

export default function Plans() {
  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-8 bg-[#11131C] min-h-screen">
      {/* Top Main Card */}
      <div className="rounded-[24px] p-6 relative overflow-hidden bg-gradient-to-br from-[#4F46E5] to-[#9333EA] shadow-[0_10px_40px_rgba(147,51,234,0.3)]">
        <h2 className="text-[11px] font-bold text-white/80 uppercase tracking-[0.15em] mb-1">
          Total Savings Balance
        </h2>
        <div className="text-[42px] font-bold text-white tracking-tight leading-none mb-3">
          $42,580.00
        </div>
        
        <div className="flex justify-between items-end mt-6">
          <div className="flex items-center gap-1.5 text-white/90">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="text-[13px] font-medium">+12.4% this month</span>
          </div>
          
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors border border-white/10 text-white text-[13px] font-bold">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Saving Goal
          </button>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <div className="glass-card rounded-[24px] p-5 bg-[#1A1C29] border border-white/5 shadow-lg mt-6">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-[#6366F1] flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <span className="material-symbols-outlined text-white text-[24px]">psychology</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#E2E8F0] mb-1.5 leading-tight">AI Recommendation</h3>
            <p className="text-[14px] text-slate-400 leading-relaxed pr-2">
              Based on your recent $8.4k gig income, we suggest increasing your savings rate to <span className="text-[#A5B4FC]">25%</span> this month.
            </p>
          </div>
        </div>
        
        <div className="mt-5 bg-[#11131C] rounded-[16px] p-4 flex justify-between items-center border border-white/5">
          <div>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Potential Growth</p>
            <p className="text-[18px] font-bold text-[#FCA5A5] tracking-tight">+$2,100.00</p>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-[#A5B4FC] text-[#11131C] text-[13px] font-bold shadow-[0_0_15px_rgba(165,180,252,0.2)] hover:brightness-110 active:scale-95 transition-all">
            Apply Now
          </button>
        </div>
      </div>

      {/* Emergency Fund */}
      <div className="glass-card rounded-[24px] p-5 bg-[#1A1C29] border border-white/5 mt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-[17px] font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FCA5A5] text-[20px]">asterisk</span>
              Emergency Fund
            </h3>
            <p className="text-[13px] text-slate-400 mt-1">6 months of stability</p>
          </div>
          <span className="text-[18px] font-bold text-white tracking-tight">$18,000.00</span>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progress</span>
            <span className="text-[11px] font-bold text-white">90%</span>
          </div>
          <div className="w-full h-2.5 bg-[#11131C] rounded-full overflow-hidden">
            <div className="h-full bg-[#60A5FA] rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" style={{ width: '90%' }}></div>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Tax Reserve */}
        <div className="glass-card rounded-[24px] p-5 bg-[#1A1C29] border border-white/5">
          <h3 className="text-[15px] font-bold text-white flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#C084FC] text-[18px]">account_balance_wallet</span>
            Tax Reserve
          </h3>
          <p className="text-[20px] font-bold text-white tracking-tight mb-1">$12,450.00</p>
          <p className="text-[11px] text-slate-400 mb-5">Estimated Q3: $14,000</p>
          
          <div className="w-full h-2 bg-[#11131C] rounded-full overflow-hidden">
            <div className="h-full bg-[#C084FC] rounded-full shadow-[0_0_8px_rgba(192,132,252,0.4)]" style={{ width: '85%' }}></div>
          </div>
        </div>
        
        {/* General */}
        <div className="glass-card rounded-[24px] p-5 bg-[#1A1C29] border border-white/5 flex flex-col">
          <h3 className="text-[15px] font-bold text-white flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#FCA5A5] text-[18px]">savings</span>
            General
          </h3>
          <p className="text-[20px] font-bold text-white tracking-tight mb-1">$12,130.00</p>
          <p className="text-[11px] text-slate-400 mb-5">No target set</p>
          
          <div className="mt-auto flex gap-1">
            <div className="w-6 h-6 rounded-full bg-[#475569] border-2 border-[#1A1C29] shadow-sm z-30"></div>
            <div className="w-6 h-6 rounded-full bg-[#64748B] border-2 border-[#1A1C29] shadow-sm -ml-3 z-20"></div>
            <div className="w-6 h-6 rounded-full bg-[#94A3B8] border-2 border-[#1A1C29] shadow-sm -ml-3 z-10"></div>
          </div>
        </div>
      </div>

      {/* Savings Activity */}
      <div className="glass-card rounded-[24px] p-5 bg-[#1A1C29] border border-white/5 mt-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[18px] font-bold text-white">Savings Activity</h3>
          <button className="text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2E2442] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#A5B4FC] text-[20px]">keyboard_double_arrow_right</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-white truncate">Monthly Transfer</p>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">Aug 24 • To Emergency Fund</p>
            </div>
            <p className="text-[15px] font-bold text-[#A5B4FC] tracking-tight">+$1,500</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1F1B2C] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#C084FC] text-[20px]">magic_button</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-slate-300 truncate">AI Auto-Save</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">Aug 22 • Round-ups</p>
            </div>
            <p className="text-[15px] font-medium text-[#C084FC] tracking-tight">+$42.50</p>
          </div>
        </div>
      </div>

    </div>
  );
}
