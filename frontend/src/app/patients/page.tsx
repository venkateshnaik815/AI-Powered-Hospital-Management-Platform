"use client";
import { Users, Search, Filter, Plus, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ first_name: "", last_name: "", diagnosis: "" });

  const fetchPatients = () => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/api/v1/patients")
      .then(res => res.json())
      .then(data => {
        setPatients(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        alert("Error: Backend server is down. Please run start.bat!");
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: newPatient.first_name,
          last_name: newPatient.last_name,
          medical_history: newPatient.diagnosis
        })
      });
      if (!res.ok) throw new Error("Failed");
      setIsModalOpen(false);
      setNewPatient({ first_name: "", last_name: "", diagnosis: "" });
      fetchPatients(); 
    } catch (e) {
      console.error(e);
      alert("Error: Backend server is disconnected. Data could not be saved.");
    }
  };

  const filteredPatients = patients.filter((p: any) => 
    p.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toString().includes(searchQuery)
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Patient Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage hospital patients and view their medical history.</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => alert("Filters opened! (Demo)")} className="flex items-center text-sm font-semibold bg-white text-slate-700 border border-slate-300 px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors shadow-sm hover:shadow">
            <Filter className="h-4 w-4 mr-2 text-slate-400" />
            Filters
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center text-sm font-semibold bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
            <Plus className="h-4 w-4 mr-2" />
            New Patient
          </button>
        </div>
      </header>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Showing {filteredPatients.length} patients
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Diagnosis</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Loading patients...</td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No patients match your search.</td>
                </tr>
              ) : filteredPatients.map((patient: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                    #{patient.id.toString().padStart(4, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mr-4">
                        {patient.first_name[0]}{patient.last_name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{patient.first_name} {patient.last_name}</div>
                        <div className="text-xs text-slate-500 flex items-center mt-0.5">
                          Registered: {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700 font-medium">{patient.medical_history || "General Checkup"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Admitted
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => alert(`Opening EHR for ${patient.first_name}`)} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors inline-flex items-center">
                      <FileText className="h-4 w-4 mr-1.5" />
                      View EHR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
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
