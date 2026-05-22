from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_species():
    payload = {"species_name": "test-species", "common_name": "Testy", "scientific_name": "Testus specius"}
    r = client.post('/api/species/', json=payload)
    assert r.status_code in (200, 201)
    assert 'id' in r.json()


def test_create_alert():
    payload = {"alert_type": "test", "message": "hello", "channel": "console"}
    r = client.post('/api/alerts/', json=payload)
    assert r.status_code in (200, 201)
    assert 'id' in r.json()
