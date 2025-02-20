import React from 'react';

const NumberCard = ({ title, number }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-200 flex-grow">
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-gray-900 mt-2">{number}</p>
    </div>
  );
};

export default NumberCard;