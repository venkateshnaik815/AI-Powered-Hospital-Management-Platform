"use client";
import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import HealthRiskPredictor from '../../../components/HealthRiskPredictor';

export default function PatientDetails({ params }: { params: { id: string } }) {
  const patientId = parseInt(params.id);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex items-center gap-6">
        <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <User size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Details</h1>
          <p className="text-gray-500 mt-1">ID: #{patientId}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">AI Diagnostics & Predictions</h2>
      <HealthRiskPredictor patientId={patientId} />
    </div>
  );
}
