from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.get("/ping")
def ping():
    return {"message": "auth ok"}
