
import React, { useState } from 'react';
import { Facility, Doctor, Service, Review } from '../types';
import { MapPin, Star, ArrowLeft, Clock, ShieldCheck, Stethoscope, MessageSquare, Navigation } from 'lucide-react';

interface FacilityDetailsProps {
  facility: Facility;
  doctors: Doctor[];
  reviews: Review[];
  onBack: () => void;
  onBook: (service: Service, doctor: Doctor) => void;
}

export const FacilityDetails: React.FC<FacilityDetailsProps> = ({ facility, doctors, reviews, onBack, onBook }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Filter reviews for this facility
  const facilityReviews = reviews.filter(r => r.facilityId === facility.id);

  // Construct map query
  const mapQuery = encodeURIComponent(`${facility.name}, ${facility.address}, Ilorin`);
  const mapUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fade-in-up">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-purple-600 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search Results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Facility Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-purple-100">
             <div className="h-56 sm:h-80 relative">
                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{facility.name}</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium opacity-90">
                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {facility.address}</span>
                        <span className="hidden sm:inline text-slate-400">•</span>
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {facility.openingHours}</span>
                    </div>
                </div>
             </div>
             <div className="p-5 sm:p-6">
                 <div className="flex flex-wrap items-center gap-3 mb-4">
                     <div className="flex bg-yellow-50 px-3 py-1 rounded-full items-center">
                         <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                         <span className="font-bold text-slate-800 text-sm">{facility.rating}</span>
                         <span className="text-slate-500 text-xs ml-1">({facility.reviews} reviews)</span>
                     </div>
                     <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Facility
                     </span>
                 </div>
                 <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{facility.description}</p>
             </div>
          </div>

          {/* Location & Directions */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-purple-100 p-6">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" /> Location
               </h2>
               <a 
                 href={directionsUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-purple-100 transition-colors"
               >
                 <Navigation className="w-4 h-4" /> Get Directions
               </a>
             </div>
             <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 scrolling="no" 
                 marginHeight={0} 
                 marginWidth={0} 
                 src={mapUrl}
                 title="Facility Location"
                 className="w-full h-full"
               ></iframe>
             </div>
             <p className="text-xs text-slate-500 mt-3 flex items-center">
               <MapPin className="w-3 h-3 mr-1" /> {facility.address}, Ilorin, Kwara State
             </p>
          </div>

          {/* Available Doctors */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Stethoscope className="w-5 h-5 mr-2 text-purple-600" /> Available Specialists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-purple-200 transition-colors shadow-sm">
                        <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" />
                        <div>
                            <h3 className="font-bold text-slate-900">{doctor.name}</h3>
                            <p className="text-sm text-purple-600 font-medium">{doctor.specialty}</p>
                            <p className="text-xs text-slate-400 mt-1">Available: {doctor.availableDays.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="pb-8 lg:pb-0">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-600" /> Patient Reviews
                </h2>
                <span className="text-sm text-slate-500">{facilityReviews.length} verified reviews</span>
             </div>
             
             <div className="space-y-4">
                 {facilityReviews.length > 0 ? (
                    facilityReviews.map(review => (
                        <div key={review.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                                        {review.patientName.charAt(0)}
                                    </div>
                                    <span className="font-bold text-slate-900 text-sm">{review.patientName}</span>
                                </div>
                                <span className="text-xs text-slate-400">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                {[1,2,3,4,5].map(star => (
                                    <Star 
                                        key={star} 
                                        className={`w-3 h-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
                                    />
                                ))}
                            </div>
                            <p className="text-slate-600 text-sm italic">"{review.comment}"</p>
                        </div>
                    ))
                 ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 text-sm">No reviews yet. Be the first to share your experience!</p>
                    </div>
                 )}
             </div>
          </div>
        </div>

        {/* Right Column: Services & Booking */}
        <div className="lg:col-span-1">
            {/* On mobile, this will appear below content. We use lg:sticky to only stick on desktop */}
            <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden lg:sticky lg:top-24">
                <div className="bg-slate-50 p-6 border-b border-purple-100">
                    <h3 className="font-bold text-lg text-slate-900">Select a Service</h3>
                    <p className="text-sm text-slate-500">Choose a service to view availability and book.</p>
                </div>
                
                <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {facility.services.map(service => (
                        <div 
                            key={service.id} 
                            onClick={() => setSelectedService(service)}
                            className={`p-4 cursor-pointer transition-colors hover:bg-purple-50 ${selectedService?.id === service.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className={`font-medium text-sm sm:text-base ${selectedService?.id === service.id ? 'text-purple-900' : 'text-slate-700'}`}>
                                    {service.name}
                                </span>
                                <span className="font-bold text-slate-900 text-sm sm:text-base">₦{service.price.toLocaleString()}</span>
                            </div>
                            {selectedService?.id === service.id && (
                                <div className="mt-3 animate-fade-in-up">
                                    <p className="text-xs text-slate-500 mb-3">Which doctor would you like to see?</p>
                                    <div className="space-y-2">
                                        {doctors.map(doc => (
                                            <button 
                                                key={doc.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onBook(service, doc);
                                                }}
                                                className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-purple-100 transition-all group"
                                            >
                                                <img src={doc.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                                                    <p className="text-xs text-purple-600">{doc.specialty}</p>
                                                </div>
                                                <div className="text-xs font-bold text-purple-600 bg-white px-3 py-1 rounded-full shadow-sm">
                                                    Book
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
