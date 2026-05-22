from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_alerts_list():
    r = client.get("/api/alerts/")
    assert r.status_code == 200
    assert isinstance(r.json(), list)
