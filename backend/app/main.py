from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="HealthMLCloudEngine API",
    description="Enterprise AI-Powered Hospital Management Platform",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.core.database import engine, Base
from app.models import user, patient, appointment

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Welcome to HealthMLCloudEngine API"}

from app.api.endpoints import auth, patients, appointments
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(patients.router, prefix="/api/v1/patients", tags=["patients"])
app.include_router(appointments.router, prefix="/api/v1/appointments", tags=["appointments"])

@app.get("/health")
def health_check():
    return {"status": "healthy"}
