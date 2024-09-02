'use client'
import React, { useState, useEffect } from 'react';
import Filters from '@/components/UsedCarComponents/Filters';
import Card from '@/components/UsedCarComponents/Card';
import FiltersModal from '@/components/UsedCarComponents/FilterModal';
import SkeletonCard from '@/components/SkeletonCard'; // Placeholder skeleton component
import { getAllVehicle } from '@/apiCall/vehicleApi';

const Page = () => {
  const [carsData, setCarsData] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    price: 500000,
    carAge: 0,
    fuelType: '',
    transmissionType: '',
    category: '',
    kms: 80000,
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [sortBy, setSortBy] = useState(''); // State for sorting
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage, setItemsPerPage] = useState(6); // State for items per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        const response = await getAllVehicle();
        setCarsData(response.data); // Set carsData state
        setFilteredCars(response.data); // Initially set filteredCars to all cars
        setLoading(false); // Stop loading after data fetch
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (carsData.length > 0) {
      const filteredData = carsData.filter((car) => {
        console.log(car);
        const price = parseFloat(car.price);
        const kms = parseInt(car.mileage);
        const fuelType = car.fuelType;
        const transmissionType = car.transmissionType;
        const category = car.category;
        
        return (
          (filters.price === 0 || price <= filters.price) &&
          (filters.kms === 0 || kms <= filters.kms) &&
          (filters.fuelType === '' || fuelType.toLowerCase() === filters.fuelType.toLowerCase())&&
          (filters.category === '' || category.toLowerCase() === filters.category.toLowerCase())&&
          (filters.transmissionType === '' || transmissionType.toLowerCase() === filters.transmissionType.toLowerCase())
          // Add more conditions as needed
        );
      });

      // Apply sorting if sortBy is set
      if (sortBy) {
        filteredData.sort((a, b) => {
          if (sortBy === 'price') {
            return a.price - b.price; // Sort by price ascending
          }
          // Add more sorting options as needed

          return 0;
        });
      }

      setFilteredCars(filteredData);
    }
  }, [filters, carsData, sortBy]);

  // Function to handle sorting
  const handleSort = (sortByField) => {
    setSortBy(sortByField);
  };

  // Calculate the cars to be displayed based on current page and items per page
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            onClick={() => handleSort('price')}>
            Low to High
          </button>
          <button
            className="block md:hidden mb-4 bg-blue-900 text-white py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Open Filters
          </button>
          <div className="hidden md:block">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            // Display a loading indicator or skeleton UI here
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : currentCars.length > 0 ? (
            currentCars.map((car) => (
              <Card key={car._id} car={car} />
            ))
          ) : (
            <p className="col-span-full text-center text-lg font-bold">No cars found with selected filters</p>
          )}
        </div>
      </div>
      <FiltersModal
        filters={filters}
        setFilters={setFilters}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="flex justify-center mt-6">
        <button
          className={`px-3 py-1 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-900 text-white'}`}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            className={`px-3 py-1 mx-1 rounded ${currentPage === number + 1 ? 'bg-blue-900 text-white' : 'bg-gray-300'}`}
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </button>
        ))}
        <button
          className={`px-3 py-1 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-900 text-white'}`}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Page;
