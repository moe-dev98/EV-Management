import NumberCard from '../components/NumberCard';
import MapComponent from '../components/MapComponent';
import LineChartCard from '../components/LineChartCard';
import data from '../data/MockChartsData.json';

const DailyOverView = () => {
  const totalEvents = 132;

  return (
    <div className="p-4">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className='w-full lg:w-1/3 flex flex-col gap-5 mb-5 lg:mb-0'>
          <NumberCard title="Number Of Charging Events " number={totalEvents} />
          <NumberCard title="Current Concurrency Factor (%)" number={55} />
          <NumberCard title="Total Energy Charged (Kwh)" number={12345} />
        </div>
        <div className="w-full lg:w-2/3 h-auto lg:h-auto lg:ml-5"> 
          <MapComponent />
        </div>
      </div>
      <div className='w-full mt-5'>
        <LineChartCard title="Daily Charging values (in Kw) per chargepoint" data={data.chartData} />
      </div>
    </div>
  );
};

export default DailyOverView;