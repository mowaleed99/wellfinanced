import { Link } from 'react-router-dom';

export default function NotificationsCenter() {
  const notifications = [
    { id: 1, type: 'alert', title: 'Payment Overdue', desc: 'AWS Hosting payment of $45 is overdue by 2 days.', time: '2 hours ago', read: false },
    { id: 2, type: 'success', title: 'Invoice Paid', desc: 'Client Alpha paid their $2,400 invoice.', time: 'Yesterday', read: true },
    { id: 3, type: 'info', title: 'AI Forecast Updated', desc: 'Your 30-day income forecast has been updated based on recent trends.', time: 'Oct 2, 2024', read: true }
  ];

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-display-lg font-display-lg text-white">Notifications</h1>
        </div>
        <button className="text-primary text-xs font-bold uppercase tracking-wider">
          Mark All Read
        </button>
      </header>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-4 rounded-2xl flex gap-4 ${notif.read ? 'bg-transparent border border-white/5 opacity-70' : 'glass-card border-l-4 border-l-primary'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              notif.type === 'alert' ? 'bg-error/20 text-error' :
              notif.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'
            }`}>
              <span className="material-symbols-outlined text-[20px]">
                {notif.type === 'alert' ? 'warning' : notif.type === 'success' ? 'check_circle' : 'info'}
              </span>
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-white font-bold text-sm">{notif.title}</h3>
                <span className="text-[10px] text-outline whitespace-nowrap ml-2">{notif.time}</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{notif.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
