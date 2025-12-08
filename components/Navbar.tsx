
import React, { useState } from 'react';
import { ViewState } from '../types';
import { Stethoscope, UserCog, Menu, Calendar, X, Search, Home } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenAppointments: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAppointments }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const handleAppointmentsClick = () => {
    onOpenAppointments();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick(ViewState.HOME)}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-purple-600 p-1.5 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-purple-900">
                MedAtlas<span className="text-purple-500">.ng</span>
              </span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            <button 
              onClick={() => handleNavClick(ViewState.HOME)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewState.HOME || currentView === ViewState.SEARCH ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-purple-600'}`}
            >
              Find a Doctor
            </button>
            
            {/* Patient Action: My Appointments */}
            <button 
              onClick={handleAppointmentsClick}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              <Calendar size={16} />
              My Appointments
            </button>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <button 
              onClick={() => handleNavClick(ViewState.DASHBOARD)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewState.DASHBOARD ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-purple-600'}`}
            >
              <UserCog size={16} />
              For Providers
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-500 hover:text-purple-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-purple-50 animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button
              onClick={() => handleNavClick(ViewState.HOME)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${
                currentView === ViewState.HOME || currentView === ViewState.SEARCH 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Search size={20} />
              Find a Doctor / Facility
            </button>

            <button
              onClick={handleAppointmentsClick}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50"
            >
              <Calendar size={20} />
              My Appointments
            </button>
            
            <div className="border-t border-slate-100 my-2"></div>

            <button
              onClick={() => handleNavClick(ViewState.DASHBOARD)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${
                currentView === ViewState.DASHBOARD 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <UserCog size={20} />
              Provider Dashboard
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
