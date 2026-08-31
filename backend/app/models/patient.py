from sqlalchemy import Column, Integer, String, Date, Float, Text
from app.core.database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    date_of_birth = Column(Date)
    gender = Column(String)
    contact_number = Column(String)
    
    # Basic health vitals/data for ML predictions
    blood_group = Column(String)
    height_cm = Column(Float)
    weight_kg = Column(Float)
    medical_history = Column(Text)
