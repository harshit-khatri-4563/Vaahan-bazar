'use client'
import React, { useState } from 'react';

const categories = {
  Budget: [
    'Under 5 Lakh',
    'Under 6 Lakh',
    'Under 7 Lakh',
    'Under 8 Lakh',
    'Under 10 Lakh',
    'Under 12 Lakh',
    'Under 15 Lakh',
    'Under 20 Lakh'
  ],
  'Body Type': [
    'Hatchback',
    'Sedan',
    'SUV',
    'Crossover',
    'Coupe',
    'Convertible',
    'Wagon'
  ],
  'Fuel Type': [
    'Petrol',
    'Diesel',
    'CNG',
    'Electric',
    'Hybrid'
  ],
  'TransmissionType': [
    'Manual',
    'Automatic',
    'CVT',
    'DCT'
  ]
};

const filterComponent = () => {
  const [activeTab, setActiveTab] = useState('Budget');

  return (
    <div className=" px-4 ">
      <h1 className="text-2xl font-bold my-8 ">Find the Cars of your choice</h1>
      <div className="flex flex-col items-center">
        <div className="flex border-b w-full  overflow-x-scroll lg:overflow-hidden ">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 font-semibold ${
                activeTab === category
                  ? 'border-b-4 border-blue-900 text-blue-900'
                  : 'text-gray-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-4 border border-gray-600 rounded-lg">
          {categories[activeTab].map((item) => (
            <button
              key={item}
              className="px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default filterComponent;
