import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TaxPreferences() {
  const [autoSave, setAutoSave] = useState(true);
  const [reminders, setReminders] = useState(true);

  const Toggle = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
    <div onClick={onToggle} className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${value ? 'bg-primary-container' : 'bg-surface-container-highest'}`}>
      <div className={`absolute top-0.5 h-5 w-5 bg-white rounded-full border border-gray-300 transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
    </div>
  );

  const history = [
    { label: 'Q4 Estimated Payment', date: 'Jan 15, 2024', amount: '$3,850.00' },
    { label: 'Q3 Estimated Payment', date: 'Oct 15, 2023', amount: '$3,210.45' },
    { label: 'Q2 Estimated Payment', date: 'Jul 15, 2023', amount: '$4,100.20' },
  ];

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex items-center gap-3 mb-2">
        <Link to="/profile" className="text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-headline-md font-headline-md text-white">Tax Preferences</h1>
          <p className="text-label-sm text-on-surface-variant">Configure your automated AI tax agent settings</p>
        </div>
      </header>

      {/* Withholding Card */}
      <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 border-primary-container/20">
        <div className="flex justify-between items-start">
          <div className="bg-primary-container/20 p-3 rounded-lg">
            <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
          </div>
          <span className="text-label-sm text-primary font-bold">OPTIMIZED BY AI</span>
        </div>
        <div>
          <p className="text-label-sm text-on-surface-variant mb-1">Automated Tax Withholding</p>
          <div className="flex items-baseline gap-1">
            <span className="font-data-mono text-[40px] text-white leading-none">20</span>
            <span className="font-data-mono text-headline-md text-primary">%</span>
          </div>
        </div>
        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-container to-primary w-1/5"></div>
        </div>
        <p className="text-label-sm text-on-surface-variant">Based on your projected annual earnings of $84,200.</p>
      </div>

      {/* Next Payment */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="material-symbols-outlined text-tertiary/40 text-4xl">event_upcoming</span>
        </div>
        <div className="space-y-4">
          <div className="bg-tertiary-container/20 p-3 w-fit rounded-lg">
            <span className="material-symbols-outlined text-tertiary">schedule</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant">Next Payment Due</p>
            <h3 className="text-headline-md font-headline-md text-white">April 15, 2024</h3>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-highest/50 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined text-tertiary text-sm">info</span>
            <p className="text-label-sm text-tertiary">Estimated: $4,240.50</p>
          </div>
          <button className="w-full py-3 bg-tertiary-container text-on-tertiary-container font-label-sm rounded-lg hover:opacity-90 active:scale-95 transition-all">
            Prepare Form 1040-ES
          </button>
        </div>
      </div>

      {/* Toggles */}
      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">auto_mode</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Auto-save for Taxes</p>
              <p className="text-label-sm text-on-surface-variant">Move withholding amount to Tax Vault daily</p>
            </div>
          </div>
          <Toggle value={autoSave} onToggle={() => setAutoSave(!autoSave)} />
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">notifications_active</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Reminder Alerts</p>
              <p className="text-label-sm text-on-surface-variant">Notify me 7 days before filing deadlines</p>
            </div>
          </div>
          <Toggle value={reminders} onToggle={() => setReminders(!reminders)} />
        </div>
      </div>

      {/* Payment History */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-white text-lg">Payment History</h4>
          <button className="text-label-sm text-primary flex items-center gap-1 font-bold">
            Export CSV <span className="material-symbols-outlined text-sm">download</span>
          </button>
        </div>
        <div className="space-y-3">
          {history.map(item => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:border-primary-container/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-green-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-400">check_circle</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{item.label}</p>
                  <p className="text-label-sm text-on-surface-variant">{item.date}</p>
                </div>
              </div>
              <p className="font-data-mono text-white text-sm">{item.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI CTA */}
      <div className="p-4 bg-primary-container/10 border border-primary-container/20 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_20px_rgba(46,91,255,0.3)]">
            <span className="material-symbols-outlined text-white">smart_toy</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Unsure about your tax bracket?</p>
            <p className="text-label-sm text-on-surface-variant">WellFinanced can analyze your 1099s and optimize withholding.</p>
          </div>
        </div>
        <Link to="/ai-assistant" className="w-full text-center px-6 py-3 bg-white text-primary-container font-bold rounded-xl active:scale-95 transition-transform block">
          Consult AI Assistant
        </Link>
      </div>
    </div>
  );
}
