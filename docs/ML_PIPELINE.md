# Machine Learning Pipeline Architecture

HealthMLCloudEngine provides a robust ML pipeline to train and deploy predictive healthcare models (e.g., Diabetes Risk, Heart Disease Prediction).

## Technologies
- **Training**: Scikit-learn, XGBoost, PyTorch (optional)
- **Background Tasks**: Celery
- **Message Broker**: Redis
- **Experiment Tracking & Model Registry**: MLflow

## Pipeline Workflow

1. **Dataset Upload**
   - User uploads a CSV dataset via the API.
   - The file is saved in object storage (or local volume for now).

2. **Data Preprocessing**
   - Celery worker receives the job.
   - Cleans data, handles missing values, and normalizes using Pandas/Scikit-learn.

3. **Model Training**
   - Celery worker initiates model training.
   - MLflow logs hyperparameters, metrics (Accuracy, F1 Score), and the model artifact.

4. **Model Registration**
   - The best-performing model is registered in MLflow Model Registry.

5. **Deployment / Prediction**
   - FastAPI prediction endpoint loads the latest registered model from MLflow.
   - Real-time API serves inferences for patient profiles.
