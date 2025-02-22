import React from 'react';

const NumberCard = ({ title, number, unit }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 text-center border border-gray-200 flex-grow">
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-gray-900 mt-2">
        {number} {unit && <span>{unit}</span>}
      </p>
    </div>
  );
};

export default NumberCard;