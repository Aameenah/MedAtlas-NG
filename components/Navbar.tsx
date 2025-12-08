
import React from 'react';
import { ViewState } from '../types';
import { Stethoscope, UserCog, Menu, Calendar } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenAppointments: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAppointments }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(ViewState.HOME)}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-purple-600 p-1.5 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-purple-900">
                MedAtlas<span className="text-purple-500">.ng</span>
              </span>
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            <button 
              onClick={() => onNavigate(ViewState.HOME)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewState.HOME || currentView === ViewState.SEARCH ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-purple-600'}`}
            >
              Find a Doctor
            </button>
            
            {/* Patient Action: My Appointments */}
            <button 
              onClick={onOpenAppointments}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              <Calendar size={16} />
              My Appointments
            </button>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <button 
              onClick={() => onNavigate(ViewState.DASHBOARD)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewState.DASHBOARD ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-purple-600'}`}
            >
              <UserCog size={16} />
              For Providers
            </button>
          </div>

          <div className="flex items-center sm:hidden">
            <button className="text-slate-500 hover:text-purple-600 p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
