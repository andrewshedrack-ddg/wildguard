from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.database import get_db
from sqlalchemy.orm import Session
from app.models import User

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginPayload(BaseModel):
    username: str
    password: str


@router.post('/login')
def login(payload: LoginPayload, db: Session = Depends(get_db)):
    # Very small placeholder: check username exists and return success (no real password check)
    user = db.query(User).filter(User.username == payload.username).first()
    if not user:
        raise HTTPException(status_code=401, detail='invalid credentials')
    return {"message": "ok", "user_id": user.id}
