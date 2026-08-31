"use client";
import { Calendar, Plus, Clock, User, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppt, setNewAppt] = useState({ patient_id: "", date: "", time: "", notes: "" });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [apptRes, patRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/v1/appointments"),
        fetch("http://127.0.0.1:8000/api/v1/patients")
      ]);
      setAppointments(await apptRes.json());
      setPatients(await patRes.json());
    } catch (e) {
      console.error(e);
      alert("Error: Backend server is down. Please run start.bat!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppt.patient_id) return alert("Please select a patient.");

    const dateTime = new Date(`${newAppt.date}T${newAppt.time}:00`).toISOString();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: parseInt(newAppt.patient_id),
          doctor_id: 1,
          appointment_date: dateTime,
          notes: newAppt.notes
        })
      });
      if (!res.ok) throw new Error("Failed");
      setIsModalOpen(false);
      setNewAppt({ patient_id: "", date: "", time: "", notes: "" });
      fetchData();
    } catch (e) {
      console.error(e);
      alert("Error: Backend server is disconnected. Data could not be saved.");
    }
  };

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
          <button onClick={() => setIsModalOpen(true)} className="flex items-center text-sm font-semibold bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
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
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Doctor</th>
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
                      <button onClick={() => setIsModalOpen(true)} className="mt-3 text-blue-600 font-semibold hover:underline">Book an appointment</button>
                    </div>
                  </td>
                </tr>
              ) : appointments.map((appt: any, idx: number) => {
                const patient = patients.find((p: any) => p.id === appt.patient_id);
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-400 mr-2" />
                        <span className="font-semibold text-slate-900">
                          {new Date(appt.appointment_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-slate-700">
                        <User className="h-4 w-4 mr-2" />
                        {patient ? `${patient.first_name} ${patient.last_name}` : `Patient #${appt.patient_id}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-slate-700 font-medium">Dr. Admin (ID: {appt.doctor_id})</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {appt.status ? appt.status.toUpperCase() : 'SCHEDULED'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {appt.notes || "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-50 rounded-xl mr-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Book Appointment</h2>
                <p className="text-sm text-slate-500">Schedule a new visit</p>
              </div>
            </div>
            
            <form onSubmit={handleBook} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Patient</label>
                <select 
                  required 
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                  value={newAppt.patient_id}
                  onChange={e => setNewAppt({...newAppt, patient_id: e.target.value})}
                >
                  <option value="" disabled>Select a registered patient...</option>
                  {patients.map((p: any) => (
                    <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>
                  ))}
                </select>
                {patients.length === 0 && <p className="text-xs text-red-500 mt-1">Please register a patient first in the Patients tab.</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Date</label>
                  <input required type="date" className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={newAppt.date} onChange={e => setNewAppt({...newAppt, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Time</label>
                  <input required type="time" className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={newAppt.time} onChange={e => setNewAppt({...newAppt, time: e.target.value})} />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Notes / Reason for visit</label>
                <textarea rows={2} className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" value={newAppt.notes} onChange={e => setNewAppt({...newAppt, notes: e.target.value})} placeholder="e.g. Follow up on blood test..." />
              </div>
              
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={patients.length === 0} className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow disabled:opacity-50">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
