# HealthMLCloudEngine

**Enterprise AI-Powered Hospital Management Platform**

This project is a massive, highly scalable hospital management system with integrated Machine Learning capabilities for predictive healthcare.

## Tech Stack
- **Backend**: Python, FastAPI, SQLAlchemy
- **Frontend**: Next.js, React, TailwindCSS
- **Database**: PostgreSQL, Redis
- **MLOps**: MLflow, Celery, Scikit-learn
- **DevOps**: Docker, Docker Compose, GitHub Actions

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Python 3.10+
- Node.js 18+

### Quickstart (Local Development)

1. Start infrastructure (Database, Redis):
   ```bash
   docker-compose up -d
   ```

2. Setup Backend:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. Setup Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
