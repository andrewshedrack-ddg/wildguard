from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_detections_list():
    r = client.get("/api/detections/")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_inventory_list():
    r = client.get("/api/inventory/")
    assert r.status_code == 200
    assert isinstance(r.json(), list)
