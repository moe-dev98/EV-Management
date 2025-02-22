import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const position = [48.3705, 10.8978];
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('/MockStations.json')
      .then(response => response.json())
      .then(data => setStations(data));
  }, []);

  const calculateTotalEnergy = (chargePoints) => {
    return chargePoints.reduce((total, point) => total + (point.power * point.count), 0);
  };

  const getColorBasedOnDemand = (actualMaxPowerDemand, totalEnergy) => {
    if (actualMaxPowerDemand >= totalEnergy - 20) {
      return 'red';
    } else if (actualMaxPowerDemand >= totalEnergy / 2) {
      return 'blue';
    } else {
      return 'green';
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-center font-bold mb-4">Daily Distribution of Charging Points</h2>
      <MapContainer 
        center={position} 
        zoom={16} 
        className="h-96 w-full z-0 border-2 border-gray-800 rounded-lg"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // this is not the default tile set from leaflet 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {stations.map(station => (
          <Circle
            key={station.id}
            center={station.position}
            radius={10} 
            color={getColorBasedOnDemand(station.actualMaxPowerDemand, calculateTotalEnergy(station.chargePoints))}
          >
            <Popup>
              <strong>{station.stationName}</strong><br />
              Max Theoretical Energy: {calculateTotalEnergy(station.chargePoints)} kW<br />
              Actual Max Power Demand: {station.actualMaxPowerDemand} kW
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      <div className="flex justify-around mt-2">
        <div className="flex items-center">
          <span className="inline-block w-5 h-5 bg-red-500 mr-2"></span> High Demand
        </div>
        <div className="flex items-center">
          <span className="inline-block w-5 h-5 bg-blue-500 mr-2"></span> Medium Demand
        </div>
        <div className="flex items-center">
          <span className="inline-block w-5 h-5 bg-green-500 mr-2"></span> Low Demand
        </div>
      </div>
    </div>
  );
};

export default MapComponent;