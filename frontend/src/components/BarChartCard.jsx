import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Label, Legend, ResponsiveContainer } from 'recharts';

const BarChartCard = ({ title, data, timePeriod }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-center font-bold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data[timePeriod]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={timePeriod === 'daily' ? 'date' : timePeriod === 'weekly' ? 'week' : timePeriod === 'monthly' ? 'month' : 'year'}>
          </XAxis>
          <YAxis>
            <Label value="Charging Events" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Bar dataKey="events" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;