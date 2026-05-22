from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Alert

router = APIRouter(prefix="/api/alerts", tags=["alerts"])


@router.get("/", response_model=List[dict])
def list_alerts(limit: int = 50, db: Session = Depends(get_db)):
    rows = db.query(Alert).order_by(Alert.created_at.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "created_at": r.created_at.isoformat(),
            "alert_type": r.alert_type,
            "message": r.message,
            "channel": r.channel,
            "status": r.status,
        }
        for r in rows
    ]
