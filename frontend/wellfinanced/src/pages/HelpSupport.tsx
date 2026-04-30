import { Link } from 'react-router-dom';

export default function HelpSupport() {
  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex items-center gap-3 mb-6">
        <Link to="/dashboard" className="text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-display-lg font-display-lg text-white">Help & Support</h1>
      </header>

      <div className="space-y-4">
        <div className="glass-card p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Chat with Support</h3>
              <p className="text-xs text-outline">Typically replies in 5 minutes</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline">chevron_right</span>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 text-secondary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">article</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Read FAQs</h3>
              <p className="text-xs text-outline">Articles about billing, forecasting, etc.</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline">chevron_right</span>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tertiary/20 text-tertiary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">email</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Email Us</h3>
              <p className="text-xs text-outline">support@wellfinanced.app</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline">chevron_right</span>
        </div>
      </div>
    </div>
  );
}
