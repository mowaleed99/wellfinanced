import { Link, useLocation } from 'react-router-dom';

export default function BottomNavBar() {
  const location = useLocation();

  // Don't show nav bar on auth screens
  const hiddenRoutes = ['/', '/login', '/signup'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const NavItem = ({ to, icon, label, isActive }) => (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-150 ${
        isActive 
          ? 'text-blue-400 bg-blue-500/10 rounded-xl py-1 px-3 shadow-[0_0_15px_rgba(46,91,255,0.3)]' 
          : 'text-slate-500 hover:text-slate-300 px-3 py-1'
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-sans text-[10px] font-semibold uppercase tracking-wider mt-1">{label}</span>
    </Link>
  );

  return (
    <nav className="fixed bottom-0 w-full max-w-md z-50 flex justify-between items-center px-4 py-3 pb-safe bg-slate-900/90 backdrop-blur-lg border-t border-white/10 rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <NavItem to="/dashboard" icon="home" label="Home" isActive={location.pathname === '/dashboard'} />
      <NavItem to="/linked-accounts" icon="account_balance" label="Accounts" isActive={location.pathname === '/linked-accounts'} />
      <NavItem to="/history" icon="receipt_long" label="History" isActive={location.pathname === '/history' || location.pathname.startsWith('/transaction')} />
      <NavItem to="/installments" icon="event_repeat" label="Installments" isActive={location.pathname === '/installments'} />
      <NavItem to="/notifications" icon="notifications" label="Alerts" isActive={location.pathname === '/notifications'} />
    </nav>
  );
}
