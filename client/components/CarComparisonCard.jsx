import React from 'react';

const CarComparisonCard = ({ car1, car2 }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-sm shadow-2xl  ">
      <div className="flex justify-between items-center max-sm:h-60  max-sm:w-74 ">
        <div className="text-center w-1/2">
          <img src={car1.image} alt={car1.name} className="w-24 h-24 mx-auto object-contain " />
          <h3 className="text-lg font-semibold mt-2">{car1.name}</h3>
          <p className="text-xs text-gray-500">{car1.price}</p>
        </div>
        <div className="relative flex items-center justify-center w-1/6 h-36 mx-4">
          <div className="border-l border-gray-300 h-full"></div>
          <div className="absolute bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-sm">
            v/s
          </div>
        </div>
        <div className="text-center w-1/2 overflow-hidden">
          <img src={car2.image} alt={car2.name} className="w-24 h-24 mx-auto object-contain overflow-hidden" />
          <h3 className=" text-lg font-semibold mt-2">{car2.name}</h3>
          <p className="text-xs text-gray-500">{car2.price}</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-blue-900 text-white py-2 px-6 rounded-md">
          Compare Now
        </button>
      </div>
    </div>
  );
};

export default CarComparisonCard;