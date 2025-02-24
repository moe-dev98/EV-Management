import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useState, useEffect } from 'react';

const LineChartCard = ({ title, data }) => {
  const [hiddenLines, setHiddenLines] = useState([]);
  const [selectedStation, setSelectedStation] = useState(data ? Object.keys(data)[0] : '');
  const [dataKeys, setDataKeys] = useState([]);

  useEffect(() => {
    if (data && selectedStation) {
      const keys = Object.keys(data[selectedStation][0]).filter(key => key !== 'hour');
      setDataKeys(keys);
    }
  }, [data, selectedStation]);

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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded p-4">
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
          <XAxis dataKey="hour" interval={2}>
          </XAxis>
          <YAxis>
            <Label value="Value (kw)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend content={renderLegend} />
          {dataKeys.map((key, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={key}
              stroke={index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#ffc658"}
              hide={hiddenLines.includes(key)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;