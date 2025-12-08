
import React from 'react';
import { Appointment } from '../types';
import { CalendarDays, Clock, CheckCircle, XCircle, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ProviderDashboardProps {
    appointments?: Appointment[];
}

const data = [
  { name: 'Mon', visits: 12 },
  { name: 'Tue', visits: 19 },
  { name: 'Wed', visits: 15 },
  { name: 'Thu', visits: 22 },
  { name: 'Fri', visits: 18 },
  { name: 'Sat', visits: 8 },
];

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ appointments = [] }) => {
  // Sort appointments: pending first, then by time
  const sortedAppointments = [...appointments].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return 0; // In real app sort by time
  });

  const todayCount = sortedAppointments.filter(a => a.date === 'Today' && a.status === 'confirmed').length;
  const pendingCount = sortedAppointments.filter(a => a.status === 'pending').length;

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      <div className="bg-white border-b border-purple-100 px-4 sm:px-6 py-4 mb-6 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Reception Desk</h1>
            <p className="text-xs sm:text-sm text-slate-500">Kwara Advanced Medical Center</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">Nurse Amina</div>
                <div className="text-xs text-purple-600">Admin</div>
             </div>
             <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-purple-200" alt="Profile" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-purple-100 flex items-center justify-between">
                <div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Today's Appointments</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-purple-900 mt-1">{todayCount}</h3>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl">
                    <CalendarDays className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-purple-100 flex items-center justify-between">
                <div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Pending Confirmation</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mt-1">{pendingCount}</h3>
                </div>
                <div className="bg-orange-50 p-3 rounded-xl">
                    <Clock className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>
             <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-purple-100 flex items-center justify-between">
                <div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Total Patients (Week)</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">84</h3>
                </div>
                <div className="bg-green-50 p-3 rounded-xl">
                    <Users className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Appointment List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-purple-50/50">
                    <h2 className="font-bold text-slate-800">Live Schedule</h2>
                    <span className="text-xs sm:text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Today</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                    {sortedAppointments.length === 0 && (
                        <div className="p-8 text-center text-slate-500">No appointments scheduled today.</div>
                    )}
                    {sortedAppointments.map((apt) => (
                        <div key={apt.id} className={`p-4 hover:bg-purple-50/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${apt.status === 'pending' ? 'bg-orange-50/30' : ''}`}>
                            <div className="flex items-start sm:items-center gap-4">
                                <div className="font-mono text-slate-500 font-semibold w-16 sm:w-20 text-center bg-slate-50 rounded-lg py-2 text-xs sm:text-sm flex-shrink-0">
                                    {apt.time.split(' ')[0]} <span className="block text-[10px] sm:text-xs">{apt.time.split(' ')[1]}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{apt.patientName}</h4>
                                    <p className="text-xs sm:text-sm text-slate-500">{apt.serviceName} • {apt.doctorName}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pl-20 sm:pl-0">
                                <div className="flex flex-col items-end mr-2">
                                     <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase mb-1 ${
                                        apt.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                                    }`}>
                                        {apt.paymentStatus}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                                        apt.status === 'confirmed' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                        apt.status === 'pending' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                        'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                        {apt.status}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Check-in">
                                        <CheckCircle size={20} />
                                    </button>
                                     <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancel">
                                        <XCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Analytics */}
            <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden flex flex-col h-fit">
                <div className="px-6 py-4 border-b border-slate-100 bg-purple-50/50">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-purple-600" />
                        <h2 className="font-bold text-slate-800">Patient Flow</h2>
                    </div>
                </div>
                <div className="p-6">
                    <div className="h-48 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    cursor={{fill: '#f3e8ff'}}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="visits" radius={[4, 4, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#9333ea" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-4">Patient visits over the last 6 days</p>
                </div>
                
                 <div className="bg-purple-900 p-6 text-white">
                    <h3 className="font-bold mb-2">Notice</h3>
                    <p className="text-sm text-purple-200">
                        New "Confirmed" appointments (Booking Fee Paid) will appear instantly in the schedule. Full service fees are collected at the desk.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
