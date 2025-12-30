import React, { useState } from 'react';
import { X, ArrowRight, Loader2, AlertCircle, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState<'login' | 'register' | 'reset'>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for register
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (view === 'login') {
        await login(email, password);
        onClose();
      } else if (view === 'register') {
        await register(name, email, password);
        onClose();
      } else if (view === 'reset') {
        await resetPassword(email);
        setSuccessMsg("Check your email! We've sent a reset link.");
      }
    } catch (err: any) {
      console.error("Auth Error Caught in Modal:", err);
      
      // Handle known Firebase Auth errors
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password.");
      } else if (err.code === 'auth/email-already-in-use') {
        setError("That email is already registered. Try logging in.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak. Please use at least 6 characters.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        const rawMsg = err.message || "Unknown error";
        const cleanMsg = rawMsg.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim();
        setError(cleanMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const switchView = (v: 'login' | 'register' | 'reset') => {
      setView(v);
      setError('');
      setSuccessMsg('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white shadow-2xl animate-fade-in overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
          <h3 className="font-serif text-xl text-gray-900">
            {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Join the Club' : 'Reset Password'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-8">
            {view === 'login' && (
                <p className="text-gray-500 mb-6 text-sm">
                    Log in to track your orders, save your favorites, and get exclusive sass.
                </p>
            )}
            {view === 'register' && (
                <p className="text-gray-500 mb-6 text-sm">
                    Create an account. We promise not to spam you (much).
                </p>
            )}
            {view === 'reset' && (
                <p className="text-gray-500 mb-6 text-sm">
                    Enter your email address and we'll send you a link to regain access to your account.
                </p>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs flex items-center gap-2 rounded border border-red-100">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
            
            {successMsg && (
                <div className="mb-4 p-3 bg-green-50 text-green-600 text-xs flex items-center gap-2 rounded border border-green-100">
                    <CheckCircle size={14} className="flex-shrink-0" />
                    <span>{successMsg}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {view === 'register' && (
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-200 px-4 py-3 focus:border-pink-600 focus:outline-none transition-colors"
                            placeholder="What should we call you?"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-200 px-4 py-3 focus:border-pink-600 focus:outline-none transition-colors"
                        placeholder="you@example.com"
                    />
                </div>

                {view !== 'reset' && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                            {view === 'login' && (
                                <button 
                                    type="button"
                                    onClick={() => switchView('reset')}
                                    className="text-[10px] uppercase font-bold text-pink-700 hover:underline"
                                >
                                    Forgot?
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-200 px-4 py-3 focus:border-pink-600 focus:outline-none transition-colors pr-12"
                                placeholder="••••••••"
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2D2D2D] text-white py-4 mt-2 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : (
                        <>
                            <span>
                                {view === 'login' ? 'Sign In' : view === 'register' ? 'Create Account' : 'Send Reset Link'}
                            </span>
                            {view === 'reset' ? <KeyRound size={16} /> : <ArrowRight size={16} />}
                        </>
                    )}
                </button>
            </form>

            {/* Toggle View */}
            <div className="mt-6 text-center text-sm text-gray-500">
                {view === 'login' ? (
                    <>
                        New here?{' '}
                        <button 
                            onClick={() => switchView('register')}
                            className="text-pink-700 font-bold hover:underline"
                        >
                            Create an account
                        </button>
                    </>
                ) : view === 'register' ? (
                    <>
                        Already have an account?{' '}
                        <button 
                            onClick={() => switchView('login')}
                            className="text-pink-700 font-bold hover:underline"
                        >
                            Log In
                        </button>
                    </>
                ) : (
                     <button 
                        onClick={() => switchView('login')}
                        className="text-gray-500 font-bold hover:text-gray-900 flex items-center justify-center gap-2 mx-auto"
                    >
                        <ArrowRight size={14} className="rotate-180" />
                        Back to Login
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

// Simple Icon component for success message
const CheckCircle = ({ size, className }: { size: number, className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);