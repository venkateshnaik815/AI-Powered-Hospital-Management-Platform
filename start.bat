@echo off
echo ===================================================
echo Starting HealthMLCloudEngine Servers...
echo ===================================================

start "Backend (FastAPI)" cmd /k "cd backend && call .venv\Scripts\activate 2>nul || echo .venv not found && uvicorn app.main:app --reload --port 8000 || pause"
start "Frontend (Next.js)" cmd /k "cd frontend && npm run dev || pause"

echo Both servers are launching in separate windows.
echo Keep those windows open!
pause
