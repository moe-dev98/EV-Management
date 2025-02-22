from sqlalchemy.orm import Session, joinedload
from models import Station, ChargePoint


class StationsRepo:
    def create_station(self, db: Session, station: Station) -> Station:
        with db.begin():
            db.add(station)
        db.commit()
        db.refresh(station)
        return station

    def get_station(self, db: Session, station_id: int) -> Station:
        return (
            db.query(Station)
            .filter(Station.id == station_id)
            .options(joinedload(Station.charge_points))
            .first()
        )

    def get_stations(self, db: Session) -> list[Station]:
        return db.query(Station).order_by(Station.id.desc()).all()

    def upsert_station(
        self, db: Session, station: Station, charge_points: list[ChargePoint]
    ) -> Station:
        db_station = db.query(Station).filter(Station.id == station.id).first()
        if db_station:
            db_station.station_name = station.station_name
            db_station.car_arrival_probability = station.car_arrival_probability
            db_station.consumption_of_cars = station.consumption_of_cars
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

    def delete_station(self, db: Session, station_id: int) -> bool:
        db_station = db.query(Station).filter(Station.id == station_id).first()
        if db_station:
            db.delete(db_station)
            db.commit()
            return True
        return False