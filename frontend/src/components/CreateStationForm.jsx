import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useStationStore } from '../useStationsStore';

function CreateStationForm({ onClose }) {
  const { selectedStation, createStation, updateStation, clearSelectedStation , fetchStations} = useStationStore(); 
  const [stationName, setStationName] = useState('');
  const [chargePoints, setChargePoints] = useState([{ power: 11, count: 1 }]);
  const [errors, setErrors] = useState({});
  const [probabilityOfArrival, setProbabilityOfArrival] = useState(100);
  const [consumptionOfCars, setConsumptionOfCars] = useState(18); 

  useEffect(() => {
    if (selectedStation) {
      setStationName(selectedStation.name);
      setChargePoints(selectedStation.charge_points);
      setProbabilityOfArrival(selectedStation.car_arrival_probability);
      setConsumptionOfCars(selectedStation.consumption_of_cars);
    }
  }, [selectedStation]);

  const availablePowers = [11, 22, 33, 44, 55].filter(
    (power) => !chargePoints.some((point) => point.power === power)
  );

  const validate = () => {
    const newErrors = {};
    if (!stationName) newErrors.stationName = 'Station name is required';
    if (probabilityOfArrival < 20 || probabilityOfArrival > 200) newErrors.probabilityOfArrival = 'Probability of arrival must be between 20 and 200';
    if (consumptionOfCars < 10 || consumptionOfCars > 50) newErrors.consumptionOfCars = 'Consumption of cars must be between 10 and 50';
    chargePoints.forEach((point, index) => {
      if (!point.power) newErrors[`power${index}`] = 'Capacity is required';
      if (!point.count) newErrors[`count${index}`] = 'Number of charging points is required';
    });
    const powerValues = chargePoints.map(point => point.power);
    const hasDuplicates = powerValues.some((power, index) => powerValues.indexOf(power) !== index);
    if (hasDuplicates) newErrors.duplicatePower = 'Duplicate power values are not allowed';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addChargePoint = () => {
    if (availablePowers.length === 0) {
      setErrors({ ...errors, duplicatePower: 'No more power values available' });
      return;
    }
    setChargePoints([...chargePoints, { power: availablePowers[0], count: 1 }]);
  };

  const removeChargePoint = (index) => {
    if (chargePoints.length > 1) {
      setChargePoints(chargePoints.filter((_, i) => i !== index));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (validate()) {
      const confirmationMessage = selectedStation ? 'Are you sure you want to edit this station?' : 'Are you sure you want to save this station?';
      if (window.confirm(confirmationMessage)) {
        const sanitizedChargePoints = chargePoints.map(({ power, count }) => ({ power, count }));
        const newStation = { 
          name: stationName, 
          charge_points: sanitizedChargePoints.length ? sanitizedChargePoints : [{ power: 11, count: 1 }], // Ensure chargePoints is always an array with at least one element
          car_arrival_probability: probabilityOfArrival, 
          consumption_of_cars: Number(consumptionOfCars) 
        };
        if (selectedStation) {
          await updateStation(selectedStation.id, newStation);
        } else {
          await createStation(newStation);
        }
        fetchStations();
        clearSelectedStation();
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl overflow-auto">
        <form onSubmit={handleSave} className="p-6">
          <h1 className="text-xl font-semibold mb-4 text-gray-800 font-sans">{selectedStation ? 'Edit Charging Station' : 'Add Charging Station'}</h1>
          <div className="mb-4">
            <input
              type="text"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter station name"
            />
            {errors.stationName && <p className="text-red-500">{errors.stationName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Probability of Arrival (%)</label>
            <input
              type="number"
              value={probabilityOfArrival}
              onChange={(e) => setProbabilityOfArrival(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter probability of arrival (20-200%)"
            />
            {errors.probabilityOfArrival && <p className="text-red-500">{errors.probabilityOfArrival}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Consumption of Cars in (Kw)</label>
            <input
              type="number"
              value={consumptionOfCars}
              onChange={(e) => setConsumptionOfCars(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter consumption of cars (10-50)"
            />
            {errors.consumptionOfCars && <p className="text-red-500">{errors.consumptionOfCars}</p>}
          </div>

          <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
            <h3 className="text-l font-semibold mb-4 text-gray-800 font-sans">Charge Points</h3>
            {chargePoints.map((point, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Number of Charge Points</label>
                  <input
                    type="number"
                    value={point.count}
                    onChange={(e) =>
                      setChargePoints(
                        chargePoints.map((p, i) =>
                          i === index ? { ...p, count: e.target.value } : p
                        )
                      )
                    }
                    className="border p-2 w-full"
                    placeholder="Number of Charge Points"
                  />
                  {errors[`count${index}`] && <p className="text-red-500">{errors[`count${index}`]}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Power (kW)</label>
                  <select
                    value={point.power}
                    onChange={(e) =>
                      setChargePoints(
                        chargePoints.map((p, i) =>
                          i === index ? { ...p, power: parseInt(e.target.value) } : p
                        )
                      )
                    }
                    className="border p-2 w-full"
                  >
                    <option value={point.power}>{point.power}</option>
                    {availablePowers.map((power) => (
                      <option key={power} value={power}>
                        {power}
                      </option>
                    ))}
                  </select>
                  {errors[`power${index}`] && <p className="text-red-500">{errors[`power${index}`]}</p>}
                </div>
                <button 
                  type="button" 
                  onClick={() => removeChargePoint(index)} 
                  className={`text-red-500 mt-6 ${chargePoints.length === 1 ? 'hidden' : ''}`}
                  title="Remove charge point"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            {errors.duplicatePower && <p className="text-red-500">{errors.duplicatePower}</p>}
            <button type="button" onClick={addChargePoint} className="text-blue-500 p-2 mt-4 flex items-center justify-center rounded-full w-10 h-10">
              <FaPlus />
            </button>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button type="submit" className="text-blue-500 py-2 px-4 rounded border border-blue-500 hover:text-blue-700 flex items-center">
              <FaSave className="mr-2" /> Save Station
            </button>
            <button
              type="button"
              onClick={() => {
                clearSelectedStation();
                onClose();
              }}
              className="text-red-500 py-2 px-4 rounded border border-red-500 hover:text-red-700 flex items-center"
            >
              <FaTimes className="mr-2" /> Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStationForm;
