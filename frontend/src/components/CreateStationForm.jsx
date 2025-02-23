import React, { useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as yup from 'yup';
import { useStationStore } from '../useStationsStore';


function CreateStationForm({ onClose }) {
  const { stations, selectedStation, createStation, updateStation, clearSelectedStation, fetchStations } = useStationStore();

  const validationSchema = yup.object({
    stationName: yup.string()
      .required('Station name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Station name should not contain special characters')
      .test('unique-name', 'Station name already exists', async (value) => {
        if (selectedStation && selectedStation.name === value) return true;
        return !stations.some(station => station.name === value);
      }),
    probabilityOfArrival: yup.number().min(20, 'Must be at least 20').max(200, 'Must be at most 200').required('Probability of arrival is required'),
    consumptionOfCars: yup.number().min(10, 'Must be at least 10').max(50, 'Must be at most 50').required('Consumption of cars is required'),
    chargePoints: yup.array().of(
      yup.object({
        power: yup.number().required('Capacity is required'),
        count: yup.number().required('Number of charging points is required')
      })
    ).test('unique-power', 'Duplicate power values are not allowed', (chargePoints) => {
      const powerValues = chargePoints.map(point => point.power);
      return powerValues.length === new Set(powerValues).size;
    })
  });
  const formik = useFormik({
    initialValues: {
      stationName: '',
      probabilityOfArrival: 100,
      consumptionOfCars: 18,
      chargePoints: [{ power: 11, count: 1 }]
    },
    validationSchema,
    onSubmit: async (values) => {
      const confirmationMessage = selectedStation ? 'Are you sure you want to edit this station?' : 'Are you sure you want to save this station?';
      if (window.confirm(confirmationMessage)) {
        const newStation = {
          name: values.stationName,
          charge_points: values.chargePoints,
          car_arrival_probability: values.probabilityOfArrival,
          consumption_of_cars: values.consumptionOfCars
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
  });

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  useEffect(() => {
    if (selectedStation) {
      formik.setValues({
        stationName: selectedStation.name,
        probabilityOfArrival: selectedStation.car_arrival_probability,
        consumptionOfCars: selectedStation.consumption_of_cars,
        chargePoints: selectedStation.charge_points
      });
    }
  }, [selectedStation]);

  const availablePowers = [11, 22, 33, 44, 55].filter(
    (power) => !formik.values.chargePoints.some((point) => point.power === power)
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl overflow-auto max-h-screen sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="p-6 flex flex-col space-y-4 overflow-auto">
            <h1 className="text-xl font-semibold mb-4 text-gray-800 font-sans">{selectedStation ? 'Edit Charging Station' : 'Add Charging Station'}</h1>
            <div className="flex flex-col space-y-2">Station name
              <input
                type="text"
                name="stationName"
                value={formik.values.stationName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full"
                placeholder="Enter station name"
              />
              {formik.touched.stationName && formik.errors.stationName && <p className="text-red-500">{formik.errors.stationName}</p>}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="block text-gray-700">Probability of Arrival (%)</label>
              <input
                type="number"
                name="probabilityOfArrival"
                value={formik.values.probabilityOfArrival}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full"
                placeholder="Enter probability of arrival (20-200%)"
              />
              {formik.touched.probabilityOfArrival && formik.errors.probabilityOfArrival && <p className="text-red-500">{formik.errors.probabilityOfArrival}</p>}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="block text-gray-700">Consumption of Cars in (Kw)</label>
              <input
                type="number"
                name="consumptionOfCars"
                value={formik.values.consumptionOfCars}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full"
                placeholder="Enter consumption of cars (10-50)"
              />
              {formik.touched.consumptionOfCars && formik.errors.consumptionOfCars && <p className="text-red-500">{formik.errors.consumptionOfCars}</p>}
            </div>

            <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
              <h3 className="text-l font-semibold mb-4 text-gray-800 font-sans">Charge Points</h3>
              <FieldArray name="chargePoints">
                {({ push, remove }) => (
                  <>
                    {formik.values.chargePoints.map((point, index) => (
                      <div key={index} className="flex space-x-4 mb-2">
                        <div className="flex-1">
                          <label className="block text-gray-700 mb-2">Number of Charge Points</label>
                          <input
                            type="number"
                            name={`chargePoints[${index}].count`}
                            value={point.count}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border p-2 w-full"
                            placeholder="Number of Charge Points"
                          />
                          {formik.touched.chargePoints?.[index]?.count && formik.errors.chargePoints?.[index]?.count && <p className="text-red-500">{formik.errors.chargePoints[index].count}</p>}
                        </div>
                        <div className="flex-1">
                          <label className="block text-gray-700 mb-2">Power (kW)</label>
                          <select
                            name={`chargePoints[${index}].power`}
                            value={point.power}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border p-2 w-full"
                          >
                            <option value={point.power}>{point.power}</option>
                            {availablePowers.map((power) => (
                              <option key={power} value={power}>
                                {power}
                              </option>
                            ))}
                          </select>
                          {formik.touched.chargePoints?.[index]?.power && formik.errors.chargePoints?.[index]?.power && <p className="text-red-500">{formik.errors.chargePoints[index].power}</p>}
                        </div>
                        <button 
                          type="button" 
                          onClick={() => remove(index)} 
                          className={`text-red-500 mt-6 ${formik.values.chargePoints.length === 1 ? 'hidden' : ''}`}
                          title="Remove charge point"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    {formik.errors.chargePoints && typeof formik.errors.chargePoints === 'string' && <p className="text-red-500">{formik.errors.chargePoints}</p>}
                    {formik.values.chargePoints.length < 5 && (
                      <button type="button" onClick={() => push({ power: availablePowers[0], count: 1 })} className="text-blue-500 p-2 mt-4 flex items-center justify-center rounded-full w-10 h-10">
                        <FaPlus />
                      </button>
                    )}
                  </>
                )}
              </FieldArray>
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
        </FormikProvider>
      </div>
    </div>
  );
}

export default CreateStationForm;
