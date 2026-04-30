import { Link } from 'react-router-dom';

export default function WelcomeOnboarding() {
  return (
    <div className="relative z-10 w-full max-w-md px-container-padding flex flex-col items-center min-h-screen pt-12 pb-12 overflow-y-auto">
      {/* Background Decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-container/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-container/10 rounded-full blur-[120px]"></div>
      </div>

      {/* AI Mascot Section */}
      <div className="relative w-64 h-64 mb-stack-lg flex items-center justify-center">
        <div className="absolute inset-0 bg-primary-container/30 rounded-full blur-[40px] animate-pulse"></div>
        <div className="relative z-20 w-48 h-48 glass-card rounded-full flex items-center justify-center inner-glow rim-light border-primary-container/30">
          <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center">
            <img alt="Cyber AI Mascot" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3z37YsTtlo840U0CORaHerjgvUwTWinbnYHLBku-vDtl2FqPM3k1dRrbhp5PKHNWBhxRsY4-oCZ040z7zbC5blCQCKEUvYeeRw9u_D-51yc33a9QjjOfz3CpzhMP4MbT0qoKM7njiPxYG9QVNqbK2hKgs0uihhebkukrDn27eE1IiQpziBqIzhXRodfBGctfWDbzkdPaln_u9oQck5bKwA6msGXNrWWabUjBN7vSqB4867ugxNFIz7l1LJ_cxOkLGSKyrPFC4bYe6"/>
          </div>
          <div className="absolute -top-4 -right-4 glass-card p-3 rounded-2xl rim-light">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>insights</span>
          </div>
          <div className="absolute -bottom-2 -left-4 glass-card p-3 rounded-2xl rim-light">
            <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
          </div>
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-stack-lg relative z-10">
        <h1 className="font-display-lg text-display-lg text-white mb-stack-sm tracking-tight">
          Welcome to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Financial Future</span>
        </h1>
        <p className="font-body-base text-on-surface-variant max-w-[280px] mx-auto">
          Elevate your freelance career with our intelligent AI partner.
        </p>
      </div>

      {/* Benefits List */}
      <div className="w-full space-y-gutter mb-stack-lg relative z-10">
        <div className="glass-card p-stack-md rounded-xl flex items-start gap-4 rim-light transition-transform active:scale-98">
          <div className="bg-primary-container/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary">query_stats</span>
          </div>
          <div>
            <h3 className="font-headline-md text-body-base font-bold text-white">Predictive Income</h3>
            <p className="text-label-sm text-on-surface-variant mt-1">Smart forecasting based on your gig history and market trends.</p>
          </div>
        </div>
        <div className="glass-card p-stack-md rounded-xl flex items-start gap-4 rim-light transition-transform active:scale-98">
          <div className="bg-secondary-container/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-secondary">waves</span>
          </div>
          <div>
            <h3 className="font-headline-md text-body-base font-bold text-white">Cashflow Smoothing</h3>
            <p className="text-label-sm text-on-surface-variant mt-1">Stabilize your earnings through volatile months with AI insights.</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full mt-auto space-y-stack-md relative z-10 pb-8">
        <Link to="/signup" className="w-full block text-center py-4 px-6 bg-primary-container text-on-primary-container font-headline-md text-body-base rounded-2xl font-extrabold shadow-[0_0_20px_rgba(46,91,255,0.4)] active:scale-95 transition-all duration-200 rim-light">
          Get Started
        </Link>
        <div className="text-center">
          <Link to="/login" className="font-label-sm text-on-surface-variant hover:text-primary transition-colors">
            Already have an account? <span className="text-primary font-bold">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
