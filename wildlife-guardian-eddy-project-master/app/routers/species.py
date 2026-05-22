from fastapi import APIRouter, Depends
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
