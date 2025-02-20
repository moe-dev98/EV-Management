import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../data/chartData.json';

const LineChartCard = ({ title, dataKey1, dataKey2, dataKey3 }) => {
  return (
    <div>
      <h2 className="text-center font-bold">{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} title={title}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" interval={2} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey1} stroke="#8884d8" />
          <Line type="monotone" dataKey={dataKey2} stroke="#82ca9d" />
          <Line type="monotone" dataKey={dataKey3} stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;