import React from 'react';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { Facility } from '../types';

interface FacilityCardProps {
  facility: Facility;
  onSelect: (facility: Facility) => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility, onSelect }) => {
  // Calculate price range
  const prices = facility.services.map(s => s.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div 
      className="group bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={() => onSelect(facility)}
    >
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          src={facility.image} 
          alt={facility.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-4 right-4 z-20">
          <h3 className="font-bold text-white text-lg leading-tight shadow-sm">
            {facility.name}
          </h3>
        </div>
        <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-xs font-bold text-slate-800">{facility.rating}</span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
           <div className="flex items-start justify-between mb-3">
             <div className="flex items-center text-sm text-slate-500">
               <MapPin className="w-4 h-4 mr-1 text-purple-500" />
               {facility.location}
             </div>
           </div>
           
           <div className="flex flex-wrap gap-2 mb-4">
              {facility.services.slice(0, 3).map(service => (
                  <span key={service.id} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md">
                      {service.name}
                  </span>
              ))}
              {facility.services.length > 3 && (
                  <span className="text-xs bg-slate-50 text-slate-500 px-2 py-1 rounded-md">
                      +{facility.services.length - 3} more
                  </span>
              )}
           </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
           <div>
               <p className="text-xs text-slate-400 font-medium">Consultation Range</p>
               <p className="text-slate-900 font-bold">
                   ₦{minPrice.toLocaleString()} - ₦{maxPrice.toLocaleString()}
               </p>
           </div>
           <button className="bg-purple-100 p-2 rounded-full text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
               <ChevronRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};