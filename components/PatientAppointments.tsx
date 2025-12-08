
import React from 'react';
import { Appointment } from '../types';
import { Calendar, Clock, MapPin, CheckCircle2, X } from 'lucide-react';

interface PatientAppointmentsProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onReview: (appointment: Appointment) => void;
}

export const PatientAppointments: React.FC<PatientAppointmentsProps> = ({ isOpen, onClose, appointments, onReview }) => {
  if (!isOpen) return null;

  // Filter for patient view (mocking a logged in user "Guest User")
  // In a real app, this would filter by Auth ID.
  const myAppointments = appointments.filter(a => a.patientName === 'Guest User' || a.id === 'A4'); // Including A4 for demo purposes

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-fade-in-up flex flex-col">
        <div className="p-6 border-b border-purple-100 flex justify-between items-center bg-purple-50">
            <h2 className="text-xl font-bold text-slate-900">My Appointments</h2>
            <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-purple-600 shadow-sm transition-colors">
                <X size={20} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {myAppointments.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No appointments found.</p>
                </div>
            ) : (
                myAppointments.map(apt => (
                    <div key={apt.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:border-purple-200 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-slate-900">{apt.hospitalName}</h3>
                                <p className="text-sm text-purple-600 font-medium">{apt.serviceName}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wide ${
                                apt.status === 'confirmed' ? 'bg-purple-100 text-purple-700' :
                                apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                                'bg-orange-100 text-orange-700'
                            }`}>
                                {apt.status}
                            </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-slate-500 mb-4">
                             <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                {apt.date}
                             </div>
                             <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-400" />
                                {apt.time}
                             </div>
                             <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                {apt.doctorName}
                             </div>
                        </div>

                        {apt.status === 'completed' && !apt.reviewed && (
                            <button 
                                onClick={() => onReview(apt)}
                                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-100"
                            >
                                <CheckCircle2 className="w-4 h-4" /> Rate Experience
                            </button>
                        )}
                         {apt.status === 'completed' && apt.reviewed && (
                            <div className="w-full py-2 bg-slate-100 text-slate-400 rounded-xl text-sm font-bold text-center">
                                Thank you for your review
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};
