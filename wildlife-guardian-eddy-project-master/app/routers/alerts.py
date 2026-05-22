from fastapi import APIRouter, Depends, HTTPException
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


@router.post("/", status_code=201)
def create_alert(payload: dict, db: Session = Depends(get_db)):
    try:
        a = Alert(
            alert_type=payload.get("alert_type", "generic"),
            message=payload.get("message", ""),
            channel=payload.get("channel", "console"),
            status=payload.get("status", "queued"),
            detection_id=payload.get("detection_id", 0),
        )
        db.add(a)
        db.commit()
        db.refresh(a)
        return {"id": a.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
