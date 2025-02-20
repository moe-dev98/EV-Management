import React, { useState } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa'; // Import icons

function CreateStationForm({ onClose}) {
  const [stationName, setStationName] = useState('');
  const [chargePoints, setChargePoints] = useState([{ power: 11, count: 1 }]);
  const [errors, setErrors] = useState({});
  const [probabilityOfArrival, setProbabilityOfArrival] = useState(100); // Add state for probability of arrival
  const [consumptionOfCars, setConsumptionOfCars] = useState(18); // Set default value to 18

  const availablePowers = [11, 22, 33, 44, 55].filter(
    (power) => !chargePoints.some((point) => point.power === power)
  );

  const validate = () => {
    const newErrors = {};
    if (!stationName) newErrors.stationName = 'Station name is required';
    if (probabilityOfArrival < 20 || probabilityOfArrival > 200) newErrors.probabilityOfArrival = 'Probability of arrival must be between 20 and 200';
    if (!consumptionOfCars) newErrors.consumptionOfCars = 'Consumption of cars is required';
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
    setChargePoints(chargePoints.filter((_, i) => i !== index));
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      if (window.confirm('Are you sure you want to save this station?')) {
        const newStation = { stationName, chargePoints, probabilityOfArrival, consumptionOfCars };
        console.log(newStation);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Add z-index */}
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl overflow-auto">
        <form onSubmit={handleSave} className="p-6">
          <h1 className="text-xl font-semibold mb-4 text-gray-800 font-sans">New Charging Station</h1>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Station Name</label>
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
              min="20"
              max="200"
            />
            {errors.probabilityOfArrival && <p className="text-red-500">{errors.probabilityOfArrival}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Consumption of Cars</label>
            <input
              type="text"
              value={consumptionOfCars}
              onChange={(e) => setConsumptionOfCars(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter consumption of cars"
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
                <button type="button" onClick={() => removeChargePoint(index)} className="text-red-500 self-start mt-3">
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
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
              <FaSave className="mr-2" /> Save Station
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
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
