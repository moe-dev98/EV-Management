from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import uvicorn
from constants import DATABASE_URL
from stations_repo import StationsRepo
from pydantic import BaseModel
from models import Base, Station, ChargePoint
import logging
from typing import List, Generator
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)
_stations_repo = StationsRepo()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class ChargePointCreate(BaseModel):
    power: int
    count: int


class StationRequest(BaseModel):
    ©: str
    car_arrival_probability: int
    consumption_of_cars: int
    charge_points: List[ChargePointCreate]


class ChargePointResponse(BaseModel):
    id: int
    power: int
    count: int
    station_id: int

    class Config:
        from_attributes = True


class StationResponse(BaseModel):
    id: int
    station_name: str
    car_arrival_probability: int
    consumption_of_cars: int
    charge_points: List[ChargePointResponse]

    class Config:
        from_attributes = True


def create_charge_points(
    station_id: int, charge_points_data: List[ChargePointCreate]
) -> List[ChargePoint]:
    return [
        ChargePoint(power=cp.power, count=cp.count, station_id=station_id)
        for cp in charge_points_data
    ]


@app.post("/stations/")
def create_station(station: StationRequest, db: Session = Depends(get_db)):
    logger.info(f"Creating station: {station.station_name}")

    db_station = Station(
        station_name=station.station_name,
        car_arrival_probability=station.car_arrival_probability,
        consumption_of_cars=station.consumption_of_cars,
    )
    logger.debug(f"Station details: {db_station}")
    _stations_repo.create_station(db=db, station=db_station)
    charge_points = create_charge_points(db_station.id, station.charge_points)
    logger.debug(f"Charge points: {charge_points}")
    _stations_repo.upsert_station(
        db=db, station=db_station, charge_points=charge_points
    )
    logger.info(f"Station created with name: {station.station_name}")
    return {"message": "Station created successfully"}


@app.get("/stations/{station_id}", response_model=StationResponse)
def read_station(station_id: int, db: Session = Depends(get_db)):
    logger.info(f"Fetching station with ID: {station_id}")
    station = _stations_repo.get_station(db=db, station_id=station_id)
    if station:
        logger.info(f"Station found: {station.station_name}")
        return station
    logger.warning(f"Station with ID {station_id} not found")
    raise HTTPException(status_code=404, detail="Station not found")


@app.get("/stations/", response_model=List[StationResponse])
def read_stations(db: Session = Depends(get_db)):
    logger.info("Fetching all stations")
    stations = _stations_repo.get_stations(db=db)
    logger.info(f"Number of stations found: {len(stations)}")
    return stations


@app.put("/stations/{station_id}")
def update_station(
    station_id: int, station: StationRequest, db: Session = Depends(get_db)
):
    logger.info(f"Updating station with ID: {station_id}")
    db_station = _stations_repo.get_station(db=db, station_id=station_id)
    if not db_station:
        logger.warning(f"Station with ID {station_id} not found")
        raise HTTPException(status_code=404, detail="Station not found")

    db_station.station_name = station.station_name
    db_station.car_arrival_probability = station.car_arrival_probability
    db_station.consumption_of_cars = station.consumption_of_cars

    charge_points = create_charge_points(db_station.id, station.charge_points)
    _stations_repo.upsert_station(
        db=db, station=db_station, charge_points=charge_points
    )
    logger.info(f"Station updated with ID: {station_id}")
    return {"message": "Station updated successfully"}


@app.delete("/stations/{station_id}")
def delete_station(station_id: int, db: Session = Depends(get_db)):
    logger.info(f"Deleting station with ID: {station_id}")
    result = _stations_repo.delete_station(db=db, station_id=station_id)
    if result:
        logger.info(f"Station with ID {station_id} deleted")
        return {"message": "Station deleted successfully"}
    logger.warning(f"Station with ID {station_id} not found")
    raise HTTPException(status_code=404, detail="Station not found")


@app.get("/health")
def health_check():
    logger.info("Health check endpoint called")
    return {"status": "healthy"}


if __name__ == "__main__":
    logger.info("Starting server")
    uvicorn.run(app, host="0.0.0.0", port=8000)
