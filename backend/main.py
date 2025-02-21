from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import uvicorn
from constants import DATABASE_URL

app = FastAPI()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Station(Base):
    __tablename__ = "stations"
    id = Column(Integer, primary_key=True, index=True)
    station_name = Column(String, index=True)
    position_lat = Column(Float)
    position_long = Column(Float)
    car_arrival_probability = Column(Integer)
    consumption_of_cars = Column(Integer)
    actual_max_power_demand = Column(Float)
    charge_points = relationship("ChargePoint", back_populates="station")

class ChargePoint(Base):
    __tablename__ = "charge_points"
    id = Column(Integer, primary_key=True, index=True)
    power = Column(Integer)
    count = Column(Integer)
    station_id = Column(Integer, ForeignKey("stations.id"))

Base.metadata.create_all(bind=engine)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)