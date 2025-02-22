import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import ChargePointModal from './ChargePointModal';
import CreateStationForm from './CreateStationForm';
import { FaPlus, FaTrash, FaChartBar } from 'react-icons/fa'; 
import { useStationStore } from '../useStationsStore'; 

const StationList = () => {
  const { stations, fetchStations, deleteStation, getStationById, setSelectedStation, clearSelectedStation } = useStationStore();
  const [modalState, setModalState] = useState({
    isCreateModalOpen: false,
  });
  const [calculatedData, setCalculatedData] = useState([]);

  const calculateTotalChargePoints = (chargePoints) => {
    const points = chargePoints || [];
    return points.reduce((total, point) => total + point.count, 0);
  };

  const calculateMaxCapacity = (chargePoints) => {
    const points = chargePoints || [];
    return points.reduce((max, cp) => max + (cp.power * cp.count), 0);
  };

  useEffect(() => {
    const fetchStationsData = async () => {
      await fetchStations(); // Fetch stations from the API
    };
    fetchStationsData();
  }, [fetchStations]);

  useEffect(() => {
    const data = stations.map((station) => ({
      id: station.id,
      stationName: station.name,
      positionLat: station.position_lat,
      positionLong: station.position_long,
      carArrivalProbability: station.car_arrival_probability,
      consumptionOfCars: station.consumption_of_cars,
      totalChargePoints: calculateTotalChargePoints(station.charge_points),
      maxCapacity: calculateMaxCapacity(station.charge_points),
      chargePoints: station.charge_points,
      actions: station,
    }));
    setCalculatedData(data);
  }, [stations]);

  const handleModal = (type, value) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleDeleteStation = useCallback(async (stationId) => {
    if (window.confirm('Are you sure you want to delete this station?')) { // can be a custom dialogue component as well
      await deleteStation(stationId);    }
  }, [deleteStation]);

  const handleEditStation = useCallback(async (stationId) => {
    const station = await getStationById(stationId);
    setSelectedStation(station);
    handleModal('isCreateModalOpen', true);
  }, [getStationById, setSelectedStation]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        header: 'Charging Station Name',
        accessorKey: 'stationName',
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
              className="text-blue-500 py-1 px-3 rounded border border-blue-500 hover:text-blue-700 flex items-center"
            >
              <FaChartBar className="mr-2" /> Distribution
            </button>
            <button
              onClick={() => handleEditStation(row.original.actions.id)}
              className="text-yellow-500 py-1 px-3 rounded border border-yellow-500 hover:text-yellow-700 flex items-center"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteStation(row.original.actions.id)}
              className="text-red-500 py-1 px-3 rounded border border-red-500 hover:text-red-700 flex items-center"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        ),
      },
    ],
    [handleEditStation, handleDeleteStation]
  );

  const table = useReactTable({
    data: calculatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            clearSelectedStation();
            handleModal('isCreateModalOpen', true);
          }}
          className="text-blue-500 py-2 px-4 rounded border border-blue-500 hover:text-blue-700 font-sans text-sm flex items-center flex-wrap"
        >
          <FaPlus className="mr-2" /> Create Station
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2 px-4 border-b bg-gray-100 text-left" style={{ width: header.column.getSize() }}>
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
                <td key={cell.id} className="py-2 px-4 border-b text-left" style={{ width: cell.column.getSize() }}>
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
        <CreateStationForm onClose={() => handleModal('isCreateModalOpen', false)} />
      )}
    </div>
  );
};

export default StationList;
