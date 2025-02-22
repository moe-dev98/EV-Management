import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { FaTimes } from 'react-icons/fa'; 

const ChargePointModal = ({ station, onClose }) => {
  // Define table data
  const data = useMemo(() => station.charge_points, [station]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        header: 'Number of Charge Points',
        accessorKey: 'count',
      },
      {
        header: 'Power (kW)',
        accessorKey: 'power',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-4xl overflow-auto">
        <h3 className="text-lg font-bold mb-4 text-black-600 font-sans">{station.name} Distribution</h3>
        <div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-2 px-4 border-b bg-gray-100">
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
                    <td key={cell.id} className="py-2 px-4 border-b">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaTimes className="mr-2" /> Close
        </button>
      </div>
    </div>
  );
};

export default ChargePointModal;
