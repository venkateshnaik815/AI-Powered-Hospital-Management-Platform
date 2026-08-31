"use client";
import { BrainCircuit, Play, CheckCircle2, AlertTriangle, UploadCloud, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function MLModelsPage() {
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainProgress, setRetrainProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleRetrain = () => {
    setIsRetraining(true);
    setRetrainProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setRetrainProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRetraining(false);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleUpload = () => {
    // Just mock a file upload click
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.json,.parquet';
    input.onchange = () => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };
    input.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      {/* Success Toast */}
      <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm transition-all z-50 flex items-center ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="h-5 w-5 mr-2" />
        Action completed successfully!
      </div>

      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Machine Learning Models</h1>
          <p className="text-sm text-slate-500 mt-1">Manage, train, and deploy predictive healthcare AI models.</p>
        </div>
        <button onClick={handleUpload} className="flex items-center text-sm font-semibold bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow">
          <UploadCloud className="h-4 w-4 mr-2" />
          Upload Dataset
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Deployed Models */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2" />
            Active Deployed Models
          </h2>
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 text-lg">Diabetes Risk Predictor</h3>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md">v2.4 (Live)</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">XGBoost model predicting Type 2 Diabetes onset based on patient vitals and history.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-xs text-slate-500 font-medium">Accuracy</div>
                  <div className="font-bold text-slate-900">94.2%</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-xs text-slate-500 font-medium">F1 Score</div>
                  <div className="font-bold text-slate-900">0.92</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-xs text-slate-500 font-medium">Inferences</div>
                  <div className="font-bold text-slate-900">12.4k</div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 text-lg">ICU Readmission Risk</h3>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md">v1.1 (Live)</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Random Forest classifier identifying patients likely to return to ICU within 48 hours.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-xs text-slate-500 font-medium">Accuracy</div>
                  <div className="font-bold text-slate-900">89.5%</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-xs text-slate-500 font-medium">F1 Score</div>
                  <div className="font-bold text-slate-900">0.87</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-xs text-slate-500 font-medium">Inferences</div>
                  <div className="font-bold text-slate-900">3.1k</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Jobs */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <BrainCircuit className="h-5 w-5 text-indigo-500 mr-2" />
            Training Jobs (Celery / MLflow)
          </h2>
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-xl p-5 bg-indigo-50/50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-indigo-900 text-lg">Heart Disease DNN</h3>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-1.5 animate-pulse"></span>
                  Training...
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Deep Neural Network training on 500k patient records using PyTorch.</p>
              
              <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
                <span>Epoch 42 / 100</span>
                <span>42%</span>
              </div>
              <div className="w-full bg-indigo-100 rounded-full h-2 mb-4">
                <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{width: "42%"}}></div>
              </div>

              <div className="flex space-x-2">
                <button onClick={() => alert("Job stopped via MLflow API")} className="flex-1 bg-white border border-slate-300 text-slate-700 font-medium text-xs py-2 rounded-lg hover:bg-slate-50 transition-colors">Stop Training</button>
                <button onClick={() => alert("Redirecting to MLflow UI")} className="flex-1 bg-indigo-600 text-white font-medium text-xs py-2 rounded-lg hover:bg-indigo-700 transition-colors">View MLflow Logs</button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 text-lg">Stroke Risk Predictor</h3>
                {isRetraining ? (
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center">
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    Retraining... {retrainProgress}%
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Data Drift Detected
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 mb-4">Requires retraining. Input distribution drifted by 14% on feature 'blood_pressure'.</p>
              
              <button 
                onClick={handleRetrain}
                disabled={isRetraining}
                className="w-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold text-sm py-2 rounded-lg hover:bg-amber-100 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRetraining ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Triggering Airflow Pipeline...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Trigger Retraining Pipeline
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
