import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      console.log('Logged in as', response.user);
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-[420px] mx-auto px-container-padding flex flex-col justify-center min-h-screen py-12">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-tertiary-container/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="fixed bottom-0 right-0 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4 z-0">
        <div className="w-[600px] h-[600px] rounded-full border-[1px] border-primary-container/30"></div>
        <div className="absolute inset-0 w-[500px] h-[500px] m-auto rounded-full border-[1px] border-primary-container/20"></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Brand Identity Section */}
        <div className="flex flex-col items-center mb-stack-lg">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-stack-md primary-glow">
            <img src="/well.png" alt="WellFinanced Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-display-lg text-display-lg text-white tracking-tighter">WellFinanced</h1>
          <p className="font-body-base text-body-base text-on-surface-variant/80 mt-1">Intelligence for the modern freelancer</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-stack-lg rounded-[2rem] rim-light">
          <div className="mb-stack-lg">
            <h2 className="font-headline-md text-headline-md text-white">Welcome back</h2>
            <p className="font-body-base text-body-base text-on-surface-variant">Log in to your financial partner</p>
          </div>
          
          <form className="space-y-stack-md" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-semibold text-center">
                {error}
              </div>
            )}
            {/* Email Input */}
            <div className="space-y-stack-sm">
              <label className="font-label-sm text-label-sm text-outline uppercase tracking-widest ml-1" htmlFor="email">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">alternate_email</span>
                </div>
                <input 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@freelance.com" 
                  className="block w-full pl-12 pr-4 py-4 bg-surface-container-lowest border border-white/5 rounded-2xl text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner font-body-base"
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="space-y-stack-sm">
              <div className="flex justify-between items-center px-1">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-widest" htmlFor="password">Password</label>
                <a className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors" href="#">Forgot Password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">lock_open</span>
                </div>
                <input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="block w-full pl-12 pr-12 py-4 bg-surface-container-lowest border border-white/5 rounded-2xl text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner font-body-base"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>
            
            {/* Login Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary-container text-white font-headline-md text-headline-md py-4 rounded-2xl primary-glow rim-light transition-all flex items-center justify-center gap-2 mt-stack-md block text-center ${isLoading ? 'opacity-80' : 'active:scale-[0.98]'}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Login</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-stack-lg pt-stack-lg border-t border-white/5 text-center">
            <p className="font-body-base text-body-base text-on-surface-variant/60 mb-stack-md">Don't have an account?</p>
            <Link to="/signup" className="block w-full border border-white/10 bg-white/5 hover:bg-white/10 py-3 rounded-xl font-label-sm text-label-sm text-white uppercase tracking-widest transition-all active:scale-[0.99] text-center">
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
