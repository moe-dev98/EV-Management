import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
from main import app

client = TestClient(app)


@pytest.fixture(scope="module")
def test_client():
    yield client


@patch("main._stations_repo")
def test_create_station(mock_repo, test_client):
    # Mock the create_station method
    mock_repo.create_station.return_value = None

    # Mock the upsert_station method
    mock_repo.upsert_station.return_value = MagicMock(id=1, name="Test Station")

    # Create station
    response = test_client.post(
        "/stations/",
        json={
            "name": "Test Station",
            "position_lat": 12.34,
            "position_long": 56.78,
            "car_arrival_probability": 50,
            "consumption_of_cars": 20,
            "charge_points": [{"power": 100, "count": 2}, {"power": 200, "count": 3}],
        },
    )

    assert response.status_code == 200
    assert response.json() == {"message": "Station created successfully"}


@patch("main._stations_repo")
def test_read_station(mock_repo, test_client):
    # Mock the get_station method
    mock_repo.get_station.return_value = MagicMock(
        id=1,
        name="Test Station",
        position_lat=12.34,
        position_long=56.78,
        car_arrival_probability=50,
        consumption_of_cars=20,
        charge_points=[
            MagicMock(id=1, power=100, count=2, station_id=1),
            MagicMock(id=2, power=200, count=3, station_id=1),
        ],
    )

    # Read station
    response = test_client.get("/stations/1")
    assert response.status_code == 200
    assert response.json()["name"] == "Test Station"
    assert response.json()["position_lat"] == 12.34
    assert response.json()["position_long"] == 56.78
    assert response.json()["car_arrival_probability"] == 50
    assert response.json()["consumption_of_cars"] == 20
    assert len(response.json()["charge_points"]) == 2
    assert response.json()["charge_points"][0]["power"] == 100
    assert response.json()["charge_points"][0]["count"] == 2
    assert response.json()["charge_points"][1]["power"] == 200
    assert response.json()["charge_points"][1]["count"] == 3


@patch("main._stations_repo")
def test_read_stations(mock_repo, test_client):
    # Mock the get_stations method
    mock_repo.get_stations.return_value = [
        MagicMock(
            id=1,
            name="Test Station 1",
            position_lat=12.34,
            position_long=56.78,
            car_arrival_probability=50,
            consumption_of_cars=20,
            charge_points=[
                MagicMock(id=1, power=100, count=2, station_id=1),
                MagicMock(id=2, power=200, count=3, station_id=1),
            ],
        ),
        MagicMock(
            id=2,
            name="Test Station 2",
            position_lat=23.45,
            position_long=67.89,
            car_arrival_probability=60,
            consumption_of_cars=30,
            charge_points=[
                MagicMock(id=3, power=150, count=1, station_id=2),
                MagicMock(id=4, power=250, count=4, station_id=2),
            ],
        ),
    ]

    # Read all stations
    response = test_client.get("/stations/")
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["name"] == "Test Station 1"
    assert response.json()[1]["name"] == "Test Station 2"


@patch("main._stations_repo")
def test_update_station(mock_repo, test_client):
    # Mock the get_station method
    mock_repo.get_station.return_value = MagicMock(
        id=1,
        name="Test Station",
        position_lat=12.34,
        position_long=56.78,
        car_arrival_probability=50,
        consumption_of_cars=20,
        charge_points=[],
    )

    # Mock the upsert_station method
    mock_repo.upsert_station.return_value = MagicMock(
        id=1, name="Updated Station"
    )

    # Update station
    response = test_client.put(
        "/stations/1",
        json={
            "name": "Updated Station",
            "position_lat": 23.45,
            "position_long": 67.89,
            "car_arrival_probability": 60,
            "consumption_of_cars": 30,
            "charge_points": [{"power": 150, "count": 1}, {"power": 250, "count": 4}],
        },
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Station updated successfully"}


@patch("main._stations_repo")
def test_delete_station(mock_repo, test_client):
    # Mock the get_station method to simulate station creation
    mock_repo.get_station.side_effect = [
        MagicMock(
            id=1,
            name="Test Station",
            position_lat=12.34,
            position_long=56.78,
            car_arrival_probability=50,
            consumption_of_cars=20,
            charge_points=[],
        ),
        None,
    ]

    # Mock the delete_station method
    mock_repo.delete_station.side_effect = [True, False]

    # Delete station
    response = test_client.delete("/stations/1")
    assert response.status_code == 200
    assert response.json() == {"message": "Station deleted successfully"}

    # Delete station not found
    response = test_client.delete("/stations/2")
    assert response.status_code == 404
    assert response.json() == {"detail": "Station not found"}
