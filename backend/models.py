from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Station(Base):
    __tablename__ = "stations"
    id = Column(Integer, primary_key=True, index=True)
    station_name = Column(String, index=True)
    position_lat = Column(Float)
    position_long = Column(Float)
    car_arrival_probability = Column(Integer)
    consumption_of_cars = Column(Integer)
    charge_points = relationship("ChargePoint", back_populates="station")

class ChargePoint(Base):
    __tablename__ = "charge_points"
    id = Column(Integer, primary_key=True, index=True)
    power = Column(Integer)
    count = Column(Integer)
    station_id = Column(Integer, ForeignKey("stations.id"))
    station = relationship("Station", back_populates="charge_points")