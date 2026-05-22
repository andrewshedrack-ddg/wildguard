from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import AnimalInventory

router = APIRouter(prefix="/api/inventory", tags=["inventory"])


@router.get("/", response_model=List[dict])
def list_inventory(limit: int = 100, db: Session = Depends(get_db)):
    rows = db.query(AnimalInventory).order_by(AnimalInventory.last_seen_at.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "species_name": r.species_name,
            "count_seen": r.count_seen,
            "last_seen_at": r.last_seen_at.isoformat() if r.last_seen_at else None,
        }
        for r in rows
    ]
