import React from 'react';
import StationList from '../components/StationList';

const Dashboard = () => {
  return (
    <div className="min-w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left text-gray-700">Charging Stations Overview In Augsburg</h1>
        <StationList />
    </div>
  );
};

export default Dashboard;