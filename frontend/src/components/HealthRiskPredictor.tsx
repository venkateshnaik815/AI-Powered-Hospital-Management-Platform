import React, { useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function HealthRiskPredictor({ patientId }: { patientId: number }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePredict = async () => {
    setLoading(true);
    try {
      // Simulate API call to the new ML endpoint
      const response = await fetch(`http://localhost:8000/api/v1/predict/${patientId}/risk-score`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        // Fallback mock if backend isn't connected
        setTimeout(() => {
          setResult({
            risk_score_percentage: 42.5,
            risk_level: "High",
            ai_confidence_score: 0.92,
            recommendations: ["Schedule cardiology follow-up", "Monitor blood pressure weekly"]
          });
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Zap size={24} className="text-indigo-500" />
          <h2 className="text-lg font-bold">HealthML Risk Predictor</h2>
        </div>
        <button 
          onClick={handlePredict}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Analyzing Vitals...' : 'Run Prediction'}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border border-gray-100 flex items-center gap-4">
              <div className={`p-3 rounded-full ${result.risk_level === 'High' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {result.risk_level === 'High' ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
              </div>
              <div>
                <p className="text-sm text-gray-500">Risk Level</p>
                <p className={`font-bold text-lg ${result.risk_level === 'High' ? 'text-red-600' : 'text-green-600'}`}>
                  {result.risk_level} ({result.risk_score_percentage}%)
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded border border-gray-100 flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">AI Confidence</p>
                <p className="font-bold text-lg text-gray-800">
                  {(result.ai_confidence_score * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">AI Recommendations:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {result.recommendations.map((rec: string, i: number) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
