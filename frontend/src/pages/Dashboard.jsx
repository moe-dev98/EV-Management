import React from 'react';
import StationList from '../components/StationList';
import MapComponent from '../components/MapComponent'; 

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left text-gray-700">Charging Station Overview for Location: Augsburg</h1>
      <StationList />
      <div className="mt-4 sm:mt-8"> {/* Add margin-top to separate the components */}
        <MapComponent /> {/* Load the MapComponent */}
      </div>
    </div>
  );
};

export default Dashboard;