import React from 'react';
import StationList from '../components/StationList';
import MapComponent from '../components/MapComponent'; 

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-100 rounded-lg shadow-lg z-0"> 
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left text-gray-700">Live Charging Station Overview In Augsburg</h1>
      <StationList />
      <div className="mt-4 sm:mt-8 h-64 sm:h-96 lg:h-128"> 
        <MapComponent />
      </div>
    </div>
  );
};

export default Dashboard;