from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "HealthMLCloudEngine"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    POSTGRES_SERVER: str = "db"
    POSTGRES_USER: str = "healthadmin"
    POSTGRES_PASSWORD: str = "healthpassword"
    POSTGRES_DB: str = "healthml_db"
    POSTGRES_PORT: str = "5432"
    
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # Security
    SECRET_KEY: str = "CHANGE_THIS_SUPER_SECRET_KEY_FOR_JWT"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Redis / Celery
    REDIS_URL: str = "redis://redis:6379/0"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
