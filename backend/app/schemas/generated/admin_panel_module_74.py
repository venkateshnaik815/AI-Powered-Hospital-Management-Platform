from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AdminPanelModule74Base(BaseModel):
    is_active: bool = True
    field_0: Optional[str] = None
    value_0: Optional[float] = 0.0
    field_1: Optional[str] = None
    value_1: Optional[float] = 0.0
    field_2: Optional[str] = None
    value_2: Optional[float] = 0.0
    field_3: Optional[str] = None
    value_3: Optional[float] = 0.0
    field_4: Optional[str] = None
    value_4: Optional[float] = 0.0
    field_5: Optional[str] = None
    value_5: Optional[float] = 0.0
    field_6: Optional[str] = None
    value_6: Optional[float] = 0.0
    field_7: Optional[str] = None
    value_7: Optional[float] = 0.0
    field_8: Optional[str] = None
    value_8: Optional[float] = 0.0
    field_9: Optional[str] = None
    value_9: Optional[float] = 0.0
    field_10: Optional[str] = None
    value_10: Optional[float] = 0.0
    field_11: Optional[str] = None
    value_11: Optional[float] = 0.0
    field_12: Optional[str] = None
    value_12: Optional[float] = 0.0
    field_13: Optional[str] = None
    value_13: Optional[float] = 0.0
    field_14: Optional[str] = None
    value_14: Optional[float] = 0.0
    field_15: Optional[str] = None
    value_15: Optional[float] = 0.0
    field_16: Optional[str] = None
    value_16: Optional[float] = 0.0
    field_17: Optional[str] = None
    value_17: Optional[float] = 0.0
    field_18: Optional[str] = None
    value_18: Optional[float] = 0.0
    field_19: Optional[str] = None
    value_19: Optional[float] = 0.0
    field_20: Optional[str] = None
    value_20: Optional[float] = 0.0
    field_21: Optional[str] = None
    value_21: Optional[float] = 0.0
    field_22: Optional[str] = None
    value_22: Optional[float] = 0.0
    field_23: Optional[str] = None
    value_23: Optional[float] = 0.0
    field_24: Optional[str] = None
    value_24: Optional[float] = 0.0

class AdminPanelModule74Create(AdminPanelModule74Base):
    pass

class AdminPanelModule74Response(AdminPanelModule74Base):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True
