import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TinyLineChartCard = ({ title, data }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-center font-bold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="chargingPoints" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="percentage" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TinyLineChartCard;