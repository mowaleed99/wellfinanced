import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="px-container-padding pb-24 pt-4 bg-[#11131C] min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-blue-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </Link>
          <h1 className="text-[20px] font-bold text-white tracking-tight">Settings</h1>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[24px]">search</span>
        </button>
      </header>

      {/* User Profile Card */}
      <div className="glass-card rounded-[20px] p-5 bg-gradient-to-r from-[#1A1C29] to-[#1E2541] border border-white/5 relative mb-8 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-[68px] h-[68px] rounded-full p-0.5 bg-gradient-to-b from-[#60A5FA] to-[#8B5CF6]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9f-l4_v8v6Qv_Q5_n33x8H_T_xG4eK_mQh9D_J9sL3wT_FfT_zV3oV-pYq9u_B9rT5yG_P_R9xQYQ2T_E5xG_F9P9wX_yQy9T5wP9X_yQ_Q2T_E5xG_F9P9wX_yQy9T5wP9X_yQ_Q2T_E5xG_F9=s120-c" 
              alt="Profile" 
              className="w-full h-full rounded-full border-2 border-[#11131C] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Wafaa+Sakr&background=2563EB&color=fff";
              }}
            />
          </div>
          <div>
            <h2 className="text-[22px] font-bold text-white leading-tight mb-1">Wafaa Sakr</h2>
            <div className="flex items-center gap-2">
              <span className="bg-[#3B82F6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Pro Tier
              </span>
              <span className="text-[12px] text-slate-400">
                Active since<br/>2023
              </span>
            </div>
          </div>
        </div>
        <button className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[16px] text-slate-300">edit</span>
        </button>
      </div>

      {/* App Settings */}
      <div className="mb-6">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
          App Settings
        </h3>
        <div className="glass-card rounded-[16px] bg-[#151722] border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-300 text-[22px]">notifications_active</span>
              <span className="text-[15px] text-slate-200 font-medium">Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-slate-400">On</span>
              <span className="material-symbols-outlined text-slate-500 text-[20px]">chevron_right</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-300 text-[22px]">shield</span>
              <span className="text-[15px] text-slate-200 font-medium">Security & Privacy</span>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-[20px]">chevron_right</span>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-300 text-[22px]">language</span>
              <span className="text-[15px] text-slate-200 font-medium">Language</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-slate-400">English</span>
              <span className="material-symbols-outlined text-slate-500 text-[20px]">chevron_right</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="mb-6">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
          Resources
        </h3>
        <div className="glass-card rounded-[16px] bg-[#151722] border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-300 text-[22px]">help_outline</span>
              <span className="text-[15px] text-slate-200 font-medium">Help & Support</span>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-[20px]">chevron_right</span>
          </div>
          
          <div className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-300 text-[22px]">description</span>
              <span className="text-[15px] text-slate-200 font-medium">Export & Reports</span>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-[20px]">chevron_right</span>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-300 text-[22px]">forum</span>
              <span className="text-[15px] text-slate-200 font-medium">Community Discord</span>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-[18px]">open_in_new</span>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button className="w-full py-4 rounded-[16px] bg-[#151722] border border-white/5 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors active:scale-[0.98]">
        <span className="material-symbols-outlined text-[#FCA5A5] text-[22px]">logout</span>
        <span className="text-[15px] font-bold text-[#FCA5A5]">Sign Out</span>
      </button>

      <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest mt-8">
        Version 2.4.0 (AI Core: 0.9B)
      </p>
    </div>
  );
}
