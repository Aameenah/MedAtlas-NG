
import React, { useState, useEffect } from 'react';
import { ViewState, Facility, Doctor, SearchFilters, UserRole, Appointment, Service, Review, AuthUser } from './types';
import { MOCK_FACILITIES, MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_REVIEWS } from './constants';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FacilityCard } from './components/FacilityCard';
import { FacilityDetails } from './components/FacilityDetails';
import { BookingFlow } from './components/BookingFlow';
import { ProviderDashboard } from './components/ProviderDashboard';
import { Onboarding } from './components/Onboarding';
import { Auth } from './components/Auth';
import { PatientAppointments } from './components/PatientAppointments';
import { ReviewModal } from './components/ReviewModal';
import { ArrowUp, Filter, HeartHandshake } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.ONBOARDING);
  const [filters, setFilters] = useState<SearchFilters>({ specialty: '', location: '' });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  
  // State for Flow
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Lifted state for simulated backend
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);

  // UI State for Modals
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<Appointment | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (specialty: string, location: string) => {
    setFilters({ specialty, location });
    setView(ViewState.SEARCH);
  };

  const handleFacilitySelect = (facility: Facility) => {
    setSelectedFacility(facility);
    setView(ViewState.FACILITY_DETAILS);
    window.scrollTo(0, 0);
  };

  const handleBookRequest = (service: Service, doctor: Doctor) => {
    setSelectedService(service);
    setSelectedDoctor(doctor);
    // Facility is already selected in handleFacilitySelect
    setView(ViewState.PROFILE); // Using PROFILE view state enum to render BookingFlow
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setView(ViewState.AUTH);
  };

  const handleAuthComplete = (user: AuthUser) => {
    setCurrentUser(user);
    if (user.role === 'PATIENT') {
      setView(ViewState.HOME);
    } else {
      setView(ViewState.DASHBOARD);
    }
  };

  const handleBookingComplete = (newAppointment: Appointment) => {
      // Add to simulated database
      // Ensure we add the facilityId so we can link reviews later
      const enrichedAppointment = { 
          ...newAppointment, 
          facilityId: selectedFacility?.id 
      };
      setAppointments(prev => [enrichedAppointment, ...prev]);
  };

  const handleOpenReview = (appointment: Appointment) => {
      setReviewTarget(appointment);
      setShowReviewModal(true);
      setShowAppointmentsModal(false); // Close list to focus on review
  };

  const handleSubmitReview = (rating: number, comment: string) => {
      if (!reviewTarget || !reviewTarget.facilityId) return;

      const newReview: Review = {
          id: Math.random().toString(36).substr(2, 9),
          facilityId: reviewTarget.facilityId,
          patientName: reviewTarget.patientName,
          rating,
          comment,
          date: 'Just now'
      };

      setReviews(prev => [newReview, ...prev]);
      
      // Mark appointment as reviewed
      setAppointments(prev => prev.map(apt => 
          apt.id === reviewTarget.id ? { ...apt, reviewed: true } : apt
      ));

      setShowReviewModal(false);
      setReviewTarget(null);
      // Optional: Show success toast or reopen appointments list
      setTimeout(() => setShowAppointmentsModal(true), 500); 
  };

  // Filter facilities based on Location AND Services offered (matching specialty)
  const filteredFacilities = MOCK_FACILITIES.filter(facility => {
    const matchLocation = filters.location === 'All Locations' || !filters.location || facility.location === filters.location;
    
    // Improved Semantic Matching for Services
    const searchSpecialty = filters.specialty === 'All Specialties' ? '' : filters.specialty.toLowerCase();
    
    const matchSpecialty = !searchSpecialty || facility.services.some(s => {
      const sName = s.name.toLowerCase();
      // Direct match
      if (sName.includes(searchSpecialty)) return true;
      
      // Keyword mapping heuristics
      if (searchSpecialty.includes('cardiologist') && sName.includes('cardiology')) return true;
      if (searchSpecialty.includes('dermatologist') && sName.includes('dermatology')) return true;
      if (searchSpecialty.includes('pediatrician') && sName.includes('pediatric')) return true;
      if (searchSpecialty.includes('dentist') && sName.includes('dental')) return true;
      if (searchSpecialty.includes('ent') && sName.includes('ent')) return true;
      if (searchSpecialty.includes('gynecologist') && (sName.includes('gynecology') || sName.includes('antenatal'))) return true;
      if (searchSpecialty.includes('orthopedic') && sName.includes('orthopedic')) return true;
      if (searchSpecialty.includes('general') && sName.includes('general')) return true;
      
      return false;
    });

    return matchLocation && matchSpecialty;
  });

  const renderContent = () => {
    switch (view) {
      case ViewState.ONBOARDING:
        return <Onboarding onSelectRole={handleRoleSelect} />;

      case ViewState.AUTH:
        return userRole ? (
          <Auth 
            userRole={userRole} 
            onComplete={handleAuthComplete} 
            onBack={() => setView(ViewState.ONBOARDING)}
          />
        ) : (
          <Onboarding onSelectRole={handleRoleSelect} />
        );

      case ViewState.HOME:
        return (
          <>
            <Hero onSearch={handleSearch} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Facilities in Ilorin</h2>
                <p className="text-sm sm:text-base text-slate-500 mt-2">Top-rated hospitals and clinics available for instant booking</p>
                {currentUser && <p className="mt-2 text-purple-600 font-medium">Welcome, {currentUser.name}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {MOCK_FACILITIES.slice(0, 3).map(facility => (
                  <FacilityCard key={facility.id} facility={facility} onSelect={handleFacilitySelect} />
                ))}
              </div>
              <div className="mt-12 sm:mt-16 bg-purple-900 rounded-3xl p-6 sm:p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Are you a Healthcare Provider?</h2>
                    <p className="text-purple-200 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                        Join MedAtlas.ng to increase your visibility, manage your schedule efficiently, and reduce no-shows.
                    </p>
                    <button 
                        onClick={() => {
                          setUserRole('PROVIDER');
                          setView(ViewState.DASHBOARD);
                        }}
                        className="bg-white text-purple-900 px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors inline-flex items-center gap-2"
                    >
                        <HeartHandshake className="w-5 h-5" />
                        Partner With Us
                    </button>
                </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
              </div>
            </div>
          </>
        );

      case ViewState.SEARCH:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-screen">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 border-b border-purple-100 pb-4">
               <div className="mb-4 sm:mb-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Search Results</h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Found {filteredFacilities.length} facilities for <span className="font-semibold text-purple-700">{filters.specialty || 'All Specialties'}</span> in <span className="font-semibold text-purple-700">{filters.location || 'Ilorin'}</span>
                  </p>
               </div>
               <button 
                onClick={() => setView(ViewState.HOME)}
                className="text-purple-600 text-sm font-semibold flex items-center hover:text-purple-800 bg-purple-50 px-3 py-1.5 rounded-lg sm:bg-transparent sm:p-0"
               >
                 <Filter className="w-4 h-4 mr-1" /> Adjust Filters
               </button>
             </div>
             
             {filteredFacilities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFacilities.map(facility => (
                    <FacilityCard key={facility.id} facility={facility} onSelect={handleFacilitySelect} />
                  ))}
                </div>
             ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 mx-4 sm:mx-0">
                    <div className="text-slate-400 mb-4">No facilities found matching your criteria.</div>
                    <button onClick={() => setView(ViewState.HOME)} className="text-purple-600 font-bold hover:underline">
                        Try different filters
                    </button>
                </div>
             )}
          </div>
        );

      case ViewState.FACILITY_DETAILS:
        return selectedFacility ? (
            <FacilityDetails 
                facility={selectedFacility}
                doctors={MOCK_DOCTORS.filter(d => d.facilityId === selectedFacility.id)}
                reviews={reviews}
                onBack={() => setView(ViewState.SEARCH)}
                onBook={handleBookRequest}
            />
        ) : null;

      case ViewState.PROFILE: // Reusing PROFILE state for Booking Flow
        return selectedDoctor && selectedFacility && selectedService ? (
          <BookingFlow 
            doctor={selectedDoctor} 
            facility={selectedFacility}
            service={selectedService}
            currentUser={currentUser}
            onBack={() => setView(ViewState.FACILITY_DETAILS)} 
            onComplete={handleBookingComplete}
          />
        ) : null;

      case ViewState.DASHBOARD:
        return <ProviderDashboard appointments={appointments} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {view !== ViewState.ONBOARDING && view !== ViewState.AUTH && (
        <Navbar 
            currentView={view} 
            onNavigate={setView} 
            onOpenAppointments={() => setShowAppointmentsModal(true)}
        />
      )}
      
      <main className="flex-grow relative">
        {renderContent()}
      </main>

      {view !== ViewState.ONBOARDING && view !== ViewState.AUTH && (
        <footer className="bg-white border-t border-purple-100 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                <div className="text-center text-slate-400 text-sm">
                &copy; 2025 MedAtlas Nigeria.
                </div>
            </div>
        </footer>
      )}

      {/* Patient Appointments Modal */}
      <PatientAppointments 
        isOpen={showAppointmentsModal} 
        onClose={() => setShowAppointmentsModal(false)}
        appointments={appointments}
        currentUser={currentUser}
        onReview={handleOpenReview}
      />

      {/* Review Modal */}
      <ReviewModal 
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
        facilityName={reviewTarget?.hospitalName || 'Facility'}
      />

      {showScrollTop && view !== ViewState.ONBOARDING && view !== ViewState.AUTH && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-40"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
