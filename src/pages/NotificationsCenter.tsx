import { Link } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';

/** Maps backend NotificationReason → display type for existing JSX */
function reasonToType(reason: string): 'alert' | 'success' | 'info' {
  if (reason === 'alert' || reason === 'warning') return 'alert';
  if (reason === 'suggestion') return 'success';
  return 'info';
}

/** Formats ISO datetime → human-readable relative string */
function formatTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function NotificationsCenter() {
  const { notifications, markAllNotificationsRead } = useFinance();

  // Map backend Notification → shape expected by the existing JSX below
  const displayNotifications = notifications.map(n => ({
    id: n.id,
    type: reasonToType(n.reason),
    title: n.reason.charAt(0).toUpperCase() + n.reason.slice(1).replace('_', ' '),
    desc: n.message,
    time: formatTime(n.created_at),
    read: n.status !== 'pending',
  }));

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-display-lg font-display-lg text-white">Notifications</h1>
        </div>
        <button onClick={markAllNotificationsRead} className="text-primary text-xs font-bold uppercase tracking-wider">
          Mark All Read
        </button>
      </header>

      <div className="space-y-3">
        {displayNotifications.map((notif) => (
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
