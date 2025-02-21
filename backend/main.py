from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
import uvicorn
from constants import DATABASE_URL
from stations_repo import StationsRepo 
from pydantic import BaseModel
from models import Base, Station, ChargePoint
import logging

app = FastAPI()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)
_stations_repo = StationsRepo()  

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

logging.basicConfig(level=logging.INFO)

class ChargePointCreate(BaseModel):
    power: int
    count: int

class StationCreate(BaseModel):
    station_name: str
    position_lat: float
    position_long: float
    car_arrival_probability: int
    consumption_of_cars: int
    actual_max_power_demand: float
    charge_points: list[ChargePointCreate]

@app.post("/stations/")
def create_station(station: StationCreate, db: Session = Depends(get_db)):
    logging.info(f"Creating station: {station.station_name}")
    db_station = Station(
        station_name=station.station_name,
        position_lat=station.position_lat,
        position_long=station.position_long,
        car_arrival_probability=station.car_arrival_probability,
        consumption_of_cars=station.consumption_of_cars,
        actual_max_power_demand=station.actual_max_power_demand
    )
    _stations_repo.create_station(db=db, station=db_station)
    charge_points = [ChargePoint(power=cp.power, count=cp.count, station_id=db_station.id) for cp in station.charge_points]
    result = _stations_repo.upsert_station(db=db, station=db_station, charge_points=charge_points)
    logging.info(f"Station created with ID: {result.id}")
    return result

@app.get("/stations/{station_id}")
def read_station(station_id: int, db: Session = Depends(get_db)):
    return _stations_repo.get_station(db=db, station_id=station_id)

@app.get("/stations/")
def read_stations(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return _stations_repo.get_stations(db=db, skip=skip, limit=limit)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)