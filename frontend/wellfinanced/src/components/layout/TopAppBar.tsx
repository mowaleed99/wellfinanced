import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function TopAppBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show top bar on onboarding or auth screens
  if (location.pathname === '/') return null;

  const isAuthScreen = ['/login', '/signup'].includes(location.pathname);
  const hasBackButton = ['/login', '/signup', '/stable-salary', '/tax-preferences', '/linked-accounts', '/financial-entry', '/help-support', '/transaction'].some(p => location.pathname.startsWith(p));

  return (
    <header className="fixed top-0 w-full max-w-md z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-5 h-16 shadow-xl">
      {/* Left: Logo or back button */}
      <div className="flex items-center gap-3">
        {hasBackButton ? (
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/5 transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <img src="/well_logo.png" alt="WellFinanced Logo" className="w-8 h-8 object-contain" />
            <span className="text-lg font-black text-white tracking-tight">WellFinanced</span>
          </div>
        )}
      </div>

      {/* Right: Notification bell + Profile avatar */}
      {!isAuthScreen && (
        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            className="relative p-2 rounded-full hover:bg-white/5 transition-colors active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined text-primary">notifications</span>
            {/* Unread badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
          </Link>

          <Link
            to="/profile"
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary transition-colors flex items-center justify-center bg-gradient-to-br from-primary-container to-secondary-container"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </Link>
        </div>
      )}
    </header>
  );
}
