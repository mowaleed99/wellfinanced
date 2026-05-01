import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!agreed) {
      setError('You must agree to the Terms & Conditions.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.signup(formData);
      console.log('Account created for', response.user);
      setIsLoading(false);
      // If no token, email verification is required — redirect to login with a message
      if (!response.token) {
        navigate('/login', { state: { message: 'Account created! Please verify your email, then log in.' } });
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-container-padding py-stack-lg pb-24 overflow-y-auto">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none -z-10">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Branding Header */}
        <header className="mb-stack-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-stack-md rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <img src="/well.png" alt="WellFinanced Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-display-lg text-display-lg tracking-tighter text-white mb-stack-sm">
            WellFinanced
          </h1>
          <p className="font-body-base text-on-surface-variant max-w-xs">
            Empower your financial future with high-performance AI insights.
          </p>
        </header>

        {/* Sign Up Card */}
        <div className="glass-card w-full rounded-3xl p-stack-lg overflow-hidden relative">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="font-headline-md text-headline-md text-white mb-stack-lg">Create Account</h2>
            
            <form className="space-y-stack-md" onSubmit={handleSignUp}>
              {error && (
                <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-semibold text-center">
                  {error}
                </div>
              )}

              {/* Full Name Field */}
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1" htmlFor="name">NAME</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
                  <input 
                    id="name" 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name" 
                    className="recessed-input w-full pl-12 pr-4 py-3.5 rounded-xl border-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-outline/50 transition-all bg-surface-container-lowest"
                  />
                </div>
              </div>
              
              {/* Email Field */}
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1" htmlFor="email">EMAIL</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">alternate_email</span>
                  <input 
                    id="email" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@wellfinanced.app" 
                    className="recessed-input w-full pl-12 pr-4 py-3.5 rounded-xl border-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-outline/50 transition-all bg-surface-container-lowest"
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1" htmlFor="password">PASSWORD</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                  <input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••" 
                    className="recessed-input w-full pl-12 pr-12 py-3.5 rounded-xl border-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-outline/50 transition-all bg-surface-container-lowest"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              
              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 pt-stack-sm cursor-pointer" onClick={() => setAgreed(!agreed)}>
                <div className="mt-1">
                  <input 
                    id="terms" 
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-offset-background focus:ring-primary pointer-events-none"
                  />
                </div>
                <label className="font-label-sm text-label-sm text-on-surface-variant leading-snug cursor-pointer">
                  I agree to the <span className="text-primary hover:underline">Terms & Conditions</span> and <span className="text-primary hover:underline">Privacy Policy</span>
                </label>
              </div>
              
              {/* Primary Action Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className={`inner-glow-btn w-full bg-primary-container hover:bg-inverse-primary text-white font-headline-md text-body-base py-4 rounded-xl transition-all flex items-center justify-center gap-2 block text-center mt-stack-md ${isLoading ? 'opacity-80' : 'active:scale-[0.98]'}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center gap-4 my-stack-lg">
              <div className="h-px bg-white/10 flex-grow"></div>
              <span className="font-label-sm text-label-sm text-outline">OR</span>
              <div className="h-px bg-white/10 flex-grow"></div>
            </div>
            
            {/* Secondary Action */}
            <footer className="text-center">
              <p className="font-body-base text-label-sm text-on-surface-variant">
                Already have an account? 
                <Link to="/login" className="text-primary font-bold hover:text-primary-fixed-dim transition-colors ml-1">Log In</Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
