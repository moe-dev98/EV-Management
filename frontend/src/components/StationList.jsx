import React, { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import ChargePointModal from './ChargePointModal';
import CreateStationForm from './CreateStationForm';
import { FaPlus, FaTrash, FaChartBar } from 'react-icons/fa'; // Import icons

const StationList = () => {
  const [stations, setStations] = useState([]);
  const [modalState, setModalState] = useState({
    selectedStation: null,
    isCreateModalOpen: false,
  });

  useEffect(() => {
    fetch('/data/stations.json')
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Error fetching station data:', error));
  }, []);

  const calculateTotalChargePoints = (chargePoints) => {
    return chargePoints.reduce((total, cp) => total + cp.count, 0);
  };

  const calculateMaxCapacity = (chargePoints) => {
    return chargePoints.reduce((max, cp) => max + (cp.power * cp.count), 0);
  };

  const handleModal = (type, value) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleDeleteStation = (stationId) => {
    if (window.confirm('Are you sure you want to delete this station?')) { // can be a custom dialogue component as well
      setStations((prevStations) => prevStations.filter(station => station.id !== stationId));
    }
  };

  // Define table data
  const data = useMemo(
    () =>
      stations.map((station) => ({
        name: station.stationName,
        totalChargePoints: calculateTotalChargePoints(station.chargePoints),
        maxCapacity: calculateMaxCapacity(station.chargePoints),
        carArrivalProbability: station.carArrivalProbability, 
        consumptionOfCars: station.consumptionOfCars, 
        actions: station,
      })),
    [stations]
  );

  // Define table columns
  const columns = useMemo(
    () => [
      {
        header: 'Charging Station Name',
        accessorKey: 'name',
        size: 150,
      },
      {
        header: 'Total Charge Points',
        accessorKey: 'totalChargePoints',
        size: 100,
      },
      {
        header: 'Max Theoretical Capacity (kW)',
        accessorKey: 'maxCapacity',
        size: 150,
      },
      {
        header: 'Car Arrival Probability (%)',
        accessorKey: 'carArrivalProbability',
        size: 100,
      },
      {
        header: 'Consumption of Cars',
        accessorKey: 'consumptionOfCars',
        size: 100,
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        size: 200,
        cell: ({ row }) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => handleModal('selectedStation', row.original.actions)}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 flex items-center"
            >
              <FaChartBar className="mr-2" /> Distribution
            </button>
            <button
              onClick={() => handleDeleteStation(row.original.actions.id)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 flex items-center"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange', // Enable column resizing
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleModal('isCreateModalOpen', true)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-sans text-sm flex items-center"
        >
          <FaPlus className="mr-2" /> Create Station
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2 px-4 border-b bg-gray-100" style={{ width: header.column.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-4 border-b" style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {modalState.selectedStation && (
        <ChargePointModal station={modalState.selectedStation} onClose={() => handleModal('selectedStation', null)} />
      )}

      {modalState.isCreateModalOpen && (
        <CreateStationForm onClose={() => handleModal('isCreateModalOpen', false)}/>
      )}
    </div>
  );
};

export default StationList;
