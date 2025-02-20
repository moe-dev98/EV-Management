import LineChartCard from '../components/LineChartCard';
import NumberCard from '../components/NumberCard';
import BarChartCard from '../components/BarChartCard';

const Analytics = () => {
  return (
    <div className="p-4">
      <div className='flex flex-wrap justify-center gap-10 mt-5 mb-5 flex-grow'>
        <NumberCard title="Number Of Charging Events " number={132} />
        <NumberCard title="Current Concurrency Factor (%)" number={55} />
        <NumberCard title="Total Energy Charged (Kwh)" number={12345} />
      </div>
      <div className='mt-5'>
        <LineChartCard title="Daily Charging values (in kW) per chargepoint" dataKey1="chargepoint1" dataKey2="chargepoint2" dataKey3="chargepoint3" />
      </div>
      <div className='mt-5'>
        <BarChartCard title="Charging Events" />
      </div>
    </div>
  );
};

export default Analytics;