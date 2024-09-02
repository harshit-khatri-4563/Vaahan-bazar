'use client'
import React, { useEffect, useState } from 'react';
import Card from '../CarCards';
import { getAllVehicle } from '@/apiCall/vehicleApi';

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const resp = await getAllVehicle();
        setCars(resp.data.slice(0,8));
      } catch (error) {
        console.error('Failed to fetch vehicles', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className=" px-4">
      <h1 className="text-4xl font-bold my-8">Featured Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center ">
        {cars.map((car, index) => (
          <Card key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
