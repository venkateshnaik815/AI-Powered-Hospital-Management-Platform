from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.generated.admin_panel_module_124 import AdminPanelModule124
from app.schemas.generated.admin_panel_module_124 import AdminPanelModule124Create, AdminPanelModule124Response

router = APIRouter()

@router.get("/", response_model=List[AdminPanelModule124Response])
def get_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(AdminPanelModule124).offset(skip).limit(limit).all()

@router.post("/", response_model=AdminPanelModule124Response)
def create_item(item: AdminPanelModule124Create, db: Session = Depends(get_db)):
    db_item = AdminPanelModule124(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/{item_id}", response_model=AdminPanelModule124Response)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(AdminPanelModule124).filter(AdminPanelModule124.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.put("/{item_id}", response_model=AdminPanelModule124Response)
def update_item(item_id: int, item: AdminPanelModule124Create, db: Session = Depends(get_db)):
    db_item = db.query(AdminPanelModule124).filter(AdminPanelModule124.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.dict(exclude_unset=True).items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(AdminPanelModule124).filter(AdminPanelModule124.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}
