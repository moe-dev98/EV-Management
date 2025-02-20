import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../data/chargingEvents.json';

const BarChartCard = ({ title }) => {
  const [timePeriod, setTimePeriod] = useState('daily');

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div>
      <h2 className="text-center font-bold">{title}</h2>
      <div className="text-center">
        <label htmlFor="timePeriod">Time Period: </label>
        <select id="timePeriod" value={timePeriod} onChange={handleTimePeriodChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data[timePeriod]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={timePeriod === 'daily' ? 'date' : timePeriod === 'weekly' ? 'week' : timePeriod === 'monthly' ? 'month' : 'year'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="events" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;