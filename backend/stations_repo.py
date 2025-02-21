from sqlalchemy.orm import Session
from models import Station, ChargePoint

class StationsRepo:
    def create_station(self, db: Session, station: Station):
        with db.begin():
            db.add(station)
        db.commit()
        db.refresh(station)
        return station

    def get_station(self, db: Session, station_id: int):
        return db.query(Station).filter(Station.id == station_id).first()

    def get_stations(self, db: Session, skip: int = 0, limit: int = 10):
        return db.query(Station).offset(skip).limit(limit).all()

    def upsert_station(self, db: Session, station: Station, charge_points: list[ChargePoint]):
        db_station = db.query(Station).filter(Station.id == station.id).first()
        if db_station:
            db_station.station_name = station.station_name
            db_station.position_lat = station.position_lat
            db_station.position_long = station.position_long
            db_station.car_arrival_probability = station.car_arrival_probability
            db_station.consumption_of_cars = station.consumption_of_cars
            db_station.actual_max_power_demand = station.actual_max_power_demand
        else:
            db_station = station
            db.add(db_station)
            db.commit()
            db.refresh(db_station)
        
        db.query(ChargePoint).filter(ChargePoint.station_id == db_station.id).delete()
        for cp in charge_points:
            cp.station_id = db_station.id
            db.add(cp)
    
        db.commit()
        db.refresh(db_station)
        return db_station