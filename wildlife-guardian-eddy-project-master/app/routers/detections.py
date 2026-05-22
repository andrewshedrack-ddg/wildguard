from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Detection

router = APIRouter(prefix="/api/detections", tags=["detections"])


@router.get("/", response_model=List[dict])
def list_detections(limit: int = 50, db: Session = Depends(get_db)):
    rows = db.query(Detection).order_by(Detection.created_at.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "created_at": r.created_at.isoformat(),
            "top_label": r.top_label,
            "confidence": r.confidence,
            "image_path": r.image_path,
        }
        for r in rows
    ]

