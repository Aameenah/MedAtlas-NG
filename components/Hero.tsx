import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2 } from 'lucide-react';
import { LOCATIONS, SPECIALTIES } from '../constants';

interface HeroProps {
  onSearch: (specialty: string, location: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [specialty, setSpecialty] = useState(SPECIALTIES[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);

  const handleSearch = () => {
    onSearch(specialty, location);
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-900 pt-20 pb-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-300 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-400 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Find the Right <span className="text-purple-200">Specialist</span> <br />
          in Ilorin, Instantly.
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-purple-100 mb-10">
          Stop guessing. See transparent prices, verified profiles, and book appointments without the wait.
        </p>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-400" />
              </div>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border-none rounded-xl bg-purple-50 text-slate-800 focus:ring-2 focus:ring-purple-500 font-medium"
              >
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            <div className="sm:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-purple-400" />
              </div>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border-none rounded-xl bg-purple-50 text-slate-800 focus:ring-2 focus:ring-purple-500 font-medium"
              >
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div className="sm:col-span-3">
              <button
                onClick={handleSearch}
                className="w-full h-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-purple-200 flex items-center justify-center"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-purple-100 opacity-90">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" /> Verified Doctors
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" /> Upfront Pricing
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" /> Instant Booking
          </div>
        </div>
      </div>
    </div>
  );
};