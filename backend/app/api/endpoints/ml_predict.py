from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.patient import Patient
import random

router = APIRouter()

@router.get("/{patient_id}/risk-score")
def predict_health_risk(patient_id: int, db: Session = Depends(get_db)):
    """
    AI-Powered predictive endpoint to calculate health risk score based on patient vitals.
    In a production setting, this would invoke a loaded Scikit-Learn or PyTorch model.
    """
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    # Mocking ML model prediction logic based on vitals
    base_risk = 10.0
    
    if patient.weight_kg and patient.height_cm:
        # Calculate BMI
        height_m = patient.height_cm / 100
        bmi = patient.weight_kg / (height_m * height_m)
        
        if bmi > 30:
            base_risk += 15.0 # Obesity risk factor
        elif bmi > 25:
            base_risk += 5.0  # Overweight risk factor
            
    # Add random variance simulating other complex ML features (blood tests, history)
    ai_confidence = random.uniform(0.85, 0.99)
    final_risk_score = min(100.0, base_risk + random.uniform(0, 20.0))
    
    return {
        "patient_id": patient.id,
        "risk_score_percentage": round(final_risk_score, 2),
        "risk_level": "High" if final_risk_score > 40 else "Moderate" if final_risk_score > 20 else "Low",
        "ai_confidence_score": round(ai_confidence, 2),
        "recommendations": [
            "Consider scheduling a gentle follow-up checkup next month just to be safe.",
            "It might be a good idea to keep an eye on blood pressure readings this week." if final_risk_score > 30 else "Keep up the great work! Your current diet and lifestyle look very healthy."
        ]
    }
