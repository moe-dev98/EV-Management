import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../data/chartData.json';
import { useState } from 'react';

const LineChartCard = ({ title, dataKey1, dataKey2, dataKey3 }) => {
  const [hiddenLines, setHiddenLines] = useState([]);
  const [selectedStation, setSelectedStation] = useState(Object.keys(data)[0]);

  const handleLegendClick = (dataKey) => {
    setHiddenLines((prev) =>
      prev.includes(dataKey) ? prev.filter((key) => key !== dataKey) : [...prev, dataKey]
    );
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center">
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            onClick={() => handleLegendClick(entry.dataKey)}
            className={`cursor-pointer mx-2 ${hiddenLines.includes(entry.dataKey) ? 'opacity-50' : 'opacity-100'}`}
            style={{ transition: 'opacity 0.3s' }}
          >
            <span style={{ color: entry.color }}>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  return (
    <div>
      <h2 className="text-center font-bold">{title}</h2>
      <div className="text-center mb-4">
        <select id="station-select" value={selectedStation} onChange={handleStationChange}>
          {Object.keys(data).map((station) => (
            <option key={station} value={station}>{station}</option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data[selectedStation]} title={title}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" interval={2} />
          <YAxis />
          <Tooltip />
          <Legend content={renderLegend} />
          <Line type="monotone" dataKey={dataKey1} stroke="#8884d8" hide={hiddenLines.includes(dataKey1)} />
          <Line type="monotone" dataKey={dataKey2} stroke="#82ca9d" hide={hiddenLines.includes(dataKey2)} />
          <Line type="monotone" dataKey={dataKey3} stroke="#ffc658" hide={hiddenLines.includes(dataKey3)} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;