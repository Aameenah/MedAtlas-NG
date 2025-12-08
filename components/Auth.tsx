import React, { useState } from 'react';
import { UserRole } from '../types';
import { Mail, Lock, User, Phone, ArrowRight, Building2, Stethoscope, Loader2 } from 'lucide-react';

interface AuthProps {
  userRole: UserRole;
  onComplete: () => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ userRole, onComplete, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-purple-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              {userRole === 'PATIENT' ? (
                <User className="w-8 h-8 text-white" />
              ) : (
                <Building2 className="w-8 h-8 text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-purple-100 text-sm mt-2">
              {userRole === 'PATIENT' 
                ? 'Join thousands of patients in Ilorin' 
                : 'Manage your practice efficiently'}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder={userRole === 'PATIENT' ? "Full Name" : "Facility Name"}
                  />
                </div>
                
                {userRole === 'PROVIDER' && (
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Stethoscope className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="MDCN License Number"
                    />
                  </div>
                )}

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="tel"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            )}

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Email Address"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-purple-200 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-bold text-purple-600 hover:text-purple-500 transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
            
            <div className="mt-4 text-center">
                <button 
                    onClick={onBack}
                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                    Change Role
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};