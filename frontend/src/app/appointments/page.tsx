"use client";
import { Calendar, Plus, Clock, User, Filter } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Note: We need a modal to create an appointment, but for now we fetch.
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/appointments")
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">Manage doctor schedules and patient visits.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center text-sm font-semibold bg-white text-slate-700 border border-slate-300 px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="h-4 w-4 mr-2 text-slate-400" />
            Filter Schedule
          </button>
          <button className="flex items-center text-sm font-semibold bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex space-x-4">
            <button className="px-4 py-1.5 bg-white border border-slate-300 rounded-md text-sm font-semibold text-slate-700">Today</button>
            <button className="px-4 py-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700">Upcoming</button>
            <button className="px-4 py-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700">Past</button>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            {appointments.length} Appointments Found
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Patient (ID)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Doctor (ID)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Loading appointments...</td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Calendar className="h-10 w-10 text-slate-300 mb-3" />
                      <p>No appointments booked yet.</p>
                      <button className="mt-3 text-blue-600 font-semibold hover:underline">Book an appointment</button>
                    </div>
                  </td>
                </tr>
              ) : appointments.map((appt: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-slate-400 mr-2" />
                      <span className="font-semibold text-slate-900">
                        {new Date(appt.appointment_date).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-slate-700">
                      <User className="h-4 w-4 mr-2" />
                      Patient #{appt.patient_id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-slate-700 font-medium">Doctor #{appt.doctor_id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      {appt.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {appt.notes || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
