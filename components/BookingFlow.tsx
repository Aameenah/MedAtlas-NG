
import React, { useState } from 'react';
import { Doctor, Facility, Service, Appointment, AuthUser } from '../types';
import { Calendar, Clock, ShieldCheck, ArrowLeft, CreditCard, Lock, Loader2, Info } from 'lucide-react';

interface BookingFlowProps {
  doctor: Doctor;
  facility: Facility;
  service: Service;
  currentUser: AuthUser | null;
  onBack: () => void;
  onComplete: (appointment: Appointment) => void;
}

const BOOKING_FEE = 500;

export const BookingFlow: React.FC<BookingFlowProps> = ({ doctor, facility, service, currentUser, onBack, onComplete }) => {
  const [step, setStep] = useState<'datetime' | 'payment' | 'success'>('datetime');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Date generation
  const dates = [0, 1, 2, 3, 4, 5].map(offset => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      fullDate: d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    };
  });

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

  const handleProceedToPayment = () => {
    if (selectedDate && selectedTime) {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      const newAppointment: Appointment = {
        id: Math.random().toString(36).substr(2, 9),
        patientName: currentUser ? currentUser.name : "Guest User",
        doctorName: doctor.name,
        hospitalName: facility.name,
        serviceName: service.name,
        price: service.price,
        time: selectedTime!,
        date: selectedDate!,
        status: 'confirmed',
        paymentStatus: 'unpaid' // Main service fee is unpaid, booking fee is separate
      };
      onComplete(newAppointment);
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto mt-6 sm:mt-10 px-4 animate-fade-in-up">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center border border-purple-100">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            Your appointment at <span className="font-bold">{facility.name}</span> has been secured.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left space-y-3 text-sm">
             <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Service</span>
                <span className="font-medium text-slate-900">{service.name}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-slate-500">Specialist</span>
                <span className="font-medium text-slate-900">{doctor.name}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-slate-500">Date & Time</span>
                <span className="font-medium text-slate-900">{selectedDate}, {selectedTime}</span>
            </div>
             <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Booking Fee Paid</span>
                <span className="font-bold text-green-600">₦{BOOKING_FEE.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2">
                <span className="text-slate-500 font-medium">Balance Due at Facility</span>
                <span className="font-bold text-slate-900">₦{service.price.toLocaleString()}</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 mb-6">Please arrive 15 minutes early. Payment for the consultation is due at the facility.</p>
          <button 
            onClick={() => window.location.reload()} // For MVP reset
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-200"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-8">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-purple-600 mb-4 sm:mb-6 transition-colors font-medium text-sm sm:text-base">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
        {/* Progress Header */}
        <div className="bg-purple-50 p-4 sm:p-6 border-b border-purple-100 flex justify-between items-center">
             <div>
                 <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {step === 'datetime' ? 'Select Appointment Time' : 'Confirm & Secure'}
                 </h2>
                 <p className="text-slate-500 text-xs sm:text-sm">
                    {service.name} with {doctor.name}
                 </p>
             </div>
             {step === 'datetime' && (
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Consultation Fee</p>
                    <p className="text-2xl font-bold text-purple-700">₦{service.price.toLocaleString()}</p>
                </div>
             )}
        </div>

        <div className="p-4 sm:p-8">
          {step === 'datetime' ? (
            <div className="animate-fade-in-up">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center text-sm sm:text-base">
                 <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" /> Select Date
               </h3>
               <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-6 sm:mb-8">
                 {dates.map((d, i) => (
                   <button 
                     key={i}
                     onClick={() => setSelectedDate(d.date)}
                     className={`flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl flex flex-col items-center justify-center border-2 transition-all ${
                       selectedDate === d.date 
                         ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200 scale-105' 
                         : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-purple-200'
                     }`}
                   >
                     <span className="text-[10px] sm:text-xs font-bold uppercase mb-1">{d.day}</span>
                     <span className="text-lg sm:text-2xl font-bold">{d.date.split(' ')[0]}</span>
                   </button>
                 ))}
               </div>

               <h3 className="font-bold text-slate-900 mb-4 flex items-center text-sm sm:text-base">
                 <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" /> Select Time
               </h3>
               <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8 sm:mb-10">
                 {timeSlots.map((time) => (
                   <button
                     key={time}
                     onClick={() => setSelectedTime(time)}
                     className={`py-2 sm:py-3 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-bold transition-colors border-2 ${
                        selectedTime === time
                         ? 'bg-purple-100 border-purple-500 text-purple-800'
                         : 'bg-white border-slate-100 text-slate-600 hover:border-purple-200'
                     }`}
                   >
                     {time}
                   </button>
                 ))}
               </div>

               <button 
                  onClick={handleProceedToPayment}
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all ${
                      selectedDate && selectedTime 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
               >
                  Continue to Confirmation
               </button>
            </div>
          ) : (
            <div className="animate-fade-in-up">
                <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4 text-sm sm:text-base">Booking Summary</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Patient</span>
                            <span className="font-medium text-right ml-2">{currentUser?.name || "Guest"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Facility</span>
                            <span className="font-medium text-right ml-2">{facility.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Specialist</span>
                            <span className="font-medium text-right ml-2">{doctor.name}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500">Service</span>
                            <span className="font-medium text-right ml-2">{service.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Date/Time</span>
                            <span className="font-medium text-right ml-2">{selectedDate} at {selectedTime}</span>
                        </div>
                    </div>
                    
                    <div className="border-t border-slate-200 my-4 pt-4 space-y-2">
                        <div className="flex justify-between items-center text-slate-500">
                            <span>Consultation Cost <span className="text-[8px] sm:text-[10px] uppercase bg-slate-200 px-1 rounded ml-1">Pay at Facility</span></span>
                            <span className="font-medium">₦{service.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-purple-700">
                            <span className="font-bold">Booking Fee <span className="text-[8px] sm:text-[10px] uppercase bg-purple-100 px-1 rounded ml-1">Pay Now</span></span>
                            <span className="font-bold text-lg">₦{BOOKING_FEE.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-xs flex gap-2">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <p>You are only paying the booking fee now to secure your slot. The consultation fee is paid directly to the facility upon arrival.</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center text-sm sm:text-base">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" /> Payment Method
                    </h3>
                    <div className="p-4 border-2 border-purple-600 bg-purple-50 rounded-xl flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-5 sm:w-10 sm:h-6 bg-slate-800 rounded flex items-center justify-center text-white text-[6px] sm:text-[8px] font-bold">
                                CARD
                            </div>
                            <span className="font-bold text-slate-900 text-sm sm:text-base">Pay with Card / USSD</span>
                        </div>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[4px] sm:border-[5px] border-purple-600"></div>
                    </div>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                   {isProcessing ? (
                       <Loader2 className="w-5 h-5 animate-spin" />
                   ) : (
                       <Lock className="w-5 h-5" />
                   )}
                   {isProcessing ? 'Processing...' : `Pay ₦${BOOKING_FEE.toLocaleString()} & Confirm`}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Secured by Paystack
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
