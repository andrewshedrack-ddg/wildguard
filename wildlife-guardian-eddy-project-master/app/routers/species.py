from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import GlobalSpeciesCatalog

router = APIRouter(prefix="/api/species", tags=["species"])


@router.get("/", response_model=List[dict])
def list_species(limit: int = 100, db: Session = Depends(get_db)):
    rows = db.query(GlobalSpeciesCatalog).order_by(GlobalSpeciesCatalog.species_name).limit(limit).all()
    return [
        {
            "id": r.id,
            "species_name": r.species_name,
            "common_name": r.common_name,
            "scientific_name": r.scientific_name,
        }
        for r in rows
    ]


@router.post("/", status_code=201)
def create_species(payload: dict, db: Session = Depends(get_db)):
    try:
        s = GlobalSpeciesCatalog(
            species_name=payload.get("species_name"),
            common_name=payload.get("common_name", ""),
            scientific_name=payload.get("scientific_name", ""),
        )
        db.add(s)
        db.commit()
        db.refresh(s)
        return {"id": s.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
