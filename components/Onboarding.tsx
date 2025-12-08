import React from 'react';
import { User, Building2, ArrowRight, Stethoscope } from 'lucide-react';
import { UserRole } from '../types';

interface OnboardingProps {
  onSelectRole: (role: UserRole) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-[500px] h-[500px] rounded-full bg-pink-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="bg-purple-600 p-2.5 rounded-xl shadow-lg shadow-purple-200">
               <Stethoscope className="w-8 h-8 text-white" />
             </div>
             <span className="font-extrabold text-4xl tracking-tight text-slate-900">
              MedAtlas<span className="text-purple-600">.ng</span>
             </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Ilorin's Healthcare <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Marketplace</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between patients and specialists. Choose your role to get started.
          </p>
        </div>

        {/* Persona Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
          
          {/* Patient Persona */}
          <button 
            onClick={() => onSelectRole('PATIENT')}
            className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 text-left border border-purple-100 shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-50 to-purple-100 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10 mb-8">
              <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-all duration-300 shadow-sm">
                <User className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors" />
              </div>
            </div>
            
            <h2 className="relative z-10 text-3xl font-bold text-slate-900 mb-4 group-hover:text-purple-700 transition-colors">I am a Patient</h2>
            <p className="relative z-10 text-slate-500 text-lg mb-8 flex-grow leading-relaxed">
              Find verified specialists near you, view transparent prices, and book appointments instantly without the wait.
            </p>
            
            <div className="relative z-10 flex items-center text-purple-700 font-bold text-lg group-hover:translate-x-2 transition-transform">
              Join as Patient <ArrowRight className="ml-2 w-6 h-6" />
            </div>
          </button>

          {/* Provider Persona */}
          <button 
            onClick={() => onSelectRole('PROVIDER')}
            className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 text-left border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10 mb-8">
              <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-300 shadow-sm">
                <Building2 className="w-10 h-10 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
            </div>
            
            <h2 className="relative z-10 text-3xl font-bold text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors">I am a Provider</h2>
            <p className="relative z-10 text-slate-500 text-lg mb-8 flex-grow leading-relaxed">
              Manage your facility's profile, view daily appointments, and optimize patient flow with our digital receptionist.
            </p>
            
            <div className="relative z-10 flex items-center text-indigo-700 font-bold text-lg group-hover:translate-x-2 transition-transform">
              Partner with us <ArrowRight className="ml-2 w-6 h-6" />
            </div>
          </button>

        </div>

        <div className="mt-16 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Mock logos for trust indicators */}
           <div className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Trusted By</div>
           <div className="font-bold text-slate-600 text-lg">Kwara Advanced</div>
           <div className="font-bold text-slate-600 text-lg">Heart First</div>
           <div className="font-bold text-slate-600 text-lg">SkinCare Haven</div>
        </div>
      </div>
    </div>
  );
};