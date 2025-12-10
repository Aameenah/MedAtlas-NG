
import React, { useState, useRef, useEffect } from 'react';
import { UserRole, AuthUser } from '../types';
import { Mail, Lock, User, Phone, Building2, Loader2, ArrowLeft } from 'lucide-react';

interface AuthProps {
  userRole: UserRole;
  onComplete: (user: AuthUser) => void;
  onBack: () => void;
}

type AuthMode = 'SIGN_IN' | 'SIGN_UP' | 'VERIFY';

// Simple Google Icon SVG Component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export const Auth: React.FC<AuthProps> = ({ userRole, onComplete, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('SIGN_UP');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    license: '' // For providers
  });

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus management for OTP
  useEffect(() => {
    if (mode === 'VERIFY' && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear errors on typing
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 3 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Helper to interact with "Fake DB"
  const getUsers = (): AuthUser[] => {
    const users = localStorage.getItem('medatlas_users');
    return users ? JSON.parse(users) : [];
  };

  const saveUser = (user: AuthUser) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('medatlas_users', JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      const users = getUsers();

      if (mode === 'SIGN_UP') {
        const existingUser = users.find(u => u.email === formData.email);
        if (existingUser) {
          setError("Account already exists. Please Sign In.");
          return;
        }
        // Proceed to OTP
        setMode('VERIFY');
      } else if (mode === 'VERIFY') {
        if (otp.join('').length !== 4) {
          setError("Please enter a valid 4-digit code");
          return;
        }
        
        // Create User
        const newUser: AuthUser = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name,
          email: formData.email,
          role: userRole
        };
        saveUser(newUser);
        onComplete(newUser);

      } else {
        // Sign In
        const user = users.find(u => u.email === formData.email && u.role === userRole);
        
        // Mock password check (in real app, hash matching)
        if (!user) {
          setError("Account not found. Please Sign Up first.");
        } else {
          // In a real app check password here
          onComplete(user);
        }
      }
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
        // Simulate Google Auth
        // 1. Check if user with this mocked google email exists
        const googleEmail = "google_user@gmail.com"; // Mock email from Google
        const users = getUsers();
        let user = users.find(u => u.email === googleEmail);

        if (mode === 'SIGN_UP') {
            if (user) {
                // If user exists, just log them in? Or warn?
                // Google auth usually handles both sign in/up gracefully.
                // We'll just proceed as login if they exist
            } else {
                user = {
                    id: "google_" + Math.random().toString(36).substr(2, 9),
                    name: "Google User",
                    email: googleEmail,
                    role: userRole
                };
                saveUser(user);
            }
        } else {
            // Sign In
            if (!user) {
                setIsLoading(false);
                setError("No account found for this Google ID. Please Sign Up.");
                return;
            }
        }

        setIsLoading(false);
        if (user) onComplete(user);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 animate-fade-in-up">
        {/* Header */}
        <div className="bg-purple-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
             <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white blur-2xl"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white blur-2xl"></div>
          </div>
          
          <button onClick={onBack} className="absolute top-4 left-4 text-purple-200 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>

          <div className="relative z-10 flex justify-center mb-4">
             <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                {userRole === 'PATIENT' ? (
                   <User className="w-8 h-8 text-white" />
                ) : (
                   <Building2 className="w-8 h-8 text-white" />
                )}
             </div>
          </div>
          <h2 className="relative z-10 text-2xl font-bold text-white mb-1">
            {mode === 'VERIFY' ? 'Verify Account' : 
             mode === 'SIGN_IN' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="relative z-10 text-purple-100 text-sm">
            {mode === 'VERIFY' ? `Enter code sent to ${formData.phone || 'your phone'}` :
             userRole === 'PATIENT' ? 'Patient Portal Access' : 'Provider Dashboard Access'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium text-center">
                {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'VERIFY' && (
              <div className="mb-6">
                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all bg-slate-50 text-slate-800"
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">Didn't receive code?</p>
                  <button type="button" className="text-purple-600 font-bold text-sm hover:underline">Resend Code</button>
                </div>
              </div>
            )}

            {mode !== 'VERIFY' && (
              <>
                 {/* Google Auth Button */}
                 <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center py-3 px-4 mb-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                 >
                    <GoogleIcon />
                    {mode === 'SIGN_UP' ? 'Sign up with Google' : 'Sign in with Google'}
                 </button>

                 <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase">Or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                 </div>

                {mode === 'SIGN_UP' && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-purple-200 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === 'VERIFY' ? (
                'Verify & Continue'
              ) : mode === 'SIGN_UP' ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {mode !== 'VERIFY' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                {mode === 'SIGN_IN' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                      setMode(mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN');
                      setError(null);
                  }}
                  className="font-bold text-purple-600 hover:text-purple-500 transition-colors"
                >
                  {mode === 'SIGN_IN' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-400 text-xs">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
};
