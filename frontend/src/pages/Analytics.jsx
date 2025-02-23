import { useState, useEffect } from 'react';
import BarChartCard from '../components/BarChartCard';
import NumberCard from '../components/NumberCard';
import TinyLineChartCard from '../components/TinyLineChartCard';
import data from '../data/MockChartsData.json';

const Analytics = () => {
  const [timePeriod, setTimePeriod] = useState('daily');
  const [totalEvents, setTotalEvents] = useState(1234);
  const [totalEnergy, setTotalEnergy] = useState(500); 
  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  useEffect(() => {
    const randomChange = {
      daily: Math.floor(Math.random() * 100) + 50,
      weekly: Math.floor(Math.random() * 500) + 200,
      monthly: Math.floor(Math.random() * 1000) + 500,
      yearly: Math.floor(Math.random() * 5000) + 2000
    }[timePeriod];
    setTotalEvents(1000 + randomChange);
    setTotalEnergy(500 + randomChange / 2); 
  }, [timePeriod]);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center space-x-2">
        <select id="timePeriod" value={timePeriod} onChange={handleTimePeriodChange} className="p-2 border rounded">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <NumberCard title="Total Charging Events" number={totalEvents} />
        <NumberCard title="Overall Energy Consumption in Kwh" number={totalEnergy} />
      </div>
      <div className='mt-4'>
        <BarChartCard title="Charging Events" data={data.chargingEvents} timePeriod={timePeriod} />
      </div>
      <div className='mt-4'>
        <TinyLineChartCard title="Deviation Of The Concurrency Factor (%) " data={data.concurrencyFactor} />
      </div>
    </div>
  );
};

export default Analytics;