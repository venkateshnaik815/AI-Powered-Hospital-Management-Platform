"use client";
import { Activity, Users, Bed, BrainCircuit, Search, Bell, Plus, Stethoscope, ChevronRight, CheckCircle2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ first_name: "", last_name: "", diagnosis: "" });

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/patients");
      const data = await res.json();
      setPatients(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:8000/api/v1/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: newPatient.first_name,
          last_name: newPatient.last_name,
          medical_history: newPatient.diagnosis
        })
      });
      setIsModalOpen(false);
      setNewPatient({ first_name: "", last_name: "", diagnosis: "" });
      fetchPatients(); 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hospital Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Dr. Admin • {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64 shadow-sm"
            />
          </div>
          <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-slate-50"></span>
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow">
            A
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Users className="h-24 w-24" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Patients</h3>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900 relative z-10">{patients.length}</p>
          <p className="text-sm text-emerald-600 flex items-center mt-3 font-medium relative z-10">
            <TrendingUp className="h-4 w-4 mr-1" />
            Live Data Sync
          </p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Available Beds</h3>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Bed className="h-5 w-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900 relative z-10">142</p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4 mb-1">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{width: "71%"}}></div>
          </div>
          <p className="text-xs text-slate-500 font-medium">Out of 200 total capacity</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit className="h-24 w-24" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-indigo-100 text-sm font-semibold uppercase tracking-wider">AI Predictions</h3>
            <div className="p-2.5 bg-white/20 text-white rounded-xl backdrop-blur-sm">
              <BrainCircuit className="h-5 w-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold relative z-10">89</p>
          <p className="text-sm text-indigo-100 flex items-center mt-3 font-medium relative z-10">
            <Activity className="h-4 w-4 mr-1" />
            Risk assessments today
          </p>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Active Doctors</h3>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Stethoscope className="h-5 w-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900 relative z-10">45</p>
          <p className="text-sm text-slate-500 flex items-center mt-3 font-medium relative z-10">
            <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-500" />
            Currently on duty
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Patients Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Recent Patients</h2>
              <p className="text-sm text-slate-500 mt-1">Live data from PostgreSQL database</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-sm font-semibold bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Patient
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Diagnosis</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ML Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm bg-white">
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <Users className="h-10 w-10 mb-3 text-slate-300" />
                        <p className="text-slate-600 font-medium">No patients found</p>
                        <p className="text-sm mt-1">Click "Add Patient" to create a new record.</p>
                      </div>
                    </td>
                  </tr>
                ) : patients.map((patient: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mr-3">
                          {patient.first_name[0]}{patient.last_name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{patient.first_name} {patient.last_name}</div>
                          <div className="text-xs text-slate-500">ID: #{patient.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700 font-medium">{patient.medical_history || "General Checkup"}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        Admitted
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${idx % 2 === 0 ? 'text-amber-700 bg-amber-50 border border-amber-200' : 'text-emerald-700 bg-emerald-50 border border-emerald-200'}`}>
                        {idx % 2 === 0 ? 'Medium (45%)' : 'Low (12%)'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
            <Link href="/patients" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center justify-center">
              View All Patients <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-50 rounded-lg mr-3">
                <BrainCircuit className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">AI Insights</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-4 flex-1 bg-slate-50/30">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">Critical Alert</span>
                <span className="text-xs font-medium text-slate-400">10 min ago</span>
              </div>
              <p className="text-slate-900 font-bold mt-3 text-sm">ICU Readmission Risk</p>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">Patient #1042 shows an 82% probability of ICU readmission based on recent vitals anomaly detection.</p>
              <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center">Review Vitals <ChevronRight className="h-4 w-4 ml-1" /></button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">System Update</span>
                <span className="text-xs font-medium text-slate-400">1 hr ago</span>
              </div>
              <p className="text-slate-900 font-bold mt-3 text-sm">Model Retraining Complete</p>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">The Diabetes Risk Prediction model (v2.4) has finished training with an improved F1 score of 0.94.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-50 rounded-xl mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Register Patient</h2>
                <p className="text-sm text-slate-500">Enter new patient details below</p>
              </div>
            </div>
            
            <form onSubmit={handleAddPatient} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">First Name</label>
                  <input required type="text" className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={newPatient.first_name} onChange={e => setNewPatient({...newPatient, first_name: e.target.value})} placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Last Name</label>
                  <input required type="text" className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={newPatient.last_name} onChange={e => setNewPatient({...newPatient, last_name: e.target.value})} placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Primary Diagnosis / Medical History</label>
                <textarea required rows={3} className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" value={newPatient.diagnosis} onChange={e => setNewPatient({...newPatient, diagnosis: e.target.value})} placeholder="e.g. Type 2 Diabetes, Hypertension..." />
              </div>
              
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
                  Save Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
