from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_live():
    r = client.get("/health/live")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


def test_ready():
    r = client.get("/health/ready")
    assert r.status_code == 200
    assert "status" in r.json()
