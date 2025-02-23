import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

const TinyLineChartCard = ({ title, data }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-center font-bold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={200} className="mb-4">
        <LineChart data={data}>
          <XAxis dataKey="chargingPoints">
            <Label value="Charging Points" offset={-1} position="insideBottom" style={{ textAnchor: 'middle', dy: 10 }} />
          </XAxis>
          <YAxis>
            <Label value="Percentage (%)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="percentage" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TinyLineChartCard;