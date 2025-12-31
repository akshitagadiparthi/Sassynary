
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Loader2, AlertCircle, Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
        setView(initialView);
        setError('');
        setSuccessMsg('');
    }
  }, [isOpen, initialView]);

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
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white shadow-2xl animate-fade-in overflow-hidden border border-gray-100 rounded-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-50 bg-white">
          <h3 className="font-serif text-2xl text-gray-900">
            {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Join the Club' : 'Reset Password'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-pink-600 p-1">
            <X size={20} />
          </button>
        </div>

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
                    Enter your email address and we'll send you a link to regain access.
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
                    <CheckCircle2 size={14} className="flex-shrink-0" />
                    <span>{successMsg}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {view === 'register' && (
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Name</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:border-pink-600 focus:ring-1 focus:ring-pink-100 focus:outline-none transition-all text-sm"
                            placeholder="What should we call you?"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Email</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:border-pink-600 focus:ring-1 focus:ring-pink-100 focus:outline-none transition-all text-sm"
                        placeholder="you@example.com"
                    />
                </div>

                {view !== 'reset' && (
                    <div>
                        <div className="flex justify-between items-center mb-1.5 ml-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
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
                                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:border-pink-600 focus:ring-1 focus:ring-pink-100 focus:outline-none transition-all pr-12 text-sm"
                                placeholder="••••••••"
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors p-1"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-700 text-white py-4 mt-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-pink-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-100 active:scale-[0.98]"
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

            <div className="mt-8 pt-6 border-t border-gray-50 text-center text-sm text-gray-500">
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
                        className="text-gray-500 font-bold hover:text-pink-700 flex items-center justify-center gap-2 mx-auto transition-colors"
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
