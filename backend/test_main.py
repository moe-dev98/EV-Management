from unittest.mock import patch
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


@pytest.fixture
def test_client():
    yield client


class MockStation:
    def __init__(
        self, id, name, car_arrival_probability, consumption_of_cars, charge_points
    ):
        self.id = id
        self.name = name
        self.car_arrival_probability = car_arrival_probability
        self.consumption_of_cars = consumption_of_cars
        self.charge_points = charge_points


@patch("main._stations_repo")
def test_create_station(mock_repo, test_client):
    # Mock the create_station method
    mock_repo.create_station.return_value = None

    # Mock the upsert_station method
    mock_repo.upsert_station.return_value = {"id": 1, "name": "Test Station"}

    # Create station
    response = test_client.post(
        "/stations/",
        json={
            "name": "Test Station",
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
    mock_station = MockStation(
        id=1,
        name="Test Station",
        car_arrival_probability=50,
        consumption_of_cars=20,
        charge_points=[
            {"id": 1, "power": 100, "count": 2, "station_id": 1},
            {"id": 2, "power": 200, "count": 3, "station_id": 1},
        ],
    )
    mock_repo.get_station.return_value = mock_station

    # Read station
    response = test_client.get("/stations/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "name": "Test Station",
        "car_arrival_probability": 50,
        "consumption_of_cars": 20,
        "charge_points": [
            {"id": 1, "power": 100, "count": 2, "station_id": 1},
            {"id": 2, "power": 200, "count": 3, "station_id": 1},
        ],
    }


@patch("main._stations_repo")
def test_read_stations(mock_repo, test_client):
    # Mock the get_stations method
    mock_station_1 = MockStation(
        id=1,
        name="Test Station 1",
        car_arrival_probability=50,
        consumption_of_cars=20,
        charge_points=[
            {"id": 1, "power": 100, "count": 2, "station_id": 1},
            {"id": 2, "power": 200, "count": 3, "station_id": 1},
        ],
    )
    mock_station_2 = MockStation(
        id=2,
        name="Test Station 2",
        car_arrival_probability=60,
        consumption_of_cars=30,
        charge_points=[
            {"id": 3, "power": 150, "count": 1, "station_id": 2},
            {"id": 4, "power": 250, "count": 4, "station_id": 2},
        ],
    )
    mock_repo.get_stations.return_value = [mock_station_1, mock_station_2]

    # Read all stations
    response = test_client.get("/stations/")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "name": "Test Station 1",
            "car_arrival_probability": 50,
            "consumption_of_cars": 20,
            "charge_points": [
                {"id": 1, "power": 100, "count": 2, "station_id": 1},
                {"id": 2, "power": 200, "count": 3, "station_id": 1},
            ],
        },
        {
            "id": 2,
            "name": "Test Station 2",
            "car_arrival_probability": 60,
            "consumption_of_cars": 30,
            "charge_points": [
                {"id": 3, "power": 150, "count": 1, "station_id": 2},
                {"id": 4, "power": 250, "count": 4, "station_id": 2},
            ],
        },
    ]


@patch("main._stations_repo")
def test_update_station(mock_repo, test_client):
    # Mock the get_station method
    mock_station = MockStation(
        id=1,
        name="Test Station",
        car_arrival_probability=50,
        consumption_of_cars=20,
        charge_points=[],
    )
    mock_repo.get_station.return_value = mock_station

    # Mock the upsert_station method
    mock_repo.upsert_station.return_value = {"id": 1, "name": "Updated Station"}

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
