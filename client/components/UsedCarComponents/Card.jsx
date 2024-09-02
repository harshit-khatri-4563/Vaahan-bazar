'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Card = ({ car }) => {
  const router = useRouter();
  const handleKnowMore = () => {
    router.push(`/UsedCars/${car._id}`);
    console.log(`Navigating to details of car with ID: ${car._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-h-[400px]">
      <img
        src={car.photos && car.photos.length > 0 ? car.photos[0] : 'placeholder.jpg'}
        alt={`${car.make} ${car.model}`}
        className="rounded-t-lg w-full max-h-44"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold capitalize">{car.make} {car.model}</h2>
        <p className="text-gray-600 capitalize">{car.year} | {car.transmissionType} | {car.fuelType}</p>
        <p className="text-gray-700 mt-2">{car.price} | {car.location}</p>
       <div className='w-full flex justify-center items-center'>
       <button
          className="mt-4 bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 rounded focus:outline-none w-full"
          onClick={handleKnowMore}
        >
          Know More
        </button>
       </div>
      </div>
    </div>
  );
};

export default Card;
