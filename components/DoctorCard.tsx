import React from 'react';
import { MapPin, Star, BadgeCheck, Clock, Banknote } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 overflow-hidden flex flex-col h-full group">
      <div className="p-6 flex-grow">
        <div className="flex gap-4">
          <div className="relative">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-50 shadow-inner"
            />
            {doctor.verified && (
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                <BadgeCheck className="w-5 h-5 text-purple-600 fill-purple-100" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-700 transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-purple-600 font-medium text-sm">{doctor.specialty}</p>
              </div>
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
                <span className="text-xs text-slate-400 ml-1">({doctor.reviews})</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-1">{doctor.hospital}</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="w-4 h-4 mr-2 text-purple-400" />
            {doctor.location}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="w-4 h-4 mr-2 text-purple-400" />
            Next Available: Today
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-purple-50 border-t border-purple-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 uppercase font-semibold">Consultation</span>
          <div className="flex items-baseline gap-1">
             <span className="text-purple-900 font-bold text-lg">₦{doctor.price.toLocaleString()}</span>
             <span className="text-xs text-slate-500">starting from</span>
          </div>
        </div>
        <button 
          onClick={() => onSelect(doctor)}
          className="bg-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};