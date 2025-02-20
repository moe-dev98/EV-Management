import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const position = [48.3705, 10.8978]; // Position for Augsburg, Germany
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('/stations.json')
      .then(response => response.json())
      .then(data => setStations(data));
  }, []);

  const calculateTotalEnergy = (chargePoints) => {
    return chargePoints.reduce((total, point) => total + (point.power * point.count), 0);
  };

  return (
    <MapContainer center={position} zoom={15} style={{ height: '50vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map(station => (
        <Circle
          key={station.id}
          center={station.position}
          radius={20} // Adjust radius as needed
          color="grey"
        >
          <Popup>
            <strong>{station.stationName}</strong><br />
            Total Energy: {calculateTotalEnergy(station.chargePoints)} kW
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default MapComponent;